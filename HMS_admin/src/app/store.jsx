import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../app/features/auth/authSlice';
import roomReducer from '../app/features/room/roomSlice';
import reservationReducer from '../app/features/reservation/reservationSlice';
import planReducer from '../app/features/plans/planSlice';
import categoryReducer from '../app/features/category/categorySlice';
import paymentReducer from '../app/features/payment/paymentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer,
        reservation: reservationReducer,
        plan: planReducer,
        category: categoryReducer,
        payment: paymentReducer
    }
});
