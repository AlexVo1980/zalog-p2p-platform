import ollama
import sys
import json

def ensure_model(model_name):
    """Проверяет наличие модели и скачивает ее при необходимости."""
    try:
        models = ollama.list()
        # Проверяем, есть ли модель в списке
        model_exists = False
        for m in models.get('models', []):
            if m.get('name') and m['name'].startswith(model_name):
                model_exists = True
                break
        
        if model_exists:
            return True
            
        print(f"Модель {model_name} не найдена. Начинаю загрузку (5.4 Гб)...", file=sys.stderr)
        ollama.pull(model_name)
        return True
    except Exception as e:
        print(f"Ошибка проверки/загрузки модели: {e}", file=sys.stderr)
        return False

def analyze_loan(loan_data):
    model = 'gemma2:9b'
    if not ensure_model(model):
        return "Ошибка: Не удалось подготовить модель ИИ."

    prompt = f"""
    Ты — экспертный кредитный аналитик платформы ЗАЛОГ.ПРО. 
    Твоя задача: оценить риски по залоговой сделке и дать профессиональное заключение.

    ДАННЫЕ ЗАЯВКИ:
    - Сумма займа: {loan_data.get('amount')} руб.
    - Объект залога: {loan_data.get('collateral_type')} ({loan_data.get('collateral_description')})
    - Оценочная стоимость залога: {loan_data.get('collateral_value')} руб.
    - Срок займа: {loan_data.get('term_months')} мес.
    - Доход заемщика (в мес): {loan_data.get('income')} руб.
    
    ТРЕБУЕМЫЙ АНАЛИЗ (ответь на русском языке):
    1. Рассчитай LTV (отношение займа к стоимости залога) в процентах.
    2. Оцени ликвидность объекта залога (Низкая/Средняя/Высокая) и почему.
    3. Оцени риск дефолта (Низкий/Средний/Высокий).
    4. Итоговая рекомендация (Одобрить/Отказать/Снизить сумму) и почему.
    """

    try:
        response = ollama.chat(model=model, messages=[{'role': 'user', 'content': prompt}])
        return response['message']['content']
    except Exception as e:
        return f"Ошибка при обращении к Ollama: {str(e)}"

if __name__ == "__main__":
    # Если переданы аргументы, используем их как JSON данные заявки
    if len(sys.argv) > 1:
        try:
            loan_data = json.loads(sys.argv[1])
        except Exception as e:
            print(f"Ошибка парсинга JSON: {e}", file=sys.stderr)
            sys.exit(1)
    else:
        # Тестовые данные по умолчанию
        loan_data = {
            "amount": 2500000,
            "collateral_type": "Квартира",
            "collateral_description": "2-к квартира в спальном районе Москвы, 54 кв.м.",
            "collateral_value": 12000000,
            "term_months": 12,
            "income": 150000
        }
    
    print(analyze_loan(loan_data))
