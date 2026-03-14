import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const NewsFeed = ({ limit = 10 }) => {
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
    {
      id: 3,
      title: 'Изменения в законодательстве',
      excerpt: 'Обзор новых нормативных актов, влияющих на рынок залоговых займов...',
      date: new Date('2024-01-05'),
      category: 'Новости рынка',
    },
    {
      id: 4,
      title: 'Партнерство с ведущими банками',
      excerpt: 'Заключены соглашения о сотрудничестве с крупнейшими финансовыми институтами...',
      date: new Date('2024-01-01'),
      category: 'Партнерства',
    },
    {
      id: 5,
      title: 'Улучшения в мобильном приложении',
      excerpt: 'Выпущена новая версия мобильного приложения с улучшенным интерфейсом...',
      date: new Date('2023-12-28'),
      category: 'Обновления',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.slice(0, limit).map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="card hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
              {item.category}
            </span>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{format(item.date, 'd MMM yyyy')}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{item.excerpt}</p>
          <button className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
            <span>Читать далее</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default NewsFeed;

