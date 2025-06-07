import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t border-gray-100 pt-12 pb-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Hotel Info */}
                    <div>
                        <h3 className="font-serif text-lg font-bold tracking-tight bg-gradient-to-r from-blue-500 to-blue-500/80 bg-clip-text text-transparent mb-3">
                            Reserve Hub
                        </h3>
                        <div className="flex space-x-0.5 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className="text-yellow-400 text-xs">★</span>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                            Experience luxury and comfort in the heart of the city. Our hotel offers premium amenities, exquisite dining, and exceptional service.
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-500/10 flex items-center justify-center text-gray-500 hover:text-blue-500 transition-colors"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-500/10 flex items-center justify-center text-gray-500 hover:text-blue-500 transition-colors"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-500/10 flex items-center justify-center text-gray-500 hover:text-blue-500 transition-colors"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about">
                                    <span className="text-xs text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">About Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/rooms">
                                    <span className="text-xs text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">Rooms & Suites</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dining">
                                    <span className="text-xs text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">Dining</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/amenities">
                                    <span className="text-xs text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">Amenities</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery">
                                    <span className="text-xs text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">Gallery</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact">
                                    <span className="text-xs text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">Contact Us</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 text-blue-500 mt-0.5" />
                                <span className="text-xs text-gray-500 leading-relaxed">
                                    1234 Skylark Avenue<br />
                                    Cityville, ST 56789<br />
                                    United States
                                </span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-blue-500" />
                                <a href="tel:+15551234567" className="text-xs text-gray-500 hover:text-blue-500 transition-colors">
                                    +1 (555) 123-4567
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-blue-500" />
                                <a href="mailto:info@hotelskylark.com" className="text-xs text-gray-500 hover:text-blue-500 transition-colors">
                                    info@hotelskylark.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-4">Stay Updated</h4>
                        <p className="text-xs text-gray-500 mb-3">
                            Subscribe to our newsletter for special offers and updates.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="text-xs rounded-l-md border border-gray-200 px-3 py-2 flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                            />
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-500/90 text-white text-xs px-3 py-2 rounded-r-md"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-400 mb-4 md:mb-0">
                        &copy; {currentYear} Reserve Hub. All rights reserved.
                    </p>

                    <div className="flex space-x-6">
                        <Link href="/privacy">
                            <span className="text-[10px] text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
                                Privacy Policy
                            </span>
                        </Link>
                        <Link href="/terms">
                            <span className="text-[10px] text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
                                Terms & Conditions
                            </span>
                        </Link>
                        <Link href="/sitemap">
                            <span className="text-[10px] text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
                                Sitemap
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}