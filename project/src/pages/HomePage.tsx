import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg className="mx-auto h-8 w-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
    ),
    title: 'Savings & CDs',
    description: '',
    href: '/savings',
  },
  {
    icon: (
      <svg className="mx-auto h-8 w-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" /><path d="M3 10h18" /></svg>
    ),
    title: 'Checking',
    description: '',
    href: '/checking',
  },
  {
    icon: (
      <svg className="mx-auto h-8 w-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M6 14h.01" /></svg>
    ),
    title: 'Credit Cards',
    description: '',
    href: '/credit-cards',
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="lg:pr-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-800 tracking-tight">
                The best financial tools and advice for every need.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600">
                Simple and secure personal banking available in person, online, or on your device.
              </p>
              <div className="mt-10">
                <a
                  href="#"
                  className="inline-block bg-red-600 text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-red-700 hover:scale-105 hover:shadow-lg transition-all"
                >
                  Choose your checking account
                </a>
              </div>
            </div>
            
            <div className="relative h-96 lg:h-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src="/Homepage Banner.jpg"
                alt="Family in kitchen"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Helping people bank at home section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-800 text-center mb-10">
            Helping people bank <span className="underline decoration-red-600 decoration-2 underline-offset-4 hover:text-red-600 transition-colors cursor-pointer">at home</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <a
                key={feature.title}
                href={feature.href}
                className="group block bg-white rounded-lg border border-gray-200 p-8 text-center shadow-sm hover:shadow-lg hover:border-red-400 transition-all cursor-pointer"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <div className="text-sm font-semibold text-gray-700 group-hover:text-red-600 transition-colors">{feature.title}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;