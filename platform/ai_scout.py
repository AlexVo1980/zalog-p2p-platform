import requests
import feedparser
import time
import os
import sys
from train_brain import train_on_text

# Расширенный список источников
SOURCES = [
    {"name": "РБК Недвижимость", "url": "https://rssexport.rbc.ru/rbcnews/realty/30/full.rss"},
    {"name": "Коммерсант Финансы", "url": "https://www.kommersant.ru/RSS/finance.xml"},
    {"name": "Банки.ру Новости", "url": "https://www.banki.ru/xml/news.rss"},
    {"name": "Ведомости Недвижимость", "url": "https://www.vedomosti.ru/rss/realty"}
]

def scout_news():
    print("🛰️ AI Scout Bot: Глубокое сканирование рынка...")
    found_important = 0
    
    for source in SOURCES:
        try:
            print(f"📡 Анализ {source['name']}...")
            feed = feedparser.parse(source['url'])
            
            # Проверяем топ-10 новостей
            for entry in feed.entries[:10]:
                title = entry.title
                summary = entry.description if 'description' in entry else ""
                full_text = f"{title}. {summary}"
                
                # Более широкий список триггеров
                keywords = ["залог", "кредит", "недвижимость", "ЦБ", "ставка", "инвестиции", "финтех", "МСБ", "ипотека", "жилье", "дом", "рынок", "банки"]
                if any(kw.lower() in full_text.lower() for kw in keywords):
                    print(f"🔥 Найдено: {title}")
                    train_on_text(full_text, source=f"Scout: {source['name']}")
                    found_important += 1
                    time.sleep(3) # Пауза между запросами
                    
        except Exception as e:
            print(f"❌ Ошибка в {source['name']}: {e}")

    if found_important == 0:
        print("📭 Важных отраслевых новостей за последние часы не найдено. Жду следующего цикла.")
    else:
        print(f"✅ Сканирование окончено. Обработано новостей: {found_important}")

if __name__ == "__main__":
    scout_news()
