import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const { createNotification, clearNotification } =
  notificationSlice.actions;

export const setNotification = (text, seconds = 5000) => {
  return async (dispatch) => {
    const resetNotification = () => {
      setTimeout(() => {
        dispatch(clearNotification());
      }, parseInt(seconds));
    };
    clearInterval(resetNotification);
    dispatch(createNotification(text));
    resetNotification();
  };
};

export default notificationSlice.reducer;
