import client from '../../../pages/api/client';
import Cookies from 'js-cookie';
import axios from 'axios';

// サインアップ
export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// サインイン
export interface SignInParams {
  email: string;
  password: string;
}

// ユーザー
export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserInfo {
  data?: User;
  isLogin: boolean;
}

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post('auth', params);
};

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
  return client.post('auth/sign_in', params);
};

// サインアウト（ログアウト）
export const signOut = () => {
  // TODO セキュリティ面を考慮するとサーバーでcookie登録するのが望ましい
  return client.delete('auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};

// 認証済みのユーザーを取得
export const getCurrentUser = async (): Promise<UserInfo> => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  )
    return { isLogin: false };
  const res = await client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
  return res.data;
};
