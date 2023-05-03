import { Inter } from 'next/font/google';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import React, { useState, useContext } from 'react';
import { signIn, SignInParams } from '../../api/auth';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function LoginInfo() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const tryLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        // Cookies.set('_access_token', res.headers['access-token']);
        // Cookies.set('_client', res.headers['client']);
        // Cookies.set('_uid', res.headers['uid']);

        router.push('/');

        console.log('Signed in successfully!');
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
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
          />

          <Typography variant="body2" className="text-blue-500">
            <Link color="inherit" href="#" underline="always">
              メールアドレスを忘れた方
            </Link>
          </Typography>
        </div>

        <div>
          <TextField
            label="パスワード"
            variant="outlined"
            className="!mt-10"
            color="primary"
            value={password}
          />

          <Typography variant="body2" className="text-blue-500">
            <Link color="inherit" href="#" underline="always">
              パスワードを忘れた方
            </Link>
          </Typography>
        </div>

        <div>
          <Button
            variant="contained"
            className="!mt-12 !text-white !bg-blue-600"
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
