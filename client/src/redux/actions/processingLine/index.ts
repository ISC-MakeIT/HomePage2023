import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../../store';
import { ACTION_TYPES } from '../actionTypes';

const proccessingLineSlice = createSlice({
  name: ACTION_TYPES.PROCCESING_LINE,
  initialState: {
    value: false,
  },
  reducers: {
    showProcessingLine: (state) => {
      state.value = true;
    },
    hideProcessingLine: (state) => {
      state.value = false;
    },
    initProcessingLineState: (state) => {
      state.value = false;
    },
  },
});

export const { showProcessingLine, hideProcessingLine, initProcessingLineState } = proccessingLineSlice.actions;
export const selectProcessingLine = (state: RootState) => state.processingLine.value;
export const proccessingLineReducer = proccessingLineSlice.reducer;
