
import { useState } from "react";
import { MapPin, Star, ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllHotel } from "../app/features/hotel/hotelSlice";

export default function Hotels() {
    const dispatch = useDispatch();
    const { hotels, loading, error } = useSelector((state) => state.hotel);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllHotel());
    }, [dispatch]);

    // Filter hotels based on search term (name or address)
    const filteredHotels = Array.isArray(hotels)
        ? hotels.filter(hotel => {
            const searchLower = searchTerm.toLowerCase();
            return (
                hotel.hotelName.toLowerCase().includes(searchLower) ||
                (hotel.address && hotel.address.toLowerCase().includes(searchLower)) ||
                (hotel.description && hotel.description.toLowerCase().includes(searchLower))
            );
        })
        : [];

    return (
        <section className="py-5 bg-white">
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search hotels by name, address or description..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                onClick={() => setSearchTerm("")}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Loading and Error States */}
                {loading && <div className="text-center py-10">Loading hotels...</div>}
                {error && <div className="text-center py-10 text-red-500">Error loading hotels: {error}</div>}

                {/* Hotels grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHotels.length > 0 ? (
                        filteredHotels.map((hotel) => (
                            <div
                                key={hotel.id}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                            >
                                {/* Image */}
                                <div className="relative h-48">
                                    <img
                                        src={hotel.imageUrl}
                                        alt={hotel.hotelName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Hotel Info */}
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-800">{hotel.hotelName}</h3>
                                    </div>

                                    {/* Address */}
                                    {hotel.address && (
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            <p className="text-sm">{hotel.address}</p>
                                        </div>
                                    )}

                                    {/* Description */}
                                    {hotel.description && (
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {hotel.description}
                                        </p>
                                    )}

                                    {/* View Details Button */}
                                    <Link
                                        to={`/hotels/${hotel.id}`}
                                        className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        View Details
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && !error && (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                No hotels found matching your search.
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}