import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  durationMinutes: 0,
  durationSeconds: 0,
  seconds: 0,
  isRunning: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    restartTimer: (state) => {
      state.seconds = state.durationMinutes * 60 + state.durationSeconds;
      state.isRunning = false;
    },
    decrementTimer: (state) => {
      if (state.isRunning && state.seconds > 0) {
        state.seconds -= 1;
      }
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.seconds = 0;
    },

    changeTimer: (state, action) => {
      const { minutes, seconds } = action.payload;
      state.durationMinutes = minutes;
      state.durationSeconds = seconds;
      state.seconds = minutes * 60 + seconds;
    },
  },
});

export const {
  startTimer,
  stopTimer,
  restartTimer,
  decrementTimer,
  changeTimer,
  resetTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
