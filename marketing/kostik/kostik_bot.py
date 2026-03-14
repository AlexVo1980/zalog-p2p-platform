import asyncio
import os
import json
import logging
import aiohttp
from datetime import datetime
from telethon import TelegramClient, events, functions, types
from telethon.tl.functions.messages import SearchGlobalRequest
from dotenv import load_dotenv

# Настройка логирования
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")

# Загрузка конфигов
load_dotenv()
API_ID = os.getenv("API_ID")
API_HASH = os.getenv("API_HASH")
OWNER_ID = os.getenv("OWNER_ID") # Твой Telegram ID для отчетов
OLLAMA_URL = "http://localhost:11434/api/generate"

# Пути к файлам
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PERSONA_PATH = os.path.join(BASE_DIR, "kostik_persona.md")
STATS_PATH = os.path.join(BASE_DIR, "kostik_stats.json")

# Константы задержек (в секундах)
COOLDOWN_GROUP = 24 * 3600 # 24 часа для групп
COOLDOWN_DM = 72 * 3600    # 3 дня для личных сообщений

# Инициализация статистики и памяти
if not os.path.exists(STATS_PATH):
    with open(STATS_PATH, "w") as f:
        json.dump({
            "total_posts": 0, 
            "history": [], 
            "visited_chats": {}, 
            "contacted_users": {}
        }, f)

def can_interact(target_id, target_type="group"):
    """Проверяет, прошло ли достаточно времени с последнего контакта"""
    try:
        with open(STATS_PATH, "r") as f:
            data = json.load(f)
        
        registry = data.get("visited_chats" if target_type == "group" else "contacted_users", {})
        last_time = registry.get(str(target_id), 0)
        
        cooldown = COOLDOWN_GROUP if target_type == "group" else COOLDOWN_DM
        return (datetime.now().timestamp() - last_time) > cooldown
    except Exception:
        return True

def update_stats(chat_name, message, target_id=None, target_type=None):
    with open(STATS_PATH, "r+") as f:
        data = json.load(f)
        data["total_posts"] += 1
        data["history"].append({
            "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "chat": chat_name,
            "text": message
        })
        
        # Обновляем реестр посещений
        if target_id and target_type:
            registry_key = "visited_chats" if target_type == "group" else "contacted_users"
            if registry_key not in data: data[registry_key] = {}
            data[registry_key][str(target_id)] = datetime.now().timestamp()

        f.seek(0)
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.truncate()

async def ask_ai(context):
    logging.info("🤖 Костик анализирует контекст...")
    with open(PERSONA_PATH, "r") as f:
        persona = f.read()

    full_prompt = (
        f"{persona}\n\n"
        f"КОНТЕКСТ ПЕРЕПИСКИ В ГРУППЕ (последние сообщения):\n{context}\n\n"
        "ЗАДАЧА: Реши, стоит ли здесь что-то написать про платформу 'Залог Про'. "
        "Если уместно, напиши короткий, живой комментарий в своем стиле. "
        "Если совсем не в тему - напиши 'SKIP'.\n"
        "ОТВЕТЬ ТОЛЬКО ТЕКСТОМ СООБЩЕНИЯ ИЛИ СЛОВОМ SKIP."
    )

    payload = {"model": "gemma2:9b", "prompt": full_prompt, "stream": False}
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(OLLAMA_URL, json=payload, timeout=60) as response:
                result = await response.json()
                return result.get("response", "SKIP").strip().replace('"', '')
    except Exception as e:
        logging.error(f"AI Error: {e}")
        return "SKIP"

client = TelegramClient('kostik_session', API_ID, API_HASH)

@client.on(events.NewMessage)
async def handler(event):
    sender = await event.get_sender()
    sender_id = str(event.sender_id)
    
    # 1. Отчеты владельцу (Личка)
    if event.is_private and sender_id == OWNER_ID:
        if "/stats" in event.text:
            try:
                with open(STATS_PATH, "r") as f:
                    stats = json.load(f)
                report = f"📊 **Отчет Костика**\nВсего постов/ответов: {stats['total_posts']}\n\nПоследние действия:\n"
                for h in stats['history'][-7:]:
                    report += f"- {h['date']} [{h['chat']}]: {h['text'][:60]}...\n"
                await event.reply(report)
            except Exception as e:
                await event.reply(f"Ошибка чтения статистики: {e}")
        return

    # 2. Диалог в группах
    if event.is_group:
        # Условия, при которых Костик вступает в диалог:
        # - Ему ответили (reply)
        # - Его упомянули по имени "Костик"
        # - Спросили про "Залог Про" или "Zalog Pro"
        # - Его тегнули (если у аккаунта есть username)
        
        is_reply_to_me = event.is_reply and (await event.get_reply_message()).sender_id == (await client.get_me()).id
        mentions_me = "костик" in event.text.lower()
        mentions_platform = "залог про" in event.text.lower() or "zalog pro" in event.text.lower()

        if is_reply_to_me or mentions_me or mentions_platform:
            logging.info(f"💬 Кто-то обратился к Костику в '{event.chat.title}'")
            
            # Собираем контекст (последние 15 сообщений для глубины диалога)
            messages = await client.get_messages(event.chat, limit=15)
            context = ""
            for m in reversed(messages):
                if m.text:
                    author = "Я (Костик)" if m.sender_id == (await client.get_me()).id else f"Юзер_{m.sender_id}"
                    context += f"{author}: {m.text}\n"

            # Просим ИИ ответить на конкретную реплику
            response = await ask_ai(context)

            if response != "SKIP" and len(response) > 2:
                # Небольшая задержка "печатания" для реализма
                async with client.action(event.chat, 'typing'):
                    await asyncio.sleep(len(response) * 0.1) # 0.1 сек на символ
                    await event.reply(response)
                    update_stats(event.chat.title, f"REPLY: {response}")
                    logging.info(f"✅ Костик ответил в диалоге: {response}")

