import {
  HTTP_FACILITY_FETCHING,
  HTTP_FACILITY_FAILED,
  HTTP_FACILITY_SUCCESS,
  HTTP_FACILITY_CLEAR,
} from "../constants";
import { server } from "../constants";
import { httpClient } from "../utils/HttpClient";

// Information being sent to Reducer
export const setStateFacilityToSuccess = (payload) => ({
  type: HTTP_FACILITY_SUCCESS,
  payload,
});

const setStateFacilityToFetching = () => ({
  type: HTTP_FACILITY_FETCHING,
});

const setStateFacilityToFailed = () => ({
  type: HTTP_FACILITY_FAILED,
});

const setStateFacilityToClear = () => ({
  type: HTTP_FACILITY_CLEAR,
});

export const getFacilitys = (cono, divi) => {
  return async (dispatch) => {
    dispatch(setStateFacilityToFetching());
    doGetFacilitys(dispatch, cono, divi);
  };
};

const doGetFacilitys = async (dispatch, cono, divi) => {
  try {
    let result = await httpClient.get(`${server.FACILITY_URL}/${cono}/${divi}`);
    dispatch(setStateFacilityToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    alert(JSON.stringify(err));
    dispatch(setStateFacilityToFailed());
  }
};
