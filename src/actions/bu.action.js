import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_BU_SUCCESS,
  HTTP_BU_FETCHING,
  HTTP_BU_FAILED,
  HTTP_BU_CLEAR,
  server,
} from "../constants";

export const setStateBUToSuccess = (payload) => ({
  type: HTTP_BU_SUCCESS,
  payload,
});

const setStateBUToFetching = () => ({
  type: HTTP_BU_FETCHING,
});

const setStateBUToFailed = () => ({
  type: HTTP_BU_FAILED,
});

const setStateBUToClear = () => ({
  type: HTTP_BU_CLEAR,
});

export const getBUs = () => {
  return async (dispatch) => {
    dispatch(setStateBUToFetching());
    doGetBUs(dispatch);
  };
};

const doGetBUs = async (dispatch) => {
  try {
    let result = await httpClient.get(`${server.BU_URL}`);
    dispatch(setStateBUToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateBUToFailed());
  }
};
