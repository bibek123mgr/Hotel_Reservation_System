import { useState } from 'react';

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('smallHotels');

  const tabData = {
    smallHotels: {
      title: 'Perfect for Small & Boutique Hotels',
      description:
        'Streamline your operations without the complexity and cost of enterprise systems. Our small hotel solution gives you just what you need to manage bookings efficiently.',
      image:
        'https://images.unsplash.com/photo-1562133567-b6a0a9c7e6eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      imageAlt: 'Boutique hotel using Reserve Hub',
      features: [
        'Easy-to-learn interface with minimal training required',
        'Affordable pricing with no hidden fees',
        'Direct booking website integration',
        'Basic reporting and analytics',
        '24/7 customer support',
      ],
    },
    resorts: {
      title: 'Powerful Solutions for Resorts & Hotel Chains',
      description:
        'Manage multiple properties, complex room categories, and high volume bookings with our enterprise-grade solution designed for larger operations.',
      image:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      imageAlt: 'Resort using Reserve Hub',
      features: [
        'Multi-property management from a single dashboard',
        'Advanced revenue management tools',
        'Staff permission management and activity logs',
        'API access for custom integrations',
        'Priority support with dedicated account manager',
      ],
    },
    vacation: {
      title: 'Specialized for Vacation Rentals',
      description:
        'Manage your vacation properties with tools designed specifically for short-term rentals, including contactless check-in and special cleaning schedules.',
      image:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      imageAlt: 'Vacation rental using Reserve Hub',
      features: [
        'Automated guest communications',
        'Digital guidebooks for guests',
        'Smart lock integration and keyless entry',
        'Cleaning and maintenance scheduling',
        'Airbnb, VRBO, and Booking.com synchronization',
      ],
    },
  };

  const activeTabData = tabData[activeTab];

  return (
    <section className="py-20 bg-white" id="product-tabs">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Tailored for Every Hospitality Business</h2>
          <p className="text-lg text-gray-600 mt-4">
            Whether you run a boutique hotel, a major resort, or a bed & breakfast, Reserve Hub scales to meet your specific needs.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex justify-center mb-12 gap-4 flex-wrap">
          <button
            className={`px-6 py-3 text-lg font-medium rounded-md transition-all duration-300 border-2 border-gray-300 text-gray-700 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white ${activeTab === 'smallHotels' ? 'bg-indigo-500 text-white border-indigo-500' : ''
              }`}
            onClick={() => setActiveTab('smallHotels')}
          >
            Small Hotels
          </button>
          <button
            className={`px-6 py-3 text-lg font-medium rounded-md transition-all duration-300 border-2 border-gray-300 text-gray-700 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white ${activeTab === 'resorts' ? 'bg-indigo-500 text-white border-indigo-500' : ''
              }`}
            onClick={() => setActiveTab('resorts')}
          >
            Resorts & Chains
          </button>
          <button
            className={`px-6 py-3 text-lg font-medium rounded-md transition-all duration-300 border-2 border-gray-300 text-gray-700 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white ${activeTab === 'vacation' ? 'bg-indigo-500 text-white border-indigo-500' : ''
              }`}
            onClick={() => setActiveTab('vacation')}
          >
            Vacation Rentals
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Tab Image */}
          <div className="flex-1 max-w-md">
            <img
              src={activeTabData.image}
              alt={activeTabData.imageAlt}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          {/* Tab Text */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-900">{activeTabData.title}</h3>
            <p className="text-lg text-gray-600 mt-4">{activeTabData.description}</p>

            {/* Features */}
            <div className="mt-8 space-y-4">
              {activeTabData.features.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;
