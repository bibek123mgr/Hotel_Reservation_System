import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const [annualBilling, setAnnualBilling] = useState(true);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/subscription-plans');
                setPlans(response.data);
            } catch (error) {
                console.error('Error fetching subscription plans:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handleGetStarted = (plan) => {
        const queryParams = new URLSearchParams({
            id: plan.id,
            monthlyPrice: plan.monthlyPrice,
            yearlyPrice: plan.yearlyPrice,
        }).toString();

        navigate(`/hotelregister?${queryParams}`);
    };

    return (
        <section className="bg-white py-20" id="pricing">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-sm font-medium text-secondary uppercase tracking-widest">Pricing</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">Transparent Pricing For Every Hotel</h2>
                    <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                        Choose the perfect plan to optimize your hotel operations and maximize revenue.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={`text-sm font-medium ${!annualBilling ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
                        <button
                            onClick={() => setAnnualBilling(!annualBilling)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors ${annualBilling ? 'bg-blue-500' : 'bg-gray-300'}`}
                            aria-label="Toggle billing frequency"
                        >
                            <span
                                className={`bg-white w-4 h-4 rounded-full block transition-transform ${annualBilling ? 'translate-x-6' : 'translate-x-0'}`}
                            ></span>
                        </button>

                    </div>
                </div>

                {/* Loading state */}
                {loading ? (
                    <div className="text-center text-gray-500">Loading plans...</div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-3">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className="rounded-lg shadow-md border p-6 flex flex-col border-gray-200"
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{plan.name}</h3>
                                <div className="flex items-end text-gray-900 mb-2">
                                    <span className="text-lg font-medium mr-1">$</span>
                                    <span className="text-4xl font-bold">
                                        {annualBilling ? plan.yearlyPrice : plan.monthlyPrice}
                                    </span>
                                    <span className="text-sm ml-1">/ {annualBilling ? 'year' : 'month'}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-6">{plan.description}</p>

                                {/* Features */}
                                <ul className="space-y-3 flex-1">
                                    {plan.features.split(',').map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2 text-gray-800">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>{feature.trim()}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <div className="mt-6">
                                    <button
                                        onClick={() => handleGetStarted(plan)}
                                        className="block text-center w-full px-4 py-3 rounded font-semibold transition bg-blue-500 text-white hover:bg-blue-400"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Enterprise CTA */}
                <div className="mt-16 bg-gray-100 p-8 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Need a custom solution?</h3>
                    <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                        Our enterprise plans include personalized onboarding, 24/7 priority support, and custom feature development.
                    </p>
                    <a
                        href="#contact"
                        className="inline-block px-6 py-3 rounded bg-secondary text-white font-medium hover:bg-blue-600 transition"
                    >
                        Contact Our Sales Team
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
