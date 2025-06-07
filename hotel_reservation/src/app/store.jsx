// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../app/features/auth/authSlice'
import roomSlice from '../app/features/room/roomSlice'
import hotelSlice from '../app/features/hotel/hotelSlice'
import reservationSlice from '../app/features/reservation/reservationSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomSlice,
        hotel: hotelSlice,
        reservation: reservationSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});