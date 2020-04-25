import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRNUMBER_SUCCESS,
  HTTP_PRNUMBER_FETCHING,
  HTTP_PRNUMBER_FAILED,
  HTTP_PRNUMBER_CLEAR,
  server,
} from "../constants";

export const setStatePRNumberToSuccess = (payload) => ({
  type: HTTP_PRNUMBER_SUCCESS,
  payload,
});

const setStatePRNumberToFetching = () => ({
  type: HTTP_PRNUMBER_FETCHING,
});

const setStatePRNumberToFailed = () => ({
  type: HTTP_PRNUMBER_FAILED,
});

const setStatePRNumberToClear = () => ({
  type: HTTP_PRNUMBER_CLEAR,
});

export const getPRNumbers = (status) => {
  return async (dispatch) => {
    dispatch(setStatePRNumberToFetching());
    doGetPRNumbers(dispatch, status);
  };
};

const doGetPRNumbers = async (dispatch, status) => {
  try {
    let result = await httpClient.get(`${server.PRSTOCKNUMBER_URL}/${status}`);
    dispatch(setStatePRNumberToSuccess(result.data));
  } catch (err) {
    alert(JSON.stringify(err.message));
    dispatch(setStatePRNumberToFailed());
  }
};
