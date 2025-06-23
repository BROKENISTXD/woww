import React, { ReactNode, useState, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import LoginPopup from './LoginPopup';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  const handleLoginClick = () => {
    setLoginPopupOpen(true);
  };

  const handleClosePopup = () => {
    setLoginPopupOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header onLoginClick={handleLoginClick} loginButtonRef={loginButtonRef} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <LoginPopup isOpen={isLoginPopupOpen} onClose={handleClosePopup} anchorRef={loginButtonRef} />
    </div>
  );
};

export default Layout;