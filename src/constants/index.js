// LOGIN
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_LOGOUT = "HTTP_LOGIN_LOGOUT";

// COMPANY
export const HTTP_COMPANY_FETCHING = "HTTP_COMPANY_FETCHING";
export const HTTP_COMPANY_FAILED = "HTTP_COMPANY_FAILED";
export const HTTP_COMPANY_SUCCESS = "HTTP_COMPANY_SUCCESS";
export const HTTP_COMPANY_CLEAR = "HTTP_COMPANY_CLEAR";

// FACILITY
export const HTTP_FACILITY_FETCHING = "HTTP_FACILITY_FETCHING";
export const HTTP_FACILITY_FAILED = "HTTP_FACILITY_FAILED";
export const HTTP_FACILITY_SUCCESS = "HTTP_FACILITY_SUCCESS";
export const HTTP_FACILITY_CLEAR = "HTTP_FACILITY_CLEAR";

// WAREHOUSE
export const HTTP_WAREHOUSE_FETCHING = "HTTP_WAREHOUSE_FETCHING";
export const HTTP_WAREHOUSE_FAILED = "HTTP_WAREHOUSE_FAILED";
export const HTTP_WAREHOUSE_SUCCESS = "HTTP_WAREHOUSE_SUCCESS";
export const HTTP_WAREHOUSE_CLEAR = "HTTP_WAREHOUSE_CLEAR";

// SELECTWAREHOUSE
export const HTTP_SELECTWAREHOUSE_FETCHING = "HTTP_SELECTWAREHOUSE_FETCHING";
export const HTTP_SELECTWAREHOUSE_FAILED = "HTTP_SELECTWAREHOUSE_FAILED";
export const HTTP_SELECTWAREHOUSE_SUCCESS = "HTTP_SELECTWAREHOUSE_SUCCESS";
export const HTTP_SELECTWAREHOUSE_CLEAR = "HTTP_SELECTWAREHOUSE_CLEAR";

// HISTORY
export const HTTP_HISTORY_FETCHING = "HTTP_HISTORY_FETCHING";
export const HTTP_HISTORY_FAILED = "HTTP_HISTORY_FAILED";
export const HTTP_HISTORY_SUCCESS = "HTTP_HISTORY_SUCCESS";
export const HTTP_HISTORY_CLEAR = "HTTP_HISTORY_CLEAR";

// WONUMBER
export const HTTP_WONUMBER_FETCHING = "HTTP_WONUMBER_FETCHING";
export const HTTP_WONUMBER_FAILED = "HTTP_WONUMBER_FAILED";
export const HTTP_WONUMBER_SUCCESS = "HTTP_WONUMBER_SUCCESS";
export const HTTP_WONUMBER_CLEAR = "HTTP_WONUMBER_CLEAR";

// WOHEAD
export const HTTP_WOHEAD_FETCHING = "HTTP_WOHEAD_FETCHING";
export const HTTP_WOHEAD_FAILED = "HTTP_WOHEAD_FAILED";
export const HTTP_WOHEAD_SUCCESS = "HTTP_WOHEAD_SUCCESS";
export const HTTP_WOHEAD_CLEAR = "HTTP_WOHEAD_CLEAR";

// WODETAIL
export const HTTP_WODETAIL_FETCHING = "HTTP_WODETAIL_FETCHING";
export const HTTP_WODETAIL_FAILED = "HTTP_WODETAIL_FAILED";
export const HTTP_WODETAIL_SUCCESS = "HTTP_WODETAIL_SUCCESS";
export const HTTP_WODETAIL_CLEAR = "HTTP_WODETAIL_CLEAR";

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";

// export const apiUrl = "http://localhost:8080/br_api/";
// export const apiUrl = "http://192.200.9.106:8080/br_api/";
export const apiUrl = `${process.env.REACT_APP_API_URL}/test_api/`;
// export const apiUrl = `${process.env.REACT_APP_API_URL}/br_apiv2/`;
export const imageUrl = "http://localhost:8080";

export const server = {
  LOGIN_URL: `api_auth/login`,
  COMPANY_URL: `api_data/company`,
  FACILITY_URL: `api_data/facility`,
  WAREHOUSE_URL: `api_data/warehouse`,
  WOHEAD_URL: `api_data/wohead`,
  WOHEADWITHFACI_URL: `api_data/woheadfaci`,
  WOHEADMACHINE_URL: `api_data/woheadmachine`,
  WODETAIL_URL: `api_data/wodetail`,

  REFRESH_TOKEN_URL: `refresh/token`,
  TOKEN_KEY: `token`,
  APPROVE_TOKEN_KEY: `approve_token`,
  REFRESH_TOKEN_KEY: `refresh_token`,
};
