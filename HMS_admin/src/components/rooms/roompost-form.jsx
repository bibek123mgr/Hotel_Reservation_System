import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiEdit, FiHash, FiFileText, FiCheckCircle, FiLayers, FiChevronDown, FiDollarSign, FiUsers, FiHome } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import { Close } from '@mui/icons-material';
import { createRoom } from '../../app/features/room/roomSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '16px',
        overflow: 'hidden',
    },
}));

// Zod validation schema
const roomSchema = z.object({
    roomTitle: z.string().min(3, "Title must be at least 3 characters").max(100),
    roomNumber: z.string().min(1, "Room number is required"),
    price: z.number().min(1, "Price must be at least 1").max(10000, "Price cannot exceed $10,000"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    roomCategoryId: z.string().min(1, "Room type is required"),
    roomStatus: z.string().min(1, "Status is required"),
    floor: z.number().min(1, "Floor is required"),
    description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
    file: z
        .any()
        .refine((file) => file && file.length > 0, "Image file is required"),
});

const RoomPostForm = ({ open, onClose }) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            roomTitle: '',
            roomNumber: '',
            price: 0,
            capacity: 1,
            floor: 1,
            roomCategoryId: '',
            roomStatus: '',
            description: '',
            file: null,
        }
    });

    const dispatch = useDispatch();

    const onSubmit = async (formData) => {
        try {
            const file = formData.file[0]; // Get the first file from FileList

            const roomRequestWrapper = {
                roomTitle: formData.roomTitle,
                roomNumber: formData.roomNumber,
                price: formData.price,
                capacity: formData.capacity,
                floor: formData.floor,
                roomCategoryId: formData.roomCategoryId,
                roomStatus: formData.roomStatus,
                description: formData.description,
            };

            const data = new FormData();
            data.append("roomRequestWrapper", new Blob([JSON.stringify(roomRequestWrapper)], { type: "application/json" }));
            data.append("file", file);

            const resultAction = await dispatch(createRoom(data));
            unwrapResult(resultAction);
            onClose();
            reset();
        } catch (err) {
            console.error("Room creation failed:", err);
        }
    };

    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                <DialogTitle className="flex justify-between items-center px-8 py-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Create New Room</h2>
                        <p className="text-slate-300 text-sm">Fill in the details to add a new room</p>
                    </div>
                    <IconButton
                        onClick={onClose}
                        className="text-white hover:bg-slate-600/20 rounded-lg"
                        sx={{ padding: '8px' }}
                    >
                        <Close className="text-xl" />
                    </IconButton>
                </DialogTitle>
            </div>

            <DialogContent className="bg-slate-50 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Room Title */}
                        <div className="relative col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiEdit className="inline mr-2 -mt-1 text-slate-500" />
                                Room Title
                            </label>
                            <Controller
                                name="roomTitle"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <input
                                            {...field}
                                            type="text"
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                        ${errors.roomTitle ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                            placeholder="Premium Ocean View Suite"
                                        />
                                        <FiEdit className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                )}
                            />
                            {errors.roomTitle && (
                                <p className="text-red-500 text-sm mt-2">{errors.roomTitle.message}</p>
                            )}
                        </div>

                        {/* Room Number */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiHash className="inline mr-2 -mt-1 text-slate-500" />
                                Room Number
                            </label>
                            <Controller
                                name="roomNumber"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <input
                                            {...field}
                                            type="text"
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                        ${errors.roomNumber ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                            placeholder="e.g., 201B"
                                        />
                                        <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                )}
                            />
                            {errors.roomNumber && (
                                <p className="text-red-500 text-sm mt-2">{errors.roomNumber.message}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiDollarSign className="inline mr-2 -mt-1 text-slate-500" />
                                Price
                            </label>
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                        ${errors.price ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                            placeholder="e.g., 199"
                                        />
                                        <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                )}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-2">{errors.price.message}</p>
                            )}
                        </div>

                        {/* Floor */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiHome className="inline mr-2 -mt-1 text-slate-500" />
                                Floor
                            </label>
                            <Controller
                                name="floor"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                        ${errors.floor ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                            placeholder="e.g., 2"
                                        />
                                        <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                )}
                            />
                            {errors.floor && (
                                <p className="text-red-500 text-sm mt-2">{errors.floor.message}</p>
                            )}
                        </div>

                        {/* Capacity */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiUsers className="inline mr-2 -mt-1 text-slate-500" />
                                Capacity
                            </label>
                            <Controller
                                name="capacity"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                        ${errors.capacity ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                            placeholder="e.g., 2"
                                        />
                                        <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                )}
                            />
                            {errors.capacity && (
                                <p className="text-red-500 text-sm mt-2">{errors.capacity.message}</p>
                            )}
                        </div>

                        {/* Room Type */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiLayers className="inline mr-2 -mt-1 text-slate-500" />
                                Room Type
                            </label>
                            <Controller
                                name="roomCategoryId"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <select
                                            {...field}
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg appearance-none focus:outline-none focus:ring-2 transition-all
                        ${errors.roomCategoryId ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="1">Standard Room</option>
                                            <option value="2">Deluxe Room</option>
                                            <option value="3">Executive Suite</option>
                                        </select>
                                        <FiLayers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                )}
                            />
                            {errors.roomCategoryId && (
                                <p className="text-red-500 text-sm mt-2">{errors.roomCategoryId.message}</p>
                            )}
                        </div>

                        {/* Availability Status */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiCheckCircle className="inline mr-2 -mt-1 text-slate-500" />
                                Status
                            </label>
                            <Controller
                                name="roomStatus"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <select
                                            {...field}
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg appearance-none focus:outline-none focus:ring-2 transition-all
                        ${errors.roomStatus ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="AVAILABLE">Available</option>
                                            <option value="CLEANING">Cleaning</option>
                                            <option value="MAINTENANCE">Maintenance</option>
                                            <option value="OCCUPIED">Occupied</option>
                                        </select>
                                        <FiCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                )}
                            />
                            {errors.roomStatus && (
                                <p className="text-red-500 text-sm mt-2">{errors.roomStatus.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <FiFileText className="inline mr-2 -mt-1 text-slate-500" />
                            Description
                        </label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <div className="relative">
                                    <textarea
                                        {...field}
                                        rows={3}
                                        className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                        ${errors.description ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                        placeholder="Describe room features, amenities, and special characteristics..."
                                    />
                                    <FiFileText className="absolute left-4 top-4 text-slate-400" />
                                </div>
                            )}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>
                        )}
                    </div>

                    {/* File Upload */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Upload Image
                        </label>
                        <Controller
                            name="file"
                            control={control}
                            render={({ field: { onChange, value, ...rest } }) => (
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => onChange(e.target.files)}
                                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all
                        ${errors.file ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                        {...rest}
                                    />
                                </div>
                            )}
                        />
                        {errors.file && (
                            <p className="text-red-500 text-sm mt-2">{errors.file.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 px-6 rounded-lg
            font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-sm
            hover:shadow-md active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Room'}
                    </button>
                </form>
            </DialogContent>
        </StyledDialog>
    );
};

export default RoomPostForm;