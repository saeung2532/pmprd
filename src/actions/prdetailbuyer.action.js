import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRDETAILBUYER_SUCCESS,
  HTTP_PRDETAILBUYER_FETCHING,
  HTTP_PRDETAILBUYER_FAILED,
  HTTP_PRDETAILBUYER_CLEAR,
  server,
} from "../constants";

export const setStatePRDetailBuyerToSuccess = (payload) => ({
  type: HTTP_PRDETAILBUYER_SUCCESS,
  payload,
});

const setStatePRDetailBuyerToFetching = () => ({
  type: HTTP_PRDETAILBUYER_FETCHING,
});

const setStatePRDetailBuyerToFailed = () => ({
  type: HTTP_PRDETAILBUYER_FAILED,
});

const setStatePRDetailBuyerToClear = () => ({
  type: HTTP_PRDETAILBUYER_CLEAR,
});

export const getPRDetails = (prno) => {
  return async (dispatch) => {
    // console.log("PR: " + prno);
    dispatch(setStatePRDetailBuyerToFetching());
    doGetPRDetails(dispatch, prno);
  };
};

const doGetPRDetails = async (dispatch, prno) => {
  try {
    let result = await httpClient.get(
      `${server.PRSTOCKDETAILBUYER_URL}/${prno}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRDetailBuyerToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRDetailBuyerToFailed());
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