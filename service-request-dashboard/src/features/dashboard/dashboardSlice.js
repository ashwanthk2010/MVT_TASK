import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDashboardSnapshot } from '../../services/dashboardService';
const initialState = {
    statistics: null,
    monthlyData: [],
    statusDistribution: [],
    recentRequests: [],
    recentActivities: [],
    loading: false,
    error: null,
};
export const fetchDashboardStatistics = createAsyncThunk('dashboard/fetchDashboardStatistics', async (_, { rejectWithValue }) => {
    try {
        return await fetchDashboardSnapshot();
    }
    catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Failed to load dashboard data.');
    }
});
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStatistics.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchDashboardStatistics.fulfilled, (state, action) => {
            state.loading = false;
            state.statistics = action.payload.statistics;
            state.monthlyData = action.payload.monthlyData;
            state.statusDistribution = action.payload.statusDistribution;
            state.recentRequests = action.payload.recentRequests;
            state.recentActivities = action.payload.recentActivities;
        })
            .addCase(fetchDashboardStatistics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? 'Failed to load dashboard data.';
        });
    },
});
export default dashboardSlice.reducer;
export const selectDashboard = (state) => state.dashboard;
