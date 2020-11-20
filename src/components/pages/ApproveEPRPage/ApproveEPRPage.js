import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import NumberFormat from "react-number-format";
import MaterialTable, { MTableToolbar } from "material-table";
import {
  makeStyles,
  withStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Typography, Grid, Paper, TextField, Button } from "@material-ui/core";
import { Card, CardMedia } from "@material-ui/core/";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import RefreshIcon from "@material-ui/icons/Refresh";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Formik, Form, Field } from "formik";
import { red, green, purple } from "@material-ui/core/colors/";
import * as loginActions from "./../../../actions/login.action";
import * as prheadActions from "./../../../actions/prhead.action";
import * as prdetailActions from "./../../../actions/prdetail.action";
import * as finalapproveActions from "./../../../actions/finalapprove.action";
import * as prheadapproveActions from "./../../../actions/prheadapprove.action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 60,
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
}));

const theme = createMuiTheme({
  palette: {
    // primary: {
    //   500: "#0FF",
    // },
    fourth: {
      500: "#0FF",
    },
  },
});

const accent = purple["A200"]; // #E040FB
// const accent = purple.A200; // #E040FB (alternative method)

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const finalapproveReducer = useSelector(
    ({ finalapproveReducer }) => finalapproveReducer
  );
  const prheadReducer = useSelector(({ prheadReducer }) => prheadReducer);
  const prdetailReducer = useSelector(({ prdetailReducer }) => prdetailReducer);
  const initialStatePRNumber = {
    vPRSelectNumber: null,
    vWarehouse: null,
    vBU: null,
    vDepartment: null,
    vCostCenter: null,
    vPHGroup: null,
    vMonth: null,
    vStatus: null,
  };
  const [prnumber, setPRNumber] = useState(initialStatePRNumber);
  const initialStatePRHead = {
    vPRNumber: "",
    vDate: moment(new Date()).format("YYYY-MM-DD"),
    vWarehouse: "",
    vDepartment: "",
    vMonth: "",
    vPlanUnPlan: "",
    vBU: "",
    vBuyer: "",
    vGroup: "",
    vCAPNo: "",
    vRequestor: "",
    vRemark: "",
    vApprove1: "",
    vApprove2: "",
    vApprove3: "",
    vApprove4: "",
    vStatus: "",
  };
  const [prhead, setPRHead] = useState(initialStatePRHead);
  const initialStateItemPRDetail = {
    vPRNumber: "",
    vItemLine: "",
    vItemNo: "",
    vItemDesc1: "",
    vItemDesc2: null,
    vQty: "",
    vUnit: "",
    vDateDetail: moment(new Date()).format("YYYY-MM-DD"), //"2018-12-01"
    vSupplierNo: "",
    vSupplierName: "",
    vSupplierDesc: null,
    vPrice: "",
    vVat: "",
    vCurrency: "",
    vOrdertype: "",
    vTotal: "",
    vCostcenterDetail: "",
    vPHGroupDetail: "",
    vBuyerDetail: "",
    vRemarkDetail: "",
  };
  const initialStateParams = {
    cono: "",
    divi: "",
    prno: "",
    status: "",
    approve: "",
    token: "",
  };
  const [params, setParams] = useState(initialStateParams);
  const [itemprdetail, setItemPRDetail] = useState(initialStateItemPRDetail);
  const [search, setSearch] = useState(false);
  const [cancle, setCancle] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reject, setReject] = useState(false);
  const [approve, setApprove] = useState(false);
  const [approveDisable, setApproveDisable] = useState(true);
  const [rejectDisable, setRejectDisable] = useState(true);

  useEffect(() => {
    // dispatch(prnumberActions.getPRNumbersWithOutUser());
    // dispatch(warehouseActions.getWarehouses());
    // dispatch(buActions.getBUs());
    // let phgroup = "PH";
    // dispatch(phgroupActions.getPHGroups(phgroup));
    // dispatch(monthActions.getMonths());
    // dispatch(statusActions.getStatuses());
    let fromStatus = "15";
    let toStatus = "20";
    dispatch(finalapproveActions.getEPRFinalApprove(fromStatus, toStatus));

    prheadReducer.result = null;
    prdetailReducer.result = null;
  }, []);

  const handleSearch = () => {
    let fromStatus = "15";
    let toStatus = "20";
    dispatch(finalapproveActions.getEPRFinalApprove(fromStatus, toStatus));

    prheadReducer.result = null;
    prdetailReducer.result = null;
  };

  const columns = [
    {
      title: "PR Number",
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
    {
      title: "Requestor",
      field: "HD_IBPURC",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "left",
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
          {item.HD_IBPURC}
        </Typography>
      ),
    },
    {
      title: "Whs.",
      field: "HD_IBWHLO",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "center" },
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
      // editComponent: props => (
      //   <Autocomplete
      //     id="combo-box-demo"
      //     options={top100Films}
      //     getOptionLabel={option => option.title}
      //     style={{ width: 100 }}
      //     renderInput={params => <TextField {...params} />}
      //   />
      // ),
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.HD_IBWHLO}
        </Typography>
      ),
    },
    {
      title: "Dept.",
      field: "HD_IBCOCE",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "left",
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
          {item.HD_IBCOCE}
        </Typography>
      ),
    },
    // {
    //   title: "HD_IBBUYE",
    //   field: "HD_IBBUYE",
    //   headerStyle: { maxWidth: 50, whiteSpace: "nowrap", textAlign: "center" },
    //   cellStyle: {
    //     textAlign: "center",
    //     borderLeft: 1,
    //     borderRight: 1,
    //     borderBottom: 1,
    //     borderTop: 1,
    //     borderColor: "#E0E0E0",
    //     borderStyle: "solid",
    //   },
    //   render: (item) => (
    //     <Typography variant="body1" noWrap>
    //       {item.HD_IBBUYE}
    //     </Typography>
    //   ),
    // },
    // {
    //   title: "HD_IBMODL",
    //   field: "HD_IBMODL",
    //   // type: "numeric",
    //   headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "left" },
    //   cellStyle: {
    //     textAlign: "right",
    //     borderLeft: 1,
    //     borderRight: 1,
    //     borderBottom: 1,
    //     borderTop: 1,
    //     borderColor: "#E0E0E0",
    //     borderStyle: "solid",
    //   },
    //   render: (item) => (
    //     <Typography variant="body1" noWrap>
    //       {item.HD_IBMODL}
    //     </Typography>
    //   ),
    // },
    {
      title: "Month",
      field: "HD_IBMTH",
      // type: "numeric",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.HD_IBMTH}
        </Typography>
      ),
    },
    {
      title: "Date",
      field: "HD_PURCDT",
      type: "date",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
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
          {moment(item.HD_PURCDT).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Plan/UnPln.",
      field: "HD_IBPRIP",
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
          {item.HD_IBPRIP}
        </Typography>
      ),
    },
    {
      title: "BU",
      field: "HD_BU",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.HD_BU}
        </Typography>
      ),
    },
    {
      title: "CAP. No",
      field: "HD_CAPNO",
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
          {item.HD_CAPNO}
        </Typography>
      ),
    },
    {
      title: "Aprove1",
      field: "HD_APP1",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "left",
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
          {item.HD_APP1}
        </Typography>
      ),
    },

    {
      title: "Aprove Date1",
      field: "HD_APPDT1",
      // type: "numeric",
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
          {item.HD_APPDT1 === "0"
            ? ""
            : moment(item.HD_APPDT1).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Aprove2",
      field: "HD_APP2",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "left",
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
          {item.HD_APP2}
        </Typography>
      ),
    },
    {
      title: "Aprove Date2",
      field: "HD_APPDT2",
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
          {item.HD_APPDT2 === "0"
            ? ""
            : moment(item.HD_APPDT2).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Aprove3",
      field: "HD_APP3",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "left",
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
          {item.HD_APP3}
        </Typography>
      ),
    },
    {
      title: "Aprove Date3",
      field: "HD_APPDT3",
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
          {item.HD_APPDT3 === "0"
            ? ""
            : moment(item.HD_APPDT3).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Aprove4",
      field: "HD_APP4",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "left",
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
          {item.HD_APP4}
        </Typography>
      ),
    },
    {
      title: "Aprove Date4",
      field: "HD_APPDT4",
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
          {item.HD_APPDT4 === "0"
            ? ""
            : moment(item.HD_APPDT4).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Status",
      field: "HD_STATUS",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.HD_STATUS}
        </Typography>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      {/* Grid */}
      {/* <p>#Debug prhead {JSON.stringify(prhead)}</p> */}
      {/* <Formik>{(props) => showForm(props)}</Formik> */}

      {/* Plan PR Table */}
      <MaterialTable
        id="root_pr"
        title={`ePR Final Approve`}
        columns={columns}
        data={finalapproveReducer.result ? finalapproveReducer.result : []}
        isLoading={finalapproveReducer.result ? false : true}
        options={{
          // exportButton: true,
          // toolbar: false,
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
            // backgroundColor: "red",
            // padding: "5px",
            // whiteSpace: "normal",
            // wordWrap: "break-word",
            // wordBreak: "break-all"
          },
          fixedColumns: {
            // left: 2
          },
        }}
        actions={[
          (rowData) => ({
            icon: "search",
            tooltip: "Search row",
            iconProps: { color: "secondary" },
            onClick: (event, rowData) => {
              // alert(
              //   JSON.stringify(
              //     loginActions.getTokenCono() +
              //       " : " +
              //       loginActions.getTokenDivi() +
              //       " : " +
              //       rowData.HD_IBPLPN +
              //       " : " +
              //       rowData.HD_STATUS
              //   )
              // );
              let fromStatus = "15";
              let toStatus = "20";
              props.history.push(
                `/approveepr/approve/${loginActions.getTokenCono()}/${loginActions.getTokenDivi()}/${
                  // `/approve/${loginActions.getTokenCono()}/${loginActions.getTokenDivi()}/${
                  rowData.HD_IBPLPN
                }/${loginActions.getTokenUsername()}`
              );

              // props.history.push("/approve/`{{loginActions.getTokenCono()} }`/loginActions.getTokenDivi()/rowData.HD_IBPLPN/rowData.HD_STATUS/ROSANN_SUC"),
            },
          }),
          {
            icon: RefreshIcon,
            tooltip: "Refeash",
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
