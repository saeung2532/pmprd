import { combineReducers } from "redux";
import companyReducer from "./company.reducer";
import warehouseReducer from "./warehouse.reducer";
import departmentReducer from "./department.reducer";
import approveReducer from "./approve.reducer";
import buyerReducer from "./buyer.reducer";
import itemReducer from "./item.reducer";
import itemprdetailReducer from "./itemprdetail.reducer";
import loginReducer from "./login.reducer";
import prnumberReducer from "./prnumber.reducer";
import prheadReducer from "./prhead.reducer";
import prdetailReducer from "./prdetail.reducer";
import itemunitReducer from "./itemunit.reducer";
import phgroupReducer from "./phgroup.reducer";
import phbuyerReducer from "./phbuyer.reducer";

export default combineReducers({
  companyReducer,
  warehouseReducer,
  departmentReducer,
  approveReducer,
  buyerReducer,
  itemReducer,
  itemprdetailReducer,
  itemunitReducer,
  loginReducer,
  prnumberReducer,
  prheadReducer,
  prdetailReducer,
  phgroupReducer,
  phbuyerReducer,
});
