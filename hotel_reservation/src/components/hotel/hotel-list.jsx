import { useState } from "react";
import { MapPin, Star, Phone, Globe, ChevronRight, Clock, Tag, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllHotel } from "../../app/features/hotel/hotelSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";


export default function HotelsList() {

    const dispatch = useDispatch();
    const { hotelsNearMe: hotels, loading, error } = useSelector((state) => state.hotel);

    useEffect(() => {
        dispatch(getAllHotel());
    }, [dispatch]);


    return (
        <section className="py-5 bg-white">
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                        Explore Our Hotels
                    </h2>
                    <p className="text-lg max-w-3xl mx-auto text-gray-600">
                        Discover our collection of exquisite hotels and resorts across various locations.
                    </p>
                </div>


                {/* Hotels grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 border-none">
                    {Array.isArray(hotels) && hotels.map((hotel) => (
                        <Link
                            to={`/hotels/${hotel.id}`}
                            key={hotel.id}
                            className="relative border-slate-400 rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow"
                        >
                            {/* Image */}
                            <div className="relative h-52">
                                <img
                                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
                                    alt={hotel.hotelName}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                {/* Name + price at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                                    <h3 className="text-sm font-bold truncate">{hotel.hotelName}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>


                {/* View all button */}

                <div className="text-center mt-12">
                    <Link
                        to="/hotels"
                        className="inline-flex items-center text-blue-500 hover:text-blue-700 underline px-8 py-3 rounded-md font-medium transition-all"
                    >
                        View All Hotels and Resorts
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

            </div>
        </section>
    );
}