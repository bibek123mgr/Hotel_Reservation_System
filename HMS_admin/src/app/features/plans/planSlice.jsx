import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTHAPI } from '../../../api/axiosConfig';

// Async Thunks
export const createSubscriptionPlan = createAsyncThunk(
    'subscription/createSubscriptionPlan',
    async (planData, { rejectWithValue }) => {
        try {
            const response = await AUTHAPI.post('v1/admin/subscription-plans', planData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAllSubscriptionPlans = createAsyncThunk(
    'subscription/getAllSubscriptionPlans',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AUTHAPI.get('v1/subscription-plans');
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateSubscriptionPlan = createAsyncThunk(
    'subscription/updateSubscriptionPlan',
    async (planData, { rejectWithValue }) => {
        try {
            const response = await AUTHAPI.put(`v1/admin/subscription-plans`, planData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateSubscriptionPlanStatus = createAsyncThunk(
    'subscription/updateSubscriptionPlanStatus',
    async ({ planId, status }, { rejectWithValue }) => {
        try {
            const response = await AUTHAPI.patch(`v1/admin/subscription-plans/${planId}/status`, { status });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteSubscriptionPlan = createAsyncThunk(
    'subscription/deleteSubscriptionPlan',
    async (id, { rejectWithValue }) => {
        try {
            await AUTHAPI.delete(`v1/admin/subscription-plans/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Slice
const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState: {
        plans: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetSubscriptionState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Plan
            .addCase(createSubscriptionPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSubscriptionPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.plans.push(action.payload);
                state.success = true;
            })
            .addCase(createSubscriptionPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create subscription plan';
            })

            // Get All Plans
            .addCase(getAllSubscriptionPlans.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSubscriptionPlans.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = action.payload;
            })
            .addCase(getAllSubscriptionPlans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch subscription plans';
            })

            // Update Plan
            .addCase(updateSubscriptionPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSubscriptionPlan.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.plans.findIndex(
                    (plan) => plan.id === action.payload.id
                );
                if (index !== -1) {
                    state.plans[index] = action.payload;
                }
                state.success = true;
            })
            .addCase(updateSubscriptionPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update subscription plan';
            })

            // Update Plan Status
            .addCase(updateSubscriptionPlanStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSubscriptionPlanStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.plans.findIndex(
                    (plan) => plan.id === action.payload.id
                );
                if (index !== -1) {
                    state.plans[index].status = action.payload.status;
                }
                state.success = true;
            })
            .addCase(updateSubscriptionPlanStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update subscription plan status';
            })

            // Delete Plan
            .addCase(deleteSubscriptionPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSubscriptionPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = state.plans.filter(
                    (plan) => plan.id !== action.payload
                );
                state.success = true;
            })
            .addCase(deleteSubscriptionPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to delete subscription plan';
            });
    },
});

// Export actions and reducer
export const { resetSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;