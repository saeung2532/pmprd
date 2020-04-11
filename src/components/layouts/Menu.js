import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShopIcon from "@material-ui/icons/Shop";
import LayersIcon from "@material-ui/icons/Layers";
import BarChartIcon from "@material-ui/icons/BarChart";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Link, withRouter, NavLink } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0,
    // width: theme.spacing(7),
  },
  bannerOpen: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background_menu.jpg)`,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#1E88E5",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  isActive: {
    backgroundColor: "#e0f5fd",
    color: "#0080ff",
  },
}));

export default (props) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={clsx({
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.open,
          [classes.bannerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={props.handleDrawerClose}>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo_white.jpg`}
            height="30"
          />
          <ChevronLeftIcon style={{ color: "white" }} />
        </IconButton>
      </div>
      {props.open && (
        <img
          height={250}
          src={`${process.env.PUBLIC_URL}/images/duck.png`}
          alt=""
        />
      )}
      <Divider />

      <List>
        {/* Plan PR */}
        <ListItem
          component={NavLink}
          to="/plan_pr"
          button
          key="plan_pr"
          activeClassName={classes.isActive}
        >
          <ListItemIcon>
            <ShopIcon />
          </ListItemIcon>
          <ListItemText primary="Plan PR" />
        </ListItem>

        {/* PR Stock */}
        <ListItem
          component={NavLink}
          to="/pr_stock"
          button
          key="pr_stock"
          activeClassName={classes.isActive}
        >
          <ListItemIcon>
            <ShopIcon />
          </ListItemIcon>
          <ListItemText primary="PR Stock" />
        </ListItem>

        {/* PR NonStock */}
        <ListItem
          component={NavLink}
          to="/pr_nonstock"
          button
          key="pr_nonstock"
          activeClassName={classes.isActive}
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="PR NonStock" />
        </ListItem>

        {/* PH Manage */}
        <ListItem
          component={NavLink}
          to="/ph_manage"
          button
          key="ph_manage"
          activeClassName={classes.isActive}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="PH Manage" />
        </ListItem>

        {/* Monitoring */}
        <ListItem
          component={NavLink}
          to="/monitoring"
          button
          key="monitoring"
          activeClassName={classes.isActive}
        >
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Monitoring" />
        </ListItem>
      </List>
    </Drawer>
  );
};
