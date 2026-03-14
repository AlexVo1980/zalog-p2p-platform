import requests
import json
import os
import sys
from datetime import datetime

OLLAMA_URL = "http://localhost:11434/api/generate"
KNOWLEDGE_FILE = os.path.join(os.path.dirname(__file__), "server", "knowledge.json")
HISTORY_FILE = os.path.join(os.path.dirname(__file__), "ai_training_history.json")

def load_json(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_json(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def train_on_text(input_text, source="Manual Input"):
    print(f"🧠 ИИ анализирует информацию из источника: {source}...")
    
    prompt = f"""
    Ты — аналитический мозг ЗАЛОГ.ПРО. Проанализируй текст и выдели 1-2 ключевых вывода для бизнеса.
    
    ТЕКСТ: "{input_text}"
    
    Верни JSON объект со списком фактов: {{"facts": ["Факт 1", "Факт 2"]}}
    """

    try:
        response = requests.post(OLLAMA_URL, json={
            "model": "gemma2:9b",
            "prompt": prompt,
            "stream": False,
            "format": "json"
        })
        
        if response.status_code == 200:
            ai_response = json.loads(response.json()['response'])
            new_facts = ai_response.get("facts", [])
            
            # Обновляем базу знаний
            knowledge = load_json(KNOWLEDGE_FILE)
            added_any = False
            for fact in new_facts:
                if fact not in knowledge:
                    knowledge.append(fact)
                    added_any = True
            if added_any:
                save_json(KNOWLEDGE_FILE, knowledge)

            # Записываем в историю обучения (Журнал знаний)
            history = load_json(HISTORY_FILE)
            history.append({
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "source": source,
                "input_text": input_text,
                "extracted_facts": new_facts
            })
            save_json(HISTORY_FILE, history)
            
            print(f"✅ Обучение успешно. Извлечено фактов: {len(new_facts)}")
            for f in new_facts: print(f" - {f}")
            
        else:
            print(f"❌ Ошибка Ollama: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Ошибка: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        train_on_text(" ".join(sys.argv[1:]))
    else:
        print("📥 Введите текст для обучения:")
        text = sys.stdin.read()
        if text.strip():
            train_on_text(text)
