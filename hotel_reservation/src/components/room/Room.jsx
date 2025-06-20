import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRooms } from "../../app/features/room/roomSlice";
import { useEffect } from "react";

// Expanded list of rooms (same as before)
const allRooms = [
    {
        id: 1,
        name: "Deluxe Room",
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 299,
        description: "Spacious comfort with premium amenities and stunning city views.",
        guests: 2,
        bedType: "King Bed",
        size: "45 m²",
        rating: 4.8,
        type: "deluxe",
        amenities: ["wifi", "tv", "breakfast"],
        view: "city"
    },
    {
        id: 2,
        name: "Executive Suite",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 499,
        description: "Luxurious suite featuring a separate living area and premium amenities.",
        guests: 3,
        bedType: "King Bed",
        size: "75 m²",
        rating: 4.9,
        type: "suite",
        amenities: ["wifi", "tv", "breakfast", "minibar"],
        view: "city"
    },
    {
        id: 3,
        name: "Presidential Suite",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 899,
        description: "Our finest suite offering unparalleled luxury and breathtaking panoramic views.",
        guests: 4,
        bedType: "2 King Beds",
        size: "120 m²",
        rating: 5.0,
        type: "suite",
        amenities: ["wifi", "tv", "breakfast", "minibar", "butler"],
        view: "ocean"
    },
    {
        id: 4,
        name: "Standard Room",
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 199,
        description: "Comfortable and cozy room with all the essential amenities for a pleasant stay.",
        guests: 2,
        bedType: "Queen Bed",
        size: "35 m²",
        rating: 4.5,
        type: "standard",
        amenities: ["wifi", "tv"],
        view: "garden"
    },
    {
        id: 5,
        name: "Family Suite",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 599,
        description: "Spacious suite designed for families with a separate kids' area and amenities.",
        guests: 5,
        bedType: "1 King + 2 Single Beds",
        size: "90 m²",
        rating: 4.7,
        type: "family",
        amenities: ["wifi", "tv", "breakfast", "minibar"],
        view: "ocean"
    },
    {
        id: 6,
        name: "Ocean View Room",
        image: "https://images.unsplash.com/photo-1602002418082-dd878278f6c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 349,
        description: "Wake up to stunning ocean views in this elegantly designed room with a private balcony.",
        guests: 2,
        bedType: "King Bed",
        size: "50 m²",
        rating: 4.9,
        type: "deluxe",
        amenities: ["wifi", "tv", "breakfast", "balcony"],
        view: "ocean"
    },
    {
        id: 7,
        name: "Business Room",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 249,
        description: "Designed for business travelers with a dedicated work area and high-speed internet.",
        guests: 1,
        bedType: "Queen Bed",
        size: "40 m²",
        rating: 4.6,
        type: "business",
        amenities: ["wifi", "tv", "breakfast", "desk"],
        view: "city"
    },
    {
        id: 8,
        name: "Honeymoon Suite",
        image: "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 749,
        description: "Romantic suite featuring a private jacuzzi, champagne service, and panoramic views.",
        guests: 2,
        bedType: "King Bed",
        size: "85 m²",
        rating: 5.0,
        type: "suite",
        amenities: ["wifi", "tv", "breakfast", "minibar", "jacuzzi", "balcony"],
        view: "ocean"
    }
];

// Simple star rating component
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} className="text-yellow-400">★</span>
            ))}
            {hasHalfStar && <span className="text-yellow-400">½</span>}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} className="text-gray-300">★</span>
            ))}
            <span className="ml-1 text-sm font-medium">{rating}</span>
        </div>
    );
};




export default function Room() {
    const dispatch = useDispatch();
    const { rooms, loading, error } = useSelector((state) => state.room);
    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);
    return (
        <section className="py-12 bg-gray-50">
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Luxury Accommodations
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Experience ultimate comfort in our meticulously designed rooms and suites,
                        each offering a perfect blend of elegance and modern amenities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {rooms.map((room) => (
                        <Link
                            to={`/room-details?hotel=${room.hotelId}&room_category=${room.roomCategoryId}`}
                            key={room.id}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="relative h-48"> {/* Slightly reduced height for 4-column layout */}
                                <img
                                    src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
                                    alt={room.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium py-1 px-2 rounded-md">
                                    Rs {room.price}/night
                                </div>
                            </div>
                            <div className="p-4"> {/* Reduced padding for compact layout */}
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1"> {/* Added line-clamp for long names */}
                                        {room.roomTitle}
                                    </h3>
                                    <StarRating rating={3} />
                                </div>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2"> {/* Smaller text and line clamp */}
                                    {room.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mb-3"> {/* Tighter spacing */}
                                    <span className="inline-flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-700">
                                        👥 {room.capacity}
                                    </span>

                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link to="/rooms" className="text-blue-500 hover:text-blue-700 px-8 py-3 rounded-lg font-medium transition-colors underline">
                        View All Rooms
                    </Link>
                </div>
            </div>
        </section>
    );
}