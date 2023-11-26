import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';
import { AppState } from '../../../stores/store';

export type SearchConditionInfo = {
  businessType: number | null;
  requestName: string;
  status: number | null;
  contact: string;
};

export type RequestInfo = {
  id: number;
  businessType: number;
  requestName: string;
  status: number;
  contact: string;
  createdUserName: string;
  updatedUserName: string;
};

export type RequestState = {
  searchCondition: SearchConditionInfo;
  requests: RequestInfo[];
};

export type UpdateAuthPayload = RequestState;

const initialState: RequestState = {
  searchCondition: {
    businessType: null,
    requestName: '',
    status: null,
    contact: '',
  },
  requests: []
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    updateBusinessType(state, action: PayloadAction<number>) {
      state.searchCondition.businessType = action.payload;
    },
    updateRequestName(state, action: PayloadAction<string>) {
      state.searchCondition.requestName = action.payload;
    },
    updateStatus(state, action: PayloadAction<number>) {
      state.searchCondition.status = action.payload;
    },
    updateContact(state, action: PayloadAction<string>) {
      state.searchCondition.contact = action.payload;
    },
    updateRequest(state, action: PayloadAction<RequestInfo[]>) {
      state.requests = action.payload;
    },
    reset(): RequestState {
      return initialState;
    },
  },
});

export const getRequestStore = (state: AppState) => state;

export const requestInfo = configureStore({
  reducer: {
    requestInfo: requestSlice.reducer,
  },
});
