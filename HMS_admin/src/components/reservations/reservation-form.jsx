import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

// Static data
const rooms = [
    { id: 1, type: "standard", roomNumber: "101", pricePerNight: 10000, capacity: 2, status: "available" },
    { id: 2, type: "deluxe", roomNumber: "201", pricePerNight: 15000, capacity: 2, status: "available" },
    { id: 3, type: "suite", roomNumber: "301", pricePerNight: 25000, capacity: 4, status: "available" },
];

const guests = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jane", lastName: "Smith" },
    { id: 3, firstName: "Robert", lastName: "Johnson" },
];

// Schema
const reservationFormSchema = z.object({
    guestId: z.number().min(1, "Guest is required"),
    roomId: z.number().min(1, "Room is required"),
    checkInDate: z.date({
        required_error: "Check-in date is required",
    }),
    checkOutDate: z.date({
        required_error: "Check-out date is required",
    }),
    status: z.enum(["confirmed", "pending", "cancelled", "checked_in", "checked_out", "needs_attention"]),
    numberOfGuests: z.number().min(1, "At least one guest is required"),
    specialRequests: z.string().optional(),
    totalAmount: z.number().min(0, "Total amount must be positive"),
}).refine(
    (data) => data.checkOutDate > data.checkInDate,
    {
        message: "Check-out date must be after check-in date",
        path: ["checkOutDate"],
    }
);

