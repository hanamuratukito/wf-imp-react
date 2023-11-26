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
import { useList } from '../hooks/useList';

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
  const {
    page,
    rowsPerPage,
    stateReuest,
    handleChangePage,
    handleChangeRowsPerPage,
    tryAddRequest,
    init,
  } = useList();

  React.useEffect(() => {
    init();
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
