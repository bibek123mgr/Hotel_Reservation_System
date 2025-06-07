import { useState, useEffect } from "react";
import {
    ChevronRight,
    Users,
    Bed,
    SquareEqual,
    Filter,
    Star,
    StarHalf
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../app/features/room/roomSlice";


export default function Rooms() {
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [selectedViews, setSelectedViews] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [guestCount, setGuestCount] = useState([1]);
    const [showFilters, setShowFilters] = useState(false);

    const dispatch = useDispatch();
    const { rooms, loading, error } = useSelector((state) => state.room);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    const toggleRoomType = (type) => {
        setSelectedRoomTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };


    const toggleView = (view) => {
        setSelectedViews((prev) =>
            prev.includes(view) ? prev.filter((v) => v !== view) : [...prev, view]
        );
    };

    const clearFilters = () => {
        setSelectedRoomTypes([]);
        setSelectedViews([]);
        setPriceRange([0, 1000]);
        setGuestCount([1]);
    };

    const filteredRooms = rooms.filter((room) => {
        if (selectedRoomTypes.length > 0 && !selectedRoomTypes.includes(room.type)) {
            return false;
        }
        if (selectedViews.length > 0 && !selectedViews.includes(room.view)) {
            return false;
        }
        if (room.price < priceRange[0] || room.price > priceRange[1]) {
            return false;
        }
        if (room.guests < guestCount[0]) {
            return false;
        }
        return true;
    });



    return (
        <section className="py-20 bg-neutral-100">
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
                    <div className="lg:max-w-2xl mb-8 lg:mb-0">
                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                            Our Luxury Accommodations
                        </h2>
                        <p className="text-lg text-gray-600">
                            Experience ultimate comfort in our meticulously designed rooms and suites,
                            each offering a perfect blend of elegance and modern amenities.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-all flex items-center gap-2 px-4 py-2 lg:hidden"
                        >
                            <Filter className="h-4 w-4" />
                            {showFilters ? "Hide Filters" : "Show Filters"}
                        </button>
                        <button
                            onClick={clearFilters}
                            className="border border-blue-600 text-blue-600 hover:bg-blue-50 rounded font-medium transition-all px-4 py-2"
                        >
                            Clear All Filters
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className={`lg:w-1/4 bg-white p-6 lg:sticky lg:top-8 lg:self-start rounded-xl shadow-md ${showFilters ? "block" : "hidden lg:block"}`}>
                        <h3 className="text-xl font-bold text-blue-600 border-b pb-2 mb-4">
                            <Filter className="inline mr-2 h-5 w-5" />
                            Filter Rooms
                        </h3>

                        <div className="mb-6">
                            <h4 className="font-medium text-gray-800 mb-3">Price Range</h4>
                            <div className="px-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="50"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                    className="w-full mb-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="50"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full mb-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-medium text-gray-800 mb-3">Guests</h4>
                            <div className="px-2">
                                <input
                                    type="range"
                                    min="1"
                                    max="6"
                                    step="1"
                                    value={guestCount[0]}
                                    onChange={(e) => setGuestCount([parseInt(e.target.value)])}
                                    className="w-full mb-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>{guestCount[0]} {guestCount[0] === 1 ? "Guest" : "Guests"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 lg:hidden">
                            <button
                                onClick={() => setShowFilters(false)}
                                className="w-full bg-accent-600 hover:bg-accent-700 text-white rounded font-medium transition-all px-4 py-2"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-3/4">
                        {filteredRooms.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No rooms match your filters</h3>
                                <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                                <button
                                    onClick={clearFilters}
                                    className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            filteredRooms.map((room) => (
                                <Link
                                    to={`/room-details?hotel=${room.hotelId}&room_category=${room.roomCategoryId}`}
                                    key={room.id}
                                    className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row"
                                >
                                    <div className="md:w-1/3 h-64 md:h-auto">
                                        <img
                                            src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
                                            alt={room.roomTitle || "Room Image"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3 flex flex-col">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    {`${room.hotelName}(${room.roomCategory})`}
                                                </h3>
                                                <div className="bg-white/90 backdrop-blur-sm text-blue-600 text-sm font-semibold py-1 px-3 rounded">
                                                    {room.price != null ? `$${room.price}/night` : "Price not available"}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-4">
                                            {room.description || "No description available."}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="inline-flex items-center bg-gray-50 text-gray-600 text-sm px-3 py-1.5 rounded-full">
                                                <Users className="mr-1.5 h-4 w-4" /> {room.capacity ?? "N/A"} Guests
                                            </span>
                                            <span className="inline-flex items-center bg-gray-50 text-gray-600 text-sm px-3 py-1.5 rounded-full">
                                                <Bed className="mr-1.5 h-4 w-4" /> {room.bedType || "Bed info N/A"}
                                            </span>
                                            <span className="inline-flex items-center bg-gray-50 text-gray-600 text-sm px-3 py-1.5 rounded-full">
                                                <SquareEqual className="mr-1.5 h-4 w-4" /> {room.size || "Size N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}

                        <div className="text-center mt-12">
                            <p className="text-gray-600 mb-4">
                                Showing {filteredRooms.length} of {rooms.length} accommodations
                            </p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors inline-flex items-center">
                                Check Availability <ChevronRight className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
