import React from 'react';
import { Shield, TrendingUp, Clock, Users, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gradient">О платформе ZalogInvest</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Современная P2P платформа для займов под залог имущества, объединяющая заемщиков,
            инвесторов и брокеров в единой экосистеме.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="card">
            <Shield className="w-12 h-12 text-primary-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Безопасность</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Все сделки защищены юридически. Мы используем современные технологии шифрования
              и двухфакторную аутентификацию для защиты ваших данных.
            </p>
          </div>

          <div className="card">
            <TrendingUp className="w-12 h-12 text-secondary-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Доходность</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Инвесторы получают доходность до 36% годовых. Все займы обеспечены залогом,
              что минимизирует риски.
            </p>
          </div>

          <div className="card">
            <Clock className="w-12 h-12 text-primary-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Скорость</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Одобрение заявки в течение 24 часов. Быстрое получение средств на счет
              после одобрения.
            </p>
          </div>

          <div className="card">
            <Users className="w-12 h-12 text-secondary-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Поддержка</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Круглосуточная поддержка клиентов. Юридическая консультация и помощь
              на всех этапах сделки.
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-3xl font-bold mb-6">Как это работает</h2>
          <div className="space-y-4">
            {[
              'Заемщик размещает заявку с описанием залога',
              'Платформа проводит оценку и проверку',
              'Инвесторы видят заявку и могут инвестировать',
              'Средства переводятся заемщику',
              'Заемщик возвращает средства с процентами',
              'Инвесторы получают доход',
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <p className="text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

