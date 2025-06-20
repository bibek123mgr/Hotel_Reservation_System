import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AUTHAPI } from '../../../api/axiosConfig';

const API_URL = 'http://localhost:8080/api/v1/reservations//user/';

export const fetchReservations = createAsyncThunk(
    'reservations/fetchReservations',
    async ({ userId }, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.get(`/v1/reservations/user/${userId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch reservations');
        }
    }
);

export const cancelReservations = createAsyncThunk(
    'reservations/cancelReservations',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.patch(`/v1/reservations/${id}/CANCELLED`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch reservations');
        }
    }
);

export const createReviews = createAsyncThunk(
    'reservations/createReviews',
    async (createCommentRequestWrapper, { rejectWithValue }) => {

        try {
            console.log(createCommentRequestWrapper);

            const { data } = await AUTHAPI.post(`/v1/create-comment`,
                createCommentRequestWrapper
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch reservations');
        }
    }
);


export const createReservation = createAsyncThunk(
    'reservations/createReservation',
    async (reservationData, { rejectWithValue }) => {
        try {
            const { hotelId,
                roomCategoryId,
                roomId,
                bookedBy,
                createdBy,
                reservationStatus,
                price,
                checkInDate,
                checkOutDate,
                paymentMethod,
                numberOfGuests } = reservationData
            const { data } = await AUTHAPI.post("/v1/reservations", {
                hotelId,
                roomCategoryId,
                roomId,
                bookedBy,
                createdBy,
                reservationStatus,
                price,
                checkInDate,
                checkOutDate,
                paymentMethod,
                numberOfGuests
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create reservation');
        }
    }
);

const reservationSlice = createSlice({
    name: 'reservations',
    initialState: {
        reservations: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReservations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReservations.fulfilled, (state, action) => {
                state.loading = false;
                state.reservations = action.payload;
            })
            .addCase(fetchReservations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createReservation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReservation.fulfilled, (state, action) => {
                state.loading = false;
                state.reservations.push(action.payload);
            })
            .addCase(createReservation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default reservationSlice.reducer;
