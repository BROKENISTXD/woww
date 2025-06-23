import React from 'react';

const SavingsPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/70 z-10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Savings background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              Savings accounts to help your money grow
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              From easy access to fixed term savings, find the right account for your needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300">
                Compare savings accounts
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Savings calculator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Accounts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our savings accounts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Easy Access Saver */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-xl font-bold">Easy Access Saver</h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">AER/Gross p.a. (variable)</div>
                  <div className="text-2xl font-bold">3.20%</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited withdrawals</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Start saving from £1</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Manage online, in branch or by phone</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Apply now
                </button>
              </div>
            </div>
            
            {/* Fixed Rate Bond */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-xl font-bold">Fixed Rate Bond</h3>
                <div className="inline-block bg-white text-red-600 text-xs font-bold px-2 py-1 rounded mt-2">
                  BEST RATE
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">AER/Gross p.a. (fixed)</div>
                  <div className="text-2xl font-bold">4.50%</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Fixed rate for 2 years</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Minimum deposit £500</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No withdrawals during the term</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Apply now
                </button>
              </div>
            </div>
            
            {/* ISA */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-xl font-bold">Cash ISA</h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">AER/Tax-free p.a. (variable)</div>
                  <div className="text-2xl font-bold">3.50%</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tax-free interest</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save up to £20,000 this tax year</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Easy access to your money</span>
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

      {/* Savings Calculator */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-8">Savings calculator</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Initial deposit</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500">£</span>
                    <input 
                      type="number" 
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="1,000"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Monthly deposit</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500">£</span>
                    <input 
                      type="number" 
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="100"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Interest rate (AER)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="3.5"
                    />
                    <span className="absolute right-4 top-3 text-gray-500">%</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Time period</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="5"
                    />
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      <option>Years</option>
                      <option>Months</option>
                    </select>
                  </div>
                </div>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Calculate
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-6">Your estimated savings</h3>
                
                <div className="text-4xl font-bold text-red-600 mb-6">£8,236.09</div>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Initial deposit:</span>
                    <span className="font-medium">£1,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total deposits:</span>
                    <span className="font-medium">£7,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest earned:</span>
                    <span className="font-medium">£1,236.09</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Final balance:</span>
                    <span className="font-medium">£8,236.09</span>
                  </div>
                </div>
                
                <div className="mt-8 text-xs text-gray-500">
                  This is an example calculation. The actual interest you earn may vary based on the specific account terms and conditions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SavingsPage;