const ReservationForm = ({ reservation, onSuccess }) => {
    const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);

    const defaultValues = reservation
        ? {
            ...reservation,
            checkInDate: new Date(reservation.checkInDate),
            checkOutDate: new Date(reservation.checkOutDate),
        }
        : {
            guestId: 0,
            roomId: 0,
            checkInDate: new Date(),
            checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            status: "pending",
            numberOfGuests: 1,
            specialRequests: "",
            totalAmount: 0,
        };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        getValues
    } = useForm({
        resolver: zodResolver(reservationFormSchema),
        defaultValues,
    });

    // Calculate the total price based on room price and number of nights
    const calculateTotalPrice = () => {
        const roomId = getValues("roomId");
        const checkInDate = getValues("checkInDate");
        const checkOutDate = getValues("checkOutDate");

        if (!roomId || !checkInDate || !checkOutDate || checkOutDate <= checkInDate) {
            return 0;
        }

        const room = rooms.find(r => r.id === roomId);
        if (!room) return 0;

        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const days = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / millisecondsPerDay);

        return room.pricePerNight * days;
    };

    // Update the total price when relevant fields change
    const updateTotalPrice = () => {
        setIsCalculatingPrice(true);
        const totalAmount = calculateTotalPrice();
        setValue("totalAmount", totalAmount);
        setIsCalculatingPrice(false);
    };

    // Watch for changes to fields that affect the price
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (["roomId", "checkInDate", "checkOutDate"].includes(name)) {
                updateTotalPrice();
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = (data) => {
        // Make sure to update the total price before submitting
        data.totalAmount = calculateTotalPrice();

        console.log("Form submitted:", data);
        // Simulate API call
        setTimeout(() => {
            alert(reservation ? "Reservation updated successfully!" : "Reservation created successfully!");
            if (onSuccess) onSuccess();
        }, 1000);
    };

    const getAvailableRooms = () => {
        // If editing an existing reservation, include the current room
        if (reservation) {
            return rooms.filter(room =>
                room.status === "available" || room.id === reservation.roomId
            );
        }

        // For new reservations, only show available rooms
        return rooms.filter(room => room.status === "available");
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount / 100);
    };

    // Get room capacity options based on selected room
    const getRoomCapacityOptions = () => {
        const roomId = getValues("roomId");
        const room = rooms.find(r => r.id === roomId);

        if (!room) return [1];

        return Array.from({ length: room.capacity }, (_, i) => i + 1);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Guest Selection */}
                <div className="form-group">
                    <label htmlFor="guestId" className="block mb-2 font-medium">Guest</label>
                    <select
                        id="guestId"
                        className={`form-select w-full p-2 border rounded ${errors.guestId ? "border-red-500" : "border-gray-300"}`}
                        {...register("guestId", { valueAsNumber: true })}
                    >
                        <option value="0">Select guest</option>
                        {guests.map((guest) => (
                            <option key={guest.id} value={guest.id}>
                                {guest.firstName} {guest.lastName}
                            </option>
                        ))}
                    </select>
                    {errors.guestId && (
                        <p className="mt-1 text-sm text-red-600">{errors.guestId.message}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">Select the guest for this reservation</p>
                </div>

                {/* Room Selection */}
                <div className="form-group">
                    <label htmlFor="roomId" className="block mb-2 font-medium">Room</label>
                    <select
                        id="roomId"
                        className={`form-select w-full p-2 border rounded ${errors.roomId ? "border-red-500" : "border-gray-300"}`}
                        {...register("roomId", { valueAsNumber: true })}
                        onChange={(e) => {
                            setValue("roomId", parseInt(e.target.value));
                            updateTotalPrice();
                        }}
                    >
                        <option value="0">Select room</option>
                        {getAvailableRooms().map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.type.replace('_', ' ')} - Room {room.roomNumber}
                            </option>
                        ))}
                    </select>
                    {errors.roomId && (
                        <p className="mt-1 text-sm text-red-600">{errors.roomId.message}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">Select an available room for reservation</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Check-in Date */}
                <div className="form-group">
                    <label htmlFor="checkInDate" className="block mb-2 font-medium">Check-in Date</label>
                    <input
                        type="date"
                        id="checkInDate"
                        className={`form-input w-full p-2 border rounded ${errors.checkInDate ? "border-red-500" : "border-gray-300"}`}
                        {...register("checkInDate", { valueAsDate: true })}
                        onChange={(e) => {
                            setValue("checkInDate", new Date(e.target.value));
                            updateTotalPrice();
                        }}
                        min={format(new Date(), 'yyyy-MM-dd')}
                    />
                    {errors.checkInDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.checkInDate.message}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">The date the guest will check in</p>
                </div>

                {/* Check-out Date */}
                <div className="form-group">
                    <label htmlFor="checkOutDate" className="block mb-2 font-medium">Check-out Date</label>
                    <input
                        type="date"
                        id="checkOutDate"
                        className={`form-input w-full p-2 border rounded ${errors.checkOutDate ? "border-red-500" : "border-gray-300"
                            }`}
                        {...register("checkOutDate", { valueAsDate: true })}
                        onChange={(e) => {
                            const date = new Date(e.target.value);
                            setValue("checkOutDate", date);
                            updateTotalPrice();
                        }}
                        min={format(new Date(getValues("checkInDate") || new Date()), 'yyyy-MM-dd')}
                    />
                    {errors.checkOutDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.checkOutDate.message}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">The date the guest will check out</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Number of Guests */}
                <div className="form-group">
                    <label htmlFor="numberOfGuests" className="block mb-2 font-medium">Number of Guests</label>
                    <select
                        id="numberOfGuests"
                        className={`form-select w-full p-2 border rounded ${errors.numberOfGuests ? "border-red-500" : "border-gray-300"}`}
                        {...register("numberOfGuests", { valueAsNumber: true })}
                    >
                        {getRoomCapacityOptions().map((num) => (
                            <option key={num} value={num}>
                                {num} {num === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                    {errors.numberOfGuests && (
                        <p className="mt-1 text-sm text-red-600">{errors.numberOfGuests.message}</p>
                    )}
                </div>

                {/* Reservation Status */}
                <div className="form-group">
                    <label htmlFor="status" className="block mb-2 font-medium">Status</label>
                    <select
                        id="status"
                        className={`form-select w-full p-2 border rounded ${errors.status ? "border-red-500" : "border-gray-300"}`}
                        {...register("status")}
                    >
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="checked_in">Checked In</option>
                        <option value="checked_out">Checked Out</option>
                        <option value="needs_attention">Needs Attention</option>
                    </select>
                    {errors.status && (
                        <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                    )}
                </div>

                {/* Total Amount */}
                <div className="form-group">
                    <label htmlFor="totalAmount" className="block mb-2 font-medium">Total Amount</label>
                    <input
                        id="totalAmount"
                        type="text"
                        className="form-input w-full p-2 border border-gray-300 rounded bg-gray-100"
                        readOnly
                        value={isCalculatingPrice ? "Calculating..." : formatCurrency(getValues("totalAmount"))}
                    />
                    {errors.totalAmount && (
                        <p className="mt-1 text-sm text-red-600">{errors.totalAmount.message}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">Total price for the stay</p>
                </div>
            </div>

            {/* Special Requests */}
            <div className="form-group">
                <label htmlFor="specialRequests" className="block mb-2 font-medium">Special Requests</label>
                <textarea
                    id="specialRequests"
                    className={`form-textarea w-full p-2 border rounded ${errors.specialRequests ? "border-red-500" : "border-gray-300"}`}
                    rows={3}
                    placeholder="Enter any special requests or notes"
                    {...register("specialRequests")}
                ></textarea>
                {errors.specialRequests && (
                    <p className="mt-1 text-sm text-red-600">{errors.specialRequests.message}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">Any special accommodations or requests from the guest</p>
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={onSuccess}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                >
                    {isSubmitting ? (
                        "Processing..."
                    ) : reservation ? (
                        "Update Reservation"
                    ) : (
                        "Create Reservation"
                    )}
                </button>
            </div>
        </form>
    );
};

export default ReservationForm;