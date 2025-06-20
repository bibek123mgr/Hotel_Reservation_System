import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AUTHAPI } from '../../../api/axiosConfig';

const API_URL = 'http://localhost:8080/api/v1/auth';

const initialToken = localStorage.getItem('access-token') || null;

const initialState = {
    token: initialToken,
    loading: false,
    error: null,
    otpVerified: false,
    message: null,
    userProfile: null,
};
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/signin`, { email, password });
            return data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Login failed');
            } else {
                return rejectWithValue('Network error');
            }
        }
    }
);


export const getUserProfile = createAsyncThunk(
    'auth/getUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.get('v1/auth/getuserprofile');
            console.log("i am user profile", data);

            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/signup`, { firstName, lastName, email, password });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async ({ email }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/forgot-password`, { email });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Password reset failed');
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async ({ otp, email }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/verify-otp`, { otp, email });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ newPassword, token }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/reset-password`, { newPassword, token });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Password reset failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.error = null;
            state.otpVerified = false;
            state.message = null;
            localStorage.removeItem('access-token');
        },
        clearAuthMessage(state) {
            state.message = null;
            state.error = null;
        },
        setCredentials(state, action) {
            state.token = action.payload['access-token'];
            localStorage.setItem('access-token', action.payload['access-token']);
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
                    const token = action.payload['access-token'];
                    if (token) {
                        state.token = token;
                        localStorage.setItem('access-token', token);
                    }
                    state.message = action.payload.message || null;
                })
                .addCase(action.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        };

        handleAsyncAction(loginUser);
        handleAsyncAction(signupUser);
        handleAsyncAction(forgotPassword);
        handleAsyncAction(verifyOtp);
        handleAsyncAction(resetPassword);

        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearAuthMessage, setCredentials } = authSlice.actions;
export default authSlice.reducer;
