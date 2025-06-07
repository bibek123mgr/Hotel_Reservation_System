import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTHAPI } from '../../../api/axiosConfig';

export const createReservation = createAsyncThunk(
    'reservations/createReservation',
    async (reservationData, { rejectWithValue }) => {
        try {
            const { hotelId, roomId, checkInDate, checkOutDate, numberOfGuests, price, bookedById } = reservationData.data;
            const { data } = await AUTHAPI.post('v1/reservations', {
                hotelId,
                roomId,
                checkInDate,
                checkOutDate,
                numberOfGuests,
                price,
                bookedById,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create reservation');
        }
    }
);

export const getAllReservations = createAsyncThunk(
    'reservations/getAllReservations',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.get('v1/reservations/hotels');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch reservations');
        }
    }
);

export const getReservation = createAsyncThunk(
    'reservations/getReservation',
    async (id, { rejectWithValue }) => {
        try {
            console.log(id)
            const { data } = await AUTHAPI.get('v1/reservations/' + id);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch reservation');
        }
    }
);

export const getUserReservations = createAsyncThunk(
    'reservations/getUserReservations',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.get('v1/reservations/user/' + userId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user reservations');
        }
    }
);

export const updateReservationStatus = createAsyncThunk(
    'reservations/updateReservationStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.patch('v1/reservations/' + id + '/' + status);
            return { id, status, message: data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update reservation status');
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    reservations: [],
    currentReservation: null,
    message: null,
};

const reservationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        clearReservationMessage: (state) => {
            state.message = null;
            state.error = null;
        },
        resetReservationState: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        const handleAsyncAction = (action) => {
            builder
                .addCase(action.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(action.fulfilled, (state, action) => {
                    state.loading = false;
                    const payload = action.payload;

                    if (Array.isArray(payload)) {
                        state.reservations = payload;
                        state.currentReservation = null;
                    } else if (payload) {
                        const exists = state.reservations.find(r => r.id === payload.id);
                        if (!exists) {
                            state.reservations.push(payload);
                        }
                        state.currentReservation = payload.reservation || payload;
                    }

                    state.message = payload?.message || null;
                })
                .addCase(action.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        };

        handleAsyncAction(createReservation);
        handleAsyncAction(getAllReservations);
        handleAsyncAction(getUserReservations);
        handleAsyncAction(getReservation);

        builder.addCase(updateReservationStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateReservationStatus.fulfilled, (state, action) => {
            state.loading = false;
            const { id, status, message } = action.payload;

            const reservation = state.reservations.find(r => r.id === id);
            if (reservation) {
                reservation.status = status;
            }

            if (state.currentReservation?.id === id) {
                state.currentReservation.status = status;
            }

            state.message = message;
        });
        builder.addCase(updateReservationStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearReservationMessage, resetReservationState } = reservationSlice.actions;

export const selectReservationState = (state) => state.reservations;
export const selectCurrentReservation = (state) => state.reservations.currentReservation;

export default reservationSlice.reducer;
