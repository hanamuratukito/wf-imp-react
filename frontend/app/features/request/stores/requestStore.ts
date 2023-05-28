import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../../stores/store';

export type SearchConditionInfo = {
  businessType: string;
  requestName: string;
  status: string;
  contact: string;
};

export type RequestInfo = {
  businessType: string;
  requestName: string;
  status: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
};

export type RequestState = {
  searchCondition: SearchConditionInfo;
  requests: RequestInfo[] | null;
};

export type UpdateAuthPayload = RequestState;

const initialState: RequestState = {
  searchCondition: {
    businessType: '',
    requestName: '',
    status: '',
    contact: '',
  },
  requests: null
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    reset(): RequestState {
      return initialState;
    },
  },
});

export const getRequestStore = (state: AppState) => state;
