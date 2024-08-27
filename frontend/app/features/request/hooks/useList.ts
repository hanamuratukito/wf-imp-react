import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestStore, requestSlice } from '../stores/requestStore';
import { openGooglePage, addRequest, getRequest } from '../api/request';
import { getCurrentUser } from '../../auth/api/auth';
import { authSlice } from '../../auth/stores/authStore';

export const useList = () => {
  const dispatch = useDispatch();
  const { updateRequest } = requestSlice.actions;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router = useRouter();

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tryAddRequest = async () => {
    // 文字列クエリパラメータを取得
    const { code } = router.query;

    if (code) {
      await addRequest(code as string);
    } else {
      // リクエストトークン作成処理
      // バックエンドでリダイレクトをさせるべきなのだが対応手段がわからず、
      // グーグルアカウントでのログインなどは運用でカバーする
      const gmailInfo = await openGooglePage();
      window.open(gmailInfo.transitionUrl);
    }
  };

  const stateReuest = useSelector(getRequestStore).request;
  const init = async () => {
    const resIsLogin = await getCurrentUser();

    if (!resIsLogin.isLogin) router.push('/');

    dispatch(authSlice.actions.updateIsLogin({ isLogin: resIsLogin.isLogin }));
    const resRequests = await getRequest(stateReuest);
    dispatch(updateRequest(resRequests));
  };

  return {
    page,
    rowsPerPage,
    stateReuest,
    handleChangePage,
    handleChangeRowsPerPage,
    tryAddRequest,
    init,
  };
};
