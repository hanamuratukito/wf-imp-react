
import axios from 'axios';

export interface GmailInfo {
  resultStatus: number;
  transitionUrl: string;
}
export const openGooglePageTestCode = async (): Promise<GmailInfo> => {
  return (await axios.get('http://localhost:3000/api/gmail/get_google_page', {
    withCredentials: true
  })).data as GmailInfo;
};
