import { openGooglePageTestCode } from './requestTest';
import axios from 'axios';

jest.mock('axios')
const postApiMock = jest.spyOn(axios, 'get').mockName('axios-get');

// モックの戻り値を適宜セット
postApiMock.mockResolvedValue({data: [{name: 'Bob'}]});

describe('test', () => {
  it('test case 1', () => {
    
    const users = [{name: 'Bob'}];
    const resp = {data: users};

    openGooglePageTestCode().then(data => expect(data).toEqual(users));
  })
});
