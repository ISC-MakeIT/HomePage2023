import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../../store';
import { ACTION_TYPES } from '../actionTypes';

const userIdSlice = createSlice({
  name: ACTION_TYPES.USER_TOKEN,
  initialState: {
    value: 0,
  },
  reducers: {
    setUserId: (state, action: { payload: number }) => {
      state.value = action.payload;
    },
  },
});

export const { setUserId } = userIdSlice.actions;
export const selectUserId = (state: RootState) => state.userId.value;
export const userIdReducer = userIdSlice.reducer;
