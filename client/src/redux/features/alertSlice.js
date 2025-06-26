import { createSlice } from '@reduxjs/toolkit';

/*
How to add new state eg - error message
Add new state inside the slice’s initialState.
Add actions (setErrorMessage, clearErrorMessage) in reducers.
Use dispatch() to update values.
Use useSelector() to read values anywhere in the app.
*/
export const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
})

export const { showLoading, hideLoading } = alertSlice.actions;
