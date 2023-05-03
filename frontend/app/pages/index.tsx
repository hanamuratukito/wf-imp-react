import { Inter } from 'next/font/google';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import LoginInfo from '../features/auth/components/login';

export default function Login() {
  return (
    <div className="flex justify-center">
      <LoginInfo />
    </div>
  );
}
