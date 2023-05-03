import client from '../../../pages/api/client';

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

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  // return client.post('auth/registrations', params);
  return client.post('auth', params);
};

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
  return client.post('auth/sign_in', params);
};

// サインアウト（ログアウト）
export const signOut = () => {
  // return client.delete('auth/sign_out', {
  //   headers: {
  //     'access-token': Cookies.get('_access_token'),
  //     client: Cookies.get('_client'),
  //     uid: Cookies.get('_uid'),
  //   },
  // });
};

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  // if (
  //   !Cookies.get('_access_token') ||
  //   !Cookies.get('_client') ||
  //   !Cookies.get('_uid')
  // )
  //   return;
  // return client.get('/auth/sessions', {
  //   headers: {
  //     'access-token': Cookies.get('_access_token'),
  //     client: Cookies.get('_client'),
  //     uid: Cookies.get('_uid'),
  //   },
  // });
};
