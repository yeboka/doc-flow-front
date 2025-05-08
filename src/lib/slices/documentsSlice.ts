import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../axios";

export const fetchDocuments = createAsyncThunk("documents/fetchDocuments", async (_, thunkAPI) => {
  try {
    const res = await API.get("/documents/user");
    return res.data;
  } catch (err: any) {
    console.log(err)

    return thunkAPI.rejectWithValue("Ошибка при загрузке документов");
  }
});

const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    data: [] as any[],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default documentsSlice.reducer;
