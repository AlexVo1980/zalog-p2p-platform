import edge_tts
import asyncio
import sys
import os

async def generate_speech(text, output_file):
    # Используем проверенный мужской голос Dmitry. 
    # Если он недоступен, попробуем альтернативный.
    voice = "ru-RU-DmitryNeural"
    
    try:
        # Ускоряем синтез (rate +10%), это уберет эффект "задумчивости"
        communicate = edge_tts.Communicate(text, voice, rate="+10%")
        await communicate.save(output_file)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(1)
        
    text = sys.argv[1]
    output_file = sys.argv[2]
    
    asyncio.run(generate_speech(text, output_file))
