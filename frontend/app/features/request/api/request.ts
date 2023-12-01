import client from '../../../pages/api/client';
import { RequestState } from '../stores/requestStore';
import { RequestInfo } from '../stores/requestStore';
import axios from 'axios';

export interface GmailInfo {
  resultStatus: number;
  transitionUrl: string;
}

export const openGooglePage = async (): Promise<GmailInfo> => {
  return (await client.get('gmail/get_google_page')).data as GmailInfo;
};

export const addRequest = async (code: string): Promise<void> => {
  // TODO 一つのapiの中で完結する、エラー処理
  (await client.post('gmail/set_token', { code: code })).data;
  await client.get('gmail/get_mail');
};

export const getRequest = async (
  request: RequestState
): Promise<RequestInfo[]> => {
  // TODO ここで直接storeを呼び出したい
  const res = await client.post('request/get', {
    searchCondition: request.searchCondition,
  });

  return res.data.requests as RequestInfo[];
};
