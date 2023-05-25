import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../../stores/store';

export type SearchConditionInfo = {
  businessName: string;
  requestName: string;
  status: string;
  contact: string;
};

export type RequestInfo = {
  businessName: string;
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
    businessName: '',
    requestName: '',
    status: '',
    contact: '',
  },
  requests: null
};

export const authSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    updateSearchCondition(state, action: PayloadAction<UpdateAuthPayload>) {
      // TODO isLoginだけ渡すことはできないのか？
      state.isLogin = action.payload.isLogin;
    },
    reset(): RequestState {
      return initialState;
    },
  },
});

export const getIsLogin = (state: AppState) => state.auth.isLogin;
