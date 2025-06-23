import React from 'react';

const MortgagesPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/70 z-10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Mortgages background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              Find your perfect mortgage
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Whether you're buying your first home, moving, or remortgaging, we're here to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300">
                Get a decision in principle
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Mortgage calculators
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Explore our mortgages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* First Time Buyers */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="First Time Buyers" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">First Time Buyers</h3>
                <p className="text-gray-600 mb-6">Taking your first step onto the property ladder? We're here to help make it happen.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>5% deposit mortgages available</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free property valuation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated mortgage advisers</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Learn more
                </button>
              </div>
            </div>
            
            {/* Moving Home */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/7578986/pexels-photo-7578986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Moving Home" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Moving Home</h3>
                <p className="text-gray-600 mb-6">Ready for your next move? Find a mortgage that helps you take the next step.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Competitive fixed and variable rates</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Borrow up to 90% of property value</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Flexible overpayment options</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Learn more
                </button>
              </div>
            </div>
            
            {/* Remortgaging */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/7578991/pexels-photo-7578991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Remortgaging" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Remortgaging</h3>
                <p className="text-gray-600 mb-6">Switch to a better deal and potentially save money on your monthly payments.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Exclusive rates for existing customers</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free standard valuation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No legal fees on selected deals</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Calculators */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Mortgage calculators</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-red-600 mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Affordability calculator</h3>
              <p className="text-gray-600 mb-4">
                Find out how much you could borrow based on your income and outgoings.
              </p>
              <button className="text-red-600 font-medium hover:text-red-700 transition-colors">
                Calculate now →
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-red-600 mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 00-3 3v2H7a1 1 0 000 2h1v1a1 1 0 01-1 1 1 1 0 100 2h6a1 1 0 100-2H9.83c.11-.313.17-.65.17-1v-1h1a1 1 0 100-2h-1V7a1 1 0 112 0 1 1 0 102 0 3 3 0 00-3-3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Repayment calculator</h3>
              <p className="text-gray-600 mb-4">
                Calculate your monthly mortgage payments based on loan amount and term.
              </p>
              <button className="text-red-600 font-medium hover:text-red-700 transition-colors">
                Calculate now →
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-red-600 mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Overpayment calculator</h3>
              <p className="text-gray-600 mb-4">
                See how much you could save by making overpayments on your mortgage.
              </p>
              <button className="text-red-600 font-medium hover:text-red-700 transition-colors">
                Calculate now →
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-red-600 mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Stamp duty calculator</h3>
              <p className="text-gray-600 mb-4">
                Calculate the stamp duty land tax you'll need to pay on your property purchase.
              </p>
              <button className="text-red-600 font-medium hover:text-red-700 transition-colors">
                Calculate now →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MortgagesPage;