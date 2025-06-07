import React from 'react';
import { Star, MapPin, ShieldCheck, Heart } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-soft-light filter blur-3xl animate-float"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full mix-blend-soft-light filter blur-3xl animate-float-delay"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        Luxury Stays, <span className="text-blue-300">Unforgettable</span> Experiences
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
                        Curated collection of premium hotels and resorts across the world's most beautiful destinations
                    </p>

                    <div className="mt-16 mb-12 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-blue-800 px-4 text-sm text-white/80">TRUSTED BY TRAVELERS WORLDWIDE</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all">
                            <div className="flex items-center">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((item) => (
                                        <img
                                            key={item}
                                            src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 10}.jpg`}
                                            alt="User"
                                            className="w-10 h-10 rounded-full border-2 border-white/80 object-cover"
                                        />
                                    ))}
                                </div>
                                <div className="ml-4 text-left">
                                    <p className="font-semibold text-lg">10,000+ Happy Guests</p>
                                    <div className="flex mt-1.5 items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                        <span className="ml-2 text-sm opacity-80">5.0 Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all">
                            <div className="flex items-center">
                                <div className="bg-blue-500/20 p-3 rounded-lg">
                                    <MapPin className="h-6 w-6 text-blue-300" />
                                </div>
                                <div className="ml-4 text-left">
                                    <p className="font-semibold text-lg">500+ Destinations</p>
                                    <p className="text-sm opacity-80 mt-1">Global coverage</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all">
                            <div className="flex items-center">
                                <div className="bg-green-500/20 p-3 rounded-lg">
                                    <ShieldCheck className="h-6 w-6 text-green-300" />
                                </div>
                                <div className="ml-4 text-left">
                                    <p className="font-semibold text-lg">Premium Collection</p>
                                    <p className="text-sm opacity-80 mt-1">Handpicked luxury</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Press mentions */}
                    <div className="mt-16 opacity-80">
                        <p className="text-sm mb-4">FEATURED IN</p>
                        <div className="flex flex-wrap justify-center items-center gap-6">
                            {['Forbes', 'Travel + Leisure', 'Conde Nast', 'Luxury Travel'].map((brand) => (
                                <div key={brand} className="text-lg font-medium hover:text-blue-300 transition-colors">
                                    {brand}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;