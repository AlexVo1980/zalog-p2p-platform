import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Home, Car, Settings, Heart, Phone, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const LoanApplicationCard = ({ application, onInterest }) => {
  const [interested, setInterested] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAnalyze = async () => {
    setIsAiLoading(true);
    setShowAiModal(true);
    try {
      const response = await axios.post(`/api/applications/${application._id}/analyze`);
      setAiResult(response.data.analysis);
      toast.success('AI-анализ успешно завершен');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Ошибка AI-анализа');
      setShowAiModal(false);
    } finally {
      setIsAiLoading(false);
    }
  };

  const getTypeIcon = () => {
    switch (application.type) {
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

  const handleInterest = () => {
    setInterested(true);
    setShowContactModal(true);
    onInterest?.();
    toast.success('Запрос на контакты отправлен оператору');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            {getTypeIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  {getTypeIcon()}
                  <h3 className="text-xl font-semibold">{application.type}</h3>
                </div>
                {application.address && (
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{application.address}</span>
                  </div>
                )}
                {application.model && (
                  <div className="text-gray-600 dark:text-gray-400">{application.model}</div>
                )}
                {application.description && (
                  <div className="text-gray-600 dark:text-gray-400">{application.description}</div>
                )}
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{application.region}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Сумма займа</div>
                <div className="text-xl font-bold text-primary-600">
                  {application.amount.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">LTV</div>
                <div className="text-xl font-bold">{application.ltv}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ставка</div>
                <div className="text-xl font-bold text-secondary-600">{application.rate}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Срок</div>
                <div className="text-xl font-bold">{application.term} мес.</div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleInterest}
                className={`btn-primary flex-1 flex items-center justify-center space-x-2 ${
                  interested ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={interested}
              >
                <Heart className={`w-5 h-5 ${interested ? 'fill-current' : ''}`} />
                <span>{interested ? 'Запрос отправлен' : 'Заинтересован'}</span>
              </button>
              
              <button
                onClick={handleAiAnalyze}
                className="btn-secondary flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 border-none px-4"
              >
                <Sparkles className="w-5 h-5" />
                <span>AI-Анализ</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Analysis Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-auto shadow-2xl overflow-y-auto max-h-[90vh] relative border border-purple-500/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold">AI Кредитный Анализ (Gemma 2)</h3>
            </div>

            {isAiLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                <p className="text-gray-500 animate-pulse">ИИ изучает документы и оценивает риски...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                    {aiResult}
                  </pre>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setShowAiModal(false)}
                    className="btn-primary bg-purple-600 hover:bg-purple-700 border-none px-8"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Запрос контактов</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ваш запрос на получение контактов заемщика отправлен оператору.
              Мы свяжемся с вами в ближайшее время.
            </p>
            <button
              onClick={() => setShowContactModal(false)}
              className="btn-primary w-full"
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoanApplicationCard;

