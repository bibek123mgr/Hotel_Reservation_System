import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchRoom } from "../app/features/room/roomSlice";
import {
    X,
    ChevronLeft,
} from "lucide-react";
import BookingForm from "../components/booking-form";

export default function RoomDetails() {
    const [activeTab, setActiveTab] = useState("overview");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const hotelId = queryParams.get('hotel');
    const roomCategoryId = queryParams.get('room_category');

    const dispatch = useDispatch();
    const { room, loading, error } = useSelector((state) => state.room);

    useEffect(() => {
        if (hotelId && roomCategoryId) {
            dispatch(fetchRoom({ hotelId, roomCategoryId }));
        }
    }, [dispatch, hotelId, roomCategoryId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2.5"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 p-6 rounded-lg max-w-md text-center">
                    <div className="inline-flex h-12 w-12 rounded-full bg-red-100 p-2 mb-4">
                        <X className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Room</h3>
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={() => dispatch(fetchRoom({ hotelId, roomCategoryId }))}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-yellow-50 p-6 rounded-lg max-w-md text-center">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Room Found</h3>
                    <p className="text-yellow-600">Please check the URL or try another room.</p>
                </div>
            </div>
        );
    }

    // Multiple room images for gallery effect
    const roomImages = [
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    ];



    // Custom Tab Component
    const Tab = ({ value, children }) => (
        <button
            onClick={() => setActiveTab(value)}
            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === value
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
                }`}
        >
            {children}
        </button>
    );


    const Button = ({ children, className = "", variant = "default", onClick, ...props }) => {
        const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

        const variantClasses = {
            default: "bg-blue-500 text-white hover:bg-blue-500/90",
            outline: "border border-blue-500 text-blue-500 hover:bg-blue-500/10",
            ghost: "hover:bg-gray-100 hover:text-gray-900",
        }[variant];

        return (
            <button
                className={`${baseClasses} ${variantClasses} ${className}`}
                onClick={onClick}
                {...props}
            >
                {children}
            </button>
        );
    };

    const Separator = ({ className = "" }) => (
        <hr className={`border-t border-gray-200 ${className}`} />
    );


    return (
        <div className="font-sans text-neutral-dark bg-gray-50 min-h-screen">
            {/* Back button */}
            <div className="bg-white py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                        <ChevronLeft className="h-5 w-5 mr-1" />
                        <span>Back to Hotels</span>
                    </button>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Room title and basic info */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            {room.roomCategory || "Deluxe"} Room
                        </h1>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-blue-500 mr-2">${room.price || "---"}</span>
                            <span className="text-gray-500">per night</span>
                        </div>
                        <span className="text-sm text-gray-600 mt-1">
                            {room.roomCount ?? 0} room{room.roomCount === 1 ? "" : "s"} available
                        </span>
                    </div>

                </div>

                {/* Image gallery */}
                <div className="relative mb-10 rounded-xl overflow-hidden shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[60vh]">
                        <div className="col-span-2 row-span-2 relative">
                            <img
                                src={roomImages[0]}
                                alt="Room main view"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="hidden md:block">
                            <img
                                src={roomImages[1]}
                                alt="Room bathroom"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="hidden md:block">
                            <img
                                src={roomImages[2]}
                                alt="Room view"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Reserve Now button - fixed at bottom on mobile */}
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 md:hidden z-20">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <span className="text-xl font-bold text-blue-500">${room.price || "---"}</span>
                            <span className="text-sm text-gray-500"> / night</span>
                        </div>
                    </div>

                </div>

                {/* Content tabs and booking card */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column - Room details */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                            <div className="border-b">
                                <div className="flex overflow-x-auto scrollbar-hide">
                                    <Tab value="overview">Overview</Tab>
                                    <Tab value="reviews">Reviews</Tab>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Overview tab */}
                                {activeTab === "overview" && (
                                    <div className="space-y-8">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 mb-4">About this room</h2>
                                            <p className="text-gray-700 leading-relaxed">
                                                {room.description ||
                                                    "Experience luxury and comfort in our beautifully appointed Deluxe Room. Thoughtfully designed for both business and leisure travelers, this spacious accommodation offers a peaceful retreat with modern amenities and elegant furnishings. Wake up refreshed in a plush king-size bed and enjoy the convenience of a well-equipped workspace, high-speed WiFi, and a sleek ensuite bathroom."}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* {activeTab === "reviews" && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-bold text-gray-900">Guest Reviews</h2>
                                            <div className="flex items-center bg-blue-500/10 px-3 py-1.5 rounded-full">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                                <span className="font-semibold">4.8</span>
                                                <span className="text-gray-500 text-sm ml-1">/ 5</span>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {[
                                                {
                                                    name: "Sarah J.",
                                                    date: "March 15, 2025",
                                                    rating: 5,
                                                    comment: "Beautiful room with amazing views. The bed was incredibly comfortable and the staff were very helpful. Would definitely stay here again!"
                                                },
                                                {
                                                    name: "Michael T.",
                                                    date: "February 28, 2025",
                                                    rating: 4,
                                                    comment: "Great location and excellent amenities. The room was spacious and clean. Only minor issue was the air conditioning was a bit noisy."
                                                },
                                                {
                                                    name: "Emma L.",
                                                    date: "January 12, 2025",
                                                    rating: 5,
                                                    comment: "Perfect stay! The room exceeded my expectations. Everything was spotless and the rainfall shower was amazing. Highly recommend!"
                                                }
                                            ].map((review, index) => (
                                                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900">{review.name}</h3>
                                                            <p className="text-sm text-gray-500">{review.date}</p>
                                                        </div>
                                                        <div className="flex">
                                                            {[...Array(review.rating)].map((_, i) => (
                                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700">{review.comment}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="w-full py-2"
                                        >
                                            View all 142 reviews
                                        </Button>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-96 hidden md:block">
                        <div className="bg-white rounded-xl shadow-sm sticky top-8">
                            <BookingForm roomCategoryId={roomCategoryId} hotelId={hotelId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}