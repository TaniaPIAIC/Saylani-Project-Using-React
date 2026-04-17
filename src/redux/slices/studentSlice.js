import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  applications: [],
  isLoading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // Fetch students (admin)
    fetchStudentsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchStudentsSuccess: (state, action) => {
      state.isLoading = false;
      state.students = action.payload;
    },
    fetchStudentsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Add students (bulk upload)
    addStudentsBulk: (state, action) => {
      state.students = [...state.students, ...action.payload];
    },

    // Fetch my applications (student)
    fetchApplicationsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchApplicationsSuccess: (state, action) => {
      state.isLoading = false;
      state.applications = action.payload;
    },

    // Apply for course
    applyForCourse: (state, action) => {
      state.applications.unshift(action.payload);
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchStudentsStart,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  addStudentsBulk,
  fetchApplicationsStart,
  fetchApplicationsSuccess,
  applyForCourse,
  clearError,
} = studentSlice.actions;

export default studentSlice.reducer;
