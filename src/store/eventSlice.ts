import { createSlice } from '@reduxjs/toolkit';

// initial values 
const initialState = {
  isLoggedIn: false,
  checkedIn: false,
  eventStarted: false,
  setupDone: false,
  completed: false,
};

// slices
const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    checkIn: (state) => {
      state.checkedIn = true;
    },
    startEvent: (state) => {
      state.eventStarted = true;
    },
    finishSetup: (state) => {
      state.setupDone = true;
    },
    completeEvent: (state) => {
      state.completed = true;
    },
    resetEvent: () => initialState,
  },
});

export const {
  login,
  checkIn,
  startEvent,
  finishSetup,
  completeEvent,
  resetEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
