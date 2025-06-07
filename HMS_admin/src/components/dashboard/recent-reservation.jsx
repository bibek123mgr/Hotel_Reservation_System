import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { getAllReservations } from "../../app/features/reservation/reservationSlice";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

const ITEMS_PER_PAGE = 4;

export default function RecentReservations() {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const { reservations = [], loading, error } = useSelector((store) => store.reservation);

    useEffect(() => {
        dispatch(getAllReservations());
    }, [dispatch]);


    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "needs_attention":
                return "bg-red-100 text-red-800";
            case "checked_in":
                return "bg-blue-100 text-blue-800";
            case "checked_out":
                return "bg-slate-100 text-slate-800";
            default:
                return "bg-slate-100 text-slate-800";
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

    const renderPagination = () => (
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page <= 1 ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <button
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page >= totalPages ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
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
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${page === index + 1 ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
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
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-2">
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Recent Reservations</h3>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        View all
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[...Array(4)].map((_, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                                            <div className="ml-4">
                                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                                                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex justify-end space-x-2">
                                            <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                                            <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-2">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Reservations</h3>
                <Link to="/reservations" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View all
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedReservations.map((reservation) => (
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
                        ))}
                    </tbody>
                </table>
            </div>
            {renderPagination()}
        </div>
    );
}