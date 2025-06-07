import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../../api/axiosConfig';

const API_URL = 'http://localhost:8080/api/v1/rooms';

export const fetchRooms = createAsyncThunk(
    'rooms/fetchRooms',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(API_URL + "/public");
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch rooms');
        }
    }
);

export const fetchRoom = createAsyncThunk(
    'rooms/fetchRoom',
    async ({ hotelId, roomCategoryId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(API_URL + "/public-room-details", {
                params: { hotelId, roomCategoryId }
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch room detail');
        }
    }
);

export const fetchReviews = createAsyncThunk(
    'rooms/fetchReviews',
    async ({ hotelId, categoryId }, { rejectWithValue }) => {
        try {
            const { data } = await API.get('v1/public-comment', {
                hotelId, categoryId
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
        }
    }
);

const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: [],
        room: null,
        reviews: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.room = null;
            })
            .addCase(fetchRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.room = action.payload;
            })
            .addCase(fetchRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.room = null;
            })
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.reviews = [];
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.reviews = [];
            });
    },
});

export default roomSlice.reducer;
