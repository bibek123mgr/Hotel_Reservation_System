import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTHAPI } from '../../../api/axiosConfig';

// Async Thunks
export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await AUTHAPI.post('v1/hotel-rooms-category', categoryData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAllCategories = createAsyncThunk(
    'category/getAllCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AUTHAPI.get('v1/hotel-rooms-category');
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await AUTHAPI.put(`v1/hotel-rooms-category`, categoryData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id, { rejectWithValue }) => {
        try {
            await AUTHAPI.delete(`v1/hotel-rooms-category/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Slice
const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetCategoryState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Category
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
                state.success = true;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create category';
            })

            // Get All Categories
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch categories';
            })

            // Update Category
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.categories.findIndex(
                    (category) => category.id === action.payload.id
                );
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
                state.success = true;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update category';
            })

            // Delete Category
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(
                    (category) => category.id !== action.payload
                );
                state.success = true;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to delete category';
            });
    },
});

// Export actions and reducer
export const { resetCategoryState } = categorySlice.actions;
export default categorySlice.reducer;