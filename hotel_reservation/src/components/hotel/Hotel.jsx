import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Ruler, Users, Wifi, Coffee, Tv } from "lucide-react";

export default function HotelRoom({ room }) {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                        <img
                            src={room.image}
                            alt={room.type}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h3 className="text-xl font-bold mb-2">{room.type}</h3>
                        <p className="text-gray-600 mb-4">{room.description}</p>

                        <div className="flex flex-wrap gap-3 mb-4">
                            <div className="flex items-center text-sm">
                                <Bed className="h-4 w-4 mr-1 text-blue" />
                                <span>{room.bedType}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <Ruler className="h-4 w-4 mr-1 text-blue" />
                                <span>{room.size} sq.ft</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <Users className="h-4 w-4 mr-1 text-blue" />
                                <span>Max {room.maxGuests} guests</span>
                            </div>
                            {room.amenities.includes('wifi') && (
                                <div className="flex items-center text-sm">
                                    <Wifi className="h-4 w-4 mr-1 text-blue" />
                                    <span>WiFi</span>
                                </div>
                            )}
                            {/* Add more amenities as needed */}
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-2xl font-bold">${room.price}</span>
                                <span className="text-gray-500"> / night</span>
                            </div>
                            <Button className="bg-blue hover:bg-blue/90">
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
