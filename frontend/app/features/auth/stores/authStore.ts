import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from "../../../stores/store";

export type AuthState = {
  isLogin: boolean;
};

export type UpdateAuthPayload = AuthState;

const initialState: AuthState = {
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateIsLogin(state, action: PayloadAction<UpdateAuthPayload>) {
      // TODO isLoginだけ渡すことはできないのか？
      state.isLogin = action.payload.isLogin;
    },
    reset(): AuthState {
      return initialState;
    },
  },
});

export const getIsLogin = (state: AppState) => state.auth.isLogin;
