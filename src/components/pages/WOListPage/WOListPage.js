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
import RefreshIcon from "@material-ui/icons/Refresh";
import * as loginActions from "./../../../actions/login.action";
import * as companyActions from "./../../../actions/company.action";
import * as warehouseActions from "./../../../actions/warehouse.action";
import * as selectwarehouseActions from "./../../../actions/selectwarehouse.action";
import * as wonumberActions from "./../../../actions/wonumber.action";
import * as woheadActions from "./../../../actions/wohead.action";
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
  const warehouseReducer = useSelector(
    ({ warehouseReducer }) => warehouseReducer
  );
  const selectwarehouseReducer = useSelector(
    ({ selectwarehouseReducer }) => selectwarehouseReducer
  );
  const wonumberReducer = useSelector(({ wonumberReducer }) => wonumberReducer);
  const wodetailReducer = useSelector(({ wodetailReducer }) => wodetailReducer);
  const woheadReducer = useSelector(({ woheadReducer }) => woheadReducer);
  const [warehouse, setWarehouse] = useState([]);
  const [wodetail, setWoDetail] = useState([]);
  const [rowdata, setRowData] = useState([]);
  const [opendrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingsave, setLoadingSave] = useState(false);

  useEffect(() => {
    let params = props.match.params;
    // console.log(params);

    let getFacility = loginActions.getTokenFacility().split(":");
    let facility = getFacility[0].trim();
    let defaultWarehouse = null; // facility.substr(1, 1) + "91";

    if (selectwarehouseReducer.result) {
      console.log("true");
      defaultWarehouse = selectwarehouseReducer.result;
      // setWarehouse(selectwarehouseReducer.result);
    } else {
      console.log("false");
      defaultWarehouse = facility.substr(1, 1) + "91";
      // setWarehouse(defaultWarehouse);
    }

    setWarehouse(defaultWarehouse);
    // dispatch(selectwarehouseActions.addSelectWarehouses(defaultWarehouse));
    dispatch(warehouseActions.getWarehouses());

    if (params.machine) {
      // console.log("true");
      dispatch(woheadActions.getWOHeadMachines(params.machine));
    } else {
      // console.log("false");
      dispatch(woheadActions.getWOHeads(defaultWarehouse));
    }

    dispatch(companyActions.setCompanys(null));
    dispatch(wonumberActions.setWoNumbers(null));
  }, []);

  const handleSearch = () => {
    dispatch(woheadActions.getWOHeads(warehouse));
  };

  const handleChange = (warehouse) => {
    dispatch(woheadActions.getWOHeads(warehouse));
    dispatch(selectwarehouseActions.addSelectWarehouses(warehouse));
  };

  const warehouses = useMemo(() =>
    warehouseReducer.result ? warehouseReducer.result : []
  );

  const columns = [
    {
      title: "Date",
      field: "PMHDATE",
      type: "date",
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
          {moment(item.PMHDATE).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "WO Number",
      field: "PMHWO",
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
          {item.PMHWO}
        </Typography>
      ),
    },
    {
      title: "MC Code",
      field: "LIINSN",
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
          {item.LIINSN}
        </Typography>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      {/* {JSON.stringify(selectwarehouseReducer.result)} */}
      {/* {wodetail.map((rowdata, i) =>
        console.log(
          i + " " + rowdata.PJSPOS + " " + rowdata.PJTX40 + " " + rowdata.M7RVAL
        )
      )} */}
      {/* {console.log("rowdata: " + JSON.stringify(rowdata))} */}

      <Grid container style={{ marginBottom: 1 }}>
        {/* {console.log(rowdata)} */}
        <Grid item xs={12}>
          {/* <Card> */}
          <TextField
            style={{ backgroundColor: "white" }}
            select
            variant="outlined"
            margin="normal"
            size="small"
            // color="primary"
            required
            fullWidth
            id="vWarehouse"
            label="Warehouse"
            value={warehouse}
            onChange={(event) => {
              // console.log(event.target.value);
              setWarehouse(event.target.value);
              handleChange(event.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            SelectProps={{
              native: true,
            }}
          >
            <option />
            {warehouses.map((option) => (
              <option key={option.ID} value={option.MWWHLO}>
                {option.WAREHOUSE}
              </option>
            ))}
          </TextField>
          {/* </Card> */}
        </Grid>
      </Grid>

      <MaterialTable
        id="root_wo"
        title={`WO List`}
        columns={columns}
        data={woheadReducer.result ? woheadReducer.result : []}
        isLoading={woheadReducer.result ? false : true}
        options={{
          // exportButton: true,
          // toolbar: false,
          pageSize: 10,
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
        actions={[
          (rowData) => ({
            icon: "search",
            tooltip: "Search row",
            iconProps: { color: "secondary" },
            onClick: (event, rowData) => {
              // console.log(rowData.PMHWO);
              props.history.push(`/wolist/inspect/${rowData.PMHWO}`);
              console.log(props.history);
            },
          }),
          {
            icon: RefreshIcon,
            tooltip: "Refresh",
            isFreeAction: true,
            onClick: () => {
              handleSearch();
            },
          },
        ]}
      />
    </div>
  );
};
