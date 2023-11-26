import { signOut } from '../features/auth/api/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getIsLogin, authSlice } from '../features/auth/stores/authStore';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
}));

export const useHeader = () => {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLogin = useSelector(getIsLogin);

  // useEffectを使わずにHTMLのだし分けを行うと、エラーが発生するためその回避
  // 参考：https://nishinatoshiharu.com/next-hydration-warning-resolution/
  const [isClient, setIsClient] = useState(false);

  const tryLogout = async () => {
    try {
      const res = await signOut();

      if (res.data.success) {
        // サインアウト時には各Cookieを削除
        // TODO セキュリティ上、Cookieはサーバ側で登録するべき
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');

        dispatch(authSlice.actions.updateIsLogin({ isLogin: false }));

        router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    classes,
    isLogin,
    isClient,
    tryLogout,
    setIsClient,
  };
};
