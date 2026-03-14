from fpdf import FPDF
from fpdf.enums import XPos, YPos

class ZalogProPDF(FPDF):
    def header(self):
        if hasattr(self, 'arial_registered'):
            self.set_font("Arial", "B", 16)
            self.cell(0, 10, "ЗАЛОГ.ПРО — Будущее залогового кредитования", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            self.ln(5)

    def chapter_title(self, label):
        self.set_font("Arial", "B", 14)
        self.set_text_color(184, 134, 11) # Gold color
        self.cell(0, 10, label, align="L", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(2)

    def chapter_body(self, body):
        self.set_font("Arial", "", 11)
        self.set_text_color(0, 0, 0)
        self.multi_cell(0, 8, body)
        self.ln(4)

pdf = ZalogProPDF()

# Register Cyrillic font
font_path = "/System/Library/Fonts/Supplemental/Arial.ttf"
pdf.add_font("Arial", "", font_path)
pdf.add_font("Arial", "B", font_path)
pdf.arial_registered = True

pdf.add_page()

# Section 1
pdf.chapter_title("1. Суть проекта")
pdf.chapter_body(
    "ЗАЛОГ.ПРО — это интеллектуальная P2P-платформа (ФЗ-259), которая соединяет инвесторов "
    "и заемщиков через защищенные залоговые сделки с использованием ИИ Gemma 2."
)

# Section 2: Anti-Fraud
pdf.chapter_title("2. Защита от мошенничества (Anti-Fraud)")
pdf.chapter_body(
    "Мы предусмотрели защиту даже на случай взлома аккаунтов Госуслуг (ЕСИА):\n"
    "— Биометрический Liveness Check: Распознавание лица в реальном времени (проверка на дипфейки).\n"
    "— Live-видео объекта: Съемка залога с уникальным одноразовым кодом на экране или бумаге.\n"
    "— Кросс-верификация: Прямая сверка данных ЕСИА с реестром Росреестра в реальном времени.\n"
    "— Регистрация залога: Юридическое обременение фиксируется только на законного собственника."
)

# Section 3: Limits & Markets
pdf.chapter_title("3. Аккредитация и лимиты (ФЗ-259)")
pdf.chapter_body(
    "— Физлица без квалификации: До 600 000 руб./год.\n"
    "— Квалифицированные инвесторы, ИП и ООО: Без ограничений по сумме.\n"
    "— Доходность: 20-30% годовых с ежемесячными выплатами."
)

# Section 4: Economics & Tech
pdf.chapter_title("4. Технологический стек")
pdf.chapter_body(
    "— ИИ-аналитика: Локальная LLM Gemma 2 для скоринга рисков.\n"
    "— Голосовой интерфейс: Управление сайтом через нейронный синтез.\n"
    "— Инфраструктура: Хранение данных в РФ согласно ФЗ-152 (прогноз 2 Тб на 5 лет)."
)

output_path = "/Users/aleksandr/ZALOG_PRO_Presentation_Final.pdf"
pdf.output(output_path)
print(f"Final PDF with Anti-Fraud created at: {output_path}")
