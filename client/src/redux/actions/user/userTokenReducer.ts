import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../../store';
import { ACTION_TYPES } from '../actionTypes';

const userTokenSlice = createSlice({
  name: ACTION_TYPES.USER_TOKEN,
  initialState: {
    value: '',
  },
  reducers: {
    setToken: (state, action: { payload: string }) => {
      state.value = action.payload;
    },
  },
});

export const { setToken } = userTokenSlice.actions;
export const selectUserToken = (state: RootState) => state.userToken.value;
export const userTokenReducer = userTokenSlice.reducer;
