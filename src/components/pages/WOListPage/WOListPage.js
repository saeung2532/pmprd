import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  withStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import update from "immutability-helper";
import clsx from "clsx";
import { Typography, Grid, Paper, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field, FieldArray } from "formik";
import { red, green, purple } from "@material-ui/core/colors/";
import Card from "@material-ui/core/Card";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import NumberFormat from "react-number-format";
import MaterialTable, { MTableToolbar } from "material-table";
import { deviceType, browserName } from "react-device-detect";
import * as companyActions from "./../../../actions/company.action";
import * as wonumberActions from "./../../../actions/wonumber.action";
import * as wodetailActions from "./../../../actions/wodetail.action";
import { ColorLensOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 60,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  margin: {
    marginTop: "0.4rem",
    marginRight: "0.4rem",
    margin: theme.spacing(0.3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  row: {
    borderLeft: 1,
    borderRight: 1,
    borderBottom: 1,
    borderTop: 1,
    borderColor: "#E0E0E0",
    borderStyle: "solid",
  },
  buttonSave: {
    // margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const companyReducer = useSelector(({ companyReducer }) => companyReducer);
  const wonumberReducer = useSelector(({ wonumberReducer }) => wonumberReducer);
  const wodetailReducer = useSelector(({ wodetailReducer }) => wodetailReducer);
  const [wodetail, setWoDetail] = useState([]);
  const [rowdata, setRowData] = useState([]);
  const [opendrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingsave, setLoadingSave] = useState(false);
  const [helperText, setHelperText] = useState("Please select value.");

  useEffect(() => {
    let params = props.match.params;
    // console.log(params);
    dispatch(wodetailActions.getWODetails(params.wonumber));
    // setWoDetail(data);
  }, []);

  const columns = [
    {
      title: "WO Number",
      field: "HD_IBPLPN",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "center",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.HD_IBPLPN}
        </Typography>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      {/* {wodetail.map((rowdata, i) =>
        console.log(
          i + " " + rowdata.PJSPOS + " " + rowdata.PJTX40 + " " + rowdata.M7RVAL
        )
      )} */}
      {/* {console.log("rowdata: " + JSON.stringify(rowdata))} */}

      <MaterialTable
        id="root_wo"
        title={`WO List`}
        // data={finalapproveReducer.result ? finalapproveReducer.result : []}
        // isLoading={finalapproveReducer.result ? false : true}
        options={{
          // exportButton: true,
          // toolbar: false,
          pageSize: 20,
          paging: true,
          headerStyle: {
            textAlign: "center",
            borderLeft: 1,
            borderRight: 1,
            borderBottom: 1,
            borderTop: 1,
            borderColor: "#E0E0E0",
            borderStyle: "solid",
            paddingLeft: "6px",
            paddingRight: "6px",
            paddingBottom: "12px",
            paddingTop: "12px",
          },
        }}
      />
    </div>
  );
};
