import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import PrivateRoute from "./components/PrivateRoute";
import * as loginActions from "./actions/login.action";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import PlanPRPage from "./components/pages/PlanPRPage/PlanPRPage";
import PRStockPage from "./components/pages/PRStockPage/PRStockPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#1E88E5" },
  },
  status: {
    danger: "orange",
  },
});

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  // Protected Route
  const SecuredRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        // ternary condition
        loginActions.isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  // Login Route
  const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        // ternary condition
        loginActions.isLoggedIn() ? (
          <Redirect to="/main" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );

  return (
    <Router basename={process.env.REACT_APP_IS_PRODUCTION == 1 ? "/demo" : ""}>
      <Switch>
        <div className={classes.root}>
          {loginActions.isLoggedIn() && (
            <Header handleDrawerOpen={handleDrawerOpen} />
          )}
          {loginActions.isLoggedIn() && <Menu open={open} />}
          <Container className={classes.content} maxWidth={false}>
            <LoginRoute path="/login" component={LoginPage} />
            <SecuredRoute exact={true} path="/plan_pr" component={PlanPRPage} />
            <SecuredRoute
              exact={true}
              path="/pr_stock"
              component={PRStockPage}
            />
            {/* <SecuredRoute path="/stock/create" component={StockCreatePage} />
            <SecuredRoute path="/stock/edit/:id" component={StockEditPage} />
            <SecuredRoute path="/shop" component={ShopPage} />
            <SecuredRoute path="/report" component={ReportPage} />
            <SecuredRoute path="/transaction" component={TransactionPage} /> */}
            <Route
              exact={true}
              path="/"
              component={() => <Redirect to="/login" />}
            />
            {/* The Default not found component */}
            {/* <Route render={props => <Redirect to="/login" />} /> */}
          </Container>
        </div>
      </Switch>
    </Router>
  );
}
