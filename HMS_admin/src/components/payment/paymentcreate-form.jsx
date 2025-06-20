import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiEdit, FiHash, FiFileText, FiCheckCircle, FiCreditCard, FiChevronDown, FiDollarSign, FiHome } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import { Close } from '@mui/icons-material';
import { unwrapResult } from '@reduxjs/toolkit';
import { createPayment, updatePayment } from '../../app/features/payment/paymentSlice';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '16px',
        overflow: 'hidden',
    },
}));

const paymentSchema = z.object({
    amount: z.number().min(1, "Amount must be at least 1").max(1000000, "Amount cannot exceed Rs. 1,000,000"),
    paymentMethod: z.string().min(1, "Payment method is required"),
    paymentStatus: z.string().min(1, "Status is required"),
    transactionId: z.string().min(1, "Transaction ID is required").optional(),
    hotelId: z.number().min(1, "Hotel is required"),
});

const PaymentPostForm = ({ open, onClose, fetchPayments, paymentToEdit }) => {
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            amount: 0,
            paymentMethod: '',
            paymentStatus: '',
            transactionId: '',
            hotelId: '',
        }
    });

    useEffect(() => {
        if (paymentToEdit) {
            // For update, we only need to set the ID
            setValue('id', paymentToEdit.id);
        } else {
            reset();
        }
    }, [paymentToEdit, reset, setValue]);

    const onSubmit = async (formData) => {
        try {
            const paymentData = {
                amount: formData.amount,
                paymentMethod: formData.paymentMethod,
                paymentStatus: formData.paymentStatus,
                transactionId: formData.transactionId,
                hotelId: formData.hotelId,
            };

            if (paymentToEdit) {
                await dispatch(updatePayment({
                    paymentId: paymentToEdit.id,
                    paymentData
                })).unwrap();
                alert("Payment Updated Successfully");
            } else {
                await dispatch(createPayment(paymentData)).unwrap();
                alert("Payment Created Successfully");
            }

            fetchPayments();
            onClose();
        } catch (err) {
            console.error(paymentToEdit ? "Payment update failed:" : "Payment creation failed:", err);
            alert(`Failed to ${paymentToEdit ? 'update' : 'create'} payment: ${err.message}`);
        }
    };

    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                <DialogTitle className="flex justify-between items-center px-8 py-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">{paymentToEdit ? 'Edit Payment' : 'Create New Payment'}</h2>
                        <p className="text-slate-300 text-sm">
                            {paymentToEdit ? 'Update the payment details' : 'Fill in the details to add a new payment'}
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
                    <div className="grid grid-cols-2 gap-6">
                        {/* Amount */}
                        <div className="relative col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiDollarSign className="inline mr-2 -mt-1 text-slate-500" />
                                Amount (Rs.)
                            </label>
                            <Controller
                                name="amount"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                                            ${errors.amount ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                            placeholder="e.g., 5000"
                                        />
                                        <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                )}
                            />
                            {errors.amount && (
                                <p className="text-red-500 text-sm mt-2">{errors.amount.message}</p>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiCreditCard className="inline mr-2 -mt-1 text-slate-500" />
                                Payment Method
                            </label>
                            <Controller
                                name="paymentMethod"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <select
                                            {...field}
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg appearance-none focus:outline-none focus:ring-2 transition-all
                                            ${errors.paymentMethod ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                        >
                                            <option value="">Select Method</option>
                                            <option value="CASH">Cash</option>
                                            <option value="CREDIT_CARD">Credit Card</option>
                                            <option value="DEBIT_CARD">Debit Card</option>
                                            <option value="BANK_TRANSFER">Bank Transfer</option>
                                            <option value="MOBILE_PAYMENT">Mobile Payment</option>
                                        </select>
                                        <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                )}
                            />
                            {errors.paymentMethod && (
                                <p className="text-red-500 text-sm mt-2">{errors.paymentMethod.message}</p>
                            )}
                        </div>

                        {/* Payment Status */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiCheckCircle className="inline mr-2 -mt-1 text-slate-500" />
                                Status
                            </label>
                            <Controller
                                name="paymentStatus"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <select
                                            {...field}
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg appearance-none focus:outline-none focus:ring-2 transition-all
                                            ${errors.paymentStatus ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="PENDING">Pending</option>
                                            <option value="COMPLETED">Completed</option>
                                            <option value="FAILED">Failed</option>
                                            <option value="REFUNDED">Refunded</option>
                                        </select>
                                        <FiCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                )}
                            />
                            {errors.paymentStatus && (
                                <p className="text-red-500 text-sm mt-2">{errors.paymentStatus.message}</p>
                            )}
                        </div>

                        {/* Transaction ID */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiHash className="inline mr-2 -mt-1 text-slate-500" />
                                Transaction ID
                            </label>
                            <Controller
                                name="transactionId"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <input
                                            {...field}
                                            type="text"
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 transition-all
                                            ${errors.transactionId ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                            placeholder="e.g., TXN123456"
                                            disabled={!!paymentToEdit} // Disable for edits
                                        />
                                        <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                )}
                            />
                            {errors.transactionId && (
                                <p className="text-red-500 text-sm mt-2">{errors.transactionId.message}</p>
                            )}
                        </div>

                        {/* Hotel */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FiHome className="inline mr-2 -mt-1 text-slate-500" />
                                Hotel
                            </label>
                            <Controller
                                name="hotelId"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <select
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className={`w-full px-4 py-3 pl-11 border rounded-lg appearance-none focus:outline-none focus:ring-2 transition-all
                                            ${errors.hotelId ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'}`}
                                        >
                                            <option value="">Select Hotel</option>
                                            <option value="1">Hotel A</option>
                                            <option value="2">Hotel B</option>
                                            <option value="3">Hotel C</option>
                                        </select>
                                        <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                )}
                            />
                            {errors.hotelId && (
                                <p className="text-red-500 text-sm mt-2">{errors.hotelId.message}</p>
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
                            ? (paymentToEdit ? 'Updating...' : 'Creating...')
                            : (paymentToEdit ? 'Update Payment' : 'Create Payment')}
                    </button>
                </form>
            </DialogContent>
        </StyledDialog>
    );
};

export default PaymentPostForm;