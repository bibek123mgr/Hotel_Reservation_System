import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all hotels
export const getAllHotel = createAsyncThunk(
    "hotel/getAllHotel",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/hotels");
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch hotels");
        }
    }
);

export const getHotelsNearLocation = createAsyncThunk(
    "hotel/getHotelsNearLocation",
    async ({ latitude, longitude, radius = 5 }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("http://localhost:8080/api/v1/hotels/near-me", {
                latitude, longitude, radius
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch nearby hotels");
        }
    }
);

const hotelSlice = createSlice({
    name: "hotel",
    initialState: {
        hotels: [],
        hotelsNearMe: [],
        loading: false,
        nearbyLoading: false,
        error: null,
        nearbyError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllHotel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.hotels = action.payload;
            })
            .addCase(getAllHotel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch hotels";
            })

            .addCase(getHotelsNearLocation.pending, (state) => {
                state.nearbyLoading = true;
                state.nearbyError = null;
            })
            .addCase(getHotelsNearLocation.fulfilled, (state, action) => {
                state.nearbyLoading = false;
                state.hotelsNearMe = action.payload;
            })
            .addCase(getHotelsNearLocation.rejected, (state, action) => {
                state.nearbyLoading = false;
                state.nearbyError = action.payload || "Failed to fetch nearby hotels";
            });
    },
});

export default hotelSlice.reducer;
