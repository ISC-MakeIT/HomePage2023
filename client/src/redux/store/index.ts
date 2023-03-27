import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userTokenReducer } from '../actions/user/userTokenReducer';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { alertListReducer } from '@redux/actions/alert/alertListReducer';

const reducers = combineReducers({
  userToken: userTokenReducer,
  alertList: alertListReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
