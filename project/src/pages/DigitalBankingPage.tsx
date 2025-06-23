import React from 'react';

const DigitalBankingPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/70 z-10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6347729/pexels-photo-6347729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Digital Banking background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              Banking at your fingertips
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Manage your money anytime, anywhere with our award-winning Mobile and Online Banking services.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300">
                Register for Digital Banking
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Download our app
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Features that make banking easier</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-red-600 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Secure login</h3>
              <p className="text-gray-600">
                Log in securely with biometric authentication, including fingerprint and face recognition on compatible devices.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-red-600 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Money management</h3>
              <p className="text-gray-600">
                Track your spending, set budgets, and get insights into your finances with our intuitive money management tools.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-red-600 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Enhanced security</h3>
              <p className="text-gray-600">
                Rest easy with our advanced security features, including real-time fraud monitoring and instant card freezing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our award-winning mobile app</h2>
              <p className="text-gray-600 mb-6">
                Banking on the go has never been easier with the Santander Mobile Banking app. Manage your accounts, make payments, and stay on top of your finances wherever you are.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Quick balance check</h3>
                    <p className="text-gray-600">Check your balance without logging in with our quick balance feature.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Instant payments</h3>
                    <p className="text-gray-600">Send money to friends and family instantly with just their mobile number.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Card controls</h3>
                    <p className="text-gray-600">Freeze and unfreeze your cards instantly if they're lost or stolen.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
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
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-[500px] bg-black rounded-3xl overflow-hidden border-8 border-gray-800 shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/6347729/pexels-photo-6347729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Mobile Banking App" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalBankingPage;