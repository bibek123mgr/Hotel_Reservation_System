import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Edit, Trash2, Info } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllReservations } from "../../app/features/reservation/reservationSlice";
import { useEffect } from "react";

// Static data for demonstration
const staticReservations = [
    {
        id: 1,
        guest: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com"
        },
        room: {
            type: "standard",
            roomNumber: "101"
        },
        checkInDate: new Date(2023, 5, 15),
        checkOutDate: new Date(2023, 5, 18),
        status: "confirmed"
    },
    {
        id: 2,
        guest: {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com"
        },
        room: {
            type: "deluxe",
            roomNumber: "201"
        },
        checkInDate: new Date(2023, 5, 20),
        checkOutDate: new Date(2023, 5, 25),
        status: "pending"
    },
    {
        id: 3,
        guest: {
            firstName: "Robert",
            lastName: "Johnson",
            email: "robert.j@example.com"
        },
        room: {
            type: "suite",
            roomNumber: "301"
        },
        checkInDate: new Date(2023, 6, 1),
        checkOutDate: new Date(2023, 6, 5),
        status: "checked_in"
    }
];

const ReservationList = ({ reservations = staticReservations, isLoading = false, onDelete }) => {
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;


    const dispatch = useDispatch();
    const { reservations, loading, error } = useSelector((store) => store.reservation);

    useEffect(() => {
        dispatch(getAllReservations());
    }, [dispatch]);


    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
            case "pending":
                return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs";
            case "needs_attention":
                return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs";
            case "checked_in":
                return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
            case "checked_out":
                return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
            case "cancelled":
                return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs";
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
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return `${diffDays} night${diffDays !== 1 ? 's' : ''}`;
        } catch (error) {
            return "N/A";
        }
    };

    const totalPages = Math.ceil(reservations.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedReservations = reservations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleDeleteReservation = (id) => {
        if (onDelete && confirm("Are you sure you want to delete this reservation?")) {
            onDelete(id);
        }
    };

    if (isLoading) {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {[...Array(5)].map((_, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="ml-4">
                                            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                                            <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex justify-end space-x-2">
                                        <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                                        <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                                        <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (reservations.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">No reservations found</p>
            </div>
        );
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedReservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={`https://ui-avatars.com/api/?name=${reservation.guest.firstName}+${reservation.guest.lastName}&background=random`}
                                                alt={`${reservation.guest.firstName} ${reservation.guest.lastName}`}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {reservation.guest.firstName} {reservation.guest.lastName}
                                            </div>
                                            <div className="text-sm text-gray-500">{reservation.guest.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{reservation.room.type.replace("_", " ")}</div>
                                    <div className="text-sm text-gray-500">Room {reservation.room.roomNumber}</div>
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
                                    <span className={getStatusBadgeClass(reservation.status)}>
                                        {reservation.status.replace("_", " ")}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Link href={`/reservations/${reservation.id}`}>
                                            <button className="p-2 rounded-md hover:bg-gray-100">
                                                <Edit className="h-4 w-4 text-blue-600" />
                                            </button>
                                        </Link>
                                        <Link href={`/reservations/${reservation.id}`}>
                                            <button className="p-2 rounded-md hover:bg-gray-100">
                                                <Info className="h-4 w-4 text-gray-600" />
                                            </button>
                                        </Link>
                                        {onDelete && (
                                            <button
                                                className="p-2 rounded-md hover:bg-gray-100"
                                                onClick={() => handleDeleteReservation(reservation.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between my-4">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page >= totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                                <span className="font-medium">
                                    {Math.min(startIndex + ITEMS_PER_PAGE, reservations.length)}
                                </span>{" "}
                                of <span className="font-medium">{reservations.length}</span> reservations
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${page <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                                    disabled={page <= 1}
                                    onClick={() => setPage(page - 1)}
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === index + 1 ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                                        onClick={() => setPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${page >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                                    disabled={page >= totalPages}
                                    onClick={() => setPage(page + 1)}
                                >
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservationList;