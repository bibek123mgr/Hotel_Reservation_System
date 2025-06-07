const Features = () => {
    const features = [
        {
            icon: (
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Intelligent Booking Engine',
            description: 'AI-powered booking system prevents double bookings and optimizes room assignments automatically based on guest preferences and operational efficiency.'
        },
        {
            icon: (
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M16 8V16M12 11V16M8 14V16M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Advanced Analytics Dashboard',
            description: 'Real-time data visualization with predictive analytics helps forecast demand, optimize pricing, and identify revenue opportunities with ML-based recommendations.'
        },
        {
            icon: (
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 12V22H4V12M22 7H2V12H22V7ZM12 22V7M12 7H16.5C17.8807 7 19 5.88071 19 4.5V4.5C19 3.11929 17.8807 2 16.5 2H7.5C6.11929 2 5 3.11929 5 4.5V4.5C5 5.88071 6.11929 7 7.5 7H12Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Enterprise Payment Infrastructure',
            description: 'PCI DSS Level 1 compliant payment system with fraud detection, supporting 135+ currencies, multiple payment methods, and automated reconciliation.'
        },
        {
            icon: (
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M12 18H12.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Cross-Platform Experience',
            description: 'Native mobile apps for iOS and Android with offline capabilities, real-time notifications, and integrated staff communication tools for seamless operations.'
        },
        {
            icon: (
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M3 12C3 7.02944 7.02944 3 12 3"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Global Distribution System',
            description: 'Unified channel manager connecting with 300+ booking platforms, with automatic rate parity, inventory sync, and smart allocation algorithms.'
        },
        {
            icon: (
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M16.6438 16.1429C15.6357 14.5743 13.9174 13.5 12 13.5C10.0826 13.5 8.36431 14.5743 7.35625 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M12 7C14.2091 7 16 8.79086 16 11V11.5C16 13.7091 14.2091 15.5 12 15.5C9.79086 15.5 8 13.7091 8 11.5V11C8 8.79086 9.79086 7 12 7Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Guest Experience Platform',
            description: 'Comprehensive CRM with guest profiles, preference tracking, automated personalization, loyalty program management, and post-stay engagement tools.'
        }
    ];

    return (
        <section id="features" className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <span className="text-sm text-indigo-600 font-semibold uppercase tracking-wide">Features</span>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4">Powerful Tools for Every Property</h2>
                <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                    Everything you need to streamline operations, enhance guest experience, and grow revenue — all in one platform.
                </p>

                <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                        >
                            <div className="w-14 h-14 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full mb-6 mx-auto group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
