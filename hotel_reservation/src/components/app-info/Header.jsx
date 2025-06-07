import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Track scrolling for header effects
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close mobile menu when clicking a nav link
    const handleMobileNavClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className={`fixed w-full top-0 left-0 z-50 transition-all ${scrolled ? 'bg-white shadow-md' : ''}`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-3">
                    <div className="w-8 h-8 text-blue-500">
                        <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                    <span className={`text-xl font-semibold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                        Reserve Hub
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    <ul className="flex space-x-8">
                        <li>
                            <a
                                href="#features"
                                className={`transition-colors hover:text-blue-500 ${scrolled ? 'text-gray-700' : 'text-white'}`}
                                onClick={handleMobileNavClick}
                            >
                                Features
                            </a>
                        </li>
                        <li>
                            <a
                                href="#pricing"
                                className={`transition-colors hover:text-blue-500 ${scrolled ? 'text-gray-700' : 'text-white'}`}
                                onClick={handleMobileNavClick}
                            >
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a
                                href="#testimonials"
                                className={`transition-colors hover:text-blue-500 ${scrolled ? 'text-gray-700' : 'text-white'}`}
                                onClick={handleMobileNavClick}
                            >
                                Testimonials
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className={`transition-colors hover:text-blue-500 ${scrolled ? 'text-gray-700' : 'text-white'}`}
                                onClick={handleMobileNavClick}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>


                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <a href="#" className="text-gray-700 hover:text-blue-500 transition-colors">Log In</a>
                    <a href="#pricing" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-500-light transition-colors">Get Started</a>
                    <button
                        className="p-3 md:hidden flex flex-col justify-between items-center space-y-1"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-1 bg-gray-700 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-1 bg-gray-700 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-1 bg-gray-700 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md absolute top-0 left-0 w-full h-full flex flex-col items-center space-y-6 py-12 z-50">
                    <a
                        href="#features"
                        className={`transition-colors hover:text-blue-500 ${scrolled ? 'text-gray-700' : 'text-white'}`}
                        onClick={handleMobileNavClick}
                    >
                        Features
                    </a>
                    <a
                        href="#pricing"
                        className={`transition-colors hover:text-blue-500 ${scrolled ? 'text-gray-700' : 'text-white'}`}
                        onClick={handleMobileNavClick}
                    >
                        Pricing
                    </a>
                    <a
                        href="#testimonials"
                        className={`transition-colors hover:text-blue-500 ${scrolled ? 'text-gray-700' : 'text-white'}`}
                        onClick={handleMobileNavClick}
                    >
                        Testimonials
                    </a>
                    <a
                        href="#contact"
                        className={`transition-colors hover:text-blue-500 ${scrolled ? 'text-gray-700' : 'text-white'}`}
                        onClick={handleMobileNavClick}
                    >
                        Contact
                    </a>
                    <a
                        href="#"
                        className={`transition-colors hover:text-blue-500 ${scrolled ? 'text-gray-700' : 'text-white'}`}
                        onClick={handleMobileNavClick}
                    >
                        Log In
                    </a>
                    <a
                        href="#pricing"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        onClick={handleMobileNavClick}
                    >
                        Get Started
                    </a>
                </div>
            )}

        </header>
    );
};

export default Header;
