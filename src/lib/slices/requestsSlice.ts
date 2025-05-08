// src/lib/slices/requestsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async (userId: number, thunkAPI) => {
    try {
      const response = await API.get(`/requests/user/${userId}`);
      return response.data;  // Возвращаем данные о запросах
    } catch (err: any) {
      console.log(err)
      return thunkAPI.rejectWithValue('Не удалось загрузить запросы');
    }
  }
);

export const createRequest = createAsyncThunk(
  'requests/createRequest',
  async ({ senderId, receiverId, documentId }: { senderId: number, receiverId: number, documentId: number }, thunkAPI) => {
    try {
      const response = await API.post('/requests/send', { senderId, receiverId, documentId });
      return response.data;
    } catch (err: any) {
      console.log(err)

      return thunkAPI.rejectWithValue('Не удалось создать запрос');
    }
  }
);

const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    requests: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state: any) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchRequests.fulfilled, (state: any, action) => {
        state.requests = action.payload;
        state.loading = false;
      })
      .addCase(fetchRequests.rejected, (state: any, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createRequest.fulfilled, (state: any, action) => {
        state.requests.push(action.payload);
      });
  }
});

export default requestsSlice.reducer;
