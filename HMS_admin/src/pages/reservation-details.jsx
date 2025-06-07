import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    Edit,
    Trash2,
    Calendar,
    User,
    Home,
    BedDouble,
    MessageSquare
} from "lucide-react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getReservation, updateReservationStatus } from "../app/features/reservation/reservationSlice";

const ReservationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [status, setStatus] = useState(""); // local status
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getReservation(id));
        }
    }, [dispatch, id, status]);

    const { error, loading, currentReservation } = useSelector((store) => store.reservation);

    const reservation = currentReservation
        ? {
            id: currentReservation.id,
            guest: {
                id: currentReservation.userId,
                firstName: currentReservation.userName.split(" ")[0] || "",
                lastName: currentReservation.userName.split(" ")[1] || "",
                email: currentReservation.userEmail,
                phone: "",
                address: ""
            },
            room: {
                type: currentReservation.roomCategory,
                roomNumber: currentReservation.roomNumber,
                pricePerNight: currentReservation.price
            },
            checkInDate: currentReservation.checkInDate,
            checkOutDate: currentReservation.checkOutDate,
            status: currentReservation.reservationStatus.toLowerCase(),
            numberOfGuests: currentReservation.numberOfGuests,
            specialRequests: "",
            totalAmount: currentReservation.price,
            createdAt: currentReservation.createdAt
        }
        : null;

    useEffect(() => {
        if (reservation) {
            setStatus(reservation.status);
        }
    }, [reservation]);

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this reservation?")) {
            setIsDeleting(true);
            setTimeout(() => {
                setIsDeleting(false);
                alert("Reservation deleted successfully!");
                navigate("/reservations");
            }, 1000);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        const uppercaseStatus = newStatus.toUpperCase();
        try {
            await dispatch(updateReservationStatus({ id: reservation.id, status: uppercaseStatus })).unwrap();
        } catch (error) {
            alert("Failed to update status: " + error);
        }
    };

    const formatDate = (date) => {
        try {
            return format(new Date(date), "MMMM dd, yyyy");
        } catch {
            return "Invalid date";
        }
    };


    const statusOptions = [
        { value: "confirmed", label: "Confirmed" },
        { value: "pending", label: "Pending" },
        { value: "checked_in", label: "Checked In" },
        { value: "checked_out", label: "Checked Out" },
        { value: "cancelled", label: "Cancelled" }
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "confirmed":
                return { backgroundColor: "#dcfce7", color: "#166534" };
            case "pending":
                return { backgroundColor: "#fef3c7", color: "#78350f" };
            case "checked_in":
                return { backgroundColor: "#dbeafe", color: "#1e40af" };
            case "checked_out":
                return { backgroundColor: "#f3f4f6", color: "#374151" };
            case "cancelled":
                return { backgroundColor: "#fee2e2", color: "#991b1b" };
            default:
                return { backgroundColor: "#f3f4f6", color: "#374151" };
        }
    };

    if (!reservation) {
        return (
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-6">
                    <button
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                        onClick={() => navigate("/reservations")}
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to reservations
                    </button>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex flex-col items-center justify-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Reservation not found</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            The reservation you're looking for doesn't exist or has been deleted.
                        </p>
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            onClick={() => navigate("/reservations")}
                        >
                            Return to Reservations
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
                <button
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                    onClick={() => navigate("/reservations")}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to reservations
                </button>
                <div className="flex space-x-2">
                    <button
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                        onClick={() => setShowEditDialog(true)}
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </button>
                    <button
                        className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>

            {/* Edit Dialog (Placeholder) */}
            {showEditDialog && (
                <div className="fixed inset-0 overflow-y-auto z-50">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            onClick={() => setShowEditDialog(false)}
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                            Edit Reservation
                                        </h3>
                                        <div className="bg-gray-100 p-4 rounded-md">
                                            <p className="text-sm text-gray-500">
                                                Editing reservations is not supported yet. Coming soon!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowEditDialog(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Reservation #{reservation.id}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Created on {formatDate(reservation.createdAt)}
                        </p>
                    </div>

                    {/* Status Select */}
                    <select
                        className={`mt-2 sm:mt-0 px-3 py-1 rounded text-sm font-medium cursor-pointer`}
                        value={status}
                        onChange={handleStatusChange}
                        style={getStatusStyle(status)}
                    >
                        {statusOptions.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 py-4 border-b border-gray-200">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Guest Information</h3>
                        <p className="text-gray-700">
                            <User className="inline-block mr-2 h-5 w-5 text-gray-500" />
                            {reservation.guest.firstName} {reservation.guest.lastName}
                        </p>
                        <p className="text-gray-700">
                            <Home className="inline-block mr-2 h-5 w-5 text-gray-500" />
                            {reservation.guest.email}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Room Details</h3>
                        <p className="text-gray-700">
                            <BedDouble className="inline-block mr-2 h-5 w-5 text-gray-500" />
                            {reservation.room.type} — Room #{reservation.room.roomNumber}
                        </p>
                        <p className="text-gray-700">
                            Price per Night Rs.: {(reservation.room.pricePerNight)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 py-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Dates</h3>
                        <p className="text-gray-700">
                            <Calendar className="inline-block mr-2 h-5 w-5 text-gray-500" />
                            Check-in: {formatDate(reservation.checkInDate)}
                        </p>
                        <p className="text-gray-700">
                            <Calendar className="inline-block mr-2 h-5 w-5 text-gray-500" />
                            Check-out: {formatDate(reservation.checkOutDate)}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Details</h3>
                        <p className="text-gray-700">
                            <User className="inline-block mr-2 h-5 w-5 text-gray-500" />
                            Number of Guests: {reservation.numberOfGuests}
                        </p>
                        <p className="text-gray-700">
                            <MessageSquare className="inline-block mr-2 h-5 w-5 text-gray-500" />
                            Special Requests: {reservation.specialRequests || "None"}
                        </p>
                        <p className="text-gray-700 font-semibold mt-4">
                            Total Amount Rs.: {(reservation.totalAmount)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationDetails;
