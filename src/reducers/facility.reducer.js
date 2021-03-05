import {
  HTTP_FACILITY_SUCCESS,
  HTTP_FACILITY_FETCHING,
  HTTP_FACILITY_FAILED,
  HTTP_FACILITY_CLEAR,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_FACILITY_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_FACILITY_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_FACILITY_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };

    default:
      return state;
  }
};
