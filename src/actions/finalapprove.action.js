import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_FINALAPPROVE_SUCCESS,
  HTTP_FINALAPPROVE_FETCHING,
  HTTP_FINALAPPROVE_FAILED,
  HTTP_FINALAPPROVE_CLEAR,
  server,
} from "../constants";

export const setStateFinalApproveToSuccess = (payload) => ({
  type: HTTP_FINALAPPROVE_SUCCESS,
  payload,
});

const setStateFinalApproveToFetching = () => ({
  type: HTTP_FINALAPPROVE_FETCHING,
});

const setStateFinalApproveToFailed = () => ({
  type: HTTP_FINALAPPROVE_FAILED,
});

const setStateFinalApproveToClear = () => ({
  type: HTTP_FINALAPPROVE_CLEAR,
});

export const getPRApproveFinal = (status) => {
  return async (dispatch) => {
    dispatch(setStateFinalApproveToFetching());
    doGetPRApproveFinal(dispatch, status);
  };
};

const doGetPRApproveFinal = async (dispatch, status) => {
  try {
    let result = await httpClient.get(`${server.PRAPPROVEFINAL_URL}/${status}`);
    // alert(JSON.stringify(result.data));
    dispatch(setStateFinalApproveToSuccess(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setStateFinalApproveToFailed());
  }
};
