import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTHAPI } from '../../../api/axiosConfig';
import { logout } from '../auth/authSlice';

export const createPayment = createAsyncThunk(
    'payments/createPayment',
    async (paymentData, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await AUTHAPI.post('v1/payments', paymentData);
            return data;
        } catch (error) {
            console.log('Status:', error.response?.status);
            if (error.response?.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create payment'
            );
        }
    }
);

export const updatePayment = createAsyncThunk(
    'payments/updatePayment',
    async ({ paymentId, paymentData }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await AUTHAPI.patch(`v1/payments/${paymentId}`, paymentData);
            return data;
        } catch (error) {
            console.log('Status:', error.response?.status);
            if (error.response?.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update payment'
            );
        }
    }
);

export const getAllPayments = createAsyncThunk(
    'payments/getAllPayments',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await AUTHAPI.get('v1/payments');
            return data;
        } catch (error) {
            if (error.response?.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch payments'
            );
        }
    }
);

export const deletePayment = createAsyncThunk(
    'payments/deletePayment',
    async (paymentId, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await AUTHAPI.delete(`v1/payments/${paymentId}`);
            return data;
        } catch (error) {
            if (error.response?.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue(
                error.response?.data?.message || 'Failed to delete payment'
            );
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    payments: [],
    currentPayment: null,
    message: null,
};

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        clearPaymentMessage: (state) => {
            state.message = null;
            state.error = null;
        },
        resetPaymentState: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Payment
            .addCase(createPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.payments.push(action.payload);
                state.message = action.payload.message || 'Payment created successfully';
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Payment
            .addCase(updatePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.payments.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.payments[index] = action.payload;
                }
                state.message = action.payload.message || 'Payment updated successfully';
            })
            .addCase(updatePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All Payments
            .addCase(getAllPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload;
            })
            .addCase(getAllPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Payment
            .addCase(deletePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePayment.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = state.payments.filter(payment => payment.id !== action.meta.arg);
                state.message = 'Payment deleted successfully';
            })
            .addCase(deletePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { clearPaymentMessage, resetPaymentState } = paymentSlice.actions;

// Selectors
export const selectPaymentState = (state) => state.payments;
export const selectPayments = (state) => state.payments.payments;
export const selectCurrentPayment = (state) => state.payments.currentPayment;
export const selectPaymentLoading = (state) => state.payments.loading;
export const selectPaymentError = (state) => state.payments.error;
export const selectPaymentMessage = (state) => state.payments.message;

export default paymentSlice.reducer;