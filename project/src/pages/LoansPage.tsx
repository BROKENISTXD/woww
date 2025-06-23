import React from 'react';

const LoansPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/70 z-10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/Loans.jpg"
            alt="Loans background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              Personal loans to help you achieve your goals
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Borrow from £1,000 to £25,000 with competitive rates and flexible repayment terms.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300">
                Check eligibility
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Loan calculator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our loan options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Car Loan */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Car" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Car Loan</h3>
                <p className="text-gray-600 mb-6">Finance your new or used car purchase with our competitive car loans.</p>
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Representative</div>
                  <div className="text-2xl font-bold">6.9% APR</div>
                  <div className="text-xs text-gray-500">(Representative variable)</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Borrow £1,000 to £25,000</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Repayment terms from 1 to 7 years</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No early repayment fees</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Apply now
                </button>
              </div>
            </div>
            
            {/* Home Improvement Loan */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Home Improvement" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Home Improvement Loan</h3>
                <p className="text-gray-600 mb-6">Transform your living space with our home improvement loans.</p>
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Representative</div>
                  <div className="text-2xl font-bold">5.9% APR</div>
                  <div className="text-xs text-gray-500">(Representative variable)</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Borrow £5,000 to £25,000</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Repayment terms from 1 to 7 years</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Fixed monthly repayments</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Apply now
                </button>
              </div>
            </div>
            
            {/* Debt Consolidation Loan */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Debt Consolidation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Debt Consolidation Loan</h3>
                <p className="text-gray-600 mb-6">Simplify your finances by consolidating your existing debts.</p>
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Representative</div>
                  <div className="text-2xl font-bold">7.9% APR</div>
                  <div className="text-xs text-gray-500">(Representative variable)</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Borrow £1,000 to £25,000</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Repayment terms from 1 to 7 years</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>One simple monthly payment</span>
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

      {/* Loan Calculator */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-8">Loan calculator</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">How much would you like to borrow?</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500">£</span>
                    <input 
                      type="number" 
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="5,000"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Over how many years?</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option>1 year</option>
                    <option>2 years</option>
                    <option>3 years</option>
                    <option>4 years</option>
                    <option>5 years</option>
                    <option>6 years</option>
                    <option>7 years</option>
                  </select>
                </div>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Calculate
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-6">Your estimated monthly repayment</h3>
                
                <div className="text-4xl font-bold text-red-600 mb-6">£98.75</div>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan amount:</span>
                    <span className="font-medium">£5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan term:</span>
                    <span className="font-medium">5 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest rate:</span>
                    <span className="font-medium">6.9% APR (representative)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total repayable:</span>
                    <span className="font-medium">£5,925.00</span>
                  </div>
                </div>
                
                <div className="mt-8 text-xs text-gray-500">
                  This is an example calculation. Your actual rate may differ based on your circumstances and credit score.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoansPage;