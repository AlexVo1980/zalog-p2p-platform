import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Upload, MessageCircle, Plus, CheckCircle, Clock, X, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import DocumentUpload from '../../components/dashboard/DocumentUpload';
import CollateralCard from '../../components/dashboard/CollateralCard';

const BorrowerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/applications');
      setApplications(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Не удалось загрузить данные о заявках');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'rejected': return 'text-red-500';
      case 'funded': return 'text-blue-500';
      case 'completed': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Личный кабинет заемщика</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="font-semibold">{user?.firstName} {user?.lastName}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</div>
                </div>
              </div>
              <button className="w-full btn-secondary text-sm">Редактировать профиль</button>
            </div>

            <div className="card">
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
                  onClick={() => setActiveTab('collaterals')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'collaterals'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Мои залоги
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
                  onClick={() => setActiveTab('documents')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'documents'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Документы
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'chat'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Чат с оператором
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-bold mb-4">Личные данные</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Имя</label>
                      <input
                        type="text"
                        defaultValue={user?.firstName}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Фамилия</label>
                      <input
                        type="text"
                        defaultValue={user?.lastName}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="input-field"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Телефон</label>
                      <input
                        type="tel"
                        defaultValue={user?.phone}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <button className="btn-primary mt-4">Сохранить изменения</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card">
                    <h3 className="text-lg font-semibold mb-2">Активные залоги</h3>
                    <div className="text-3xl font-bold text-primary-600">
                      {applications.filter(a => ['approved', 'funded'].includes(a.status)).length}
                    </div>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-semibold mb-2">Заявки на рассмотрении</h3>
                    <div className="text-3xl font-bold text-secondary-600">
                      {applications.filter(a => a.status === 'pending').length}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'collaterals' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Мои залоги</h2>
                  <button
                    onClick={() => setShowApplicationForm(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Подать заявку</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {applications.filter(a => ['approved', 'funded'].includes(a.status)).map((app) => (
                    <CollateralCard key={app._id} collateral={{
                      id: app._id,
                      type: app.type === 'real_estate' ? 'Недвижимость' : (app.type === 'car' ? 'Автомобиль' : 'Оборудование'),
                      address: app.region,
                      amount: app.amount,
                      status: app.status,
                      approvalProbability: app.approvalProbability,
                    }} />
                  ))}
                  {applications.filter(a => ['approved', 'funded'].includes(a.status)).length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      У вас пока нет активных залогов.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">История заявок</h2>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app._id} className="card">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-lg">
                            Заявка #{app._id.slice(-6).toUpperCase()} - {app.amount.toLocaleString('ru-RU')} ₽
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {new Date(app.createdAt).toLocaleDateString('ru-RU')}
                          </div>
                          <div className="text-sm mt-2">
                            <b>Тип:</b> {app.type === 'real_estate' ? 'Недвижимость' : 'Авто/Оборудование'} | <b>Регион:</b> {app.region}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`capitalize font-medium ${getStatusColor(app.status)}`}>
                            {app.status === 'pending' ? 'На рассмотрении' : 
                             app.status === 'approved' ? 'Одобрено' :
                             app.status === 'rejected' ? 'Отклонено' :
                             app.status === 'funded' ? 'Выплачено' : app.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      Вы еще не подавали заявок.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Документы</h2>
                <DocumentUpload />
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">Чат с оператором</h2>
                <div className="border rounded-lg p-4 h-96 bg-gray-50 dark:bg-gray-800 mb-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <div className="bg-primary-500 text-white rounded-lg p-3 max-w-xs">
                        Здравствуйте, у меня вопрос по заявке
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                        Здравствуйте! Чем могу помочь?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Введите сообщение..."
                    className="input-field flex-1"
                  />
                  <button className="btn-primary">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerDashboard;

