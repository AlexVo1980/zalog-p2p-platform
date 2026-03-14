import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Clock, Users, ArrowRight, Play } from 'lucide-react';
import HeroVideo from '../components/common/HeroVideo';
import NewsFeed from '../components/common/NewsFeed';
import StatsSection from '../components/common/StatsSection';

const Home = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Быстрые займы',
      description: 'Одобрение заявки в течение 24 часов',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Доходность до 48%',
      description: 'Высокая доходность для инвесторов',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Юридическая защита',
      description: 'Полная правовая поддержка сделок',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Надежная платформа',
      description: 'Более 1000 успешных сделок',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                Займы под залог имущества
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Быстрое получение займа под залог недвижимости, авто или оборудования.
                Инвестируйте с доходностью до 36% годовых.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn-primary flex items-center space-x-2">
                  <span>Стать инвестором</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/register" className="btn-secondary flex items-center space-x-2">
                  <span>Взять займ</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/register" className="btn-secondary flex items-center space-x-2">
                  <span>Для брокеров</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <HeroVideo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
            Преимущества платформы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4 text-primary-600 dark:text-primary-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Feed */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
            Новости и обновления
          </h2>
          <NewsFeed limit={6} />
        </div>
      </section>
    </div>
  );
};

export default Home;

