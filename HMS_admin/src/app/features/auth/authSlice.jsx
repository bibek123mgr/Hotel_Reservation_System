import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API, AUTHAPI } from '../../../api/axiosConfig';

export const loginUser = createAsyncThunk(
    'auth/signin',
    async ({ hotelCode, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('v1/auth/hotel-signin', {
                hotelCode,
                email,
                password,
            });
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

export const getDashboardSummery = createAsyncThunk(
    'auth/getDashboardSummery',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.get('v1/dashboard-summery');
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

export const getPaymentSummery = createAsyncThunk(
    'auth/getPaymentSummery',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.get('v1/payment-summery');
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);



export const getUserProfile = createAsyncThunk(
    'auth/getUserProfile',
    async ({ navigate }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await AUTHAPI.get('v1/auth/getuserprofile');
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

export const getHotelProfile = createAsyncThunk(
    'auth/gethotelprofile',
    async ({ navigate }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await AUTHAPI.get('v1/gethotelprofile');
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

export const updateHotelProfile = createAsyncThunk(
    'auth/updateHotelProfile',
    async (hotelData, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await AUTHAPI.post('v1/auth/hotel-update', hotelData);
            dispatch(getHotelProfile({ navigate: null }));
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Update failed'
            );
        }
    }
);

export const updateUserPassword = createAsyncThunk(
    'auth/updateUserPassword',
    async (date, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await AUTHAPI.post('v1/auth/update-password', datehotelData);
            dispatch(getHotelProfile({ navigate: null }));
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Update failed'
            );
        }
    }
);

export const loginAdmin = createAsyncThunk(
    'auth/loginadmin',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('v1/auth/signin-admin', {
                email,
                password,
            });
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

export const logoutAndRedirect = (navigate) => (dispatch) => {
    dispatch(logout());
    navigate('/login');
};

export const getAllUsers = createAsyncThunk(
    'auth/getAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.get('v1/auth/users');
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch hotels'
            );
        }
    }
);

export const getAllHotel = createAsyncThunk(
    'auth/getAllHotel',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get('v1/auth/allactivehotels');
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch hotels'
            );
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ newPassword, oldPassword }, { rejectWithValue }) => {
        try {
            const { data } = await AUTHAPI.post('v1/auth/reset-password', {
                newPassword,
                oldPassword,
            });
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Password reset failed'
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        users: [],
        hotels: [],
        token: null,
        role: null,
        loading: false,
        error: null,
        otpVerified: false,
        message: null,
        userProfile: null,
        hotelProfile: null,
        dashboardSummery: {},
        paymentSummery: {}

    },
    reducers: {
        logout(state) {
            state.token = null;
            state.error = null;
            state.otpVerified = false;
            state.message = null;
            state.userProfile = null;
            state.hotelProfile = null;
            localStorage.removeItem('access-token');
            localStorage.removeItem('role');
            window.location.href = "/";
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
                    const role = action.payload['role'] || 'hotel_admin';
                    localStorage.setItem('role', role);
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
        handleAsyncAction(loginAdmin);
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

        builder
            .addCase(getHotelProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHotelProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.hotelProfile = action.payload;
            })
            .addCase(getHotelProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

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
                state.error = action.payload;
            });

        builder
            .addCase(getDashboardSummery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDashboardSummery.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboardSummery = action.payload;
            })
            .addCase(getDashboardSummery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(getPaymentSummery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPaymentSummery.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentSummery = action.payload;
            })
            .addCase(getPaymentSummery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearAuthMessage, setCredentials } = authSlice.actions;
export default authSlice.reducer;
