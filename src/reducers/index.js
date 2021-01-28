import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import companyReducer from "./company.reducer";
import wonumberReducer from "./wonumber.reducer";
import wodetailReducer from "./wodetail.reducer";

export default combineReducers({
  companyReducer,
  loginReducer,
  wonumberReducer,
  wodetailReducer,
});