async def search_and_engage():
    logging.info("🔎 Костик выходит на охоту за группами и лидами...")
    keywords = [
        "инвестиции", "залог недвижимость", "деньги под залог", "куда вложить", 
        "частный заем", "взять кредит", "займ онлайн", "кредит наличными", 
        "помощь в кредите", "деньги срочно"
    ]
    
    # Лимит на личные сообщения за один цикл (чтобы не забанили)
    dm_count = 0
    MAX_DM_PER_CYCLE = 3 

    for kw in keywords:
        logging.info(f"Поиск по ключу: {kw}")
        result = await client(functions.contacts.SearchRequest(q=kw, limit=10))
        
        for chat in result.chats:
            try:
                # ПРОВЕРКА КУЛДАУНА ДЛЯ ГРУППЫ
                if not can_interact(chat.id, "group"):
                    logging.info(f"⏳ Костик недавно писал в '{chat.title}', пропускаем.")
                    continue

                if isinstance(chat, types.Channel) and not chat.megagroup: continue
                
                # Вступаем, если не там
                try: await client(functions.channels.JoinChannelRequest(chat))
                except Exception: pass
                
                await asyncio.sleep(5)
                messages = await client.get_messages(chat, limit=20)
                
                # Собираем активных юзеров (кроме себя и ботов)
                active_users = []
                for m in messages:
                    if m.sender_id and not m.sender.bot and m.sender_id != (await client.get_me()).id:
                        active_users.append(m.sender)
                
                # 1. Ответ в группу (Reply)
                context = "\n".join([f"Юзер: {m.text}" for m in messages if m.text])
                response = await ask_ai(context)
                
                if response != "SKIP" and len(response) > 5:
                    try:
                        last_msg = messages[0] if messages else None
                        await asyncio.sleep(10)
                        
                        if last_msg: await last_msg.reply(response)
                        else: await client.send_message(chat, response)
                        
                        update_stats(chat.title, f"GROUP: {response}", target_id=chat.id, target_type="group")
                        logging.info(f"✅ Отписался в группе '{chat.title}'")
                        await asyncio.sleep(600)
                    except Exception as e:
                        logging.warning(f"Ошибка в группе '{chat.title}': {e}")

                # 2. Пишем в личку (Cold DM)
                if dm_count < MAX_DM_PER_CYCLE and active_users:
                    target_user = active_users[0]
                    
                    # ПРОВЕРКА КУЛДАУНА ДЛЯ ЮЗЕРА
                    if not can_interact(target_user.id, "dm"):
                        logging.info(f"⏳ Юзеру {target_user.id} уже писали, пропускаем.")
                        continue

                    dm_prompt = (
                        f"Ты Костик. Напиши ОЧЕНЬ короткое (1-2 предл) и дружеское сообщение в личку человеку, "
                        f"которого ты увидел в чате '{chat.title}'. "
                        f"Скажи, что увидел его там и хочешь поделиться инсайдом про платформу 'Залог Про', которую скоро запустят. "
                        f"Стиль: свой парень, не реклама. Ответ ТОЛЬКО текстом сообщения."
                    )
                    
                    dm_response = await ask_ai(dm_prompt)
                    if dm_response != "SKIP":
                        try:
                            await client.send_message(target_user, dm_response)
                            dm_count += 1
                            update_stats("PRIVATE_DM", f"TO {target_user.id}: {dm_response}", target_id=target_user.id, target_type="dm")
                            logging.info(f"📩 Костик закинул удочку в личку юзеру {target_user.id}")
                            await asyncio.sleep(1200)
                        except Exception as e:
                            logging.warning(f"Не удалось написать в личку: {e}")

            except Exception as e:
                logging.error(f"Error in {getattr(chat, 'title', 'unknown')}: {e}")
        
        await asyncio.sleep(60)

async def send_report_to_owner(force=False):
    """Отправляет отчет владельцу в личку"""
    try:
        with open(STATS_PATH, "r") as f:
            stats = json.load(f)
        
        if stats["total_posts"] == 0 and not force:
            return

        report = f"📊 **Отчет Костика**\nВсего действий: {stats['total_posts']}\n\n"
        if stats["history"]:
            report += "**Последние действия:**\n"
            for h in stats['history'][-5:]:
                report += f"🔹 {h['chat']}: {h['text'][:60]}...\n"
        else:
            report += "_Пока тишина, ищу варианты..._"

        await client.send_message('me', report)
        logging.info("✅ Отчет отправлен в 'Избранное'")
    except Exception as e:
        logging.error(f"Ошибка при отправке отчета: {e}")

async def main():
    await client.start()
    me = await client.get_me()
    logging.info(f"🚀 Костик (UserBot) запущен как {me.first_name}!")
    
    # Отправляем привет в Избранное
    await client.send_message('me', "👋 Костик на связи! Я запустился. Отчеты будут здесь. Чтобы увидеть статистику, напиши /stats")

    while True:
        await search_and_engage()
        await send_report_to_owner(force=True)
        logging.info("💤 Костик ушел на перекур (4 часа)...")
        await asyncio.sleep(4 * 3600)

if __name__ == "__main__":
    client.loop.run_until_complete(main())
