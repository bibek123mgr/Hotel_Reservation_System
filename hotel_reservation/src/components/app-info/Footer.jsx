import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* About Section */}
                    <div>
                        <Link to="/" className="text-white text-2xl font-bold mb-4 inline-block">
                            <i className="fas fa-hotel mr-2"></i> Reserve Hub
                        </Link>
                        <p className="text-gray-400 mb-6">
                            The complete hotel reservation system that helps you manage bookings, increase revenue, and delight your guests.
                        </p>
                        <div className="flex gap-4">
                            {['facebook-f', 'twitter', 'linkedin-in', 'instagram'].map(icon => (
                                <a key={icon} href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-primary transition-colors">
                                    <i className={`fab fa-${icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-white text-lg mb-6">Product</h4>
                        <ul className="space-y-3">
                            <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                            <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Updates</a></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-white text-lg mb-6">Support</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white text-lg mb-6">Company</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center border-t border-gray-700 pt-8">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Reserve Hub. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
