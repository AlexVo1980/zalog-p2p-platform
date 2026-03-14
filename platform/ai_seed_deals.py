import requests
import json
import random
import os
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
OLLAMA_URL = "http://localhost:11434/api/generate"
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/zaloginvest")

# Расширенная база уникальных фото
REAL_ESTATE_IMAGES = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80"
]

def generate_deal_with_ai():
    prompt = """
    Сгенерируй реалистичный объект недвижимости в РФ (Москва/СПБ). 
    Верни JSON: title, region, description, amount (3-50 млн), collateral_value, rate (22-32), term (12-60), probability.
    """
    try:
        response = requests.post(OLLAMA_URL, json={
            "model": "gemma2:9b",
            "prompt": prompt,
            "stream": False,
            "format": "json"
        }, timeout=45)
        return json.loads(response.json()['response'])
    except: return None

def seed_database():
    client = MongoClient(MONGO_URI)
    db = client.get_database()
    
    # Перемешиваем список фото для уникальности
    available_images = REAL_ESTATE_IMAGES.copy()
    random.shuffle(available_images)

    test_user = db.users.find_one({"email": "test_borrower@zalog.pro"})
    user_id = test_user["_id"] if test_user else db.users.insert_one({"name": "Александр (Тест)", "email": "test_borrower@zalog.pro", "role": "borrower"}).inserted_id

    for i in range(min(len(available_images), 6)):
        deal = generate_deal_with_ai()
        if deal:
            img = available_images.pop() # Берем уникальное фото
            db.applications.insert_one({
                "borrower": user_id,
                "type": "real_estate",
                "amount": deal.get('amount', 5000000),
                "ltv": 60,
                "rate": deal.get('rate', 24),
                "term": deal.get('term', 24),
                "status": "pending",
                "description": f"**{deal.get('title')}**\n\n{deal.get('description')}\n\nРыночная стоимость: {deal.get('collateral_value'):,.0f} руб.",
                "region": deal.get('region', 'Москва'),
                "approvalProbability": deal.get('probability', 85),
                "documents": [img],
                "createdAt": datetime.now(),
                "updatedAt": datetime.now()
            })
            print(f"✅ Добавлен уникальный лот: {deal.get('title')}")

if __name__ == "__main__":
    seed_database()
