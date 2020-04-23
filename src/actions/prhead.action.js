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

export const addPRHead = (formData, history) => {
  return async dispatch => {
    try {
      // console.log(formData);
      let result = await httpClient.post(server.PRSTOCKHEAD_URL, formData);
      alert("Save Complete: " + JSON.stringify(result.data));
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const updatePRHead = (formData, history) => {
  return async dispatch => {
    try {
      // console.log(formData);
      await httpClient.put(server.PRSTOCKHEAD_URL, formData);
      alert("Update Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const updateStsPRHead = (prno, status) => {
  return async dispatch => {
    try {
      // console.log(formData);
      await httpClient.delete(`${server.PRSTOCKHEAD_URL}/${prno}/${status}`);
      alert("Cancel Complete");
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};
