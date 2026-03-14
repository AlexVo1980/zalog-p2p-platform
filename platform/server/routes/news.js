const express = require('express');

const router = express.Router();

// Mock news data
const news = [
  {
    id: 1,
    title: 'Новые возможности для инвесторов',
    excerpt: 'Расширены возможности инвестирования в займы под залог недвижимости...',
    date: new Date('2024-01-15'),
    category: 'Обновления',
  },
  {
    id: 2,
    title: 'Кейс: успешная сделка на 50 млн рублей',
    excerpt: 'Завершена крупная сделка по займу под залог коммерческой недвижимости...',
    date: new Date('2024-01-10'),
    category: 'Кейсы',
  },
];

// Get all news
router.get('/', (req, res) => {
  res.json(news);
});

module.exports = router;

