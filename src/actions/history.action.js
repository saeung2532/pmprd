import {
  HTTP_HISTORY_FETCHING,
  HTTP_HISTORY_FAILED,
  HTTP_HISTORY_SUCCESS,
  HTTP_HISTORY_CLEAR,
} from "../constants";
import { server } from "../constants";
import { httpClient } from "../utils/HttpClient";

// Information being sent to Reducer
export const setStateHistoryToSuccess = (payload) => ({
  type: HTTP_HISTORY_SUCCESS,
  payload,
});

const setStateHistoryToFetching = () => ({
  type: HTTP_HISTORY_FETCHING,
});

const setStateHistoryToFailed = () => ({
  type: HTTP_HISTORY_FAILED,
});

const setStateHistoryToClear = () => ({
  type: HTTP_HISTORY_CLEAR,
});

export const addHistorys = (pathname) => {
  // console.log("addHistorys: " + pathname);
  return async (dispatch) => {
    dispatch(setStateHistoryToFetching());
    dispatch(setStateHistoryToSuccess(pathname));
  };
};

// export const addHistorys = (pathname) => {
//   return async (dispatch) => {
//     dispatch(setStateHistoryToFetching());
//     doAddWOHead(dispatch, pathname);
//   };
// };

// const doAddWOHead = async (dispatch, pathname) => {
//   try {
//     dispatch(setStateHistoryToSuccess(pathname));
//     // alert(JSON.stringify(result.data));
//   } catch (err) {
//     alert(JSON.stringify(err));
//     // localStorage.removeItem(server.TOKEN_KEY);
//     dispatch(setStateHistoryToFailed());
//   }
// };
