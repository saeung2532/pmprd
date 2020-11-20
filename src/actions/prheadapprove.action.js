import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_PRHEADAPPROVE_SUCCESS,
  HTTP_PRHEADAPPROVE_FETCHING,
  HTTP_PRHEADAPPROVE_FAILED,
  HTTP_PRHEADAPPROVE_CLEAR,
  server,
} from "../constants";

export const setStatePRHeadApproveToSuccess = (payload) => ({
  type: HTTP_PRHEADAPPROVE_SUCCESS,
  payload,
});

const setStatePRHeadApproveToFetching = () => ({
  type: HTTP_PRHEADAPPROVE_FETCHING,
});

const setStatePRHeadApproveToFailed = () => ({
  type: HTTP_PRHEADAPPROVE_FAILED,
});

const setStatePRHeadApproveToClear = () => ({
  type: HTTP_PRHEADAPPROVE_CLEAR,
});

export const getPRHeadApproves = (
  cono,
  divi,
  prno,
  fromstatus,
  tostatus,
  approve,
  page
) => {
  return async (dispatch) => {
    // console.log("PR: " + prno + " page: " + page);
    dispatch(setStatePRHeadApproveToFetching());

    if (page === "approvempr") {
      doGetMPRHeadApproves(
        dispatch,
        cono,
        divi,
        prno,
        fromstatus,
        tostatus,
        approve
      );
    } else {
      doGetEPRHeadApproves(
        dispatch,
        cono,
        divi,
        prno,
        fromstatus,
        tostatus,
        approve
      );
    }
  };
};

const doGetMPRHeadApproves = async (
  dispatch,
  cono,
  divi,
  prno,
  fromstatus,
  tostatus,
  approve
) => {
  try {
    let result = await httpClient.get(
      `${server.MPRHEADAPPROVE_URL}/${cono}/${divi}/${prno}/${fromstatus}/${tostatus}/${approve}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRHeadApproveToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRHeadApproveToFailed());
  }
};

const doGetEPRHeadApproves = async (
  dispatch,
  cono,
  divi,
  prno,
  fromstatus,
  tostatus,
  approve
) => {
  try {
    let result = await httpClient.get(
      `${server.EPRHEADAPPROVE_URL}/${cono}/${divi}/${prno}/${fromstatus}/${tostatus}/${approve}`
    );
    // alert(JSON.stringify(result.data));
    dispatch(setStatePRHeadApproveToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStatePRHeadApproveToFailed());
  }
};

export const approvePRHead = (formData, history, page) => {
  // console.log("page: " + page + JSON.stringify(history));
  return async (dispatch) => {
    try {
      let result = null;
      if (page === "approvempr") {
        result = await httpClient.put(server.MPRAPPROVE_URL, formData);
      } else {
        result = await httpClient.put(server.EPRAPPROVE_URL, formData);
      }

      alert(JSON.stringify(result.data));
      history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const approveFinalPRHead = (formData, history, page) => {
  // console.log("page: " + page + JSON.stringify(history));
  return async (dispatch) => {
    try {
      let result = null;
      if (page === "approvempr") {
        result = await httpClient.put(server.MPRAPPROVE_URL, formData);
      } else {
        // result = await httpClient.put(server.PRAPPROVE_URL, formData);
      }

      // alert(JSON.stringify(result.data));
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const checkApprovePRHead = (formData, history, page) => {
  return async (dispatch) => {
    try {
      // let result = await httpClient.put(server.CHECKPRAPPROVE_URL, formData);
      let result = null;
      if (page === "approvempr") {
        result = await httpClient.put(server.CHECKPRAPPROVE_URL, formData);
      } else {
        // result = await httpClient.put(server.CHECKPRAPPROVE_URL, formData);
      }

      // alert(JSON.stringify(result.data));
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const rejectPRHead = (formData, history, page) => {
  // console.log("page: " + page);
  return async (dispatch) => {
    try {
      let result = null;
      if (page === "approvempr") {
        result = await httpClient.put(server.MPRREJECT_URL, formData);
      } else {
        result = await httpClient.put(server.EPRREJECT_URL, formData);
      }

      alert(JSON.stringify(result.data));
      history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};

export const rejectFinalPRHead = (formData, history, page) => {
  // console.log("page: " + page);
  return async (dispatch) => {
    try {
      let result = null;
      if (page === "approvempr") {
        result = await httpClient.put(server.MPRREJECT_URL, formData);
      } else {
        // result = await httpClient.put(server.EPRREJECT_URL, formData);
      }

      // alert(JSON.stringify(result.data));
      // history.goBack();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
};
