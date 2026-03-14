import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ darkMode, setDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    const roleMap = {
      borrower: '/dashboard/borrower',
      investor: '/dashboard/investor',
      broker: '/dashboard/broker',
      admin: '/dashboard/admin',
    };
    return roleMap[user.role] || '/login';
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <span className="text-2xl font-bold text-gradient">ZalogInvest</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Главная
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              О платформе
            </Link>
            <Link
              to="/news"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Новости
            </Link>
            <Link
              to="/legal"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Юр. поддержка
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={getDashboardLink()}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Личный кабинет</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Выход</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Вход
                </Link>
                <Link to="/register" className="btn-primary">
                  Регистрация
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              to="/"
              className="block py-2 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Главная
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              О платформе
            </Link>
            <Link
              to="/news"
              className="block py-2 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Новости
            </Link>
            <Link
              to="/legal"
              className="block py-2 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Юр. поддержка
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="block py-2 text-gray-700 dark:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Личный кабинет
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block py-2 text-red-600 w-full text-left"
                >
                  Выход
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-gray-700 dark:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className="block py-2 btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

