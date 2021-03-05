import { useSelector, useDispatch } from "react-redux";
import {
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_FAILED,
  HTTP_LOGIN_LOGOUT,
} from "../constants";
import { server } from "../constants";
import { httpClient } from "./../utils/HttpClient";
import jwt from "jsonwebtoken";
import * as historyActions from "./../actions/history.action";

// Information being sent to Reducer
export const setStateLoginToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
});

export const setStateLoginToFailed = (payload) => ({
  type: HTTP_LOGIN_FAILED,
  payload,
});

export const setStateLoginToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload,
});

export const setStateLoginToLogout = () => ({
  type: HTTP_LOGIN_LOGOUT,
});

export const login = (value, history, pathname) => {
  // console.log("pathname: " + pathname);
  return async (dispatch) => {
    dispatch(setStateLoginToFetching()); // fetching
    doGetLogins(dispatch, value, history, pathname);
  };
};

const doGetLogins = async (dispatch, value, history, pathname) => {
  try {
    let result = await httpClient.post(server.LOGIN_URL, value);
    // console.log(JSON.stringify(result));
    if (result.data.result === "ok") {
      localStorage.setItem(server.TOKEN_KEY, result.data.token);
      localStorage.setItem(server.REFRESH_TOKEN_KEY, result.data.refreshToken);
      dispatch(setStateLoginToSuccess(result));
      if (pathname) {
        history.push(pathname);
      } else {
        history.push("/wolist");
      }
    } else {
      console.log("err");
      // console.log(JSON.stringify(result.data.message));
      dispatch(setStateLoginToFailed(result.data.message));
    }
  } catch (err) {
    alert(JSON.stringify(err));
    dispatch(setStateLoginToFailed());
  }
};

export const logout = (history) => {
  return (dispatch) => {
    // console.log(history);
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setStateLoginToLogout());
    history.push("/login");
  };
};

export const isLoggedIn = (dispatch, props) => {
  // Check location before login
  if (props) {
    // this.props.pathname = props.pathname
    console.log("pathname: " + props.pathname);
    dispatch(historyActions.addHistorys(props.pathname));
  } else {
    // console.log("pathname: null");
    // dispatch(historyActions.addHistorys("ll"));
  }

  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    // console.log("getToken: " + token);
    if (token) {
      var decodedToken = jwt.decode(token, { complete: true });
      var dateNow = new Date();
      // console.log("decodedToken: " + JSON.stringify(decodedToken));
      // console.log(decodedToken.payload.exp + " : " + dateNow.getTime().toString().substr(0,10));
      if (
        decodedToken.payload.exp <
        dateNow
          .getTime()
          .toString()
          .substr(0, 10)
      ) {
        // console.log("getToken: " + false);
        return false;
      } else {
        // console.log("getToken: " + true);
        return true;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const getTokenCono = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    var getCono = decodedToken.payload.sub.toString().split(":");
    return getCono[0].trim();
  } catch (e) {
    return false;
  }
};

export const getTokenDivi = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    var getDivi = decodedToken.payload.sub.toString().split(":");
    return getDivi[1].trim();
  } catch (e) {
    return false;
  }
};

export const getTokenCompany = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    let getTokenCompany = decodedToken.payload.sub.split(";");
    let company = getTokenCompany[0];
    return company;
  } catch (e) {
    return false;
  }
};

export const getTokenFacility = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    let getTokenCompany = decodedToken.payload.sub.split(";");
    let facility = getTokenCompany[1];
    return facility;
  } catch (e) {
    return false;
  }
};

export const getTokenUsername = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload.aud;
  } catch (e) {
    return false;
  }
};

export const getApproveTokenCompany = () => {
  try {
    let token = localStorage.getItem(server.APPROVE_TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload.sub;
  } catch (e) {
    return false;
  }
};

export const getApproveTokenUsername = () => {
  try {
    let token = localStorage.getItem(server.APPROVE_TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload.aud;
  } catch (e) {
    return false;
  }
};
