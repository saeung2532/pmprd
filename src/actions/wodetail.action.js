import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_WODETAIL_SUCCESS,
  HTTP_WODETAIL_FETCHING,
  HTTP_WODETAIL_FAILED,
  HTTP_WODETAIL_CLEAR,
  server,
} from "../constants";

export const setStateWODetailToSuccess = (payload) => ({
  type: HTTP_WODETAIL_SUCCESS,
  payload,
});

const setStateWODetailToFetching = () => ({
  type: HTTP_WODETAIL_FETCHING,
});

const setStateWODetailToFailed = () => ({
  type: HTTP_WODETAIL_FAILED,
});

const setStateWODetailToClear = () => ({
  type: HTTP_WODETAIL_CLEAR,
});

export const getWODetails = (wonumber) => {
  return async (dispatch) => {
    dispatch(setStateWODetailToFetching());
    doGetWODetail(dispatch, wonumber);
  };
};

const doGetWODetail = async (dispatch, wonumber) => {
  try {
    let result = await httpClient.get(`${server.WODETAIL_URL}/${wonumber}`);
    dispatch(setStateWODetailToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateWODetailToFailed());
  }
};

export const addWODetails = (formData) => {
  return async (dispatch) => {
    doAddWODetail(dispatch, formData);
  };
};

const doAddWODetail = async (dispatch, formData) => {
  try {
    let result = await httpClient.post(server.WODETAIL_URL, formData);
    alert(JSON.stringify(result.data));
    dispatch(setStateWODetailToSuccess(null));
  } catch (err) {
    alert(JSON.stringify(err));
    dispatch(setStateWODetailToFailed());
  }
};
