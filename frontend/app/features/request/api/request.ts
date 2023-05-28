import client from '../../../pages/api/client';
import { RequestState } from '../stores/requestStore';

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

export const getRequest = (request: RequestState): void => {
  // TODO ここで直接storeを呼び出したい
  console.log(request);
  client.post('request/get', { searchCondition: request.searchCondition });
};
