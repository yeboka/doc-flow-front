import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import documentsReducer from "./slices/documentsSlice";
import companyReducer from "./slices/companySlice";
import requestsReducer from "./slices/requestsSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    documents: documentsReducer,
    company: companyReducer,
    requests: requestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
