import React from 'react';
import NewsFeed from '../components/common/NewsFeed';

const News = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-gradient">Новости и обновления</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Будьте в курсе последних новостей платформы и рынка
          </p>
        </div>
        <NewsFeed limit={10} />
      </div>
    </div>
  );
};

export default News;

