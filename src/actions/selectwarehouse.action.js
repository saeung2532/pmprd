import {
  HTTP_SELECTWAREHOUSE_FETCHING,
  HTTP_SELECTWAREHOUSE_FAILED,
  HTTP_SELECTWAREHOUSE_SUCCESS,
  HTTP_SELECTWAREHOUSE_CLEAR,
} from "../constants";
import { server } from "../constants";
import { httpClient } from "../utils/HttpClient";

// Information being sent to Reducer
export const setStateSelectWarehouseToSuccess = (payload) => ({
  type: HTTP_SELECTWAREHOUSE_SUCCESS,
  payload,
});

const setStateSelectWarehouseToFetching = () => ({
  type: HTTP_SELECTWAREHOUSE_FETCHING,
});

const setStateSelectWarehouseToFailed = () => ({
  type: HTTP_SELECTWAREHOUSE_FAILED,
});

const setStateSelectWarehouseToClear = () => ({
  type: HTTP_SELECTWAREHOUSE_CLEAR,
});

export const addSelectWarehouses = (warehouse) => {
  return async (dispatch) => {
    dispatch(setStateSelectWarehouseToFetching());
    dispatch(setStateSelectWarehouseToSuccess(warehouse));
  };
};
