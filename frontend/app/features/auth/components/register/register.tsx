import { Inter } from 'next/font/google';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { signUp, SignUpParams } from '../../api/auth';
import { useRouter } from 'next/router';
import Cookies from "js-cookie"

const inter = Inter({ subsets: ['latin'] });

export default function UserRegisterInfo() {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const tryRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // TODO セキュリティ面を考慮するとサーバーでcookie登録するのが望ましい
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        router.push('/request/list');

        console.log('Signed in successfully!');
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
          新規登録
        </Typography>

        {/* TODO valueとonChangeを一行でまとめられないか */}
        <TextField
          label="名前"
          variant="outlined"
          className="!mt-10"
          color="primary"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="メールアドレス"
          variant="outlined"
          className="!mt-10"
          color="primary"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="パスワード"
          variant="outlined"
          className="!mt-10"
          color="primary"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <TextField
          label="パスワード(確認)"
          variant="outlined"
          className="!mt-10"
          color="primary"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />

        <div>
          <Button
            variant="contained"
            className="!ml-3 !mt-12 !text-white !bg-blue-600"
            onClick={tryRegister}
          >
            新規登録
          </Button>
        </div>
      </div>
    </div>
  );
}
