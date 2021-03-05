import {
  HTTP_WAREHOUSE_FETCHING,
  HTTP_WAREHOUSE_FAILED,
  HTTP_WAREHOUSE_SUCCESS,
  HTTP_WAREHOUSE_CLEAR,
} from "../constants";
import { server } from "../constants";
import { httpClient } from "./../utils/HttpClient";

// Information being sent to Reducer
export const setStateWarehouseToSuccess = (payload) => ({
  type: HTTP_WAREHOUSE_SUCCESS,
  payload,
});

const setStateWarehouseToFetching = () => ({
  type: HTTP_WAREHOUSE_FETCHING,
});

const setStateWarehouseToFailed = () => ({
  type: HTTP_WAREHOUSE_FAILED,
});

const setStateWarehouseToClear = () => ({
  type: HTTP_WAREHOUSE_CLEAR,
});

export const getWarehouses = () => {
  return async (dispatch) => {
    dispatch(setStateWarehouseToFetching());
    doGetWarehouses(dispatch);
  };
};

const doGetWarehouses = async (dispatch) => {
  try {
    let result = await httpClient.get(server.WAREHOUSE_URL);
    dispatch(setStateWarehouseToSuccess(result.data));
    // alert(JSON.stringify(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateWarehouseToFailed());
  }
};
