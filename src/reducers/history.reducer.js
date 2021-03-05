import {
  HTTP_HISTORY_SUCCESS,
  HTTP_HISTORY_FETCHING,
  HTTP_HISTORY_FAILED,
  HTTP_HISTORY_CLEAR,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_HISTORY_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_HISTORY_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_HISTORY_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };

    default:
      return state;
  }
};
