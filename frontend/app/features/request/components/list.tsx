import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import { openGooglePage, addRequest, getRequest } from '../api/request';
import { useRouter } from 'next/router';
import {
  getRequestStore,
  RequestInfo,
  requestSlice,
  requestInfo,
} from '../stores/requestStore';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
  { id: 'businessType', label: '業務名', minWidth: 170, align: 'left' },
  { id: 'requestName', label: '依頼名', minWidth: 100, align: 'left' },
  {
    id: 'status',
    label: 'ステータス',
    minWidth: 170,
    align: 'left',
    format: (value: any) => value.toLocaleString('en-US'),
  },
  {
    id: 'contact',
    label: '担当者',
    minWidth: 170,
    align: 'left',
    format: (value: any) => value.toLocaleString('en-US'),
  },
  {
    id: 'createdUserName',
    label: '作成者',
    minWidth: 170,
    align: 'left',
    format: (value: any) => value.toFixed(2),
  },
  {
    id: 'updatedUserName',
    label: '更新者',
    minWidth: 170,
    align: 'left',
    format: (value: any) => value.toFixed(2),
  },
];

export default function RequestListInfo() {
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
  React.useEffect(() => {
    (async () => {
      const resRequests = await getRequest(stateReuest);
      dispatch(updateRequest(resRequests));
    })();
  }, []);

  return (
    // 「JSX expressions must have one parent element.」対策に<>を導入
    <>
      <Button onClick={tryAddRequest}>
        <AddBoxIcon />
      </Button>
      <TableContainer className="mt-3">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stateReuest.requests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id === 'businessType') {
                        value = value === 1 ? 'WF' : '見積書';
                      } else if (column.id === 'status') {
                        value =
                          value === 0
                            ? '未着手'
                            : value === 1
                            ? '進行中'
                            : '完了';
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="!border"
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={stateReuest.requests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
