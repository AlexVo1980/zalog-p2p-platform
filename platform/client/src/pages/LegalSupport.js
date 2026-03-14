import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FileText, Phone, Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const LegalSupport = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    // Здесь будет отправка на сервер
    setTimeout(() => {
      toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      reset();
      setLoading(false);
    }, 1000);
  };

  const services = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Проверка договоров',
      description: 'Юридическая экспертиза договоров займа и залога',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Проверка залога',
      description: 'Проверка правового статуса залогового имущества',
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Консультация',
      description: 'Консультации по вопросам залоговых сделок',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gradient">Юридическая поддержка</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Получите профессиональную юридическую помощь на всех этапах сделки
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="card text-center">
              <div className="flex justify-center mb-4 text-primary-600 dark:text-primary-400">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Оставить заявку</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Тип услуги</label>
                <select
                  {...register('serviceType', { required: 'Выберите тип услуги' })}
                  className="input-field"
                >
                  <option value="">Выберите услугу</option>
                  <option value="contract">Проверка договоров</option>
                  <option value="collateral">Проверка залога</option>
                  <option value="consultation">Консультация</option>
                </select>
                {errors.serviceType && (
                  <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ваше имя</label>
                <input
                  type="text"
                  {...register('name', { required: 'Имя обязательно' })}
                  className="input-field"
                  placeholder="Иван Иванов"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email обязателен',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Неверный формат email',
                    },
                  })}
                  className="input-field"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Телефон обязателен' })}
                  className="input-field"
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Описание</label>
                <textarea
                  {...register('description', { required: 'Опишите ваш запрос' })}
                  className="input-field"
                  rows="5"
                  placeholder="Опишите ваш запрос..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>Отправка...</span>
                  </>
                ) : (
                  <>
                    <span>Отправить заявку</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalSupport;

