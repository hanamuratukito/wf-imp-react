import React, { useState } from 'react';
import BusinessIcon from '@material-ui/icons/Business';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { getRequestStore, requestSlice } from '../stores/requestStore';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest } from '../api/request';

export default function RequestListInfo() {
  const dispatch = useDispatch();
  const selector = useSelector(getRequestStore);
  const {
    updateBusinessType,
    updateRequestName,
    updateStatus,
    updateContact,
    updateRequest,
  } = requestSlice.actions;

  const businessType = selector.request.searchCondition.businessType;
  const requestName = selector.request.searchCondition.requestName;
  const status = selector.request.searchCondition.status;
  const contact = selector.request.searchCondition.contact;

  const changeBusinessType = (value: number) => {
    dispatch(updateBusinessType(value));
    console.log(value);
  };

  const changeRequestName = (value: string) => {
    dispatch(updateRequestName(value));
    console.log(value);
  };

  const changeStatus = (value: number) => {
    dispatch(updateStatus(value));
    console.log(value);
  };

  const changeContact = (value: string) => {
    dispatch(updateContact(value));
    console.log(value);
  };

  const searchRequest = async () => {
    const requests = await getRequest(selector.request);
    dispatch(updateRequest(requests));
    console.log(selector);
  };

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
            onChange={(event) =>
              changeBusinessType(event.target.value as number)
            }
            value={businessType}
          >
            <MenuItem value={1}>WF</MenuItem>
            <MenuItem value={2}>見積書</MenuItem>
          </Select>
        </div>
        <div className="ml-14 flex items-center flex-1 w-full">
          <MailOutlineIcon />
          <TextField
            label="依頼名"
            variant="outlined"
            color="primary"
            className="!ml-4 !w-full"
            value={requestName}
            onChange={(event) => changeRequestName(event.target.value)}
          />
        </div>
        <div className="ml-14 flex items-center">
          <FormatListBulletedIcon />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="ステータス"
            className="ml-4 w-24"
            value={status}
            onChange={(event) => changeStatus(event.target.value as number)}
          >
            <MenuItem value={0}>未着手</MenuItem>
            <MenuItem value={1}>進行中</MenuItem>
            <MenuItem value={2}>完了</MenuItem>
          </Select>
        </div>
        <div className="ml-14 flex items-center flex-1 w-full">
          <PermIdentityIcon />
          <TextField
            label="担当者名"
            variant="outlined"
            color="primary"
            className="!ml-4 !w-full"
            value={contact}
            onChange={(event) => changeContact(event.target.value)}
          />
        </div>
        <Button
          variant="contained"
          className="!ml-14 !text-white !bg-blue-600"
          onClick={searchRequest}
        >
          検索
        </Button>
      </div>
    </div>
  );
}
