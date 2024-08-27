import { useChangeBusinessType } from './useChangeBusinessType';
import { RequestState } from '../stores/requestStore';
import { useSelector, useDispatch } from 'react-redux'
import { act } from "react-dom/test-utils";

jest.mock('react-redux')
const useDispatchMock = useDispatch as jest.Mock
const useSelectorMock = useSelector as jest.Mock<{request: RequestState}>

describe('test', () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({request: {
      searchCondition: {
        businessType: null,
        requestName: '',
        status: null,
        contact: '',
      },
      requests: []
    }})
    useDispatchMock.mockReturnValue(jest.fn())
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('test case 1', () => {
    act(() => {
      useChangeBusinessType().changeBusinessType(1);
    });
    // updateBusinessTypeメソッドに渡される引数が1であるかを確認
    // updateBusinessTypeメソッド内の更新処理のテストは別で行う。
    expect(useDispatchMock().mock.calls[0][0].payload).toBe(1);
  })
});
