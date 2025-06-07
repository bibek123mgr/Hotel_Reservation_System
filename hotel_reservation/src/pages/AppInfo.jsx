import { useEffect } from 'react';
import Hero from '../components/app-info/Hero';
import Header from '../components/app-info/Header';
import Features from '../components/app-info/Features';
import ProductTabs from '../components/app-info/ProductTab';
import Testimonials from '../components/app-info/Testimonials';
import ContactForm from '../components/app-info/ContactForm';
import Footer from '../components/app-info/Footer';
import Pricing from '../components/app-info/Pricing';


const AppInfo = () => {
    useEffect(() => {
        // Set title
        document.title = "Reserve Hub - Hotel Reservation System SaaS";

        // Add meta description
        const metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        metaDescription.content = 'The all-in-one hotel reservation management system that streamlines bookings, maximizes occupancy, and delights your guests.';
        document.head.appendChild(metaDescription);

        // Clean up on unmount
        return () => {
            document.head.removeChild(metaDescription);
        };
    }, []);

    // Smooth scrolling for anchor links
    useEffect(() => {
        const handleAnchorClick = (e) => {
            const target = e.target;
            if (target.tagName === 'A') {
                const link = target;
                const href = link.getAttribute('href');

                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();

                    const targetElement = document.querySelector(href);

                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return (
        <>
            <Header />
            <main>
                <Hero />
                <Features />
                <ProductTabs />
                <Pricing />
                <Testimonials />
                <ContactForm />
            </main>
            <Footer />
        </>
    );
};

export default AppInfo;
