import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../../stores/store';

export type SearchConditionInfo = {
  businessType: string;
  requestName: string;
  status: string;
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
};

export type UpdateAuthPayload = RequestState;

const initialState: RequestState = {
  searchCondition: {
    businessType: '',
    requestName: '',
    status: '',
    contact: '',
  }
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    updateSearchCondition(state, action: PayloadAction<SearchConditionInfo>) {
      console.log(state);
    },
    reset(): RequestState {
      return initialState;
    },
  },
});

export const getRequestStore = (state: AppState) => state;
