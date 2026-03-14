import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const DocumentUpload = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    handleFiles(newFiles);
  };

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    handleFiles(newFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      return validTypes.includes(file.type);
    });

    if (validFiles.length !== newFiles.length) {
      toast.error('Некоторые файлы не поддерживаются');
    }

    setFiles([...files, ...validFiles]);
    toast.success(`Добавлено файлов: ${validFiles.length}`);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const documentTypes = [
    { id: 'passport', label: 'Паспорт', required: true },
    { id: 'collateral_photo', label: 'Фото залога', required: true },
    { id: 'collateral_video', label: 'Видео залога', required: false },
    { id: 'valuation', label: 'Оценка имущества', required: true },
    { id: 'other', label: 'Прочие документы', required: false },
  ];

  return (
    <div className="space-y-6">
      {documentTypes.map((docType) => (
        <div key={docType.id} className="card">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold">{docType.label}</h3>
              {docType.required && (
                <span className="text-xs text-red-500">Обязательно</span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary text-sm flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Загрузить</span>
            </button>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary-500 transition-colors"
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Перетащите файлы сюда или
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              выберите файлы
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <File className="w-5 h-5 text-primary-600" />
                    <div>
                      <div className="font-medium text-sm">{file.name}</div>
                      <div className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentUpload;

