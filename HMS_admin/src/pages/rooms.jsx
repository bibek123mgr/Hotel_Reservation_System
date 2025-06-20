import React, { useState, useRef, useEffect } from "react";
import { Search, Plus, EllipsisVertical, Bed } from "lucide-react";
import RoomPostForm from "../components/rooms/roompost-form";
import { useDispatch } from "react-redux";
import { deleteRoom, getAllRooms, updateRoomStatus } from "../app/features/room/roomSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Rooms = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [roomList, setRoomList] = useState([]);
    const [roomToEdit, setRoomToEdit] = useState(null);

    const dispatch = useDispatch();
    const menuRef = useRef(null);

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const resultAction = await dispatch(getAllRooms());
            if (getAllRooms.fulfilled.match(resultAction)) {
                const result = unwrapResult(resultAction);
                setRoomList(result);
            }
        } catch (error) {
            console.error("Failed to fetch rooms:", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = (roomId) => {
        setOpenMenuId(openMenuId === roomId ? null : roomId);
    };

    const handleStatusUpdate = async (roomId, newStatus) => {
        try {
            await dispatch(updateRoomStatus({ roomId, roomStatus: newStatus })).unwrap();
            alert("Room status updated successfully");
            fetchRooms();
        } catch (error) {
            alert("Failed to update room status: " + (error.message || error));
        }
    };

    const handleEdit = (room) => {
        setRoomToEdit(room);
        setIsModalOpen(true);
    };

    const handleDelete = async (roomId) => {
        try {
            console.log(`Delete room with ID: ${roomId}`);
            await dispatch(deleteRoom(roomId)).unwrap();
            alert("Room deleted successfully");
            fetchRooms();
        } catch (error) {
            alert("Failed to delete room: " + (error.message || error));
        }
    };


    const filteredRooms = roomList.filter(r => {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch =
            r.roomNumber?.toLowerCase().includes(lowerSearch) ||
            r.hotelName?.toLowerCase().includes(lowerSearch) ||
            r.roomCategory?.toLowerCase().includes(lowerSearch);

        const matchesFilter =
            filter === "all" || r.roomStatus?.toUpperCase() === filter.toUpperCase();

        return matchesSearch && matchesFilter;
    });

    const roomCounts = {
        all: roomList.length,
        available: roomList.filter(r => r.roomStatus === "AVAILABLE").length,
        occupied: roomList.filter(r => r.roomStatus === "OCCUPIED").length,
        cleaning: roomList.filter(r => r.roomStatus === "CLEANING").length,
        maintenance: roomList.filter(r => r.roomStatus === "MAINTENANCE").length,
    };

    // Helpers

    const statusColor = (status) => {
        switch (status?.toUpperCase()) {
            case "AVAILABLE":
                return "emerald";
            case "OCCUPIED":
                return "red";
            case "CLEANING":
                return "amber";
            case "MAINTENANCE":
                return "gray";
            default:
                return "blue";
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [dispatch]);



    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Rooms</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage all hotel rooms and their status</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Room
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <RoomPostForm
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setRoomToEdit(null);
                    }}
                    fetchRooms={fetchRooms}
                    roomToEdit={roomToEdit}
                />
            )}

            <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                        <h2 className="text-lg font-semibold text-gray-900">Room Management</h2>
                        <div className="relative w-full sm:w-[300px]">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search rooms..."
                                className="pl-8 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Filter rooms by their current status</p>
                </div>
                <div className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(roomCounts).map(([key, count]) => (
                            <button
                                key={key}
                                className={`px-3 py-1 text-sm rounded-md ${filter === key
                                    ? `bg-${statusColor(key)}-600 text-white`
                                    : `bg-white text-${statusColor(key)}-600 border border-${statusColor(key)}-600`
                                    }`}
                                onClick={() => {

                                    console.log(key);
                                    setFilter(key)
                                }}
                            >
                                {capitalize(key)} ({count})
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredRooms.map(room => (
                        <div key={room.id} className="bg-white shadow rounded-lg overflow-hidden relative">
                            <div className="p-4 border-b border-gray-200 flex justify-between">
                                <div className="flex items-center gap-2">
                                    <Bed size={16} />
                                    <h3 className="text-lg font-medium text-gray-900">Room {room.roomNumber}</h3>
                                </div>
                                <button
                                    onClick={() => toggleMenu(room.id)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <EllipsisVertical size={16} />
                                </button>

                                {openMenuId === room.id && (
                                    <div
                                        ref={menuRef}
                                        className="absolute right-6 top-10 z-20 w-56 rounded-lg bg-white shadow-xl border border-gray-200"
                                    >
                                        <div className="py-2">
                                            {["AVAILABLE", "OCCUPIED", "CLEANING", "MAINTENANCE"].map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => handleStatusUpdate(room.id, status)}
                                                    className={`flex items-center w-full gap-2 px-4 py-2 text-sm text-${statusColor(status)}-700 hover:bg-${statusColor(status)}-50 transition-colors`}
                                                >
                                                    <span className={`h-2 w-2 rounded-full bg-${statusColor(status)}-500`} />
                                                    <span>Mark as {capitalize(status)}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="border-t border-gray-200" />
                                        <div className="py-2">
                                            <button
                                                onClick={() => handleEdit(room)}
                                                className="flex items-center w-full gap-2 px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors"
                                            >
                                                ✏️ <span>Edit Room</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(room.id)}
                                                className="flex items-center w-full gap-2 px-4 py-2 text-sm text-rose-700 hover:bg-rose-50 transition-colors"
                                            >
                                                🗑️ <span>Delete Room</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 space-y-4">
                                <InfoRow label="Room Type" value={room.roomCategory} />
                                <InfoRow label="Floor" value={room.floor} />
                                <InfoRow
                                    label="Status"
                                    value={
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${statusColor(room.roomStatus)}-100 text-${statusColor(room.roomStatus)}-800`}>
                                            {room.roomStatus}
                                        </span>
                                    }
                                />
                                <InfoRow label="Price" value={`Rs. ${room.price}/night`} />
                                <InfoRow label="Capacity" value={`${room.capacity} ${room.capacity === 1 ? "guest" : "guests"}`} />
                                <div>
                                    <p className="text-sm text-gray-500">Description</p>
                                    <p className="text-sm text-gray-500">{room.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};



const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const InfoRow = ({ label, value }) => (
    <div className="flex items-center gap-1 text-sm text-gray-500 capitalize justify-between">
        <p>{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
);

const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <div className="h-6 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
                <div className="p-4 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                    <div className="flex justify-between">
                        <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
                        <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default Rooms;
