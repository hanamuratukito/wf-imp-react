import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { signIn } from '../../api/auth';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { authSlice } from '../../stores/authStore';
import { useDispatch } from 'react-redux';

export default function LoginInfo() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const tryLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await signIn({
        email: email,
        password: password,
      });

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        // TODO セキュリティ面を考慮するとサーバーでcookie登録するのが望ましい
        // TODO ログイン確認APIの作成
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        dispatch(authSlice.actions.updateIsLogin({ isLogin: true }));

        router.push('/request/list');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      {/* TODO 「material-ui」のBoxを使うとTextFieldのUIが崩れてしまうため、divで記載 */}
      <div className="border mt-16 flex items-center flex-col border-gray-500 rounded-lg w-800 h-600">
        <Typography variant="h6" className="!mt-10">
          ログイン
        </Typography>

        <div>
          <TextField
            label="メールアドレス"
            variant="outlined"
            className="!mt-10"
            color="primary"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <TextField
            label="パスワード"
            variant="outlined"
            className="!mt-10"
            color="primary"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div>
          <Button
            variant="contained"
            className="!mt-12 !text-white !bg-blue-600"
            href="/auth/register"
          >
            新規登録
          </Button>

          <Button
            variant="contained"
            className="!ml-3 !mt-12 !text-white !bg-blue-600"
            onClick={tryLogin}
          >
            ログイン
          </Button>
        </div>
      </div>
    </div>
  );
}
