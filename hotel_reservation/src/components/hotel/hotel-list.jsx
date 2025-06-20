import { useState } from "react";
import { MapPin, Star, ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotel } from "../../app/features/hotel/hotelSlice";
import { useEffect } from "react";

export default function HotelsList() {
    const dispatch = useDispatch();
    const { hotelsNearMe: hotels, loading, error } = useSelector((state) => state.hotel);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllHotel());
    }, [dispatch]);

    // Filter hotels based on search term (name, address or description)
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
                <div className="text-center mb-10">
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                        Explore Our Hotels
                    </h2>
                    <p className="text-lg max-w-3xl mx-auto text-gray-600">
                        Discover our collection of exquisite hotels and resorts across various locations.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8 max-w-2xl mx-auto">
                    <div className="relative">
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
                                <Link to={`/hotels/${hotel.id}`}>
                                    <div className="relative h-48">
                                        <img
                                            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
                                            alt={hotel.hotelName}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                                            <h3 className="text-lg font-bold">{hotel.hotelName}</h3>
                                        </div>
                                    </div>
                                </Link>

                                {/* Hotel Info */}
                                <div className="p-4">
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
                                        Book Now
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