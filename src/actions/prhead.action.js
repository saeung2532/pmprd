import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRHEAD_SUCCESS,
  HTTP_PRHEAD_FETCHING,
  HTTP_PRHEAD_FAILED,
  HTTP_PRHEAD_CLEAR,
  server
} from "../constants";

export const setStatePRHeadToSuccess = payload => ({
  type: HTTP_PRHEAD_SUCCESS,
  payload
});

const setStatePRHeadToFetching = () => ({
  type: HTTP_PRHEAD_FETCHING
});

const setStatePRHeadToFailed = () => ({
  type: HTTP_PRHEAD_FAILED
});

const setStatePRHeadToClear = () => ({
  type: HTTP_PRHEAD_CLEAR
});

export const getPRHeads = (prno, status) => {
  return async dispatch => {
    console.log("PR: " + prno + " STS: " + status);
    dispatch(setStatePRHeadToFetching());
    doGetPRHeads(dispatch, prno, status);
  };
};

const doGetPRHeads = async (dispatch, prno, status) => {
  try {
    let result = await httpClient.get(
      `${server.PRSTOCKHEAD_URL}/${prno}/${status}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRHeadToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRHeadToFailed());
  }
};
