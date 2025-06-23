import React from 'react';

const CreditCardsPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/70 z-10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Credit cards background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              Credit cards for every need
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              From everyday spending to balance transfers, find the right credit card for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300">
                Compare credit cards
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Check eligibility
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Card Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our credit cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Santander Edge Credit Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-xl font-bold">Santander Edge Credit Card</h3>
                <div className="inline-block bg-white text-red-600 text-xs font-bold px-2 py-1 rounded mt-2">
                  RECOMMENDED
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Representative</div>
                    <div className="text-2xl font-bold">29.8% APR</div>
                    <div className="text-xs text-gray-500">(Variable)</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Monthly fee</div>
                    <div className="text-2xl font-bold">£3</div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Earn up to £15 cashback per month</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>1% cashback on supermarket and transport spending</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No foreign transaction fees</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Apply now
                </button>
              </div>
            </div>
            
            {/* All in One Credit Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-xl font-bold">All in One Credit Card</h3>
              </div>
              <div className="p-6">
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Representative</div>
                    <div className="text-2xl font-bold">25.9% APR</div>
                    <div className="text-xs text-gray-500">(Variable)</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Monthly fee</div>
                    <div className="text-2xl font-bold">£3</div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>0.5% cashback on all purchases</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>0% on balance transfers for 26 months</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No foreign transaction fees</span>
                  </li>
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                  Apply now
                </button>
              </div>
            </div>
            
            {/* Everyday Credit Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-xl font-bold">Everyday Credit Card</h3>
              </div>
              <div className="p-6">
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Representative</div>
                    <div className="text-2xl font-bold">22.9% APR</div>
                    <div className="text-xs text-gray-500">(Variable)</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Annual fee</div>
                    <div className="text-2xl font-bold">£0</div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No balance transfer fee</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>0% on balance transfers for 18 months</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>0% on purchases for 3 months</span>
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

      {/* Important Information */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">Important information</h3>
            <div className="text-sm text-gray-600 space-y-4">
              <p>
                To apply for our credit cards you must be a permanent UK resident aged 18 years or over, have a permanent income of at least £7,500 a year, have a good credit record and not have been declared bankrupt, had a CCJ or an IVA within the last 6 years. We will conduct a credit check as part of the application and this will determine whether we can offer you a credit card and what interest rates you will receive.
              </p>
              <p>
                The balance transfer period starts from the date your account is opened. When the promotional period ends, any remaining balance transfer balances will be charged at your standard purchase rate.
              </p>
              <p>
                Credit is subject to status and is only available to UK residents aged 18 or over. Terms and conditions apply.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreditCardsPage;