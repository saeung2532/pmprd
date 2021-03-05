import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import companyReducer from "./company.reducer";
import facilityReducer from "./facility.reducer";
import warehouseReducer from "./warehouse.reducer";
import selectwarehouseReducer from "./selectwarehouse.reducer";
import historyReducer from "./history.reducer";
import wonumberReducer from "./wonumber.reducer";
import woheadReducer from "./wohead.reducer";
import wodetailReducer from "./wodetail.reducer";

export default combineReducers({
  companyReducer,
  facilityReducer,
  warehouseReducer,
  selectwarehouseReducer,
  historyReducer,
  loginReducer,
  wonumberReducer,
  woheadReducer,
  wodetailReducer,
});
