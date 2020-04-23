import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRDETAIL_SUCCESS,
  HTTP_PRDETAIL_FETCHING,
  HTTP_PRDETAIL_FAILED,
  HTTP_PRDETAIL_CLEAR,
  server,
} from "../constants";

export const setStatePRDetailToSuccess = (payload) => ({
  type: HTTP_PRDETAIL_SUCCESS,
  payload,
});

const setStatePRDetailToFetching = () => ({
  type: HTTP_PRDETAIL_FETCHING,
});

const setStatePRDetailToFailed = () => ({
  type: HTTP_PRDETAIL_FAILED,
});

const setStatePRDetailToClear = () => ({
  type: HTTP_PRDETAIL_CLEAR,
});

export const getPRDetails = (prno) => {
  return async (dispatch) => {
    console.log("PR: " + prno);
    dispatch(setStatePRDetailToFetching());
    doGetPRDetails(dispatch, prno);
  };
};

const doGetPRDetails = async (dispatch, prno) => {
  try {
    let result = await httpClient.get(`${server.PRSTOCKDETAIL_URL}/${prno}`);
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRDetailToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRDetailToFailed());
  }
};

export const addPRDetail = (formData, history) => {
  return async (dispatch) => {
    try {
      await httpClient.post(server.PRSTOCKDETAIL_URL, formData);
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const updatePRDetail = (formData, history) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      await httpClient.put(server.PRSTOCKDETAIL_URL, formData);
      // alert("Update Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const deletePRDetail = (prno, itemline) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      await httpClient.delete(
        `${server.PRSTOCKDETAIL_URL}/${prno}/${itemline}`
      );
      // alert("Delete Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};
