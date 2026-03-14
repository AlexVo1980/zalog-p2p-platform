import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, FileText, Plus, CheckCircle, Clock, X } from 'lucide-react';
import CollateralForm from '../../components/dashboard/CollateralForm';

const BrokerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showForm, setShowForm] = useState(false);

  // Mock data
  const stats = {
    totalApplications: 25,
    approved: 15,
    pending: 7,
    rejected: 3,
    totalCommission: 1250000,
    commissionRate: 2.5,
  };

  const applications = [
    {
      id: 1,
      borrower: 'Иван Иванов',
      type: 'Недвижимость',
      amount: 5000000,
      status: 'approved',
      commission: 125000,
      date: new Date('2024-01-15'),
    },
    {
      id: 2,
      borrower: 'Петр Петров',
      type: 'Автомобиль',
      amount: 2000000,
      status: 'pending',
      commission: 50000,
      date: new Date('2024-01-20'),
    },
    {
      id: 3,
      borrower: 'Сергей Сергеев',
      type: 'Оборудование',
      amount: 3000000,
      status: 'rejected',
      commission: 0,
      date: new Date('2024-01-10'),
    },
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

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Одобрено';
      case 'pending':
        return 'На рассмотрении';
      case 'rejected':
        return 'Отклонено';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Личный кабинет брокера</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <h3 className="font-semibold mb-4">Навигация</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Дашборд
                </button>
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
                  onClick={() => setActiveTab('statistics')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'statistics'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Статистика
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="card">
                    <FileText className="w-8 h-8 text-primary-600 mb-2" />
                    <div className="text-2xl font-bold mb-1">{stats.totalApplications}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Всего заявок</div>
                  </div>

                  <div className="card">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                    <div className="text-2xl font-bold mb-1">{stats.approved}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Одобрено</div>
                  </div>

                  <div className="card">
                    <Clock className="w-8 h-8 text-yellow-600 mb-2" />
                    <div className="text-2xl font-bold mb-1">{stats.pending}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">На рассмотрении</div>
                  </div>

                  <div className="card">
                    <DollarSign className="w-8 h-8 text-secondary-600 mb-2" />
                    <div className="text-2xl font-bold mb-1">
                      {stats.totalCommission.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Вознаграждение</div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Статистика</h2>
                    <button
                      onClick={() => setShowForm(true)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Разместить заявку</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Процент вознаграждения</span>
                        <span className="font-semibold">{stats.commissionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${stats.commissionRate * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Размещенные заявки</h2>
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Новая заявка</span>
                  </button>
                </div>

                <div className="card">
                  <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <select className="input-field flex-1">
                      <option value="">Все статусы</option>
                      <option value="approved">Одобрено</option>
                      <option value="pending">На рассмотрении</option>
                      <option value="rejected">Отклонено</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-lg mb-1">
                              Заявка #{app.id} - {app.borrower}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                              {app.type} • {app.amount.toLocaleString('ru-RU')} ₽
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {app.date.toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(app.status)}
                            <span className="font-semibold">{getStatusText(app.status)}</span>
                          </div>
                        </div>
                        {app.commission > 0 && (
                          <div className="text-sm text-secondary-600 dark:text-secondary-400">
                            Вознаграждение: {app.commission.toLocaleString('ru-RU')} ₽
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'statistics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Статистика</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card">
                    <h3 className="text-lg font-semibold mb-4">Общая статистика</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Всего заявок</span>
                        <span className="font-semibold">{stats.totalApplications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Одобрено</span>
                        <span className="font-semibold text-green-600">{stats.approved}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>На рассмотрении</span>
                        <span className="font-semibold text-yellow-600">{stats.pending}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Отклонено</span>
                        <span className="font-semibold text-red-600">{stats.rejected}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="text-lg font-semibold mb-4">Вознаграждения</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Общая сумма</span>
                        <span className="font-semibold text-secondary-600">
                          {stats.totalCommission.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Процент</span>
                        <span className="font-semibold">{stats.commissionRate}%</span>
                      </div>
                      <button className="btn-primary w-full mt-4">Вывести средства</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <CollateralForm
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            console.log('Submit:', data);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default BrokerDashboard;

