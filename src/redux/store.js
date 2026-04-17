import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";
import leaveReducer from "./slices/leaveSlice";
import studentReducer from "./slices/studentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    leaves: leaveReducer,
    students: studentReducer,
  },
});

export default store;
