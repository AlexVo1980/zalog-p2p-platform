import requests
import sys
import json
import os

def generate_steos_speech(text, output_file, api_key):
    # Прямой эндпоинт CyberVoice (старое название SteosVoice, которое часто работает стабильнее)
    url = "https://api.cybervoice.io/v1/predict"
    
    headers = {
        "X-API-KEY": api_key,
        "Content-Type": "application/json"
    }
    
    payload = {
        "voice_id": "52",
        "text": text,
        "format": "mp3"
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=20)
        
        if response.status_code == 200:
            data = response.json()
            audio_url = data.get("audio_url")
            
            if audio_url:
                audio_response = requests.get(audio_url)
                with open(output_file, 'wb') as f:
                    f.write(audio_response.content)
                return True
        
        # Если не сработало, попробуем еще один вариант (старый API)
        url_legacy = "https://api.steos.io/v1/get/tts"
        headers_legacy = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
        response = requests.post(url_legacy, headers=headers_legacy, json=payload, timeout=20)
        
        if response.status_code == 200:
            with open(output_file, 'wb') as f:
                f.write(response.content)
            return True
            
        print(f"Final Error: {response.status_code} - {response.text}", file=sys.stderr)
        return False
            
    except Exception as e:
        print(f"Final Exception: {e}", file=sys.stderr)
        return False

if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(1)
    text = sys.argv[1]
    output_file = sys.argv[2]
    api_key = "c87fcfa2-40da-4008-9247-a4b3bef1f63c"
    if generate_steos_speech(text, output_file, api_key):
        sys.exit(0)
    else:
        sys.exit(1)
