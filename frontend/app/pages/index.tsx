import { Inter } from 'next/font/google';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const inter = Inter({ subsets: ['latin'] });

export default function Login() {
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
          />

          <Typography variant="body2" className="text-blue-500">
            <Link color="inherit" href="#" underline="always">
              パスワードを忘れた方
            </Link>
          </Typography>
        </div>

        <Button variant="contained" className="!mt-12 !text-white !bg-blue-600">
          ログイン
        </Button>
      </div>
    </div>
  );
}
