import {
  HTTP_PRSTOCK_SUCCESS,
  HTTP_PRSTOCK_FETCHING,
  HTTP_PRSTOCK_FAILED,
  HTTP_PRSTOCK_CLEAR
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_PRSTOCK_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_PRSTOCK_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_PRSTOCK_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };

    default:
      return state;
  }
};
