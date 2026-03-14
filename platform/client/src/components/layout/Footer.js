import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Z</span>
              </div>
              <span className="text-xl font-bold text-white">ZalogInvest</span>
            </div>
            <p className="text-sm">
              P2P платформа для займов под залог имущества. Безопасно, быстро, выгодно.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  О платформе
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-primary-400 transition-colors">
                  Новости
                </Link>
              </li>
              <li>
                <Link to="/legal" className="hover:text-primary-400 transition-colors">
                  Юридическая поддержка
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@zaloginvest.ru</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>8 (800) 123-45-67</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Безопасность</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Защищено SSL</span>
              </li>
              <li className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>GDPR-compliant</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>2FA защита</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ZalogInvest. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

