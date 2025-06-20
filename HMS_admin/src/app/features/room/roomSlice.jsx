import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTHAPI } from '../../../api/axiosConfig';
import { logout } from '../auth/authSlice';

export const createRoom = createAsyncThunk(
    'rooms/createRoom',
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.post('v1/rooms', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return data;
        } catch (error) {
            console.log('Status:', error.response?.status);  // <-- log the status here

            if (error.response?.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create room'
            );
        }
    }
);


export const updateRoom = createAsyncThunk(
    'rooms/createRoom',
    async (payload, { rejectWithValue }) => {
        const { roomId, data: formData } = payload;


        try {
            const { data } = await AUTHAPI.patch(`/v1/rooms/${roomId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return data;
        } catch (error) {
            console.log('Status:', error.response?.status);

            if (error.response?.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create room'
            );
        }
    }
)


export const getAllRooms = createAsyncThunk(
    'rooms/getAllRooms',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.get('v1/rooms');
            return data;
        } catch (error) {
            if (error.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create room'
            );
        }
    }
);

export const deleteRoom = createAsyncThunk(
    'rooms/deleteRoom',
    async (roomId, { rejectWithValue }) => {
        try {
            console.log(roomId);

            const { data } = await AUTHAPI.delete(`v1/rooms/${roomId}`);
            return data;
        } catch (error) {
            if (error.response?.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue(
                error.response?.data?.message || 'Failed to delete room'
            );
        }
    }
);

export const updateRoomStatus = createAsyncThunk(
    'rooms/updateRoomStatus',
    async ({ roomId, roomStatus }, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.patch(`v1/rooms/${roomId}/${roomStatus}`);

            return data;

        } catch (error) {
            console.log('Status:', error.response?.status);  // <-- log the status here

            if (error.response?.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue(error.response?.data || 'Failed to update room status');
        }
    }
);


export const fetchRoomCategories = createAsyncThunk(
    'rooms/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.get('v1/hotel-rooms-category');
            return data;
        } catch (error) {
            if (error.response?.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch categories'
            );
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    rooms: [],
    categories: [],
    currentRoom: null,
    message: null,
};

const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        clearRoomMessage: (state) => {
            state.message = null;
            state.error = null;
        },
        resetRoomState: (state) => {
            Object.assign(state, initialState);
        }
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
                    if (action.payload) {
                        state.rooms.push(action.payload);
                        // state.currentRoom = action.payload.room;
                    }
                    if (action.payload.categories) {
                        state.categories = action.payload.categories;
                    }
                    state.message = action.payload.message || null;
                })
                .addCase(action.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        };

        handleAsyncAction(createRoom);
        handleAsyncAction(fetchRoomCategories);
    },
});

export const { clearRoomMessage, resetRoomState } = roomSlice.actions;

// Selectors
export const selectRoomState = (state) => state.rooms;
export const selectCurrentRoom = (state) => state.rooms.currentRoom;
export const selectCategories = (state) => state.rooms.categories;

export default roomSlice.reducer;