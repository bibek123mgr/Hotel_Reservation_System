import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
    Hotel,
    User,
    Calendar,
    DollarSign,
    Bed,
    MessageSquare,
    Star,
    X,
    Check,
    Clock,
    ChevronRight
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReviews, fetchReservations } from "../app/features/reservation/reservationSlice";

const statusColors = {
    PENDING: "bg-yellow-50 text-yellow-700",
    CONFIRMED: "bg-green-50 text-green-700",
    CANCELLED: "bg-red-50 text-red-700",
    CHECKED_OUT: "bg-blue-50 text-blue-700",
    CHECKED_IN: "bg-indigo-50 text-indigo-700"
};

const statusIcons = {
    PENDING: <Clock className="w-4 h-4" />,
    CONFIRMED: <Check className="w-4 h-4" />,
    CANCELLED: <X className="w-4 h-4" />,
    CHECKED_OUT: <Star className="w-4 h-4" />,
    CHECKED_IN: <Bed className="w-4 h-4" />,
};

export default function ReservationList({ initialReservations }) {

    const [reservations, setReservations] = useState([]);
    const [comments, setComments] = useState({});
    const [openReview, setOpenReview] = useState({});
    const [expandedReservation, setExpandedReservation] = useState(null);

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        setReservations(initialReservations);
    }, [initialReservations]);

    const handleStatusChange = (id, newStatus) => {
        setReservations((prev) =>
            prev.map((res) =>
                res.id === id ? { ...res, reservationStatus: newStatus } : res
            )
        );
    };

    const handleCommentChange = (id, field, value) => {
        setComments((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const handleSubmitComment = (id) => {
        const comment = comments[id];
        const payload = {
            star: comment.stars,
            description: comment.description,
            reservationId: id,
        };

        dispatch(createReviews(payload))
            .unwrap()
            .then(() => {
                console.log(`Successfully submitted review for reservation ${id}:`, payload);
                setOpenReview((prev) => ({ ...prev, [id]: false }));
                setComments((prev) => {
                    const newComments = { ...prev };
                    delete newComments[id];
                    return newComments;
                });
            })
            .catch((error) => {
                console.error("Failed to submit review:", error);
            });
    };

    const toggleReview = (id) => {
        setOpenReview((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleReservationExpand = (id) => {
        setExpandedReservation(expandedReservation === id ? null : id);
    };

    const StatusBadge = ({ status }) => (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {statusIcons[status]}
            {status}
        </div>
    );

    return (
        <div className="w-full p-4 space-y-4">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">My Reservations</h1>
            </div>

            <div className="space-y-3">
                {reservations.map((res) => (
                    <div key={res.id} className="group">
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer transition bg-gray-50 hover:bg-gray-100"
                            onClick={() => toggleReservationExpand(res.id)}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                    <Hotel className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{res.hotelName}</h3>
                                    <div className="flex items-center space-x-3 mt-1">
                                        <StatusBadge status={res.reservationStatus} />
                                        <span className="text-sm text-gray-500">
                                            {format(new Date(res.checkInDate), "MMM d")} - {format(new Date(res.checkOutDate), "MMM d, yyyy")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <div className="font-medium text-gray-900 flex items-center justify-end">
                                        Rs.
                                        {res.price.toFixed(2)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {res.numberOfGuests} guest{res.numberOfGuests > 1 ? "s" : ""}
                                    </div>
                                </div>
                                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedReservation === res.id ? "rotate-90" : ""}`} />
                            </div>
                        </div>

                        {expandedReservation === res.id && (
                            <div className="px-4 pb-4 space-y-4 bg-gray-50 hover:bg-gray-100">
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <InfoItem icon={User} label="Guest" value1={res.userName} value2={res.userEmail} />
                                    <InfoItem icon={Bed} label="Room" value1={res.roomCategory} value2={`Room ${res.roomNumber}`} />
                                    <InfoItem icon={Calendar} label="Check-in" value1={format(new Date(res.checkInDate), "EEE, MMM d, yyyy")} value2="After 2:00 PM" />
                                    <InfoItem icon={Calendar} label="Check-out" value1={format(new Date(res.checkOutDate), "EEE, MMM d, yyyy")} value2="Before 12:00 PM" />
                                </div>

                                <div className="flex justify-end space-x-3 pt-2">
                                    {(res.reservationStatus === "PENDING" || res.reservationStatus === "CONFIRMED") && (
                                        <button
                                            onClick={() => handleStatusChange(res.id, "CANCELLED")}
                                            className="flex items-center space-x-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Cancel Reservation</span>
                                        </button>
                                    )}

                                    {res.reservationStatus === "CHECKED_OUT" && !res.review && (
                                        <button
                                            onClick={() => toggleReview(res.id)}
                                            className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            <span>{openReview[res.id] ? "Cancel Review" : "Write Review"}</span>
                                        </button>
                                    )}
                                </div>

                                {res.reservationStatus === "CHECKED_OUT" && openReview[res.id] && (
                                    <div className="mt-4 pt-4 border-t">
                                        <h4 className="font-medium text-gray-900 flex items-center space-x-2 mb-3">
                                            <Star className="text-yellow-400 w-5 h-5 fill-yellow-400" />
                                            <span>Share your experience</span>
                                        </h4>

                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-gray-600">Rating:</span>
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            onClick={() => handleCommentChange(res.id, "stars", star)}
                                                            className="focus:outline-none"
                                                        >
                                                            {(comments[res.id]?.stars || 0) >= star ? (
                                                                <Star className="text-yellow-400 w-6 h-6 fill-yellow-400" />
                                                            ) : (
                                                                <Star className="text-yellow-400 w-6 h-6" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <textarea
                                                rows={3}
                                                placeholder="What did you like about your stay? What could be improved?"
                                                value={comments[res.id]?.description || ""}
                                                onChange={(e) =>
                                                    handleCommentChange(res.id, "description", e.target.value)
                                                }
                                                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />

                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    onClick={() => toggleReview(res.id)}
                                                    className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleSubmitComment(res.id)}
                                                    className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                                                    disabled={!comments[res.id]?.stars}
                                                >
                                                    Submit Review
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value1, value2 }) {
    return (
        <div className="flex items-start space-x-3">
            <Icon className="text-gray-400 w-5 h-5 mt-0.5" />
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium">{value1}</p>
                <p className="text-sm text-gray-500 mt-1">{value2}</p>
            </div>
        </div>
    );
}
