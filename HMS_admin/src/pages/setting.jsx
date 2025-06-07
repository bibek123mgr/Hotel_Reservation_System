import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Hotel, Shield, Lock, Save, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelProfile, updateHotelProfile, updateUserPassword } from "../app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const hotelFormSchema = z.object({
    hotelName: z.string().min(2),
    address: z.string().min(5).optional(),
    city: z.string().min(2).optional(),
    state: z.string().min(2).optional(),
    zipCode: z.string().min(3).optional(),
    checkInTime: z.string().optional(),
    checkOutTime: z.string().optional(),
    hotelCode: z.number().min(1),
    latitude: z.union([z.string(), z.number()]).optional(),
    longitude: z.union([z.string(), z.number()]).optional(),
    description: z.string().optional(),
    googleMapLink: z.string().url().optional(),
});
const securitySchema = z.object({
    currentPassword: z.string().min(1, {
        message: "Current password is required.",
    }),
    newPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const Settings = () => {
    const [activeTab, setActiveTab] = useState("hotel");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { hotelProfile } = useSelector((store) => store.auth);

    // Initialize hotel form with profile data
    const hotelForm = useForm({
        resolver: zodResolver(hotelFormSchema),
        defaultValues: {
            hotelName: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            checkInTime: "",
            checkOutTime: "",
            hotelCode: null,
            latitude: "",
            longitude: "",
            description: "",
            googleMapLink: "",
        },
    });

    // Security Settings Form
    const securityForm = useForm({
        resolver: zodResolver(securitySchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    // Set form values when hotelProfile is loaded or changes
    useEffect(() => {
        if (hotelProfile) {
            hotelForm.reset({
                hotelName: hotelProfile.hotelName || "",
                address: hotelProfile.address || "",
                city: hotelProfile.city || "",
                state: hotelProfile.state || "",
                zipCode: hotelProfile.zipCode || "",
                checkInTime: hotelProfile.checkInTime || "14:00",
                checkOutTime: hotelProfile.checkOutTime || "12:00",
                hotelCode: hotelProfile.hotelCode || "",
                latitude: hotelProfile.latitude?.toString() || "",
                longitude: hotelProfile.longitude?.toString() || "",
                description: hotelProfile.description || "",
                googleMapLink: hotelProfile.googleMapLink || "",
            });
        }
    }, [hotelProfile, hotelForm]);

    // Load hotel profile on component mount
    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role === "hotel_admin") {
            dispatch(getHotelProfile({ navigate }));
        }
    }, [dispatch, navigate]);

    const onSubmitHotelSettings = async (values) => {
        try {
            const updateData = {
                id: hotelProfile.id,
                hotelName: values.hotelName,
                address: values.address,
                city: values.city,
                state: values.state,
                zipCode: values.zipCode,
                checkInTime: values.checkInTime,
                checkOutTime: values.checkOutTime,
                description: values.description,
                googleMapLink: values.googleMapLink,
                latitude: values.latitude ? parseFloat(values.latitude) : null,
                longitude: values.longitude ? parseFloat(values.longitude) : null
            };

            await dispatch(updateHotelProfile(updateData)).unwrap();

            // Show success message
            alert("Hotel settings updated successfully!");
        } catch (error) {
            console.error("Failed to update hotel:", error);
            alert(error.message || "Failed to update hotel settings");
        }
    };
    const onSubmitSecuritySettings = async (values) => {
        try {
            const data = {
                oldPassword: values.currentPassword,
                newPassword: values.newPassword
            };

            console.log('Submitting password change:', data);

            await dispatch(updateUserPassword(data)).unwrap();

            securityForm.reset({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            alert("Password changed successfully!");
        } catch (error) {
            console.error("Failed to update password:", error);
            alert(error?.message || "Failed to update password settings");
        }
    };


    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage your hotel system preferences and configuration
                </p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    className={`px-4 py-2 text-sm font-medium flex items-center ${activeTab === "hotel" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("hotel")}
                >
                    <Hotel className="mr-2 h-4 w-4" />
                    Hotel
                </button>

                <button
                    className={`px-4 py-2 text-sm font-medium flex items-center ${activeTab === "security" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("security")}
                >
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                </button>
            </div>

            {/* Hotel Settings Tab */}
            {activeTab === "hotel" && (
                <div className="space-y-6">
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Hotel Information</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Update your hotel details and settings
                            </p>
                        </div>
                        <div className="p-6">
                            <form onSubmit={hotelForm.handleSubmit(onSubmitHotelSettings)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Hotel Name
                                        </label>
                                        <input
                                            id="hotelName"
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            {...hotelForm.register("hotelName")}
                                        />
                                        {hotelForm.formState.errors.hotelName && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {hotelForm.formState.errors.hotelName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="hotelCode" className="block text-sm font-medium text-gray-700 mb-1">
                                            Hotel Code
                                        </label>
                                        <input
                                            id="hotelCode"
                                            type="number"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                                            {...hotelForm.register("hotelCode")}
                                            disabled
                                        />
                                        {hotelForm.formState.errors.hotelCode && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {hotelForm.formState.errors.hotelCode.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        {...hotelForm.register("description")}
                                    />
                                    {hotelForm.formState.errors.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {hotelForm.formState.errors.description.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        {...hotelForm.register("address")}
                                    />
                                    {hotelForm.formState.errors.address && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {hotelForm.formState.errors.address.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                            City
                                        </label>
                                        <input
                                            id="city"
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            {...hotelForm.register("city")}
                                        />
                                        {hotelForm.formState.errors.city && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {hotelForm.formState.errors.city.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                            State
                                        </label>
                                        <input
                                            id="state"
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            {...hotelForm.register("state")}
                                        />
                                        {hotelForm.formState.errors.state && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {hotelForm.formState.errors.state.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                                            Zip Code
                                        </label>
                                        <input
                                            id="zipCode"
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            {...hotelForm.register("zipCode")}
                                        />
                                        {hotelForm.formState.errors.zipCode && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {hotelForm.formState.errors.zipCode.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="checkInTime" className="block text-sm font-medium text-gray-700 mb-1">
                                            Check-in Time
                                        </label>
                                        <input
                                            id="checkInTime"
                                            type="time"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            {...hotelForm.register("checkInTime")}
                                        />
                                        {hotelForm.formState.errors.checkInTime && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {hotelForm.formState.errors.checkInTime.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="checkOutTime" className="block text-sm font-medium text-gray-700 mb-1">
                                            Check-out Time
                                        </label>
                                        <input
                                            id="checkOutTime"
                                            type="time"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            {...hotelForm.register("checkOutTime")}
                                        />
                                        {hotelForm.formState.errors.checkOutTime && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {hotelForm.formState.errors.checkOutTime.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                                            Latitude
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="latitude"
                                                type="text"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10"
                                                placeholder="e.g. 12.345678"
                                                {...hotelForm.register("latitude")}
                                            />
                                            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        </div>
                                        {hotelForm.formState.errors.latitude && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {hotelForm.formState.errors.latitude.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                                            Longitude
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="longitude"
                                                type="text"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10"
                                                placeholder="e.g. -12.345678"
                                                {...hotelForm.register("longitude")}
                                            />
                                            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        </div>
                                        {hotelForm.formState.errors.longitude && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {hotelForm.formState.errors.longitude.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="googleMapLink" className="block text-sm font-medium text-gray-700 mb-1">
                                        Google Maps Link
                                    </label>
                                    <input
                                        id="googleMapLink"
                                        type="url"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        placeholder="https://maps.google.com/..."
                                        {...hotelForm.register("googleMapLink")}
                                    />
                                    {hotelForm.formState.errors.googleMapLink && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {hotelForm.formState.errors.googleMapLink.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Security Settings Tab */}
            {activeTab === "security" && (
                <div className="space-y-6">
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Update your account password
                            </p>
                        </div>
                        <div className="p-6">
                            <form onSubmit={securityForm.handleSubmit(onSubmitSecuritySettings)} className="space-y-6">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Password
                                    </label>
                                    <input
                                        id="currentPassword"
                                        type="password"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        {...securityForm.register("currentPassword")}
                                    />
                                    {securityForm.formState.errors.currentPassword && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {securityForm.formState.errors.currentPassword.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <input
                                            id="newPassword"
                                            type="password"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            {...securityForm.register("newPassword")}
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Password must be at least 8 characters
                                        </p>
                                        {securityForm.formState.errors.newPassword && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {securityForm.formState.errors.newPassword.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            {...securityForm.register("confirmPassword")}
                                        />
                                        {securityForm.formState.errors.confirmPassword && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {securityForm.formState.errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Lock className="mr-2 h-4 w-4" />
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;