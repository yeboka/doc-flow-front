import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/lib/axios';

export const fetchUsersInCompany = createAsyncThunk(
  'company/fetchUsersInCompany',
  async (companyId: number, thunkAPI) => {
    try {
      const response = await API.get(`/company/${companyId}/users`);
      return response.data;
    } catch (err) {
      console.log(err)

      return thunkAPI.rejectWithValue("Не удалось загрузить пользователей компании");
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'company/updateUserRole',
  async ({ companyId, userId, role }: { companyId: number; userId: number; role: string }, thunkAPI) => {
    try {
      await API.put(`/company/${companyId}/users/${userId}/role`, { role });
      return { userId, role };
    } catch (err) {
      console.log(err)

      return thunkAPI.rejectWithValue("Не удалось обновить роль");
    }
  }
);

export const deleteUserFromCompany = createAsyncThunk(
  'company/deleteUserFromCompany',
  async ({ companyId, userId }: { companyId: number; userId: number }, thunkAPI) => {
    try {
      await API.delete(`/company/${companyId}/users/${userId}`);
      return userId;  // Возвращаем userId для обновления стейта
    } catch (err) {
      console.log(err)

      return thunkAPI.rejectWithValue("Не удалось удалить пользователя");
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    users: [],
    loading: false,
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersInCompany.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(fetchUsersInCompany.fulfilled, (state: any, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsersInCompany.rejected, (state: any, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateUserRole.fulfilled, (state: any, action) => {
        const { userId, role } = action.payload;
        const user = state.users.find((user: any) => user.id === userId);
        if (user) user.role = role;
      })
      .addCase(updateUserRole.rejected, (state: any, action) => {
        state.error = action.payload;
      })
      .addCase(deleteUserFromCompany.fulfilled, (state: any, action) => {
        // Удаляем пользователя из списка в стейте
        state.users = state.users.filter((user: any) => user.id !== action.payload);
      });
  }
});

export default companySlice.reducer;
