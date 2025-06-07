import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { useDispatch } from "react-redux";
import { getAllRooms } from "../../app/features/room/roomSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function RoomStatus() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [roomList, setRoomList] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRooms = useCallback(async () => {
        setIsLoading(true);
        try {
            const resultAction = await dispatch(getAllRooms());
            if (getAllRooms.fulfilled.match(resultAction)) {
                const rooms = unwrapResult(resultAction);
                setRoomList(rooms);
            }
        } catch (error) {
            console.error("Failed to fetch rooms:", error);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchRooms();
        setIsRefreshing(false);
    };

    const roomCounts = {
        all: roomList.length,
        available: roomList.filter(r => r.roomStatus === "AVAILABLE").length,
        occupied: roomList.filter(r => r.roomStatus === "OCCUPIED").length,
        cleaning: roomList.filter(r => r.roomStatus === "CLEANING").length,
        maintenance: roomList.filter(r => r.roomStatus === "MAINTENANCE").length,
    };

    const roomTypeData = [
        { type: 'Deluxe King', percentage: 85 },
        { type: 'Junior Suite', percentage: 70 },
        { type: 'Standard Double', percentage: 55 }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm h-full flex flex-col border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Room Status</h3>
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing || isLoading}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            <div className="px-6 py-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-gray-700">Today's overview</span>
                    <span className="text-xs text-gray-500">Total: {roomCounts.all} rooms</span>
                </div>

                <div className="space-y-4 mb-6">
                    {[
                        { label: "Available", count: roomCounts.available, color: "bg-emerald-500" },
                        { label: "Occupied", count: roomCounts.occupied, color: "bg-red-500" },
                        { label: "Cleaning", count: roomCounts.cleaning, color: "bg-amber-500" },
                        { label: "Maintenance", count: roomCounts.maintenance, color: "bg-gray-500" },
                    ].map(({ label, count, color }) => (
                        <div key={label} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full ${color} mr-2`} />
                                <span className="text-sm text-gray-600">{label}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-lg font-semibold text-gray-700">{count}</span>
                                <span className="ml-1 text-xs text-gray-500">rooms</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Popular Room Types</h4>
                    <div className="space-y-3">
                        {roomTypeData.map((room, idx) => (
                            <div key={idx} className="flex items-center">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${room.percentage}%` }}
                                    />
                                </div>
                                <span className="ml-2 text-xs text-gray-600 min-w-[100px]">{room.type}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        onClick={() => navigate("/rooms")}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        <span>View All Rooms</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
