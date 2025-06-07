import { useState } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { createReservation } from "../app/features/reservation/reservationSlice";
import { z } from "zod";
import { unwrapResult } from "@reduxjs/toolkit";

const bookingSchema = z.object({
    checkIn: z.date(),
    checkOut: z.date(),
    number_of_guest: z.string().regex(/^[1-9]$|^10$/, "Guest count must be 1-10"),
    rooms: z.string().regex(/^[1-9]\d*$/, "Rooms must be a positive number"),
    paymentMethod: z.enum(["CASH", "KHALTI", "ESEWA"]),
}).superRefine((data, ctx) => {
    if (data.checkOut <= data.checkIn) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Check-out date must be after check-in date",
            path: ["checkOut"],
        });
    }
});


export default function BookingForm({ hotelId,
    roomCategoryId }) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [formData, setFormData] = useState({
        checkIn: today,
        checkOut: tomorrow,
        number_of_guest: "2",
        rooms: "1",
        email: "",
        phone: "",
        paymentMethod: "CASH"
    });

    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date, field) => {
        setFormData(prev => {
            const newForm = { ...prev, [field]: date };
            if (field === 'checkIn' && date >= prev.checkOut) {
                const newCheckOut = new Date(date);
                newCheckOut.setDate(date.getDate() + 1);
                newForm.checkOut = newCheckOut;
            }
            return newForm;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = bookingSchema.safeParse(formData);
        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }
        setError(null);
        const resultAction = await dispatch(createReservation({
            hotelId: hotelId,
            roomCategoryId: roomCategoryId,
            roomId: 1,
            bookedBy: 1,
            createdBy: 1,
            paymentMethod: formData.paymentMethod.toUpperCase(),
            reservationStatus: 'PENDING',
            price: 150.00,
            checkInDate: formData.checkIn.toISOString(),
            checkOutDate: formData.checkOut.toISOString(),
            numberOfGuests: parseInt(formData.number_of_guest, 10),
        }));
        if (createReservation.fulfilled.match(resultAction)) {
            const result = unwrapResult(resultAction);

            if (result.message === "Reservation created successfully with CASH payment") {
                alert("✅ Your reservation has been successfully.");
                location.reload();
            } else if (result?.payment_url) {
                // Redirect to payment page
                window.location.href = result.payment_url;
            } else {
                alert("⚠️ Reservation created, but no payment URL or success message was returned.");
            }
        }

    }

    const handleDateFocus = (e) => {
        e.target.showPicker = false;
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-white p-8 md:p-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Reserve Your Stay</h2>
                </div>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Check-in</label>
                        <div className="relative">
                            <input
                                type="date"
                                name="checkIn"
                                value={format(formData.checkIn, "yyyy-MM-dd")}
                                onChange={(e) => handleDateChange(new Date(e.target.value), 'checkIn')}
                                min={format(today, "yyyy-MM-dd")}
                                onFocus={handleDateFocus}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Check-out</label>
                        <div className="relative">
                            <input
                                type="date"
                                name="checkOut"
                                value={format(formData.checkOut, "yyyy-MM-dd")}
                                onChange={(e) => handleDateChange(new Date(e.target.value), 'checkOut')}
                                min={format(new Date(formData.checkIn.getTime() + 86400000), "yyyy-MM-dd")}
                                onFocus={handleDateFocus}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Number Of Guest</label>
                        <input
                            type="number"
                            name="number_of_guest"
                            value={formData.number_of_guest}
                            onChange={handleInputChange}
                            className="p-3 border border-gray-300 rounded-lg"
                            min={1}
                            max={10}
                        />
                    </div>

                    {/* <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="p-3 border border-gray-300 rounded-lg"
                        />
                    </div> */}

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleInputChange}
                            className="p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="CASH">Paid on Arrival</option>
                            <option value="KHALTI">Khalti</option>
                            <option value="ESEWA">eSewa</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 px-4 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                        >
                            Reserve Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
