import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Star, MapPin, Phone, Globe, Mail, Clock, Wifi, Coffee, Utensils, Users, FileText, PawPrint } from "lucide-react";

const hotel = {
    id: "1",
    name: "Luxe Haven Hotel & Spa",
    location: "Downtown, New York",
    description: "Experience luxury and comfort in the heart of the city. Luxe Haven offers spacious rooms, exceptional amenities, and personalized service to make your stay memorable.",
    rating: 4.8,
    reviewCount: 235,
    price: "$200 - $500",
    phone: "+1 (555) 123-4567",
    email: "contact@luxehaven.com",
    website: "www.luxehaven.com",
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant", "Bar", "Room Service", "Concierge", "Business Center", "Parking"],
    policies: {
        cancellation: "Free cancellation up to 24 hours before check-in. Cancellations made within 24 hours will be charged for one night's stay.",
        children: "Children under 12 stay free when sharing a room with parents. Extra beds available for additional charge.",
        pets: "Pets are not allowed, with the exception of service animals."
    }
};

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

export default function HotelDetails() {
    const [activeTab, setActiveTab] = useState("overview");


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-15 sm:px-6 lg:px-8">
                <div className="relative w-full h-92 lg:h-[400px] overflow-hidden">
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-end pb-10">
                        <div className="container mx-auto px-6">
                            <div className="max-w-3xl">
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{hotel.name}</h1>
                                <div className="flex items-center gap-2 text-white/90 mb-4">
                                    <MapPin className="h-5 w-5" />
                                    <span className="text-lg">{hotel.location}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-white/90 px-3 py-1 rounded-full">
                                        <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                                        <span className="text-blue-800 font-medium">{hotel.rating}</span>
                                        <span className="ml-1 text-gray-700">({hotel.reviewCount})</span>
                                    </div>
                                    <span className="text-white text-lg font-medium">
                                        {hotel.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto py-7">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Content Area */}
                        <div className="w-full">
                            {/* Simplified Tab Navigation */}
                            <div className="border-b border-gray-200 mb-8">
                                <nav className="flex space-x-6 justify-end">
                                    {["overview", "rooms"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${activeTab === tab
                                                ? "border-blue-600 text-blue-700"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="space-y-8">
                                {/* Overview Tab - Now includes amenities and policies */}
                                {activeTab === "overview" && (
                                    <div className="space-y-8">
                                        <section>
                                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Description</h2>
                                            <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                                        </section>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <section>
                                                <h3 className="text-lg font-medium text-gray-800 mb-3">Contact Information</h3>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center gap-3 text-gray-600">
                                                        <Phone className="h-5 w-5 text-blue-600" />
                                                        <span>{hotel.phone}</span>
                                                    </li>
                                                    <li className="flex items-center gap-3 text-gray-600">
                                                        <Mail className="h-5 w-5 text-blue-600" />
                                                        <span>{hotel.email}</span>
                                                    </li>
                                                    <li className="flex items-center gap-3 text-gray-600">
                                                        <Globe className="h-5 w-5 text-blue-600" />
                                                        <a href={hotel.website} className="hover:underline">
                                                            {hotel.website}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </section>

                                            <section>
                                                <h3 className="text-lg font-medium text-gray-800 mb-3">Check-In Information</h3>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center gap-3 text-gray-600">
                                                        <Clock className="h-5 w-5 text-blue-600" />
                                                        <span>Check-In: {hotel.checkIn}</span>
                                                    </li>
                                                    <li className="flex items-center gap-3 text-gray-600">
                                                        <Clock className="h-5 w-5 text-blue-600" />
                                                        <span>Check-Out: {hotel.checkOut}</span>
                                                    </li>
                                                </ul>
                                            </section>
                                        </div>

                                        {/* Simplified Amenities Section */}
                                        <section>
                                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Amenities</h2>
                                            <div className="flex flex-wrap gap-3">
                                                {hotel.amenities.map((amenity, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center px-4 py-2 bg-gray-50 rounded-full border border-gray-200"
                                                    >
                                                        {amenity.includes("WiFi") && <Wifi className="h-4 w-4 mr-2 text-blue-600" />}
                                                        {amenity.includes("Restaurant") && <Utensils className="h-4 w-4 mr-2 text-blue-600" />}
                                                        {amenity.includes("Coffee") && <Coffee className="h-4 w-4 mr-2 text-blue-600" />}
                                                        <span className="text-sm text-gray-700">{amenity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Simplified Policies Section */}
                                        <section>
                                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Policies</h2>
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="font-medium text-gray-800 mb-1 flex items-center gap-2">
                                                        <FileText className="h-5 w-5 text-blue-600" />
                                                        Cancellation Policy
                                                    </h3>
                                                    <p className="text-gray-600 pl-7 text-sm">{hotel.policies.cancellation}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 mb-1 flex items-center gap-2">
                                                        <Users className="h-5 w-5 text-blue-600" />
                                                        Children Policy
                                                    </h3>
                                                    <p className="text-gray-600 pl-7 text-sm">{hotel.policies.children}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800 mb-1 flex items-center gap-2">
                                                        <PawPrint className="h-5 w-5 text-blue-600" />
                                                        Pet Policy
                                                    </h3>
                                                    <p className="text-gray-600 pl-7 text-sm">{hotel.policies.pets}</p>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )}

                                {/* Rooms Tab (unchanged) */}
                                {activeTab === "rooms" && (
                                    <section>
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Accommodation Options</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {allRooms.map((room) => (
                                                <div
                                                    key={room.id}
                                                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                                                >
                                                    <div className="relative h-48"> {/* Slightly reduced height for 4-column layout */}
                                                        <img
                                                            src={room.image}
                                                            alt={room.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium py-1 px-2 rounded-md">
                                                            ${room.price}/night
                                                        </div>
                                                    </div>
                                                    <div className="p-4"> {/* Reduced padding for compact layout */}
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1"> {/* Added line-clamp for long names */}
                                                                {room.name}
                                                            </h3>
                                                            <StarRating rating={room.rating} />
                                                        </div>
                                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2"> {/* Smaller text and line clamp */}
                                                            {room.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-1.5 mb-3"> {/* Tighter spacing */}
                                                            <span className="inline-flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-700">
                                                                👥 {room.guests}
                                                            </span>
                                                            <span className="inline-flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-700">
                                                                🛏️ {room.bedType.split(' ')[0]} {/* Show just "King" instead of "King Bed" */}
                                                            </span>
                                                            <span className="inline-flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-700">
                                                                📏 {room.size}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex space-x-1">
                                                                {room.amenities.slice(0, 3).map(amenity => (
                                                                    <span key={amenity} className="text-gray-500 text-sm" title={amenity}>
                                                                        {amenity === "wifi" && "📶"}
                                                                        {amenity === "tv" && "📺"}
                                                                        {amenity === "breakfast" && "🍳"}
                                                                        {amenity === "balcony" && "🌞"}
                                                                        {amenity === "minibar" && "🍷"}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <Link to={`/rooms/${room.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-xs cursor-pointer">
                                                                Reserve →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}