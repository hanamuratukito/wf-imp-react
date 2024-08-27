import { useDispatch, useSelector } from 'react-redux';
import { getRequestStore, requestSlice } from '../stores/requestStore';
import { getRequest } from '../api/request';

export const useChangeBusinessType = () => {
  const dispatch = useDispatch();
  const selector = useSelector(getRequestStore);
  const {
    updateBusinessType,
    updateRequestName,
    updateStatus,
    updateContact,
    updateRequest,
  } = requestSlice.actions;

  const { businessType, requestName, status, contact } =
    selector.request.searchCondition;

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

  return {
    businessType,
    requestName,
    status,
    contact,
    changeBusinessType,
    changeRequestName,
    changeStatus,
    changeContact,
    searchRequest,
  };
};
