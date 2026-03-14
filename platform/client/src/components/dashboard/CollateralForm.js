import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const CollateralForm = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [files, setFiles] = useState([]);

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, files });
    toast.success('Заявка размещена');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Разместить заявку</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Тип залога</label>
            <select
              {...register('type', { required: 'Выберите тип залога' })}
              className="input-field"
            >
              <option value="">Выберите тип</option>
              <option value="real_estate">Недвижимость</option>
              <option value="car">Автомобиль</option>
              <option value="equipment">Оборудование</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Имя заемщика</label>
              <input
                type="text"
                {...register('borrowerFirstName', { required: 'Имя обязательно' })}
                className="input-field"
                placeholder="Иван"
              />
              {errors.borrowerFirstName && (
                <p className="text-red-500 text-sm mt-1">{errors.borrowerFirstName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Фамилия заемщика</label>
              <input
                type="text"
                {...register('borrowerLastName', { required: 'Фамилия обязательна' })}
                className="input-field"
                placeholder="Иванов"
              />
              {errors.borrowerLastName && (
                <p className="text-red-500 text-sm mt-1">{errors.borrowerLastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email заемщика</label>
            <input
              type="email"
              {...register('borrowerEmail', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Неверный формат email',
                },
              })}
              className="input-field"
              placeholder="borrower@example.com"
            />
            {errors.borrowerEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.borrowerEmail.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Телефон заемщика</label>
            <input
              type="tel"
              {...register('borrowerPhone', { required: 'Телефон обязателен' })}
              className="input-field"
              placeholder="+7 (999) 123-45-67"
            />
            {errors.borrowerPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.borrowerPhone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Сумма займа</label>
            <input
              type="number"
              {...register('amount', {
                required: 'Сумма обязательна',
                min: { value: 100000, message: 'Минимальная сумма 100,000 ₽' },
              })}
              className="input-field"
              placeholder="5000000"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Описание залога</label>
            <textarea
              {...register('description', { required: 'Описание обязательно' })}
              className="input-field"
              rows="4"
              placeholder="Опишите залоговое имущество..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Документы</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Перетащите файлы сюда или
              </p>
              <button
                type="button"
                onClick={() => document.getElementById('file-input').click()}
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                выберите файлы
              </button>
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={(e) => setFiles(Array.from(e.target.files))}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Отмена
            </button>
            <button type="submit" className="btn-primary flex-1">
              Разместить заявку
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollateralForm;

