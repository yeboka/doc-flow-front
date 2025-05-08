import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('/profile');
      return response.data as any;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null as any,
    loading: false,
    error: '',
  },
  reducers: {
    clearProfile: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
