import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiEdit, FiFileText } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import { Close } from '@mui/icons-material';
import { createCategory, updateCategory } from '../../app/features/category/categorySlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect } from 'react';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '16px',
        overflow: 'hidden',
    },
}));

// Zod validation schema for category
const categorySchema = z.object({
    roomCategoryType: z.string()
        .min(3, "Category name must be at least 3 characters")
        .max(50, "Category name cannot exceed 50 characters"),
    description: z.string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
});

const CategoryPostForm = ({ open, onClose, category, onSuccess }) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            roomCategoryType: '',
            description: '',
        }
    });

    const dispatch = useDispatch();

    // Set form values when category prop changes (for edit mode)
    useEffect(() => {
        if (category) {
            setValue('roomCategoryType', category.roomCategoryType);
            setValue('description', category.description);
        } else {
            reset();
        }
    }, [category, setValue, reset]);

    const onSubmit = async (formData) => {
        try {
            if (category) {
                const updatedFormData = { ...formData, id: category.id };
                const resultAction = await dispatch(updateCategory(
                    updatedFormData
                ));
                unwrapResult(resultAction);
                alert("Room Category Updated");
            } else {
                // Create new category
                const resultAction = await dispatch(createCategory(formData));
                unwrapResult(resultAction);
                alert("Room Category Created");
            }
            onClose();
            reset();
            onSuccess(); // Refresh the category list
        } catch (err) {
            console.error("Operation failed:", err);
        }
    };

    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                <DialogTitle className="flex justify-between items-center px-8 py-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">
                            {category ? "Edit Category" : "Create New Category"}
                        </h2>
                        <p className="text-slate-300 text-sm">
                            {category ? "Update this room category" : "Add a new room category"}
                        </p>
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
                    {/* Category Name */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <FiEdit className="inline mr-2 -mt-1 text-slate-500" />
                            Category Name
                        </label>
                        <Controller
                            name="roomCategoryType"
                            control={control}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        {...field}
                                        type="text"
                                        className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                                        ${errors.roomCategoryType ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                        placeholder="e.g., Deluxe Suite"
                                    />
                                    <FiEdit className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                </div>
                            )}
                        />
                        {errors.roomCategoryType && (
                            <p className="text-red-500 text-sm mt-2">{errors.roomCategoryType.message}</p>
                        )}
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
                                        placeholder="Describe this category (features, amenities, etc.)"
                                    />
                                    <FiFileText className="absolute left-4 top-4 text-slate-400" />
                                </div>
                            )}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 px-6 rounded-lg
                        font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-sm
                        hover:shadow-md active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting
                            ? (category ? 'Updating...' : 'Creating...')
                            : (category ? 'Update Category' : 'Create Category')}
                    </button>
                </form>
            </DialogContent>
        </StyledDialog>
    );
};

export default CategoryPostForm;