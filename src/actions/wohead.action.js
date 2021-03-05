import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_WOHEAD_SUCCESS,
  HTTP_WOHEAD_FETCHING,
  HTTP_WOHEAD_FAILED,
  HTTP_WOHEAD_CLEAR,
  server,
} from "../constants";

export const setStateWOHeadToSuccess = (payload) => ({
  type: HTTP_WOHEAD_SUCCESS,
  payload,
});

const setStateWOHeadToFetching = () => ({
  type: HTTP_WOHEAD_FETCHING,
});

const setStateWOHeadToFailed = () => ({
  type: HTTP_WOHEAD_FAILED,
});

const setStateWOHeadToClear = () => ({
  type: HTTP_WOHEAD_CLEAR,
});

export const getWOHeads = (warehouse) => {
  return async (dispatch) => {
    dispatch(setStateWOHeadToFetching());
    doGetWOHead(dispatch, warehouse);
  };
};

const doGetWOHead = async (dispatch, warehouse) => {
  try {
    let result = await httpClient.get(`${server.WOHEAD_URL}/${warehouse}`);
    dispatch(setStateWOHeadToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setStateWOHeadToFailed());
  }
};

export const getWOHeadMachines = (machine) => {
  return async (dispatch) => {
    dispatch(setStateWOHeadToFetching());
    doGetWOHeadMachine(dispatch, machine);
  };
};

const doGetWOHeadMachine = async (dispatch, machine) => {
  try {
    let result = await httpClient.get(`${server.WOHEADMACHINE_URL}/${machine}`);
    dispatch(setStateWOHeadToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateWOHeadToFailed());
  }
};
