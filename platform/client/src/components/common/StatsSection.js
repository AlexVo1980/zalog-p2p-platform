import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Home, Users, DollarSign } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { icon: <Home className="w-8 h-8" />, value: '1000+', label: 'Залогов размещено' },
    { icon: <DollarSign className="w-8 h-8" />, value: '500M ₽', label: 'Выдано займов' },
    { icon: <Users className="w-8 h-8" />, value: '5000+', label: 'Активных пользователей' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '20%', label: 'Средняя доходность' },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

