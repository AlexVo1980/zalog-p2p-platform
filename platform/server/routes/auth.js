const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Секрет для JWT (берется из .env)
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

/**
 * @route   POST /api/auth/register
 * @desc    Регистрация нового пользователя (Инвестор / Заемщик)
 */
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    // 1. Проверка: существует ли пользователь с таким email?
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // 2. Создание нового пользователя
    user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      role // 'borrower', 'investor' или 'broker'
    });

    await user.save();

    // 3. Создание JWT токена
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка на сервере при регистрации' });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Вход пользователя и получение токена
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Поиск пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // 2. Сравнение пароля (метод comparePassword уже есть в модели User)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // 3. Генерация токена
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка на сервере при входе' });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Получение данных текущего пользователя по токену
 */
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Токен не валиден' });
  }
});

module.exports = router;
