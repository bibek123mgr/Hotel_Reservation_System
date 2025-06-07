import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../app/features/auth/authSlice';
import roomReducer from '../app/features/room/roomSlice';
import reservationReducer from '../app/features/reservation/reservationSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer,
        reservation: reservationReducer
    }
});
