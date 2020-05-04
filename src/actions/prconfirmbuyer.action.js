import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRCONFIRMBUYER_SUCCESS,
  HTTP_PRCONFIRMBUYER_FETCHING,
  HTTP_PRCONFIRMBUYER_FAILED,
  HTTP_PRCONFIRMBUYER_CLEAR,
  server,
} from "../constants";

export const setStatePRConfirmBuyerToSuccess = (payload) => ({
  type: HTTP_PRCONFIRMBUYER_SUCCESS,
  payload,
});

const setStatePRConfirmBuyerToFetching = () => ({
  type: HTTP_PRCONFIRMBUYER_FETCHING,
});

const setStatePRConfirmBuyerToFailed = () => ({
  type: HTTP_PRCONFIRMBUYER_FAILED,
});

const setStatePRConfirmBuyerToClear = () => ({
  type: HTTP_PRCONFIRMBUYER_CLEAR,
});

export const getPRConfirmBuyers = (prno) => {
  return async (dispatch) => {
    dispatch(setStatePRConfirmBuyerToFetching());
    doGetPRConfirmBuyers(dispatch, prno);
  };
};

const doGetPRConfirmBuyers = async (dispatch, prno) => {
  try {
    let result = await httpClient.get(`${server.PRCONFIRMBUYER_URL}/${prno}`);
    dispatch(setStatePRConfirmBuyerToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRConfirmBuyerToFailed());
  }
};
