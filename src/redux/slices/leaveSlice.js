import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaves: [],
  myLeaves: [],
  isLoading: false,
  error: null,
};

const leaveSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    // Fetch all leaves (admin)
    fetchLeavesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchLeavesSuccess: (state, action) => {
      state.isLoading = false;
      state.leaves = action.payload;
    },
    fetchLeavesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Fetch my leaves (student)
    fetchMyLeavesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchMyLeavesSuccess: (state, action) => {
      state.isLoading = false;
      state.myLeaves = action.payload;
    },

    // Submit leave
    submitLeave: (state, action) => {
      state.myLeaves.unshift(action.payload);
    },

    // Update leave status (admin)
    updateLeaveStatus: (state, action) => {
      const index = state.leaves.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.leaves[index].status = action.payload.status;
      }
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchLeavesStart,
  fetchLeavesSuccess,
  fetchLeavesFailure,
  fetchMyLeavesStart,
  fetchMyLeavesSuccess,
  submitLeave,
  updateLeaveStatus,
  clearError,
} = leaveSlice.actions;

export default leaveSlice.reducer;
