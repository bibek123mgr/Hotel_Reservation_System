import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    MapPin, Clock, User, Building, Mail, Lock, AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const HotelRegistrationForm = () => {
    const [file, setFile] = useState(null);
    const [searchParams] = useSearchParams();

    const subscriptionId = parseInt(searchParams.get('id'));
    const monthlyPrice = parseFloat(searchParams.get('monthlyPrice'));
    const yearlyPrice = parseFloat(searchParams.get('yearlyPrice'));

    const validationRules = {
        firstName: { required: 'First name is required', minLength: { value: 2, message: 'Min 2 characters' } },
        lastName: { required: 'Last name is required', minLength: { value: 2, message: 'Min 2 characters' } },
        email: {
            required: 'Email is required',
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' }
        },
        password: {
            required: 'Password is required',
            minLength: { value: 8, message: 'Min 8 characters' },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message: 'Use uppercase, lowercase, number & special char'
            }
        },
        subscriptionType: { required: 'Subscription type is required' },
        subscriptionDuration: {
            required: 'Subscription duration is required',
            min: { value: 1, message: 'Must be at least 1' }
        },
        hotelName: { required: 'Hotel name is required', minLength: { value: 3, message: 'Min 3 characters' } },
        description: { required: 'Description is required', minLength: { value: 20, message: 'Min 20 characters' } },
        address: { required: 'Address is required', minLength: { value: 10, message: 'Min 10 characters' } },
        city: { required: 'City is required', minLength: { value: 2, message: 'Min 2 characters' } },
        state: { required: 'State is required', minLength: { value: 2, message: 'Min 2 characters' } },
        zipCode: {
            required: 'Zip code is required',
            pattern: { value: /^\d{5}(-\d{4})?$/, message: 'Invalid zip code' }
        },
        checkInTime: { required: 'Check-in time is required' },
        checkOutTime: { required: 'Check-out time is required' },
        latitude: {
            required: 'Latitude is required',
            min: { value: -90, message: 'Invalid latitude' },
            max: { value: 90, message: 'Invalid latitude' },
            valueAsNumber: true
        },
        longitude: {
            required: 'Longitude is required',
            min: { value: -180, message: 'Invalid longitude' },
            max: { value: 180, message: 'Invalid longitude' },
            valueAsNumber: true
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstName: '', lastName: '', email: '', password: '',
            subscriptionType: 'monthly', subscriptionDuration: 6,
            hotelName: '', description: '', address: '', city: '', state: '', zipCode: '',
            googleMapLink: '', longitude: '', latitude: '', checkInTime: '', checkOutTime: ''
        }
    });
    const onSubmit = async (data) => {
        if (!file) {
            alert('Please upload a hotel image');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', file);

            const payload = {
                ...data,
                subscriptionId,
                monthlyPrice,
                yearlyPrice
            };

            const hotelDataBlob = new Blob([JSON.stringify(payload)], {
                type: 'application/json'
            });
            formData.append('hotelData', hotelDataBlob, 'hotelData.json');

            const response = await axios.post(
                'http://localhost:8080/api/v1/auth/hotel-registration',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                const paymentUrl = response.data.payment_url;

                if (paymentUrl) {
                    // Redirect to payment URL
                    window.location.href = paymentUrl;
                    return;
                }

                alert('Hotel registered successfully!');
                reset();
                setFile(null);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };


    const InputField = ({ label, name, type = 'text', icon: Icon, ...props }) => {
        const error = errors[name];
        return (
            <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                    {Icon && <Icon className="w-4 h-4 mr-2 text-blue-500" />}
                    {label}
                    {validationRules[name]?.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                    type={type}
                    {...register(name, validationRules[name])}
                    className={`w-full px-4 py-3 border-2 rounded-xl ${error ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                    {...props}
                />
                {error && (
                    <p className="flex items-center text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                        <AlertCircle className="w-4 h-4 mr-2" /> {error.message}
                    </p>
                )}
            </div>
        );
    };

    const TextareaField = ({ label, name, icon: Icon, ...props }) => {
        const error = errors[name];
        return (
            <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                    {Icon && <Icon className="w-4 h-4 mr-2 text-blue-500" />}
                    {label}
                    {validationRules[name]?.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                    rows={4}
                    {...register(name, validationRules[name])}
                    className={`w-full px-4 py-3 border-2 rounded-xl resize-none ${error ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                    {...props}
                />
                {error && (
                    <p className="flex items-center text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                        <AlertCircle className="w-4 h-4 mr-2" /> {error.message}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
            <div className="max-w-5xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white/80 rounded-3xl shadow-xl p-8">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-blue-600 mb-2">Register Your Hotel</h1>
                        <p className="text-gray-600">Join our platform and start welcoming guests</p>
                    </div>

                    {/* Owner Info */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="First Name" name="firstName" icon={User} />
                        <InputField label="Last Name" name="lastName" icon={User} />
                        <InputField label="Email" name="email" type="email" icon={Mail} />
                        <InputField label="Password" name="password" type="password" icon={Lock} />
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Subscription Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register('subscriptionType', validationRules.subscriptionType)}
                                className={`w-full px-4 py-3 border-2 rounded-xl ${errors.subscriptionType ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                            >
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                            {errors.subscriptionType && (
                                <p className="flex items-center text-sm text-red-600 bg-red-50 p-2 rounded-lg mt-2">
                                    <AlertCircle className="w-4 h-4 mr-2" /> {errors.subscriptionType.message}
                                </p>
                            )}
                        </div>
                        <InputField label="Subscription Duration" name="subscriptionDuration" type="number" />
                    </div>

                    {/* Hotel Info */}
                    <div className="mb-8">
                        <InputField label="Hotel Name" name="hotelName" icon={Building} />
                        <TextareaField label="Hotel Description" name="description" icon={Building} />
                    </div>

                    {/* Location */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Address" name="address" icon={MapPin} />
                        <InputField label="City" name="city" icon={MapPin} />
                        <InputField label="State" name="state" icon={MapPin} />
                        <InputField label="Zip Code" name="zipCode" icon={MapPin} />
                        <InputField label="Google Maps Link" name="googleMapLink" />
                        <InputField label="Longitude" name="longitude" type="number" step="any" />
                        <InputField label="Latitude" name="latitude" type="number" step="any" />

                    </div>

                    {/* Times */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Check-In Time" name="checkInTime" type="time" icon={Clock} />
                        <InputField label="Check-Out Time" name="checkOutTime" type="time" icon={Clock} />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Upload Hotel Image <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="mt-2"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all"
                    >
                        {isSubmitting ? 'Registering...' : 'Register Hotel'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HotelRegistrationForm;
