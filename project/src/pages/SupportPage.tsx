import React, { useState } from 'react';

const SupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden min-h-[300px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/70 z-10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Support background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              How can we help you today?
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Find answers to your questions and get the support you need.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help topics..."
                className="w-full pl-4 pr-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeTab === 'general' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('general')}
            >
              General Support
            </button>
            <button 
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeTab === 'accounts' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('accounts')}
            >
              Account Help
            </button>
            <button 
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeTab === 'cards' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('cards')}
            >
              Cards & Payments
            </button>
            <button 
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeTab === 'digital' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('digital')}
            >
              Digital Banking
            </button>
            <button 
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeTab === 'financial' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('financial')}
            >
              Financial Difficulties
            </button>
          </div>
        </div>
      </section>

      {/* Support Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'general' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">General Support</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Contact us</h3>
                  <p className="text-gray-600 mb-6">
                    Get in touch with us through your preferred channel.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full mr-4">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold">Phone</h4>
                        <p className="text-gray-600">0800 9 123 123</p>
                        <p className="text-sm text-gray-500">8am to 8pm, 7 days a week</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full mr-4">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold">Branch</h4>
                        <p className="text-gray-600">Find your nearest branch</p>
                        <button className="text-red-600 text-sm font-medium mt-1">Branch locator →</button>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full mr-4">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold">Email</h4>
                        <p className="text-gray-600">Send us a secure message</p>
                        <button className="text-red-600 text-sm font-medium mt-1">Contact form →</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Popular topics</h3>
                  
                  <ul className="space-y-4">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Lost or stolen cards
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Trouble logging on to Online Banking
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Make a payment or transfer
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Changing your personal details
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Fraud and security
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Bereavement support
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Frequently asked questions</h3>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <button className="flex justify-between items-center w-full text-left">
                      <h4 className="text-lg font-bold">How do I report a lost or stolen card?</h4>
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="mt-4 text-gray-600">
                      <p>You can report a lost or stolen card in several ways:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Through the Mobile Banking app</li>
                        <li>Via Online Banking</li>
                        <li>By calling our 24/7 helpline on 0800 9 123 123</li>
                        <li>In branch</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <button className="flex justify-between items-center w-full text-left">
                      <h4 className="text-lg font-bold">How do I change my address?</h4>
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="mt-4 text-gray-600">
                      <p>You can change your address:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Through Online Banking</li>
                        <li>By visiting any branch with ID</li>
                        <li>By calling us on 0800 9 123 123</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <button className="flex justify-between items-center w-full text-left">
                      <h4 className="text-lg font-bold">How do I set up a standing order?</h4>
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="mt-4 text-gray-600">
                      <p>Setting up a standing order is easy:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Log in to Online Banking or the Mobile app</li>
                        <li>Go to 'Payments & Transfers'</li>
                        <li>Select 'Standing orders'</li>
                        <li>Follow the on-screen instructions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'accounts' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Account Help</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Opening an account</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        How to open an account
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Required documents
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Switching to Santander
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Joint accounts
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Managing your account</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Checking your balance
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Setting up Direct Debits
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Overdrafts
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Statements
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Closing an account</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        How to close your account
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Switching to another bank
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Dormant accounts
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Bereavement support
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'cards' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Cards & Payments</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Card issues</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Lost or stolen cards
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Damaged cards
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Activating your new card
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        PIN management
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Using your card abroad
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Payments</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Making a payment
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        International payments
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Setting up standing orders
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Direct Debits
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Disputing a transaction
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'digital' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Digital Banking</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Online Banking</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Registering for Online Banking
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Trouble logging on
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Forgotten security details
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Online Banking security
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Mobile Banking</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Downloading the app
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Setting up Mobile Banking
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        App features
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Troubleshooting
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 bg-white p-8 rounded-xl shadow-sm">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                    <img 
                      src="https://images.pexels.com/photos/6347729/pexels-photo-6347729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                      alt="Mobile Banking App" 
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold mb-4">Download our Mobile Banking app</h3>
                    <p className="text-gray-600 mb-6">
                      Manage your money on the go with our secure and easy-to-use Mobile Banking app. Check balances, make payments, freeze cards and more.
                    </p>
                    <div className="flex gap-4">
                      <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5227 19.3325C16.9705 19.9058 16.2902 19.8737 15.6311 19.6112C14.9399 19.3433 14.3021 19.3433 13.5789 19.6112C12.6544 19.9537 12.1663 19.8896 11.6782 19.3325C8.44099 15.9376 9.06221 10.5461 12.8061 10.3748C13.7947 10.4228 14.4538 10.8513 15.0059 10.8833C15.8011 10.8193 16.5564 10.3748 17.4809 10.4388C18.6138 10.5029 19.4731 10.9314 20.0252 11.7167C17.3834 13.2014 17.9035 16.7843 20.3316 17.7133C19.9291 18.3506 19.4731 18.9559 18.9209 19.6112C18.4008 20.2325 17.9035 20.8538 17.1162 20.8538C16.3609 20.8218 16.0225 20.2325 15.0059 20.2325C14.0214 20.2325 13.6509 20.8538 12.9277 20.8538C12.2365 20.8538 11.7484 20.2645 11.1642 19.6112L11.1642 19.6112Z" />
                          <path d="M15.0059 9.43013C14.8402 8.19332 15.6596 6.98848 16.4148 6.24319C17.2741 5.36595 18.5672 4.78262 19.6681 4.84666C19.8017 6.11544 19.2496 7.32028 18.4223 8.16555C17.6351 9.07476 16.4148 9.69409 15.0059 9.43013Z" />
                        </svg>
                        App Store
                      </button>
                      <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.60001 20.4L12.12 12L3.60001 3.60001V20.4ZM14.4 12L20.4 6.00001V18L14.4 12Z" />
                        </svg>
                        Google Play
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'financial' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Financial Difficulties</h2>
              
              <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/3 md:pr-8">
                    <h3 className="text-2xl font-bold mb-4">We're here to help</h3>
                    <p className="text-gray-600 mb-6">
                      If you're experiencing financial difficulties, we're here to help. We understand that financial circumstances can change unexpectedly, and we have a range of support options available.
                    </p>
                    <p className="text-gray-600 mb-6">
                      The sooner you contact us, the sooner we can help you find a solution. Our trained advisers are here to listen and provide support tailored to your situation.
                    </p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200">
                      Get in touch
                    </button>
                  </div>
                  <div className="md:w-1/3 mt-6 md:mt-0">
                    <img 
                      src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                      alt="Financial support" 
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Payment difficulties</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Missed payments
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Overdraft concerns
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Credit card repayments
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Loan repayments
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Support options</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Payment holidays
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Repayment plans
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Debt consolidation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Budget planning
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">External support</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Money Advice Service
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        StepChange Debt Charity
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Citizens Advice
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        National Debtline
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SupportPage;