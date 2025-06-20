import { Link, useParams } from "react-router-dom";
import { fetchSpecificHotelRooms } from "../app/features/room/roomSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const allRooms = [
    {
        id: 1,
        name: "Deluxe Room",
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 299,
        description: "Spacious comfort with premium amenities and stunning city views.",
        rating: 4.8,
    },
    {
        id: 2,
        name: "Executive Suite",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 499,
        description: "Luxurious suite featuring a separate living area and premium amenities.",
        rating: 4.9,
    },
    {
        id: 3,
        name: "Presidential Suite",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 899,
        description: "Our finest suite offering unparalleled luxury and breathtaking panoramic views.",
        rating: 5.0,
    },
    {
        id: 4,
        name: "Standard Room",
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 199,
        description: "Comfortable and cozy room with all the essential amenities for a pleasant stay.",
        rating: 4.5,
    },
    {
        id: 5,
        name: "Family Suite",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 599,
        description: "Spacious suite designed for families with a separate kids' area and amenities.",
        rating: 4.7,
    },
    {
        id: 6,
        name: "Ocean View Room",
        image: "https://images.unsplash.com/photo-1602002418082-dd878278f6c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 349,
        description: "Wake up to stunning ocean views in this elegantly designed room with a private balcony.",
        rating: 4.9,
    },
    {
        id: 7,
        name: "Business Room",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 249,
        description: "Designed for business travelers with a dedicated work area and high-speed internet.",
        rating: 4.6,
    },
    {
        id: 8,
        name: "Honeymoon Suite",
        image: "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        price: 749,
        description: "Romantic suite featuring a private jacuzzi, champagne service, and panoramic views.",
        rating: 5.0,
    }
];



export default function HotelDetails() {
    const { id } = useParams();
    const dispatch = useDispatch()

    const { hotelRooms: rooms, loading, error } = useSelector((state) => state.room);
    useEffect(() => {
        dispatch(fetchSpecificHotelRooms(id));
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50 p-6 mt-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Rooms</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {rooms.map((room) => (
                        <Link
                            to={`/room-details?hotel=${id}&room_category=${room.roomCategoryId}`} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="relative h-48">
                                <img
                                    src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
                                    alt={room.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium py-1 px-2 rounded-md">
                                    ${room.price}/night
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {room.roomTitle}
                                    </h3>
                                    {/* <StarRating rating={room.rating} /> */}
                                </div>
                                <p className="text-gray-600 text-sm mb-3">
                                    {room.description}
                                </p>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}