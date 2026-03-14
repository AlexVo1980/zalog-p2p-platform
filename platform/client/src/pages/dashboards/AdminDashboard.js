import React, { useState } from 'react';
import { Settings, Users, FileText, DollarSign, CheckCircle, Clock, X, Edit } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [commissionRate, setCommissionRate] = useState(2.5);

  const applications = [
    {
      id: 1,
      borrower: 'Иван Иванов',
      type: 'Недвижимость',
      amount: 5000000,
      status: 'pending',
      broker: 'Петр Петров',
      date: new Date('2024-01-15'),
    },
    {
      id: 2,
      borrower: 'Сергей Сергеев',
      type: 'Автомобиль',
      amount: 2000000,
      status: 'approved',
      broker: 'Анна Иванова',
      date: new Date('2024-01-20'),
    },
  ];

  const brokers = [
    { id: 1, name: 'Петр Петров', applications: 10, commission: 250000 },
    { id: 2, name: 'Анна Иванова', applications: 8, commission: 200000 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Админ-панель</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="font-semibold mb-4">Навигация</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'applications'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Заявки
                </button>
                <button
                  onClick={() => setActiveTab('brokers')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'brokers'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Брокеры
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Настройки
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'applications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Управление заявками</h2>
                <div className="card">
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-lg mb-1">
                              Заявка #{app.id} - {app.borrower}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                              {app.type} • {app.amount.toLocaleString('ru-RU')} ₽
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Брокер: {app.broker} • {app.date.toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(app.status)}
                            <span className="font-semibold capitalize">{app.status}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <button className="btn-primary text-sm">Одобрить</button>
                          <button className="btn-secondary text-sm">Отклонить</button>
                          <button className="btn-secondary text-sm">Подробнее</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'brokers' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Управление брокерами</h2>
                <div className="card">
                  <div className="space-y-4">
                    {brokers.map((broker) => (
                      <div
                        key={broker.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-lg mb-1">{broker.name}</div>
                            <div className="text-gray-600 dark:text-gray-400">
                              Заявок: {broker.applications} • Вознаграждение:{' '}
                              {broker.commission.toLocaleString('ru-RU')} ₽
                            </div>
                          </div>
                          <button className="btn-secondary text-sm flex items-center space-x-2">
                            <Edit className="w-4 h-4" />
                            <span>Изменить %</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Настройки</h2>
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Процент вознаграждения брокерам</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
                      step="0.1"
                      min="0"
                      max="10"
                      className="input-field w-32"
                    />
                    <span className="text-lg">%</span>
                    <button className="btn-primary">Сохранить</button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Текущий процент применяется ко всем новым заявкам
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

