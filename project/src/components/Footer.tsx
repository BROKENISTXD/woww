import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <img src="/santander-logo.svg" alt="Santander Logo" className="h-10" />
        </div>
        {/* Security Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="border-2 border-gray-200 rounded-lg p-4 flex items-center">
            <div className="text-lg font-bold">Protecting your money</div>
          </div>
          <div className="border-2 border-gray-200 rounded-lg p-4 flex items-center">
            <div className="text-lg font-bold">Stop, Challenge, Protect</div>
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="text-center mb-12">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-600">
            <Link to="#" className="hover:underline">About Santander UK</Link>
            <Link to="#" className="hover:underline">Branch locator</Link>
            <Link to="#" className="hover:underline">Branch appointments</Link>
            <Link to="#" className="hover:underline">Support</Link>
            <Link to="#" className="hover:underline">Accessibility</Link>
            <Link to="#" className="hover:underline">Site map</Link>
            <Link to="#" className="hover:underline">Privacy policy</Link>
            <Link to="#" className="hover:underline">Cookie policy</Link>
            <Link to="#" className="hover:underline">Fraud and security</Link>
            <Link to="#" className="hover:underline">Financial results</Link>
            <Link to="#" className="hover:underline">Santander Careers</Link>
            <Link to="#" className="hover:underline">Service status</Link>
            <Link to="#" className="hover:underline">Welsh language policy</Link>
            <Link to="#" className="hover:underline">Modern slavery statement</Link>
            <Link to="#" className="hover:underline">Santander Universities</Link>
            <Link to="#" className="hover:underline">Santander websites</Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-xs text-gray-500">
          <p>
            Santander UK plc. Registered Office: 2 Triton Square, Regent's Place, London, NW1 3AN, United Kingdom. Registered Number 2294747. Registered in England and Wales. <a href="#" className="underline">www.santander.co.uk</a>. Authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority. Our Financial Services Register number is 106054. You can check this on the Financial Services Register by visiting the FCA's website <a href="http://www.fca.org.uk/register" className="underline" target="_blank" rel="noopener noreferrer">www.fca.org.uk/register</a>. Santander and the flame logo are registered trademarks.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;