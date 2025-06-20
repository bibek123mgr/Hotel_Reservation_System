import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    User, Edit2, Mail, Phone, Calendar,
    CreditCard, Check, X, ChevronDown
} from 'lucide-react';
import ReservationList from './reservation-list';
import { fetchReservations } from '../app/features/reservation/reservationSlice';

const ProfilePage = () => {
    // Redux state
    const { reservations: initialReservations } = useSelector((store) => store.reservation);
    const { userProfile, loading, error } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    // Local state
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    // Initialize form data when userProfile loads
    useEffect(() => {
        if (userProfile) {
            setFormData({
                name: userProfile.name || '',
                email: userProfile.email || '',
                phone: userProfile.phone || '',
            });
        }
    }, [userProfile]);

    // Fetch reservations when component mounts
    useEffect(() => {
        if (userProfile?.id) {
            dispatch(fetchReservations({ userId: userProfile.id }));
        }
    }, [dispatch, userProfile?.id]);

    // Format member since date
    const formatMemberSince = (dateString) => {
        if (!dateString) return 'January 2023';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    // Handle form submission
    const handleSave = async (updatedData) => {
        try {
            // await dispatch(updateUserProfile({
            //     userId: userProfile.id,
            //     updates: updatedData
            // })).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    // Current user data with fallbacks
    const currentUserData = {
        name: userProfile?.name || 'John Doe',
        email: userProfile?.email || 'john@example.com',
        phone: userProfile?.phone || '+1234567890',
        avatar: userProfile?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
        memberSince: formatMemberSince(userProfile?.createdAt)
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-10">
            <div className="max-w-4xl mx-auto">
                {/* Profile Summary */}
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-shrink-0 relative">
                            <img
                                src={currentUserData.avatar}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                            />
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                disabled={loading}
                                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm flex items-center gap-1 disabled:opacity-50"
                            >
                                {isEditing ? (
                                    <>
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </>
                                ) : (
                                    <>
                                        <Edit2 className="w-4 h-4" />
                                        Edit Profile
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="text-center md:text-left mt-4 md:mt-0">
                            <h2 className="text-2xl font-bold text-gray-900">{currentUserData.name}</h2>
                            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                                <Mail className="w-4 h-4" />
                                {currentUserData.email}
                            </p>
                            <p className="text-gray-500 text-sm mt-1 flex items-center justify-center md:justify-start gap-2">
                                <Calendar className="w-4 h-4" />
                                Member since: {currentUserData.memberSince}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        onClick={() => setActiveTab('personal')}
                        className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'personal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <User className="w-4 h-4" />
                        Personal Info
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'bookings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Calendar className="w-4 h-4" />
                        Booking History
                    </button>

                </div>

                {/* Tab Content */}
                <div className="bg-white shadow rounded-lg overflow-hidden p-6">
                    {activeTab === 'personal' && (
                        isEditing ? (
                            <EditProfileForm
                                formData={formData}
                                setFormData={setFormData}
                                onSave={handleSave}
                                loading={loading}
                                error={error}
                            />
                        ) : (
                            <ProfileInfoView userData={currentUserData} />
                        )
                    )}
                    {activeTab === 'bookings' && (
                        <BookingHistory initialReservations={initialReservations} />
                    )}
                </div>
            </div>
        </div>
    );
};

// Profile Info View Component
const ProfileInfoView = ({ userData }) => (
    <div className="space-y-4">
        <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
            </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <p className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    {userData.name}
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {userData.email}
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {userData.phone || 'Not provided'}
                </p>
            </div>
        </div>
    </div>
);

// Edit Profile Form Component
const EditProfileForm = ({ formData, setFormData, onSave, loading, error }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6 mt-10">
            <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Edit2 className="w-5 h-5 text-blue-600" />
                    Edit Profile
                </h3>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <X className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border pl-8"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border pl-8"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border pl-8"
                        placeholder="+1234567890"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 gap-3">
                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 gap-2"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={() => onSave(formData)}
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 gap-2 disabled:opacity-50"
                >
                    {loading ? (
                        'Saving...'
                    ) : (
                        <>
                            <Check className="w-4 h-4" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

// Booking History Component
const BookingHistory = ({ initialReservations }) => (
    <div className="text-center py-12 flex flex-col items-center gap-2">
        {initialReservations?.length > 0 ? (
            <ReservationList initialReservations={initialReservations} />
        ) : (
            <>
                <Calendar className="w-12 h-12 text-gray-400" />
                <p className="text-gray-500">No bookings found</p>
            </>
        )}
    </div>
);



export default ProfilePage;