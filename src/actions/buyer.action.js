import {
  HTTP_BUYER_FETCHING,
  HTTP_BUYER_FAILED,
  HTTP_BUYER_SUCCESS,
  HTTP_BUYER_CLEAR
} from "../constants";
import { server } from "../constants";
import { httpClient } from "./../utils/HttpClient";
import jwt from "jsonwebtoken";

// Information being sent to Reducer
export const setStateBuyerToSuccess = payload => ({
  type: HTTP_BUYER_SUCCESS,
  payload
});

const setStateBuyerToFetching = () => ({
  type: HTTP_BUYER_FETCHING
});

const setStateBuyerToFailed = () => ({
  type: HTTP_BUYER_FAILED
});

const setStateBuyerToClear = () => ({
  type: HTTP_BUYER_CLEAR
});

export const getBuyers = () => {
  return async dispatch => {
    dispatch(setStateBuyerToFetching());
    doGetBuyers(dispatch);
  };
};

const doGetBuyers = async dispatch => {
  try {
    let result = await httpClient.get(server.BUYER_URL);
    dispatch(setStateBuyerToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateBuyerToFailed());
  }
};
