import React, { useState } from 'react';
import BusinessIcon from '@material-ui/icons/Business';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

export default function RequestListInfo() {
  const [name, setName] = useState<string>('');
  return (
    <div>
      <div className="border flex border-gray-500 rounded-lg px-8 py-6 items-center">
        <div className="flex items-center">
          <BusinessIcon />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="業務名"
            className="w-32 ml-4"
          >
            <MenuItem value={'WF'}>WF</MenuItem>
            <MenuItem value={'見積書'}>見積書</MenuItem>
          </Select>
        </div>
        <div className="ml-14 flex items-center flex-1 w-full">
          <MailOutlineIcon />
          <TextField
            label="依頼名"
            variant="outlined"
            color="primary"
            className="!ml-4 !w-full"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="ml-14 flex items-center">
          <FormatListBulletedIcon />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="ステータス"
            className="ml-4 w-24"
          >
            <MenuItem value={1}>未着手</MenuItem>
            <MenuItem value={2}>着手中</MenuItem>
            <MenuItem value={3}>完了</MenuItem>
          </Select>
        </div>
        <div className="ml-14 flex items-center flex-1 w-full">
          <PermIdentityIcon />
          <TextField
            label="担当者名"
            variant="outlined"
            color="primary"
            className="!ml-4 !w-full"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <Button
          variant="contained"
          className="!ml-14 !text-white !bg-blue-600"
        >
          検索
        </Button>
      </div>
    </div>
  );
}
