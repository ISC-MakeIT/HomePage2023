import { type AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../../store';
import { ACTION_TYPES } from '../actionTypes';

interface Alert {
  type: AlertColor;
  content: string;
}

const alertListSlice = createSlice({
  name: ACTION_TYPES.USER_TOKEN,
  initialState: {
    value: [] as Alert[],
  },
  reducers: {
    addAlertToAlertList: (state, action: { type: string; payload: Alert }) => {
      state.value.unshift(action.payload);
    },
    popFromAlertList: (state) => {
      state.value.pop();
    },
    initAlertList: (state) => {
      state.value = [];
    },
  },
});

export const { addAlertToAlertList, popFromAlertList, initAlertList } = alertListSlice.actions;
export const selectAlertList = (state: RootState) => state.alertList.value;
export const alertListReducer = alertListSlice.reducer;
export type { Alert };
