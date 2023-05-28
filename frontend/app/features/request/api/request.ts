import client from '../../../pages/api/client';

export interface GmailInfo {
  resultStatus: number;
  transitionUrl: string;
}

export const openGooglePage = async (): Promise<GmailInfo> => {
  return (await client.get('gmail/get_google_page')).data as GmailInfo;
};

export const addRequest = async (code: string): Promise<void> => {
  // TODO 一つのapiの中で完結するべき
  console.log((await client.post('gmail/set_token', { code: code })).data);
  console.log((await client.get('gmail/get_mail')).data);
};
