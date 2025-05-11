// lib/slices/requestsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async (userId: number, thunkAPI) => {
    try {
      const response = await API.get(`/requests/user/${userId}`);
      return response.data;
    } catch (err: any) {
      console.log(err);
      return thunkAPI.rejectWithValue('Не удалось загрузить запросы');
    }
  }
);

export const createRequest = createAsyncThunk(
  'requests/createRequest',
  async (
    { senderId, receiverId, documentId }: { senderId: number; receiverId: number; documentId: number },
    thunkAPI
  ) => {
    try {
      const response = await API.post('/requests/send', { senderId, receiverId, documentId });
      return response.data;
    } catch (err: any) {
      console.log(err);
      return thunkAPI.rejectWithValue('Не удалось создать запрос');
    }
  }
);

export const signRequest = createAsyncThunk(
  'requests/signRequest',
  async ({ requestId, userId }: { requestId: number; userId: number }, thunkAPI) => {
    try {
      const res = await API.post(`/requests/sign/${requestId}`, { userId });
      return res.data;
    } catch (err: any) {
      console.log(err)
      return thunkAPI.rejectWithValue('Не удалось подписать документ');
    }
  }
);

export const declineRequest = createAsyncThunk(
  'requests/declineRequest',
  async ({ requestId }: { requestId: number }, thunkAPI) => {
    try {
      const res = await API.post(`/requests/decline/${requestId}`);
      return res.data;
    } catch (err: any) {
      console.log(err)
      return thunkAPI.rejectWithValue('Не удалось отклонить запрос');
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
      })
      .addCase(signRequest.fulfilled, (state: any, action) => {
        const updatedRequest = action.payload;
        const index = state.requests.findIndex((r: any) => r.id === updatedRequest.id);
        if (index !== -1) {
          state.requests[index] = updatedRequest;
        }
      })
      .addCase(declineRequest.fulfilled, (state: any, action) => {
        const updatedRequest = action.payload;
        const index = state.requests.findIndex((r: any) => r.id === updatedRequest.id);
        if (index !== -1) {
          state.requests[index] = updatedRequest;
        }
      });
  },
});

export default requestsSlice.reducer;
