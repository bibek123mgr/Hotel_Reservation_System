const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-900 text-white">
            {/* Gradient circles */}
            <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[100px] z-0"></div>
            <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[100px] z-0"></div>

            <div className="max-w-7xl mx-auto px-8 py-28 relative z-10 flex flex-col lg:flex-row">
                <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                        Modern Hotel Reservation Platform
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mb-6"></div>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-lg">
                        Enterprise-grade reservation system with advanced analytics and AI-powered revenue optimization. Transform your hotel operations today.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-12">
                        <a href="#pricing" className="flex items-center px-7 py-3.5 rounded-lg font-semibold text-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300">
                            Start Free Trial
                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                        <a href="#" className="flex items-center px-7 py-3.5 rounded-lg font-semibold text-lg bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/15 transition-colors duration-300">
                            Watch Demo
                        </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-y-4">
                        <div className="flex flex-col mr-12">
                            <span className="text-2xl font-bold">2,500+</span>
                            <span className="text-sm text-blue-200">Hotels Worldwide</span>
                        </div>
                        <div className="w-px h-10 bg-white/20 mx-6"></div>
                        <div className="flex flex-col mr-12">
                            <span className="text-2xl font-bold">98%</span>
                            <span className="text-sm text-blue-200">Customer Satisfaction</span>
                        </div>
                        <div className="w-px h-10 bg-white/20 mx-6"></div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">$120M+</span>
                            <span className="text-sm text-blue-200">Additional Revenue Generated</span>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 flex items-center justify-center">
                    <div className="w-full bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 transition-transform duration-500 hover:transform-none transform perspective-1000 rotate-y-[-5deg] rotate-x-[5deg]">
                        <div className="flex justify-between items-center bg-black/30 px-4 py-3">
                            <div className="flex gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            </div>
                            <div className="text-sm text-white/80">Reserve Hub Dashboard</div>
                        </div>
                        <div className="p-0">
                            <img
                                className="w-full h-auto"
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600"
                                alt="Reserve Hub dashboard"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;