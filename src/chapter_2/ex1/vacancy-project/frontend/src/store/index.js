import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import vacanciesReducer from './vacanciesSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    vacancies: vacanciesReducer,
  },
});