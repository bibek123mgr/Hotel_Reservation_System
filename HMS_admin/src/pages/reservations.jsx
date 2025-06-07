import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Edit, Plus, Trash2, Search, Info } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReservations } from "../app/features/reservation/reservationSlice";

const Reservations = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showNewReservationDialog, setShowNewReservationDialog] = useState(false);

    const dispatch = useDispatch();
    const { reservations = [], loading, error } = useSelector((store) => store.reservation);

    useEffect(() => {
        dispatch(getAllReservations());
    }, [dispatch]);

    const filteredReservations = reservations.filter((reservation) => {
        const searchLower = searchTerm.toLowerCase();
        const guestFullName = reservation.userName?.toLowerCase() || "";
        const roomInfo = `${reservation.roomCategory} ${reservation.roomNumber}`.toLowerCase();
        const email = reservation.guest?.email?.toLowerCase() || "";
        const status = reservation.status?.toLowerCase() || "";

        return guestFullName.includes(searchLower) ||
            roomInfo.includes(searchLower) ||
            email.includes(searchLower) ||
            status.includes(searchLower);
    });

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
            case "pending":
                return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs";
            case "needs_attention":
            case "cancelled":
                return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs";
            case "checked_in":
                return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
            case "checked_out":
                return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
            default:
                return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
        }
    };

    const formatDate = (date) => {
        try {
            return format(new Date(date), "MMM dd, yyyy");
        } catch (error) {
            return "Invalid date";
        }
    };

    const calculateNights = (checkIn, checkOut) => {
        try {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return `${diffDays} night${diffDays !== 1 ? 's' : ''}`;
        } catch (error) {
            return "N/A";
        }
    };

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Reservations</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage all guest reservations</p>
                </div>
                <button
                    className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowNewReservationDialog(true)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Reservation
                </button>
            </div>

            {/* Reservation Dialog UI skipped for brevity */}

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">All Reservations</h2>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search reservations..."
                                className="pl-8 w-[300px] border border-gray-300 rounded-md px-3 py-2 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        {filteredReservations.length} total reservations
                    </p>
                </div>

                <div className="px-6 py-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan="6" className="p-6 text-center text-gray-500">Loading reservations...</td></tr>
                                ) : filteredReservations.length === 0 ? (
                                    <tr><td colSpan="6" className="p-6 text-center text-gray-500">No reservations found</td></tr>
                                ) : (
                                    filteredReservations.map((reservation) => (
                                        <tr key={reservation.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500">
                                                        <img
                                                            src={`https://ui-avatars.com/api/?name=${reservation.userName}&background=random`}
                                                            alt={reservation.userName}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {reservation.userName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {reservation.userEmail || "N/A"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{reservation.roomCategory}</div>
                                                <div className="text-sm text-gray-500">Room {reservation.roomNumber}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{formatDate(reservation.checkInDate)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{formatDate(reservation.checkOutDate)}</div>
                                                <div className="text-sm text-gray-500">
                                                    {calculateNights(reservation.checkInDate, reservation.checkOutDate)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={getStatusBadgeClass(reservation.reservationStatus)}>
                                                    {reservation.reservationStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Link to={`/reservations/${reservation.id}`}>
                                                        <button className="p-2 rounded-md hover:bg-gray-100">
                                                            <Edit className="h-4 w-4 text-blue-600" />
                                                        </button>
                                                    </Link>
                                                    <Link to={`/reservations/${reservation.id}`}>
                                                        <button className="p-2 rounded-md hover:bg-gray-100">
                                                            <Info className="h-4 w-4 text-gray-600" />
                                                        </button>
                                                    </Link>
                                                    <button className="p-2 rounded-md hover:bg-gray-100">
                                                        <Trash2 className="h-4 w-4 text-red-600" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
                    Showing {filteredReservations.length} reservation(s)
                </div>
            </div>
        </div>
    );
};

export default Reservations;
