import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRSTOCK_SUCCESS,
  HTTP_PRSTOCK_FETCHING,
  HTTP_PRSTOCK_FAILED,
  HTTP_PRSTOCK_CLEAR,
  server
} from "../constants";

export const setStateStockToSuccess = payload => ({
  type: HTTP_PRSTOCK_SUCCESS,
  payload
});

const setStateStockToFetching = () => ({
  type: HTTP_PRSTOCK_FETCHING
});

const setStateStockToFailed = () => ({
  type: HTTP_PRSTOCK_FAILED
});

const setStateStockToClear = () => ({
  type: HTTP_PRSTOCK_CLEAR
});

export const getPRHeads = () => {
  return async dispatch => {
    dispatch(setStateStockToFetching());
    doGetPRHeads(dispatch);
  };
};

export const getPRDetails = () => {
  return async dispatch => {
    dispatch(setStateStockToFetching());
    doGetPRDetails(dispatch);
  };
};

const doGetPRHeads = async dispatch => {
  try {
    let result = await httpClient.get(server.PRSTOCKHEAD_URL);
    dispatch(setStateStockToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    dispatch(setStateStockToFailed());
  }
};

const doGetPRDetails = async dispatch => {
  try {
    let result = await httpClient.get(server.PRSTOCKDETAIL_URL);
    dispatch(setStateStockToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    dispatch(setStateStockToFailed());
  }
};
