import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Filter, Search, MapPin, Home, Car, Settings, Heart } from 'lucide-react';
import LoanApplicationCard from '../../components/dashboard/LoanApplicationCard';

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [filters, setFilters] = useState({
    region: '',
    type: '',
    minAmount: '',
    maxAmount: '',
  });

  // Mock data
  const portfolioStats = {
    balance: 10000000,
    totalInvested: 5000000,
    totalReturn: 600000,
    activeLoans: 5,
    averageYield: 18.5,
  };

  const loanApplications = [
    {
      id: 1,
      type: 'Недвижимость',
      address: 'Москва, ул. Тверская, д. 15',
      amount: 5000000,
      ltv: 70,
      rate: 20,
      term: 12,
      region: 'Москва',
      image: '/images/loan1.jpg',
    },
    {
      id: 2,
      type: 'Автомобиль',
      model: 'Mercedes-Benz S-Class 2022',
      amount: 3000000,
      ltv: 60,
      rate: 18,
      term: 6,
      region: 'Санкт-Петербург',
      image: '/images/loan2.jpg',
    },
    {
      id: 3,
      type: 'Оборудование',
      description: 'Производственное оборудование',
      amount: 2000000,
      ltv: 65,
      rate: 19,
      term: 9,
      region: 'Москва',
      image: '/images/loan3.jpg',
    },
  ];

  const activeLoans = [
    {
      id: 1,
      type: 'Недвижимость',
      amount: 5000000,
      invested: 2500000,
      return: 250000,
      term: 12,
      monthsLeft: 8,
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Недвижимость':
        return <Home className="w-5 h-5" />;
      case 'Автомобиль':
        return <Car className="w-5 h-5" />;
      case 'Оборудование':
        return <Settings className="w-5 h-5" />;
      default:
        return <Home className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Личный кабинет инвестора</h1>

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
                  onClick={() => setActiveTab('feed')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'feed'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Лента заявок
                </button>
                <button
                  onClick={() => setActiveTab('active')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'active'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Активные займы
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      {portfolioStats.balance.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Баланс</div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 text-secondary-600" />
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      {portfolioStats.totalInvested.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Инвестировано</div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      {portfolioStats.totalReturn.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Доход</div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold mb-1">{portfolioStats.averageYield}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Средняя доходность</div>
                  </div>
                </div>

                <div className="card">
                  <h2 className="text-2xl font-bold mb-4">Профиль инвестора</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Баланс портфеля</label>
                      <div className="text-3xl font-bold text-primary-600">
                        {portfolioStats.balance.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Активных займов</label>
                      <div className="text-2xl font-bold">{portfolioStats.activeLoans}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'feed' && (
              <div className="space-y-6">
                <div className="card">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Поиск..."
                        className="input-field pl-10"
                      />
                    </div>
                    <button className="btn-secondary flex items-center space-x-2">
                      <Filter className="w-5 h-5" />
                      <span>Фильтры</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={filters.region}
                      onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Все регионы</option>
                      <option value="moscow">Москва</option>
                      <option value="spb">Санкт-Петербург</option>
                      <option value="regions">Регионы</option>
                    </select>

                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Все типы залога</option>
                      <option value="real_estate">Недвижимость</option>
                      <option value="car">Автомобиль</option>
                      <option value="equipment">Оборудование</option>
                    </select>

                    <input
                      type="number"
                      placeholder="Мин. сумма"
                      value={filters.minAmount}
                      onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                      className="input-field"
                    />

                    <input
                      type="number"
                      placeholder="Макс. сумма"
                      value={filters.maxAmount}
                      onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Новые заявки</h2>
                  {loanApplications.map((application) => (
                    <LoanApplicationCard
                      key={application.id}
                      application={application}
                      onInterest={() => console.log('Interested in', application.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'active' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Активные займы</h2>
                <div className="space-y-4">
                  {activeLoans.map((loan) => (
                    <div key={loan.id} className="card">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Займ #{loan.id} - {loan.type}
                          </h3>
                          <div className="text-gray-600 dark:text-gray-400">
                            Инвестировано: {loan.invested.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            +{loan.return.toLocaleString('ru-RU')} ₽
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Доход
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Срок: {loan.term} месяцев
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Осталось: {loan.monthsLeft} месяцев
                          </div>
                        </div>
                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${((loan.term - loan.monthsLeft) / loan.term) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;

