import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, Phone, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('borrower');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const userData = {
      ...data,
      role: selectedRole,
    };
    
    const result = await registerUser(userData);
    setLoading(false);
    
    if (result.success) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const roleMap = {
          borrower: '/dashboard/borrower',
          investor: '/dashboard/investor',
          broker: '/dashboard/broker',
          admin: '/dashboard/admin',
        };
        navigate(roleMap[user.role] || '/');
      } else {
        navigate('/');
      }
    }
  };

  const roles = [
    { value: 'borrower', label: 'Заемщик', description: 'Нужен займ под залог' },
    { value: 'investor', label: 'Инвестор', description: 'Хочу инвестировать' },
    { value: 'broker', label: 'Брокер', description: 'Привлекаю клиентов' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gradient mb-2">Регистрация</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Создайте аккаунт для начала работы
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4">
              Выберите роль
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedRole === role.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                  }`}
                >
                  <div className="font-semibold mb-1">{role.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {role.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Имя
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('firstName', { required: 'Имя обязательно' })}
                    className="input-field pl-10"
                    placeholder="Иван"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Фамилия
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('lastName', { required: 'Фамилия обязательна' })}
                    className="input-field pl-10"
                    placeholder="Иванов"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email обязателен',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Неверный формат email',
                    },
                  })}
                  className="input-field pl-10"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Телефон
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Телефон обязателен',
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: 'Неверный формат телефона',
                    },
                  })}
                  className="input-field pl-10"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  {...register('password', {
                    required: 'Пароль обязателен',
                    minLength: {
                      value: 6,
                      message: 'Пароль должен быть не менее 6 символов',
                    },
                  })}
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
                  <span>Регистрация...</span>
                </>
              ) : (
                <>
                  <span>Зарегистрироваться</span>
                  <UserPlus className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

