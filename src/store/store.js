import {configureStore} from '@reduxjs/toolkit';
import toastSlice from './toastSlice';
import authSlice from './authSlice';

export const store = configureStore({
	reducer: {
		toast: toastSlice,
		auth: authSlice,
	},
});
