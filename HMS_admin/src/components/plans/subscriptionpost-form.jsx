import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiDollarSign, FiFileText, FiList, FiTag } from 'react-icons/fi';
import { Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import { Close } from '@mui/icons-material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createSubscriptionPlan, updateSubscriptionPlan } from '../../app/features/plans/planSlice';
import { useEffect } from 'react';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '16px',
        overflow: 'hidden',
    },
}));

// Zod validation schema
const subscriptionSchema = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name cannot exceed 50 characters"),
    features: z.string()
        .min(10, "Features must be at least 10 characters")
        .max(1000, "Features cannot exceed 1000 characters"),
    description: z.string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
    monthlyPrice: z.number()
        .min(0, "Price must be positive"),
    yearlyPrice: z.number()
        .min(0, "Price must be positive"),
});

const SubscriptionPlanPostForm = ({ open, onClose, plan, onSuccess }) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: {
            name: '',
            features: '',
            description: '',
            monthlyPrice: 0,
            yearlyPrice: 0,
        }
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (plan) {
            setValue('name', plan.name);
            setValue('features', plan.features);
            setValue('description', plan.description);
            setValue('monthlyPrice', plan.monthlyPrice);
            setValue('yearlyPrice', plan.yearlyPrice);

        } else {
            reset();
        }
    }, [plan, setValue, reset]);

    const onSubmit = async (formData) => {
        try {
            if (plan) {
                const updatedFormData = { ...formData, id: plan.id };
                const resultAction = await dispatch(updateSubscriptionPlan(
                    updatedFormData
                ));
                unwrapResult(resultAction);
                alert("Subscription Category Updated");
            } else {

                const resultAction = await dispatch(createSubscriptionPlan(formData));
                unwrapResult(resultAction);

                alert("Subscription plan Created");
            }
            onClose();
            reset();
            onSuccess();

        } catch (err) {
            console.error("Subscription plan creation failed:", err);
        }
    };

    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                <DialogTitle className="flex justify-between items-center px-8 py-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">
                            {plan ? "Edit Subscription Plan" : "Create New Subscription Plan"}

                        </h2>
                        <p className="text-slate-300 text-sm">
                            {plan ? "Update this Subscription Plan" : "Define a new subscription tier"}
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
                    {/* Plan Name */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <FiTag className="inline mr-2 -mt-1 text-slate-500" />
                            Plan Name*
                        </label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        {...field}
                                        type="text"
                                        className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                                        ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                        placeholder="e.g., Premium Plan"
                                    />
                                    <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                </div>
                            )}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Features */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <FiList className="inline mr-2 -mt-1 text-slate-500" />
                            Features* (one per line)
                        </label>
                        <Controller
                            name="features"
                            control={control}
                            render={({ field }) => (
                                <div className="relative">
                                    <textarea
                                        {...field}
                                        rows={4}
                                        className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                                        ${errors.features ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                        placeholder={`Feature 1\nFeature 2\nFeature 3`}
                                    />
                                    <FiList className="absolute left-4 top-4 text-slate-400" />
                                </div>
                            )}
                        />
                        {errors.features && (
                            <p className="text-red-500 text-sm mt-2">{errors.features.message}</p>
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
                                        placeholder="Describe this subscription plan"
                                    />
                                    <FiFileText className="absolute left-4 top-4 text-slate-400" />
                                </div>
                            )}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Monthly Price */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <span className="inline-block mr-2 -mt-1 font-semibold text-lg">Rs</span>
                                Monthly Price*
                            </label>
                            <Controller
                                name="monthlyPrice"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                                            ${errors.monthlyPrice ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                                            Rs
                                        </span>

                                    </div>
                                )}
                            />
                            {errors.monthlyPrice && (
                                <p className="text-red-500 text-sm mt-2">{errors.monthlyPrice.message}</p>
                            )}
                        </div>

                        {/* Yearly Price */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <span className="inline-block mr-2 -mt-1 font-semibold text-lg">Rs</span>

                                Yearly Price*
                            </label>
                            <Controller
                                name="yearlyPrice"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                                            ${errors.yearlyPrice ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                                            Rs
                                        </span>

                                    </div>
                                )}
                            />
                            {errors.yearlyPrice && (
                                <p className="text-red-500 text-sm mt-2">{errors.yearlyPrice.message}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 px-6 rounded-lg
                        font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-sm
                        hover:shadow-md active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting
                            ? (plan ? 'Updating...' : 'Creating...')
                            : (plan ? 'Update Subscription Plan' : 'Create Subscription Plan')}
                    </button>
                </form>
            </DialogContent>
        </StyledDialog>
    );
};

export default SubscriptionPlanPostForm;