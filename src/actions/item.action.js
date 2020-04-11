import { httpClient } from "./../utils/HttpClient";
import {
  HTTP_ITEM_SUCCESS,
  HTTP_ITEM_FETCHING,
  HTTP_ITEM_FAILED,
  HTTP_ITEM_CLEAR,
  server,
} from "../constants";

export const setStateItemToSuccess = (payload) => ({
  type: HTTP_ITEM_SUCCESS,
  payload,
});

const setStateItemToFetching = () => ({
  type: HTTP_ITEM_FETCHING,
});

const setStateItemToFailed = () => ({
  type: HTTP_ITEM_FAILED,
});

const setStateItemToClear = () => ({
  type: HTTP_ITEM_CLEAR,
});

export const getItems = (whs) => {
  return async (dispatch) => {
    console.log(" whs: " + whs);
    dispatch(setStateItemToFetching());
    doGetItems(dispatch, whs);
  };
};

const doGetItems = async (dispatch, whs) => {
  try {
    let result = await httpClient.get(`${server.ITEM_URL}/${whs}`);
    dispatch(setStateItemToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateItemToFailed());
  }
};
