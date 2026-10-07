import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchVacancies = createAsyncThunk('vacancies/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/vacancies');
    return res.data;
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const fetchVacancyById = createAsyncThunk('vacancies/fetchById', async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`/vacancies/${id}`);
    return res.data;
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const createVacancy = createAsyncThunk('vacancies/create', async (data, { rejectWithValue }) => {
  try {
    await api.post('/vacancies', data);
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const updateVacancy = createAsyncThunk('vacancies/update', async ({ id, isActive }, { rejectWithValue }) => {
  try {
    await api.put(`/vacancies/${id}`, { isActive });
    return { id, isActive };
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const respondToVacancy = createAsyncThunk('vacancies/respond', async (id, { rejectWithValue }) => {
  try {
    await api.post(`/vacancies/${id}/response`);
    return id;
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const cancelResponse = createAsyncThunk('vacancies/cancelResponse', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/vacancies/${id}/response`);
    return id;
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const fetchMyVacancies = createAsyncThunk('vacancies/fetchMy', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/my-vacancies');
    return res.data;
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

export const fetchActiveVacancies = createAsyncThunk('vacancies/fetchActive', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/active-vacancies');
    return res.data;
  } catch (err) { return rejectWithValue(err.response?.data?.message); }
});

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState: { list: [], current: null, loading: false, error: null },
  reducers: { clearCurrent: (state) => { state.current = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(fetchVacancyById.fulfilled, (state, action) => { state.current = action.payload; })
      .addCase(updateVacancy.fulfilled, (state, action) => {
        const v = state.list.find(x => x.id === action.payload.id);
        if (v) v.is_active = action.payload.isActive ? 1 : 0;
      })
      .addCase(respondToVacancy.fulfilled, (state, action) => {
        const v = state.list.find(x => x.id === action.payload);
        if (v) { v.user_responded = 1; v.response_count = (v.response_count || 0) + 1; }
        if (state.current && state.current.id === action.payload) state.current.user_responded = 1;
      })
      .addCase(cancelResponse.fulfilled, (state, action) => {
        const v = state.list.find(x => x.id === action.payload);
        if (v) { v.user_responded = 0; v.response_count = Math.max(0, (v.response_count || 1) - 1); }
        if (state.current && state.current.id === action.payload) state.current.user_responded = 0;
      })
      .addCase(fetchMyVacancies.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(fetchActiveVacancies.fulfilled, (state, action) => { state.list = action.payload; });
  }
});

export const { clearCurrent } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;