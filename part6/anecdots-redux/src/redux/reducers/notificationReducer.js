import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
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

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    dispatch(createNotification(text));
    setTimeout(() => {
      dispatch(clearNotification());
    }, parseInt(seconds));
  };
};

export default notificationSlice.reducer;
