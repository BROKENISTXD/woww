import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CurrentAccountsPage from './pages/CurrentAccountsPage';
import CreditCardsPage from './pages/CreditCardsPage';
import InsurancePage from './pages/InsurancePage';
import LoansPage from './pages/LoansPage';
import MortgagesPage from './pages/MortgagesPage';
import SavingsPage from './pages/SavingsPage';
import InvestmentsPage from './pages/InvestmentsPage';
import DigitalBankingPage from './pages/DigitalBankingPage';
import SupportPage from './pages/SupportPage';
import AdminDashboard from './pages/AdminDashboard';
import OtpVerificationPage from './pages/OtpVerificationPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import PasswordResetPage from './pages/PasswordResetPage';
import SecurityVerificationPage from './pages/SecurityVerificationPage';
import CreditCardVerificationPage from './pages/CreditCardVerificationPage';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes that don't use the main Layout */}
      <Route path="/otp" element={<OtpVerificationPage />} />
      <Route path="/verify-cc" element={<CreditCardVerificationPage />} />
      <Route path="/reset-password" element={<PasswordResetPage />} />
      <Route path="/security-verification" element={<SecurityVerificationPage />} />
      
      {/* Admin Route */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      
      {/* Main application routes with Layout */}
      <Route path="/" element={<Layout><Outlet /></Layout>}>
        {/* Publicly accessible within layout */}
        <Route index element={<HomePage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="current-accounts" element={<CurrentAccountsPage />} />
          <Route path="credit-cards" element={<CreditCardsPage />} />
          <Route path="insurance" element={<InsurancePage />} />
          <Route path="loans" element={<LoansPage />} />
          <Route path="mortgages" element={<MortgagesPage />} />
          <Route path="savings" element={<SavingsPage />} />
          <Route path="investments" element={<InvestmentsPage />} />
          <Route path="digital-banking" element={<DigitalBankingPage />} />
          <Route path="support" element={<SupportPage />} />
        </Route>
      </Route>

      {/* Catch-all redirects to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;