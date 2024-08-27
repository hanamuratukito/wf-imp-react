import { requestSlice, RequestState } from './requestStore';

jest.mock('react-redux')

describe('test', () => {
  it('test case 1', () => {
    const initialState: RequestState = {
      searchCondition: {
        businessType: null,
        requestName: '',
        status: null,
        contact: '',
      },
      requests: []
    };

    // NOTE: payloadが引数の値
    const action = { type: requestSlice.actions.updateBusinessType.type, payload: 1 };

    const state = requestSlice.reducer(initialState, action);
    expect(state.searchCondition.businessType).toBe(1);
  })
});
