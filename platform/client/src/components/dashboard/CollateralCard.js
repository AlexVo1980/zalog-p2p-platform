import React from 'react';
import { motion } from 'framer-motion';
import { Home, Car, Settings, MapPin } from 'lucide-react';

const CollateralCard = ({ collateral }) => {
  const getIcon = () => {
    switch (collateral.type) {
      case 'Недвижимость':
        return <Home className="w-6 h-6" />;
      case 'Автомобиль':
        return <Car className="w-6 h-6" />;
      case 'Оборудование':
        return <Settings className="w-6 h-6" />;
      default:
        return <Home className="w-6 h-6" />;
    }
  };

  const getStatusColor = () => {
    switch (collateral.status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {getIcon()}
                <h3 className="text-xl font-semibold">{collateral.type}</h3>
              </div>
              {collateral.address && (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{collateral.address}</span>
                </div>
              )}
              {collateral.model && (
                <div className="text-gray-600 dark:text-gray-400">{collateral.model}</div>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor()}`}>
              {collateral.status === 'approved' ? 'Одобрено' : 
               collateral.status === 'pending' ? 'На рассмотрении' : 'Отклонено'}
            </span>
          </div>

          <div className="mb-4">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {collateral.amount.toLocaleString('ru-RU')} ₽
            </div>
            {collateral.approvalProbability && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Вероятность одобрения</span>
                  <span>{collateral.approvalProbability}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all"
                    style={{ width: `${collateral.approvalProbability}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <button className="btn-primary flex-1">Подробнее</button>
            <button className="btn-secondary">Редактировать</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollateralCard;

