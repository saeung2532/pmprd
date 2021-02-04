import {
  HTTP_WONUMBER_FETCHING,
  HTTP_WONUMBER_FAILED,
  HTTP_WONUMBER_SUCCESS,
  HTTP_WONUMBER_CLEAR,
} from "../constants";
import { server } from "../constants";
import { httpClient } from "./../utils/HttpClient";

// Information being sent to Reducer
export const setStateWoNumberToSuccess = (payload) => ({
  type: HTTP_WONUMBER_SUCCESS,
  payload,
});

const setStateWoNumberToFetching = () => ({
  type: HTTP_WONUMBER_FETCHING,
});

const setStateWoNumberToFailed = () => ({
  type: HTTP_WONUMBER_FAILED,
});

const setStateWoNumberToClear = () => ({
  type: HTTP_WONUMBER_CLEAR,
});

export const setWoNumbers = (wonumber) => {
  return async (dispatch) => {
    dispatch(setStateWoNumberToFetching());
    dispatch(setStateWoNumberToSuccess(wonumber));
  };
};
