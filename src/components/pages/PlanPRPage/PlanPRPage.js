import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import NumberFormat from "react-number-format";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper, TextField, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import PublishIcon from '@material-ui/icons/Publish';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Formik, Form, Field } from "formik";
import * as loginActions from "./../../../actions/login.action";
import * as prnumberActions from "./../../../actions/prnumber.action";
import * as prheadActions from "./../../../actions/prhead.action";
import * as prdetailActions from "./../../../actions/prdetail.action";
import * as warehouseActions from "./../../../actions/warehouse.action";
import * as departmentActions from "./../../../actions/department.action";
import * as approveActions from "./../../../actions/approve.action";
import * as buyerActions from "./../../../actions/buyer.action";
import * as itemActions from "./../../../actions/item.action";
import * as itemprdetailActions from "./../../../actions/itemprdetail.action";
import * as itemunitActions from "./../../../actions/itemunit.action";
import * as phgroupActions from "./../../../actions/phgroup.action";
import * as phbuyerActions from "./../../../actions/phbuyer.action";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 60,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
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
  table: { borderTopWidth: 1, borderColor: "red", borderStyle: "solid" }, // or borderTop: '1px solid red'
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const prnumberReducer = useSelector(({ prnumberReducer }) => prnumberReducer);
  const prheadReducer = useSelector(({ prheadReducer }) => prheadReducer);
  const prdetailReducer = useSelector(({ prdetailReducer }) => prdetailReducer);
  const warehouseReducer = useSelector(
    ({ warehouseReducer }) => warehouseReducer
  );
  const departmentReducer = useSelector(
    ({ departmentReducer }) => departmentReducer
  );
  const approveReducer = useSelector(({ approveReducer }) => approveReducer);
  const buyerReducer = useSelector(({ buyerReducer }) => buyerReducer);
  const itemReducer = useSelector(({ itemReducer }) => itemReducer);
  const itemprdetailReducer = useSelector(
    ({ itemprdetailReducer }) => itemprdetailReducer
  );
  const itemunitReducer = useSelector(({ itemunitReducer }) => itemunitReducer);
  const phgroupReducer = useSelector(({ phgroupReducer }) => phgroupReducer);
  const phbuyerReducer = useSelector(({ phbuyerReducer }) => phbuyerReducer);

  const [prnumber, setPRNumber] = useState({ vPRSelectNumber: "" });
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
    vItemLine: "",
    vItemNo: { MMITNO: "" },
    vItemDesc1: "",
    vItemDesc2: "",
    vQty: "",
    vUnit: "",
    vDateDetail: moment(new Date()).format("YYYY-MM-DD"), //"2018-12-01"
    vSupplierNo: "",
    vSupplierName: "",
    vPrice: "",
    vCurrency: "",
    vOrdertype: "",
    vCostcenterDetail: "",
    vPHGroupDetail: "",
    vBuyerDetail: "",
    vRemarkDetail: "",
  };
  const [itemprdetail, setItemPRDetail] = useState(initialStateItemPRDetail);
  // const [warehouse, setWarehouse] = useState({ vWarehouse: "" });
  // const [department, setDepartment] = useState({ vDepartment: "" });
  // const [approve, setApprove] = useState({ vApprove1: "" });
  // const [headdept, setHeadDept] = useState();
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [selectedRow, setSelectedRow] = useState(null);
  const [searchdisable, setSearchDisable] = useState(false);
  const [newdisable, setNewDisable] = useState(false);
  const [editdisable, setEditDisable] = useState(true);
  const [createdisable, setCreateDisable] = useState(true);
  const [cancelprdisable, setCancelPRDisable] = useState(true);
  const [whsdisable, setWhsDisable] = useState(true);
  // const [showbuttonsave, setShowButtonSave] = useState(null);
  // const [showbuttoncancel, setShowButtoncancel] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [savedisable, setSaveDisable] = useState(null);
  // const [confirmdisable, setConfirmDisable] = useState(null);

  useEffect(() => {
    // console.log("dispatch prnumberActions");
    let status = "00";
    dispatch(prnumberActions.getPRNumbers(status));
    dispatch(warehouseActions.getWarehouses());
    dispatch(departmentActions.getDepartments());
    dispatch(approveActions.getApproves());
    dispatch(buyerActions.getBuyers());
  }, []);

  useEffect(() => {
    const prheads = prheadReducer.result ? prheadReducer.result : [];
    prheads.map((item) => {
      setPRNumber({ ...prnumber, vPRSelectNumber: item.HD_IBPLPN });
    });
    prheads.map((item) => {
      dispatch(itemActions.getItems(item.HD_IBWHLO));
      let phgroup = "PH";
      dispatch(phgroupActions.getPHGroups(phgroup));
      setPRHead({
        ...prhead,
        vPRNumber: item.HD_IBPLPN,
        vDate: moment(item.HD_PURCDT).format("YYYY-MM-DD"),
        vWarehouse: item.HD_IBWHLO,
        vDepartment: item.HD_IBCOCE,
        vMonth: item.HD_IBMTH,
        vPlanUnPlan: item.HD_IBPRIP,
        vBU: item.HD_BU,
        vBuyer: item.HD_IBBUYE,
        vGroup: item.HD_IBMODL,
        vCAPNo: item.HD_CAPNO,
        vRequestor: item.HD_IBPURC,
        vRemark: item.HD_REM1,
        vApprove1: item.HD_APP1,
        vApprove2: item.HD_APP2,
        vApprove3: item.HD_APP3,
        vApprove4: item.HD_APP4,
        vStatus: item.HD_STATUS,
      });
    });
  }, [prheadReducer]);

  useEffect(() => {
    const itemprdetails = itemprdetailReducer.result
      ? itemprdetailReducer.result
      : [];
    // console.log(JSON.stringify("itemdetails: " + JSON.stringify(itemdetails)));
    itemprdetails.map((item) =>
      setItemPRDetail({
        ...itemprdetail,
        vItemNo: { MMITNO: item.MMITNO },
        vItemDesc1: item.MMITDS,
        vItemDesc2: item.MMFUDS,
        vUnit: item.MMUNMS,
        vDateDetail: moment(new Date()).format("YYYY-MM-DD"), //"2018-12-01"
        vSupplierNo: item.MMSUNO,
        vSupplierName: item.SASUNM,
        vPrice: item.MMPUPR,
        vCurrency: item.MMCUCD,
        vOrdertype: item.MBORTY,
      })
    );
  }, [itemprdetailReducer]);

  const prnumbers = useMemo(() =>
    prnumberReducer.result ? prnumberReducer.result : []
  );

  const warehouses = useMemo(() =>
    warehouseReducer.result ? warehouseReducer.result : []
  );

  const departments = useMemo(() =>
    departmentReducer.result ? departmentReducer.result : []
  );

  const approves = useMemo(() =>
    approveReducer.result ? approveReducer.result : []
  );

  const buyers = useMemo(() =>
    buyerReducer.result ? buyerReducer.result : []
  );

  const handleSearch = () => {
    // console.log(prnumber.vPRSelectNumber);
    if (prnumber.vPRSelectNumber === "") {
      setEditDisable(true);
      setCreateDisable(true);
      setPRHead({
        ...initialStatePRHead,
      });
      dispatch(prdetailActions.getPRDetails("00"));
    } else {
      setNewDisable(true);
      setEditDisable(false);
      setCreateDisable(false);
      setCancelPRDisable(false);
      let status = "00";
      dispatch(prheadActions.getPRHeads(prnumber.vPRSelectNumber, status));
      dispatch(prdetailActions.getPRDetails(prnumber.vPRSelectNumber));
    }
  };

  const handleNew = (event) => {
    // console.log(prnumber.vPRSelectNumber);
    setSearchDisable(true);
    setEditDisable(false);
    setCreateDisable(true);
    setWhsDisable(false);
    setPRHead({
      ...initialStatePRHead,
      vMonth: prhead.vDate.substr(2, 2) + prhead.vDate.substr(5, 2),
      vPlanUnPlan: 5,
    });
  };

  const handleCancel = (event) => {
    setSearchDisable(false);
    setNewDisable(false);
    setEditDisable(true);
    setCreateDisable(true);
    setCancelPRDisable(true);
    setWhsDisable(true);
    setPRNumber({ ...prnumber, vPRSelectNumber: "" });
    setPRHead({ ...initialStatePRHead });
    dispatch(prdetailActions.getPRDetails("00"));
  };

  const handleClose = () => {
    setItemPRDetail(initialStateItemPRDetail);
    setOpenDialog(false);
  };

  const handleCancelPR = (event) => {
    let status = "99";
    dispatch(prheadActions.cancelPRHead(prhead.vPRNumber, status));
    setTimeout(() => {
      setCancelPRDisable(true);
      setPRNumber({ ...prnumber, vPRSelectNumber: "" });
      setPRHead({ ...initialStatePRHead });
      dispatch(prnumberActions.getPRNumbers("00"));
      dispatch(prdetailActions.getPRDetails("00"));
    }, 1000);
  };

  const handleSave = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    setOpenDialog(false);
  };

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <Grid container style={{ marginBottom: 2 }} spacing={5}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container item xs={12} className={classes.margin}>
                <Grid item xs={12} sm={2} className={classes.margin}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    variant="outlined"
                    required
                    id="vSelectPRNumber"
                    label="PR Number"
                    disabled={searchdisable}
                    value={prnumber.vPRSelectNumber}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setPRNumber({
                        ...prnumber,
                        vPRSelectNumber: event.target.value,
                      });
                    }}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option />
                    {prnumbers.map((option) => (
                      <option key={option.ID} value={option.HD_IBPLPN}>
                        {option.HD_IBPLPN}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={1} className={classes.margin}>
                  <Button
                    fullWidth
                    size="medium"
                    id="vSearch"
                    variant="contained"
                    color="primary"
                    disabled={searchdisable}
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item xs={12} sm={1} className={classes.margin}>
                  <Button
                    fullWidth
                    size="medium"
                    id="vNew"
                    variant="contained"
                    color="secondary"
                    disabled={newdisable}
                    startIcon={<AddCircleIcon />}
                    onClick={handleNew}
                  >
                    New
                  </Button>
                </Grid>
                {/* <Grid item xs sm={1} className={classes.margin}>
                <Button
                  fullWidth
                  size="medium"
                  id="vSearch"
                  variant="contained"
                  color="default"
                  startIcon={<EditIcon />}
                  onClick={(event) => {
                    setEditDisable(false);
                  }}
                >
                  Edit
                </Button>
              </Grid> */}
                <Grid item xs sm={1} className={classes.margin}>
                  <Button
                    fullWidth
                    size="medium"
                    id="vSave"
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                    disabled={editdisable}
                    onSubmit={(event) => {
                      console.log("submit");
                    }}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item xs sm={1} className={classes.margin}>
                  <Button
                    fullWidth
                    size="medium"
                    id="vCancel"
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    disabled={editdisable}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
                {/* <Grid item xs sm={1} className={classes.margin}>
                  <Button
                    fullWidth
                    size="medium"
                    id="vCancelPR"
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    disabled={cancelprdisable}
                    onClick={handleCancelPR}
                  >
                    Cancel PR
                  </Button>
                </Grid> */}
              </Grid>
              <Grid container item xs className={classes.margin}>
                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 120 }}
                  required
                  disabled={true}
                  size="small"
                  id="vPRNumber"
                  label="PR Number"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vPRNumber}
                  values={(values.vPRNumber = prhead.vPRNumber)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vPRNumber: event.target.value,
                    });
                  }}
                />
                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 180 }}
                  required
                  disabled={editdisable}
                  type="date"
                  size="small"
                  id="vDate"
                  label="Date"
                  variant="outlined"
                  defaultValue={prhead.vDate}
                  value={prhead.vDate}
                  values={(values.vDate = prhead.vDate)}
                  onChange={(event) => {
                    // console.log("onChange: " + event.target.value.substr(2, 2) +
                    // event.target.value.substr(5, 2));
                    setPRHead({
                      ...prhead,
                      vDate: event.target.value,
                      vMonth:
                        event.target.value.substr(2, 2) +
                        event.target.value.substr(5, 2),
                    });
                  }}
                  InputLabelProps={{ shrink: true, required: true }}
                />
                <TextField
                  className={classes.margin}
                  style={{ width: "150px" }}
                  disabled={whsdisable}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vWarehouse"
                  label="Warehouse"
                  value={prhead.vWarehouse}
                  values={(values.vWarehouse = prhead.vWarehouse)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vWarehouse: event.target.value,
                    });
                  }}
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

                <TextField
                  className={classes.margin}
                  style={{ width: "150px" }}
                  disabled={editdisable}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vDepartment"
                  label="Department"
                  value={prhead.vDepartment}
                  values={(values.vDepartment = prhead.vDepartment)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vDepartment: event.target.value,
                    });
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {departments.map((option) => (
                    <option key={option.ID} value={option.EAAITM}>
                      {option.DEPARTMENT}
                    </option>
                  ))}
                </TextField>

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 100 }}
                  required
                  // disabled={editdisable}
                  disabled={true}
                  size="small"
                  id="vMonth"
                  label="Month"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vMonth}
                  values={(values.vMonth = prhead.vMonth)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    // setPRHead({
                    //   ...prhead,
                    //   vMonth: event.target.value
                    // });
                  }}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 120 }}
                  required
                  // disabled={editdisable}
                  disabled={true}
                  size="small"
                  id="vPlanUnPlan"
                  label="Plan / UnPlan"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vPlanUnPlan}
                  values={(values.vPlanUnPlan = prhead.vPlanUnPlan)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    // setPRHead({
                    //   ...prhead,
                    //   vPlanUnPlan: event.target.value
                    // });
                  }}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 100 }}
                  required
                  disabled={editdisable}
                  size="small"
                  id="vBU"
                  label="Bu"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vBU}
                  values={(values.vBU = prhead.vBU)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vBU: event.target.value,
                    });
                  }}
                />

                {/* <FormControl
                className={classes.margin}
                style={{ maxWidth: 170 }}
                required
                disabled={editdisable}
                variant="outlined"
                size="small"
              >
                <InputLabel>Buyer</InputLabel>
                <Select
                  id="vBuyer"
                  label="Buyer"
                  onChange={(event) => {
                    // console.log(event.target.value);
                    
                    setPRHead({
                      ...prhead,
                      vBuyer: event.target.value,
                    });
                  }}
                  value={prhead.vBuyer}
                >
                  <MenuItem value="0">
                    <em>Select Buyer</em>
                  </MenuItem>
                  {buyers.map((item) => (
                    <MenuItem key={item.ID} value={item.US_LOGIN}>
                      {item.US_LOGIN}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}

                {/* <TextField
                className={classes.margin}
                style={{ maxWidth: 100 }}
                required
                disabled={editdisable}
                size="small"
                id="vGroup"
                label="Group"
                placeholder="Placeholder"
                variant="outlined"
                onChange={(event) => {
                  // console.log(event.target.value);
                  
                  setPRHead({
                    ...prhead,
                    vGroup: event.target.value,
                  });
                }}
                value={prhead.vGroup}
              /> */}

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 100 }}
                  // required
                  disabled={editdisable}
                  size="small"
                  id="vCAPNo"
                  label="CAP No"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vCAPNo}
                  values={(values.vCAPNo = prhead.vCAPNo)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vCAPNo: event.target.value,
                    });
                  }}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 150 }}
                  required
                  // disabled={editdisable}
                  disabled={true}
                  size="small"
                  id="vRequestor"
                  label="Requestor"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vRequestor}
                  values={(values.vRequestor = prhead.vRequestor)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    // setPRHead({
                    //   ...prhead,
                    //   vRequestor: event.target.value,
                    // });
                  }}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 200 }}
                  // required
                  disabled={editdisable}
                  size="small"
                  id="vRemark"
                  label="Remark"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vRemark}
                  values={(values.vRemark = prhead.vRemark)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vRemark: event.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid container item xs className={classes.margin}>
                <TextField
                  className={classes.margin}
                  style={{ width: "200px" }}
                  disabled={editdisable}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vDeptHead"
                  label="Dept of Head"
                  value={prhead.vApprove1}
                  values={(values.vApprove1 = prhead.vApprove1)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vApprove1: event.target.value,
                    });
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {approves.map((option) => (
                    <option key={option.ID} value={option.US_LOGIN}>
                      {option.US_LOGIN}
                    </option>
                  ))}
                </TextField>

                <TextField
                  className={classes.margin}
                  style={{ width: "200px" }}
                  disabled={editdisable}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vApprove1"
                  label="Approve1"
                  value={prhead.vApprove2}
                  values={(values.vApprove2 = prhead.vApprove2)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vApprove2: event.target.value,
                    });
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {approves.map((option) => (
                    <option key={option.ID} value={option.US_LOGIN}>
                      {option.US_LOGIN}
                    </option>
                  ))}
                </TextField>

                {/* <TextField
                  className={classes.margin}
                  style={{ width: "200px" }}
                  disabled={editdisable}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vApprove2"
                  label="Approve2"
                  value={prhead.vApprove3}
                  onChange={event => {
                    // console.log(event.target.value);

                    setPRHead({
                      ...prhead,
                      vApprove3: event.target.value
                    });
                  }}
                  SelectProps={{
                    native: true
                  }}
                >
                  <option />
                  {approves.map(option => (
                    <option key={option.ID} value={option.US_LOGIN}>
                      {option.US_LOGIN}
                    </option>
                  ))}
                </TextField>

                <TextField
                  className={classes.margin}
                  style={{ width: "200px" }}
                  disabled={editdisable}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vApprove3"
                  label="Approve3"
                  value={prhead.vApprove4}
                  onChange={event => {
                    // console.log(event.target.value);

                    setPRHead({
                      ...prhead,
                      vApprove4: event.target.value
                    });
                  }}
                  SelectProps={{
                    native: true
                  }}
                >
                  <option />
                  {approves.map(option => (
                    <option key={option.ID} value={option.US_LOGIN}>
                      {option.US_LOGIN}
                    </option>
                  ))}
                </TextField> */}
                <Grid className={classes.margin}>
                  <Button
                    // fullWidth
                    size="medium"
                    id="vCancelPR"
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    disabled={cancelprdisable}
                    onClick={handleCancelPR}
                  >
                    Cancel PR
                  </Button>
                </Grid>
                <Grid className={classes.margin}>
                  <Button
                    // fullWidth
                    size="medium"
                    id="vCancelPR"
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    disabled={cancelprdisable}
                    // onClick={handleCancelPR}
                  >
                    Submit PH
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    );
  };

  const showDialog = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    if (selectedProduct == null) {
      return "";
    }

    const items = itemReducer.result ? itemReducer.result : [];
    const itemunits = itemunitReducer.result ? itemunitReducer.result : [];
    const phgroups = phgroupReducer.result ? phgroupReducer.result : [];
    const phbuyers = phbuyerReducer.result ? phbuyerReducer.result : [];
    return (
      <Dialog
        open={openDialog}
        keepMounted
        onClose={() => {}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="alert-dialog-slide-title">
            PR Number : {prhead.vPRNumber}
            {itemprdetail.vItemLine
              ? ` - Line : ${itemprdetail.vItemLine}`
              : ""}
          </DialogTitle>
          <DialogContent>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={5}>
                <Autocomplete
                  className={classes.margin}
                  autoFocus
                  required
                  fullWidth
                  size="small"
                  id="vItemNoAuto"
                  options={items}
                  getOptionLabel={(option) => option.MMITNO}
                  value={itemprdetail.vItemNo}
                  values={(values.vItemLine = itemprdetail.vItemLine)}
                  values={(values.vItemNo = itemprdetail.vItemNo.MMITNO)}
                  onChange={(event, values) => {
                    // console.log(values);
                    if (values) {
                      setItemPRDetail({
                        ...itemprdetail,
                        vItemNo: { MMITNO: values.MMITNO },
                      });
                      dispatch(itemunitActions.getItemUnits(values.MMITNO));
                      dispatch(
                        itemprdetailActions.getItems(
                          prhead.vWarehouse,
                          values.MMITNO
                        )
                      );
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="vItemNo"
                      label="Item No"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  className={classes.margin}
                  // required
                  fullWidth
                  disabled="true"
                  margin="dense"
                  id="vItemName"
                  label="Item Name"
                  type="text"
                  value={itemprdetail.vItemDesc1}
                  values={(values.vItemDesc1 = itemprdetail.vItemDesc1)}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={5}>
                <TextField
                  required
                  fullWidth
                  // disabled="true"
                  margin="dense"
                  id="vQty"
                  label="Qty"
                  type="number"
                  value={itemprdetail.vQty}
                  values={(values.vQty = itemprdetail.vQty)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setItemPRDetail({
                      ...itemprdetail,
                      vQty: event.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  className={classes.margin}
                  disabled={editdisable}
                  fullWidth
                  disabled="true"
                  required
                  select
                  margin="dense"
                  variant="standard"
                  size="small"
                  required
                  id="vUnit"
                  label="Unit"
                  value={itemprdetail.vUnit}
                  values={(values.vUnit = itemprdetail.vUnit)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setItemPRDetail({
                      ...itemprdetail,
                      vUnit: event.target.value,
                    });
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {itemunits.map((option) => (
                    <option key={option.ID} value={option.MMUNMS}>
                      {option.MMUNMS}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <TextField
              required
              fullWidth
              margin="dense"
              type="date"
              size="small"
              id="vDeliveryDate"
              label="Delivery Date"
              variant="standard"
              defaultValue={prhead.vDate}
              value={itemprdetail.vDateDetail}
              values={(values.vDateDetail = itemprdetail.vDateDetail)}
              onChange={(event) => {
                // console.log(event.target.value);
                setItemPRDetail({
                  ...itemprdetail,
                  vDateDetail: event.target.value,
                });
              }}
              InputLabelProps={{ shrink: true, required: true }}
            />
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={5}>
                <TextField
                  required
                  fullWidth
                  disabled="true"
                  margin="dense"
                  id="vSupplierNo"
                  label="Supplier No"
                  type="text"
                  value={itemprdetail.vSupplierNo}
                  values={(values.vSupplierNo = itemprdetail.vSupplierNo)}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  // required
                  fullWidth
                  disabled="true"
                  margin="dense"
                  id="vSupplierName"
                  label="Supplier Name"
                  type="text"
                  value={itemprdetail.vSupplierName}
                  values={(values.vSupplierName = itemprdetail.vSupplierName)}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  disabled="true"
                  margin="dense"
                  id="vPrice"
                  label="Price"
                  type="number"
                  value={itemprdetail.vPrice}
                  values={(values.vPrice = itemprdetail.vPrice)}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  required
                  fullWidth
                  disabled="true"
                  margin="dense"
                  id="vCurrency"
                  label="Currency"
                  type="text"
                  value={itemprdetail.vCurrency}
                  values={(values.vCurrency = itemprdetail.vCurrency)}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  required
                  fullWidth
                  disabled="true"
                  margin="dense"
                  id="vOrderType"
                  label="Order Type"
                  type="text"
                  value={itemprdetail.vOrdertype}
                  values={(values.vOrdertype = itemprdetail.vOrdertype)}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={8}>
                <TextField
                  className={classes.margin}
                  disabled={editdisable}
                  fullWidth
                  required
                  select
                  margin="dense"
                  variant="standard"
                  size="small"
                  required
                  id="vPHGroup"
                  label="PH Group"
                  value={itemprdetail.vPHGroupDetail}
                  values={(values.vPHGroupDetail = itemprdetail.vPHGroupDetail)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    let phgroup = "PH";
                    setItemPRDetail({
                      ...itemprdetail,
                      vPHGroupDetail: event.target.value,
                    });
                    dispatch(
                      phbuyerActions.getPHBuyers(phgroup, event.target.value)
                    );
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {phgroups.map((option) => (
                    <option key={option.ID} value={option.US_GRP}>
                      {option.US_GRP}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs>
                <TextField
                  className={classes.margin}
                  disabled={editdisable}
                  fullWidth
                  required
                  select
                  margin="dense"
                  variant="standard"
                  size="small"
                  required
                  id="vBuyer"
                  label="Buyer"
                  value={itemprdetail.vBuyerDetail}
                  values={(values.vBuyerDetail = itemprdetail.vBuyerDetail)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setItemPRDetail({
                      ...itemprdetail,
                      vBuyerDetail: event.target.value,
                    });
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {phbuyers.map((option) => (
                    <option key={option.ID} value={option.US_LOGIN}>
                      {option.US_LOGIN}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <TextField
              className={classes.margin}
              disabled={editdisable}
              fullWidth
              required
              select
              margin="dense"
              variant="standard"
              size="small"
              required
              id="vCostcenter"
              label="Cost center"
              value={itemprdetail.vCostcenterDetail}
              values={
                (values.vCostcenterDetail = itemprdetail.vCostcenterDetail)
              }
              onChange={(event) => {
                // console.log(event.target.value);
                setItemPRDetail({
                  ...itemprdetail,
                  vCostcenterDetail: event.target.value,
                });
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option />
              {departments.map((option) => (
                <option key={option.ID} value={option.EAAITM}>
                  {option.DEPARTMENT}
                </option>
              ))}
            </TextField>

            <TextField
              // required
              fullWidth
              // disabled="true"
              margin="dense"
              id="vRemarkDetail"
              label="Remark"
              type="text"
              value={itemprdetail.vRemarkDetail}
              values={(values.vRemarkDetail = itemprdetail.vRemarkDetail)}
              onChange={(event) => {
                // console.log(event.target.value);
                setItemPRDetail({
                  ...itemprdetail,
                  vRemarkDetail: event.target.value,
                });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="default">
              Cancel
            </Button>
            <Button
              disabled=""
              type="submit"
              color="primary"
              onSubmit={(event) => {
                console.log("submit");
              }}
            >
              Save
            </Button>
            <Button
              disabled=""
              type="submit"
              color="secondary"
              style={{ display: "none" }}
            >
              Comfirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  const columns = [
    {
      title: "Line",
      field: "PR_IBPLPS",
      headerStyle: { maxWidth: 50, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 50, textAlign: "center" },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBPLPS}
        </Typography>
      ),
    },
    {
      title: "Item No",
      field: "PR_IBITNO",
      headerStyle: { maxWidth: 200, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 200 },
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
          {item.PR_IBITNO}
        </Typography>
      ),
    },
    {
      title: "Item Name",
      field: "PR_IBPITT",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 150 },
      render: (item) => (
        <Typography variant="body1" display="block" noWrap>
          {item.PR_IBPITT}
        </Typography>
      ),
    },
    {
      title: "Unit",
      field: "PR_IBPUUN",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 100, textAlign: "center" },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBPUUN}
        </Typography>
      ),
    },
    {
      title: "Stk Rem.",
      field: "MBSTQT",
      type: "numeric",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 100, textAlign: "right" },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.MBSTQT}
        </Typography>
      ),
    },
    {
      title: "Qty",
      field: "PR_IBORQA",
      type: "numeric",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 100, textAlign: "right" },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBORQA}
        </Typography>
      ),
    },
    {
      title: "U/P",
      field: "PR_IBPUPR",
      type: "numeric",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 100, textAlign: "right" },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBPUPR}
        </Typography>
      ),
    },
    {
      title: "Deli. Date",
      field: "PR_IBDWDT",
      type: "date",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 150 },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {moment(item.PR_IBDWDT).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Supp No",
      field: "PR_IBSUNO",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 150 },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBSUNO}
        </Typography>
      ),
    },
    {
      title: "Supp Name",
      field: "SASUNM",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 150 },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.SASUNM}
        </Typography>
      ),
    },
    {
      title: "Ord. Type",
      field: "PR_IBORTY",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBORTY}
        </Typography>
      ),
    },
    {
      title: "Vat.",
      field: "PR_IBVTCD",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBPLPN}
        </Typography>
      ),
    },
    {
      title: "Total",
      field: "",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      // render: item => <Typography variant="body1" noWrap>{item.PR_IBPLPN}</Typography>
    },
    {
      title: "Curr.",
      field: "PR_IBCUCD",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBCUCD}
        </Typography>
      ),
    },
    {
      title: "Cost Center",
      field: "PR_IBCOCE",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 150 },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBCOCE}
        </Typography>
      ),
    },
    {
      title: "Group",
      field: "PR_IBMODL",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBMODL}
        </Typography>
      ),
    },
    {
      title: "Buyer",
      field: "PR_IBBUYE",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 150 },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBBUYE}
        </Typography>
      ),
    },
    {
      title: "PR Rem3",
      field: "PR_REM3",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_REM3}
        </Typography>
      ),
    },
    {
      title: "PR Rem5",
      field: "PR_REM5",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_REM5}
        </Typography>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      {/* Grid */}
      {/* <p>#Debug prnumber {JSON.stringify(prnumber)}</p> */}
      {/* <p>#Debug prhead {JSON.stringify(prhead)}</p> */}
      {/* <p>{JSON.stringify(itemdetail)}</p> */}
      {/* <p>#Debug itemprdetail {JSON.stringify(itemprdetail)}</p> */}
      {/* <p>#Debug editdisable {JSON.stringify(editdisable)}</p> */}
      {/* <p>#Debug warehouse {JSON.stringify(warehouse)}</p> */}
      {/* <p>#Debug approves {JSON.stringify(approve)}</p> */}
      <Formik
        initialValues={{
          vPRNumber: "",
          vDate: "",
          vWarehouse: "",
          vDepartment: "",
          vMonth: "",
          vPlanUnPlan: "",
          vBU: "",
          vCAPNo: "",
          vRequestor: "",
          vRemark: "",
          vApprove1: "",
          vApprove2: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(values));
          let formData = new FormData();
          formData.append("vPRNumber", values.vPRNumber);
          formData.append("vDate", values.vDate);
          formData.append("vWarehouse", values.vWarehouse);
          formData.append("vDepartment", values.vDepartment);
          formData.append("vMonth", values.vMonth);
          formData.append("vPlanUnPlan", values.vPlanUnPlan);
          formData.append("vBU", values.vBU);
          formData.append("vCAPNo", values.vCAPNo);
          formData.append(
            "vRequestor",
            prhead.vRequestor
              ? prhead.vRequestor
              : loginActions.getTokenUsername()
          );
          formData.append("vRemark", values.vRemark);
          formData.append("vApprove1", values.vApprove1);
          formData.append("vApprove2", values.vApprove2);
          formData.append("vStatus", prhead.vStatus ? prhead.vStatus : "00");

          if (newdisable === false && cancelprdisable === true) {
            dispatch(prheadActions.addPRHead(formData, props.history));
            setTimeout(() => {
              setSearchDisable(false);
              setNewDisable(false);
              setEditDisable(true);
              setCreateDisable(true);
              setPRNumber({ ...prnumber, vPRSelectNumber: "" });
              setPRHead({ ...initialStatePRHead });
              let status = "00";
              dispatch(prnumberActions.getPRNumbers(status));
            }, 500);
          } else if (searchdisable === false) {
            dispatch(prheadActions.updatePRHead(formData, props.history));
          }
        }}
      >
        {(props) => showForm(props)}
      </Formik>

      {/* Plan PR Table */}
      {/* <p>#Debug {JSON.stringify(selectedProduct)}</p> */}
      <MaterialTable
        id="root_prstock"
        title={`Plan PR : ${prhead.vStatus}`}
        columns={columns}
        data={prdetailReducer.result ? prdetailReducer.result : []}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: "0px 10px" }}>
                <Button
                  fullWidth
                  disabled={createdisable}
                  variant="contained"
                  color="primary"
                  // component={Link}
                  // to="/stock/create"
                  startIcon={<AddCircleIcon />}
                  onClick={(event, rowData) => {
                    // let phgroup = "PH";
                    setSelectedProduct("rowData");
                    setOpenDialog(true);
                    // dispatch(itemActions.getItems(prhead.vWarehouse));
                    // dispatch(phgroupActions.getPHGroups(phgroup));
                  }}
                >
                  Create
                </Button>
              </div>
            </div>
          ),
        }}
        options={{
          exportButton: true,
          // toolbar: false,
          paging: false,
          headerStyle: {
            // backgroundColor: "red",
            // padding: "5px",
            // whiteSpace: "normal",
            // wordWrap: "break-word",
            // wordBreak: "break-all"
          },
          // rowStyle: rowData => ({
          //   // backgroundColor:
          //   //   selectedRow && selectedRow.tableData.id === rowData.tableData.id
          //   //     ? "#EEE"
          //   //     : "#FFF"
          // }),
          //cellStyle: {},
          fixedColumns: {
            // left: 2
          },
        }}
        localization={
          {
            // body: {
            //   emptyDataSourceMessage: getMessage('label.no.records.to.display'),
            //   dateTimePickerLocalization: resolvedLocaleMap,
            //   muiDatePickerProps: {
            //     okLabel: getMessage('label.ok'),
            //     cancelLabel: getMessage('label.cancel'),
            //     clearLabel: getMessage('label.clear'),
            //   },
            // },
          }
        }
        editable={{
          //Edit data in line
          // isEditable: rowData => rowData.name === "a", // only name(a) rows would be editable
          // isDeletable: rowData => rowData.name === "b", // only name(a) rows would be deletable
          // onRowAdd: newData =>
          //   new Promise((resolve, reject) => {
          //     console.log("onRowAdd");
          //     setTimeout(() => {
          //       {
          //         const data = this.state.data;
          //         data.push(newData);
          //         this.setState({ data }, () => resolve());
          //       }
          //       resolve();
          //     }, 1000);
          //   }),
          // onRowUpdate: (newData, oldData) =>
          //   new Promise((resolve, reject) => {
          //     console.log("onRowUpdate: " + JSON.stringify(newData));
          //     props.history.push("/stock/edit/" + newData.product_id);
          //     setTimeout(() => {
          //       const data = [newData];
          //       data.map((item) => {
          //         // dispatch(prdetailActions.getPRDetails(item.PR_IBPLPN, "00"));
          //       });
          //       resolve();
          //     }, 1000);
          //   }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              // console.log("onRowDelete: " + JSON.stringify(oldData));
              let data = [oldData];
              data.map((item) => {
                dispatch(
                  prdetailActions.deletePRDetail(item.PR_IBPLPN, item.PR_IBPLPS)
                );
              });

              setTimeout(() => {
                {
                  setItemPRDetail({ ...initialStateItemPRDetail });
                  dispatch(prdetailActions.getPRDetails(prhead.vPRNumber));
                }
                resolve();
              }, 500);
            }),
        }}
        actions={[
          (rowData) => ({
            icon: "edit",
            tooltip: "Edit row",
            onClick: (event, rowData) => {
              // console.log("rowData: " + JSON.stringify([rowData]));

              let data = [rowData];
              let phgroup = "PH";
              data.map((item) => {
                // setItemDetail({ ...itemdetail, MMITNO: item.PR_IBITNO });
                setItemPRDetail({
                  ...itemprdetail,
                  vItemNo: { MMITNO: item.PR_IBITNO },
                });
                // dispatch(itemActions.getItems(prhead.vWarehouse));
                dispatch(itemunitActions.getItemUnits(item.PR_IBITNO));
                // dispatch(phgroupActions.getPHGroups(phgroup));
                dispatch(phbuyerActions.getPHBuyers(phgroup, item.PR_IBMODL));
              });

              setTimeout(() => {
                data.map((item) =>
                  setItemPRDetail({
                    ...itemprdetail,
                    vItemLine: item.PR_IBPLPS,
                    vItemNo: { MMITNO: item.PR_IBITNO },
                    vItemDesc1: item.PR_IBPITT,
                    vQty: item.PR_IBORQA,
                    vUnit: item.PR_IBPUUN,
                    vDateDetail: item.PR_IBDWDT,
                    vSupplierNo: item.PR_IBSUNO,
                    vSupplierName: item.SASUNM,
                    vPrice: item.PR_IBPUPR,
                    vCurrency: item.PR_IBCUCD,
                    vOrdertype: item.PR_IBORTY,
                    vCostcenterDetail: item.PR_IBCOCE,
                    vPHGroupDetail: item.PR_IBMODL,
                    vBuyerDetail: item.PR_IBBUYE,
                    vRemarkDetail: item.PR_REM3,
                  })
                );
              }, 1000);

              setSelectedProduct("rowData");
              setOpenDialog(true);
            },
          }),
        ]}
      />

      {/* Dialog */}
      <Formik
        initialValues={{
          vPRNumber: prhead.vPRNumber,
          vPlanUnPlan: prhead.vPlanUnPlan,
          vItemLine: "",
          vItemNo: "", //{ MMITNO: "" },
          vItemDesc1: "",
          vItemDesc2: "",
          vQty: "",
          vUnit: "",
          vDateDetail: moment(new Date()).format("YYYY-MM-DD"), //"2018-12-01"
          vSupplierNo: "",
          vSupplierName: "",
          vPrice: "",
          vVat: "",
          vCurrency: "",
          vOrdertype: "",
          vCostcenterDetail: "",
          vPHGroupDetail: "",
          vBuyerDetail: "",
          vRemarkDetail: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(values));
          let formData = new FormData();
          formData.append("vPRNumber", prhead.vPRNumber);
          formData.append("vPlanUnPlan", prhead.vPlanUnPlan);
          formData.append("vItemLine", values.vItemLine);
          formData.append("vItemNo", values.vItemNo);
          formData.append("vItemDesc1", values.vItemDesc1);
          formData.append("vQty", values.vQty);
          formData.append("vUnit", values.vUnit);
          formData.append("vDateDetail", values.vDateDetail);
          formData.append("vSupplierNo", values.vSupplierNo);
          formData.append("vPrice", values.vPrice);
          formData.append("vVat", "7");
          formData.append("vCurrency", values.vCurrency);
          formData.append("vOrdertype", values.vOrdertype);
          formData.append("vCostcenterDetail", values.vCostcenterDetail);
          formData.append("vPHGroupDetail", values.vPHGroupDetail);
          formData.append("vBuyerDetail", values.vBuyerDetail);
          formData.append("vRemarkDetail", values.vRemarkDetail);
          formData.append("vStatus", "10");

          if (values.vItemLine === "") {
            // console.log("true");
            dispatch(prdetailActions.addPRDetail(formData, props.history));
            setTimeout(() => {
              setItemPRDetail({ ...initialStateItemPRDetail });
              dispatch(prdetailActions.getPRDetails(prhead.vPRNumber));
              setOpenDialog(false);
            }, 500);
          } else {
            // console.log("false");
            dispatch(prdetailActions.updatePRDetail(formData, props.history));
            setTimeout(() => {
              setItemPRDetail({ ...initialStateItemPRDetail });
              dispatch(prdetailActions.getPRDetails(prhead.vPRNumber));
              setOpenDialog(false);
            }, 500);
          }
        }}
      >
        {(props) => showDialog(props)}
      </Formik>
    </div>
  );
};
