import {
  HTTP_SELECTWAREHOUSE_SUCCESS,
  HTTP_SELECTWAREHOUSE_FETCHING,
  HTTP_SELECTWAREHOUSE_FAILED,
  HTTP_SELECTWAREHOUSE_CLEAR,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_SELECTWAREHOUSE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_SELECTWAREHOUSE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_SELECTWAREHOUSE_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };

    default:
      return state;
  }
};
