import React from 'react';
import { Link } from 'react-router-dom';

const CurrentAccountsPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/70 z-10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Current accounts background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              Current accounts that work for you
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Choose from our range of current accounts designed to suit your needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300">
                Compare accounts
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Switch to us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Account Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our current accounts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Everyday Current Account */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-xl font-bold">Everyday Current Account</h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Monthly fee</div>
                  <div className="text-2xl font-bold">£0</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No monthly fee</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Arranged overdraft available (subject to status)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Mobile and Online Banking</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Apply now
                </button>
              </div>
            </div>
            
            {/* Santander Edge Current Account */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-xl font-bold">Santander Edge Current Account</h3>
                <div className="inline-block bg-white text-red-600 text-xs font-bold px-2 py-1 rounded mt-2">
                  RECOMMENDED
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Monthly fee</div>
                  <div className="text-2xl font-bold">£3</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Earn up to £20 cashback per month</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>1% AER/gross (variable) on savings up to £25,000</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Arranged overdraft available (subject to status)</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Apply now
                </button>
              </div>
            </div>
            
            {/* Santander Edge Up Current Account */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-xl font-bold">Santander Edge Up Current Account</h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Monthly fee</div>
                  <div className="text-2xl font-bold">£5</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Earn up to £20 cashback per month</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>5% AER/gross (variable) on savings up to £25,000</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Worldwide fee-free debit card use</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Apply now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Switching Banner */}
      <section className="bg-red-600 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">Switch to Santander and get £180</h2>
              <p className="text-lg max-w-2xl">
                It's easy to switch your current account to Santander with the Current Account Switch Service.
              </p>
            </div>
            <button className="bg-white text-red-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Switch now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentAccountsPage;