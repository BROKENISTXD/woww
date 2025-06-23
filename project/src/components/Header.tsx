import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onLoginClick: () => void;
  loginButtonRef: React.RefObject<HTMLButtonElement>;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, loginButtonRef }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (auth.isAuthenticated) {
      logout();
      navigate('/');
    } else {
      onLoginClick();
    }
  };

  const topNavItems = ['Personal', 'Private Client', 'Small Business', 'Commercial', 'About Us'];
  const mainNavItems = [
    { name: 'Checking', path: '/checking' },
    { name: 'Savings & CDs', path: '/savings' },
    { name: 'Credit Cards', path: '/credit-cards' },
    { name: 'Personal Loans', path: '/loans' },
    { name: 'Auto', path: '/auto' },
    { name: 'Investing & Planning', path: '/investing' },
    { name: 'Resources', path: '/resources' },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/santander-logo.svg" 
                alt="Santander" 
                className="h-8 w-auto"
              />
            </Link>
            {/* Top Nav */}
            <nav className="hidden md:flex space-x-6">
              {topNavItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`text-sm font-medium ${
                    index === 0 
                      ? 'text-red-600 border-b-2 border-red-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <MapPin className="h-5 w-5" />
            </a>
            <button
              ref={loginButtonRef}
              onClick={handleAuthClick}
              className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition-colors"
            >
              {auth.isAuthenticated ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 -mb-px">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;