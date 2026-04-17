import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  selectedCourse: null,
  isLoading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // Fetch courses
    fetchCoursesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCoursesSuccess: (state, action) => {
      state.isLoading = false;
      state.courses = action.payload;
    },
    fetchCoursesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Add course
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },

    // Update course
    updateCourse: (state, action) => {
      const index = state.courses.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },

    // Delete course
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((c) => c.id !== action.payload);
    },

    // Set selected course
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },

    // Clear selected
    clearSelected: (state) => {
      state.selectedCourse = null;
    },
  },
});

export const {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  addCourse,
  updateCourse,
  deleteCourse,
  setSelectedCourse,
  clearSelected,
} = courseSlice.actions;

export default courseSlice.reducer;
