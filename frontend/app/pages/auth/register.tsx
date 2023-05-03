import { Inter } from 'next/font/google';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import UserRegisterInfo from '../../features/auth/components/register/register';

export default function UserRegister() {
  return (
    <div className="flex justify-center">
      <UserRegisterInfo />
    </div>
  );
}
