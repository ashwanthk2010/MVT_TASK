import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../services/serviceRequestService';
import type {
  Attachment,
  RequestStatus,
  ServiceRequest,
  ServiceRequestFormValues,
  ServiceRequestState,
} from '../../types/serviceRequest.types';
import type { RootState } from '../../app/store';
import type { FetchRequestsParams } from '../../services/serviceRequestService';

const initialState: ServiceRequestState = {
  requests: [],
  selectedRequest: null,
  loading: false,
  submitting: false,
  error: null,
  totalRecords: 0,
};

export const fetchServiceRequests = createAsyncThunk(
  'serviceRequest/fetchServiceRequests',
  async (params: FetchRequestsParams, { rejectWithValue }) => {
    try {
      return await api.fetchServiceRequests(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load requests.');
    }
  },
);

export const fetchServiceRequestById = createAsyncThunk(
  'serviceRequest/fetchServiceRequestById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await api.fetchServiceRequestById(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load request.');
    }
  },
);

export const createServiceRequest = createAsyncThunk(
  'serviceRequest/createServiceRequest',
  async (
    { values, attachments }: { values: ServiceRequestFormValues; attachments: Attachment[] },
    { rejectWithValue },
  ) => {
    try {
      return await api.createServiceRequest(values, attachments);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create request.');
    }
  },
);

export const updateServiceRequest = createAsyncThunk(
  'serviceRequest/updateServiceRequest',
  async (
    { id, values, attachments }: { id: string; values: ServiceRequestFormValues; attachments: Attachment[] },
    { rejectWithValue },
  ) => {
    try {
      return await api.updateServiceRequest(id, values, attachments);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update request.');
    }
  },
);

export const deleteServiceRequest = createAsyncThunk(
  'serviceRequest/deleteServiceRequest',
  async (id: string, { rejectWithValue }) => {
    try {
      return await api.deleteServiceRequest(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete request.');
    }
  },
);

export const updateRequestStatus = createAsyncThunk(
  'serviceRequest/updateRequestStatus',
  async (
    { id, status, reason }: { id: string; status: RequestStatus; reason?: string },
    { rejectWithValue },
  ) => {
    try {
      return await api.updateRequestStatus(id, status, reason);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update status.');
    }
  },
);

const serviceRequestSlice = createSlice({
  name: 'serviceRequest',
  initialState,
  reducers: {
    clearSelectedRequest: (state) => {
      state.selectedRequest = null;
    },
    clearServiceRequestError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.data;
        state.totalRecords = action.payload.total;
      })
      .addCase(fetchServiceRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to load requests.';
      })

      .addCase(fetchServiceRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedRequest = null;
      })
      .addCase(fetchServiceRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRequest = action.payload;
      })
      .addCase(fetchServiceRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to load request.';
      })

      .addCase(createServiceRequest.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createServiceRequest.fulfilled, (state, action: { payload: ServiceRequest }) => {
        state.submitting = false;
        state.requests = [action.payload, ...state.requests];
        state.totalRecords += 1;
      })
      .addCase(createServiceRequest.rejected, (state, action) => {
        state.submitting = false;
        state.error = (action.payload as string) ?? 'Failed to create request.';
      })

      .addCase(updateServiceRequest.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateServiceRequest.fulfilled, (state, action: { payload: ServiceRequest }) => {
        state.submitting = false;
        state.requests = state.requests.map((r) => (r.id === action.payload.id ? action.payload : r));
        state.selectedRequest = action.payload;
      })
      .addCase(updateServiceRequest.rejected, (state, action) => {
        state.submitting = false;
        state.error = (action.payload as string) ?? 'Failed to update request.';
      })

      .addCase(deleteServiceRequest.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteServiceRequest.fulfilled, (state, action: { payload: string }) => {
        state.submitting = false;
        state.requests = state.requests.filter((r) => r.id !== action.payload);
        state.totalRecords = Math.max(0, state.totalRecords - 1);
      })
      .addCase(deleteServiceRequest.rejected, (state, action) => {
        state.submitting = false;
        state.error = (action.payload as string) ?? 'Failed to delete request.';
      })

      .addCase(updateRequestStatus.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action: { payload: ServiceRequest }) => {
        state.submitting = false;
        state.requests = state.requests.map((r) => (r.id === action.payload.id ? action.payload : r));
        state.selectedRequest = action.payload;
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.submitting = false;
        state.error = (action.payload as string) ?? 'Failed to update status.';
      });
  },
});

export const { clearSelectedRequest, clearServiceRequestError } = serviceRequestSlice.actions;
export default serviceRequestSlice.reducer;

export const selectServiceRequestState = (state: RootState) => state.serviceRequest;
export const selectRequests = (state: RootState) => state.serviceRequest.requests;
export const selectSelectedRequest = (state: RootState) => state.serviceRequest.selectedRequest;
