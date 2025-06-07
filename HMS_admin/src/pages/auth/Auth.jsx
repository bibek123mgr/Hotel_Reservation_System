import React from 'react';
import AuthForm from '../../components/auth/auth-form';

const Auth = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
            {/* Enhanced decorative elements */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-blue-500/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-blue-200/20 rounded-full blur-lg"></div>
            <div className="absolute bottom-1/3 left-1/4 w-14 h-14 bg-blue-500/5 rounded-full blur-lg"></div>

            {/* Pattern overlay - subtle hotel-themed pattern */}
            <div className="absolute inset-0 opacity-30 z-0 bg-pattern"></div>

            {/* Hotel name with decoration */}
            <div className="relative mb-6 mt-10 text-center">
                <h1 className="text-2xl font-bold text-blue-500 tracking-tight">RESERVE HUB</h1>
                <div className="mt-1 flex items-center justify-center">
                    <div className="h-px w-4 bg-blue-500/30"></div>
                    <div className="mx-1 text-[10px] text-blue-500/70 font-medium">ESTABLISHED 1968</div>
                    <div className="h-px w-4 bg-blue-500/30"></div>
                </div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-[420px]">
                <div className="bg-white py-4 px-4 shadow-lg sm:rounded-xl sm:px-5 border border-blue-50 relative overflow-hidden bg-keycard">
                    {/* Decorative header accent */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/80 via-blue-500 to-blue-500/80"></div>

                    <div className="text-center mb-2">
                        <div className="mx-auto h-10 w-10 bg-gradient-to-r from-blue-500 to-blue-500/70 text-white flex items-center justify-center rounded-full shadow-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                    </div>
                    <AuthForm />

                    {/* Decorative bottom accent */}
                    <div className="absolute bottom-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                </div>

                {/* Luxury badge */}
                <div className="flex justify-center mt-4">
                    <div className="px-3 py-0.5 rounded-full bg-white/90 shadow-sm border border-blue-100 text-[10px] text-gray-600 flex items-center gap-1.5">
                        <span className="text-blue-500/80">★</span>
                        <span>Luxury Accommodations</span>
                        <span className="text-blue-500/80">★</span>
                    </div>
                </div>

                {/* Hotel partner badges */}
                <div className="flex items-center justify-center mt-3 space-x-6">
                    <div className="text-[8px] text-slate-500 flex items-center opacity-60">
                        <div className="h-0.5 w-2 bg-slate-200 rounded-full mr-1"></div>
                        WIFI INCLUDED
                    </div>
                    <div className="text-[8px] text-slate-500 flex items-center opacity-60">
                        <div className="h-0.5 w-2 bg-slate-200 rounded-full mr-1"></div>
                        BREAKFAST OPTION
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Auth;
