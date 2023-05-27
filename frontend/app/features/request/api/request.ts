import client from '../../../pages/api/client';

export interface GmailInfo {
  resultStatus: number;
  transitionUrl: string;
}

export const openGooglePage = async (): Promise<GmailInfo> => {
  return (await client.get('gmail/get_google_page')).data as GmailInfo;
};

export const addRequest = async (code: string): Promise<void> => {
  console.log((await client.post('gmail/add_request', { code: code })).data);
  console.log((await client.get('gmail/getmail')).data);

  // window.open(
  //   'https://accounts.google.com/o/oauth2/auth?client_id=92907689824-al5iusebl79al019tn08ifdqivaqffc0.apps.googleusercontent.com&redirect_uri=http://localhost:8000&scope=https://www.googleapis.com/auth/gmail.readonly&access_type=offline&response_type=code'
  // );
  // client.get(
  //   'https://accounts.google.com/o/oauth2/auth?client_id=92907689824-al5iusebl79al019tn08ifdqivaqffc0.apps.googleusercontent.com&redirect_uri=http://localhost:3000&scope=https://www.googleapis.com/auth/gmail.readonly&access_type=offline&response_type=code',
  //   {
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   }
  // );
};
