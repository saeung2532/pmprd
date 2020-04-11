import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import NumberFormat from "react-number-format";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Button
} from "@material-ui/core";
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
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Formik } from "formik";
import * as prnumberActions from "./../../../actions/prnumber.action";
import * as prheadActions from "./../../../actions/prhead.action";
import * as prdetailActions from "./../../../actions/prdetail.action";
import * as warehouseActions from "./../../../actions/warehouse.action";
import * as departmentActions from "./../../../actions/department.action";
import * as approveActions from "./../../../actions/approve.action";
import * as buyerActions from "./../../../actions/buyer.action";
import * as itemActions from "./../../../actions/item.action";
import * as itemdetailActions from "./../../../actions/itemdetail.action";
import * as itemunitActions from "./../../../actions/itemunit.action";
import * as phgroupActions from "./../../../actions/phgroup.action";
import * as phbuyerActions from "./../../../actions/phbuyer.action";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: 60
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary
  },
  margin: {
    marginTop: "0.4rem",
    marginRight: "0.4rem",
    margin: theme.spacing(0.3)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  table: { borderTopWidth: 1, borderColor: "red", borderStyle: "solid" } // or borderTop: '1px solid red'
}));

export default props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
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
  const itemdetailReducer = useSelector(
    ({ itemdetailReducer }) => itemdetailReducer
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
    vMount: "",
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
    vStatus: ""
  };
  const [prhead, setPRHead] = useState(initialStatePRHead);
  const initialStateItemDetail = {
    vItemNo: "", //1805884
    vItemDesc1: "", //1805884
    vItemDesc2: "", //1805884
    vQty: "", //1805884
    vUnit: "", //1805884
    vDeliDate: moment(new Date()).format("YYYY-MM-DD"), //"2018-12-01"
    vSupplierNo: "",
    vSupplierName: "",
    vPrice: "0",
    vCurrency: "",
    vOrdertype: ""
  };
  const [itemdetail, setItemDetail] = useState(initialStateItemDetail);
  const [warehouse, setWarehouse] = useState({ vWarehouse: "" });
  const [department, setDepartment] = useState({ vDepartment: "" });
  const [approve, setApprove] = useState({ vApprove1: "" });
  const [headdept, setHeadDept] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRow, setSelectedRow] = useState(null);
  const [editdisable, setEditDisable] = useState(true);
  const [searchdisable, setSearchDisable] = useState(null);
  const [newdisable, setNewDisable] = useState(null);
  const [createdisable, setCreateDisable] = useState(true);
  const [showbuttonsave, setShowButtonSave] = useState(null);
  const [showbuttoncancel, setShowButtoncancel] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    prheads.map(item => {
      setEditDisable(false);
      setNewDisable(true);
      setPRNumber({ ...prnumber, vPRSelectNumber: item.HD_IBPLPN });
    });
    prheads.map(item =>
      setPRHead({
        ...prhead,
        vPRNumber: item.HD_IBPLPN,
        vDate: moment(item.HD_PURCDT).format("YYYY-MM-DD"),
        vWarehouse: item.HD_IBWHLO,
        vDepartment: item.HD_IBCOCE,
        vMount: item.HD_IBMTH,
        vPlanUnPlan: item.HD_IBPRIP,
        vBU: item.HD_BU,
        vBuyer: item.HD_IBBUYE,
        vGroup: item.HD_IBMODL,
        vCAPNo: item.CAPNO,
        vRequestor: item.HD_IBPURC,
        vRemark: item.HD_REM1,
        vApprove1: item.HD_APP1,
        vApprove2: item.HD_APP2,
        vApprove3: item.HD_APP3,
        vApprove4: item.HD_APP4,
        vStatus: item.HD_STATUS
      })
    );
  }, [prheadReducer]);

  useEffect(() => {
    const itemdetails = itemdetailReducer.result
      ? itemdetailReducer.result
      : [];
    // console.log(JSON.stringify("itemdetails: " + JSON.stringify(itemdetails)));
    itemdetails.map(item =>
      setItemDetail({
        ...itemdetail,
        vItemNo: item.MMITNO, //1805884
        vItemDesc1: item.MMITDS, //1805884
        vItemDesc2: item.MMFUDS, //1805884
        // vQty: item.MMUNMS, //1805884
        vUnit: item.MMUNMS, //1805884
        vDeliDate: moment(new Date()).format("YYYY-MM-DD"), //"2018-12-01"
        vSupplierNo: item.MMSUNO,
        vSupplierName: item.SASUNM,
        vPrice: item.MMPUPR, //1805884
        vCurrency: item.MMCUCD,
        vOrdertype: item.MBORTY
      })
    );
  }, [itemdetailReducer]);

  const logins = loginReducer.result ? loginReducer.result : [];

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

    if (prnumber.vPRSelectNumber == 0) {
      setEditDisable(true);
      setCreateDisable(true);
      setPRHead({
        ...initialStatePRHead
      });
    } else {
      setNewDisable(true);
      setEditDisable(false);
      setCreateDisable(false);
    }
    let status = "00";
    dispatch(prheadActions.getPRHeads(prnumber.vPRSelectNumber, status));
    dispatch(prdetailActions.getPRDetails(prnumber.vPRSelectNumber));
  };

  const handleNew = event => {
    // console.log(prnumber.vPRSelectNumber);
    setSearchDisable(true);
    setEditDisable(false);
    setCreateDisable(true);

    setPRHead({
      ...initialStatePRHead,
      vMount: prhead.vDate.substr(2, 2) + prhead.vDate.substr(5, 2),
      vPlanUnPlan: 5
    });

    // logins.map((item) => {
    //   setPRHead({ ...prhead, vRequestor: item.username });
    // });
  };

  const handleSave = event => {};

  const handleCancel = event => {
    setSearchDisable(false);
    setNewDisable(false);
    setEditDisable(true);
    setCreateDisable(true);
    setPRNumber({ ...prnumber, vPRSelectNumber: "" });
    setPRHead({ ...initialStatePRHead });
    dispatch(prdetailActions.getPRDetails(""));
  };

  const handleDeleteConfirm = () => {
    // dispatch(stockActions.deleteProduct(selectedProduct.product_id));
    // dispatch(stockActions.getProducts());
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleeditdisable = () => {
    // setEditDisable(false);
  };

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
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
                    onChange={event => {
                      console.log(event.target.value);

                      setPRNumber({
                        ...prnumber,
                        vPRSelectNumber: event.target.value
                      });
                    }}
                    SelectProps={{
                      native: true
                    }}
                  >
                    <option />
                    {prnumbers.map(option => (
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
                    id="vSearch"
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
                    id="vSearch"
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                    disabled={editdisable}
                    // onClick={handleSave}
                    onSubmit={event => {
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
                    id="vSearch"
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    disabled={editdisable}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
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
                  onChange={event => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vPRNumber: event.target.value
                    });
                  }}
                  value={prhead.vPRNumber}
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
                  onChange={event => {
                    // console.log("onChange: " + event.target.value.substr(2, 2) +
                    // event.target.value.substr(5, 2));
                    setPRHead({
                      ...prhead,
                      vDate: event.target.value,
                      vMount:
                        event.target.value.substr(2, 2) +
                        event.target.value.substr(5, 2)
                    });
                  }}
                  InputLabelProps={{ shrink: true, required: true }}
                />
                <TextField
                  className={classes.margin}
                  style={{ width: "150px" }}
                  disabled={editdisable}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vWarehouse"
                  label="Warehouse"
                  value={prhead.vWarehouse}
                  onChange={event => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vWarehouse: event.target.value
                    });
                  }}
                  SelectProps={{
                    native: true
                  }}
                >
                  <option />
                  {warehouses.map(option => (
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
                  onChange={event => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vDepartment: event.target.value
                    });
                  }}
                  SelectProps={{
                    native: true
                  }}
                >
                  <option />
                  {departments.map(option => (
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
                  onChange={event => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vMount: event.target.value
                    });
                  }}
                  value={prhead.vMount}
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
                  onChange={event => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vPlanUnPlan: event.target.value
                    });
                  }}
                  value={prhead.vPlanUnPlan}
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
                  onChange={event => {
                    // console.log(event.target.value);

                    setPRHead({
                      ...prhead,
                      vBU: event.target.value
                    });
                  }}
                  value={prhead.vBU}
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
                  onChange={event => {
                    // console.log(event.target.value);

                    setPRHead({
                      ...prhead,
                      vCAPNo: event.target.value
                    });
                  }}
                  value={prhead.vCAPNo}
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
                  // onChange={(event) => {
                  //   // console.log(event.target.value);
                  //
                  //   setPRHead({
                  //     ...prhead,
                  //     vRequestor: event.target.value,
                  //   });
                  // }}
                  value={prhead.vRequestor}
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
                  onChange={event => {
                    // console.log(event.target.value);

                    setPRHead({
                      ...prhead,
                      vRemark: event.target.value
                    });
                  }}
                  value={prhead.vRemark}
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
                  onChange={event => {
                    // console.log(event.target.value);

                    setPRHead({
                      ...prhead,
                      vApprove1: event.target.value
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
                  id="vApprove1"
                  label="Approve1"
                  value={prhead.vApprove2}
                  onChange={event => {
                    // console.log(event.target.value);

                    setPRHead({
                      ...prhead,
                      vApprove2: event.target.value
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
                </TextField>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    );
  };

  const showDialog = () => {
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
        <DialogTitle id="alert-dialog-slide-title">
          PR Number : {prhead.vPRNumber}
          {prhead.vPRNumber && " Line: "}
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
                getOptionLabel={option => option.MMITNO}
                onChange={(event, values) => {
                  // console.log(values);
                  if (values) {
                    setItemDetail({
                      ...itemdetail,
                      vItemNo: values.MMITNO
                    });
                    dispatch(itemunitActions.getItemUnits(values.MMITNO));
                    dispatch(
                      itemdetailActions.getItems(
                        prhead.vWarehouse,
                        values.MMITNO
                      )
                    );
                  }
                }}
                renderInput={params => (
                  <TextField {...params} id="vItemNo" label="Item No" />
                )}
              />
            </Grid>
            <Grid item xs>
              <TextField
                className={classes.margin}
                fullWidth
                disabled="true"
                margin="dense"
                id="vItemName"
                label="Item Name"
                type="text"
                value={itemdetail.vItemDesc1}
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
                value={itemdetail.vQty}
                onChange={event => {
                  // console.log(event.target.value);

                  setItemDetail({
                    ...itemdetail,
                    vQty: event.target.value
                  });
                }}
              />
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
                id="vUnit"
                label="Unit"
                value={itemdetail.vUnit}
                onChange={event => {
                  // console.log(event.target.value);
                  // setPRHead({
                  //   ...prhead,
                  //   vApprove4: event.target.value
                  // });
                }}
                SelectProps={{
                  native: true
                }}
              >
                <option />
                {itemunits.map(option => (
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
            value={itemdetail.vDeliDate}
            onChange={event => {
              // console.log(event.target.value);

              setItemDetail({
                ...itemdetail,
                vDeliDate: event.target.value
              });
            }}
            InputLabelProps={{ shrink: true, required: true }}
          />
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={5}>
              <TextField
                required
                fullWidth
                // disabled="true"
                margin="dense"
                id="vSupplierNo"
                label="Supplier No"
                type="text"
                value={itemdetail.vSupplierNo}
              />
            </Grid>
            <Grid item xs>
              <TextField
                required
                fullWidth
                disabled="true"
                margin="dense"
                id="vSupplierName"
                label="Supplier Name"
                type="text"
                value={itemdetail.vSupplierName}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                // disabled="true"
                margin="dense"
                id="vPrice"
                label="Price"
                type="number"
                value={itemdetail.vPrice}
              />
            </Grid>
            <Grid item xs>
              <TextField
                required
                fullWidth
                // disabled="true"
                margin="dense"
                id="vCurrency"
                label="Currency"
                type="text"
                value={itemdetail.vCurrency}
              />
            </Grid>
            <Grid item xs>
              <TextField
                required
                fullWidth
                // disabled="true"
                margin="dense"
                id="vOrderType"
                label="Order Type"
                type="text"
                value={itemdetail.vOrdertype}
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
                value={itemdetail.vPHGroup}
                onChange={event => {
                  // console.log(event.target.value);
                  let phgroup = "PH";
                  setPRHead({
                    ...prhead,
                    vBuyer: event.target.value
                  });
                  dispatch(
                    phbuyerActions.getPHBuyers(phgroup, event.target.value)
                  );
                }}
                SelectProps={{
                  native: true
                }}
              >
                <option />
                {phgroups.map(option => (
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
                // value={prhead.vBuyer}
                onChange={event => {
                  // console.log(event.target.value);
                  setPRHead({
                    ...prhead,
                    vBuyer: event.target.value
                  });
                }}
                SelectProps={{
                  native: true
                }}
              >
                <option />
                {phbuyers.map(option => (
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
            // value={prhead.vBuyer}
            onChange={event => {
              // console.log(event.target.value);
              // setPRHead({
              //   ...prhead,
              //   vBuyer: event.target.value
              // });
            }}
            SelectProps={{
              native: true
            }}
          >
            <option />
            {departments.map(option => (
              <option key={option.ID} value={option.EAAITM}>
                {option.DEPARTMENT}
              </option>
            ))}
          </TextField>

          <TextField
            required
            fullWidth
            // disabled="true"
            margin="dense"
            id="vDetailRemark"
            label="Remark"
            type="text"
            value={itemdetail.vDetailRemark}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const columns = [
    {
      title: "Line",
      field: "PR_IBPLPS",
      headerStyle: { maxWidth: 50, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 50, textAlign: "center" },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_IBPLPS}
        </Typography>
      )
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
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_IBITNO}
        </Typography>
      )
    },
    {
      title: "Item Name",
      field: "PR_IBPITT",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 150 },
      render: item => (
        <Typography variant="body1" display="block" noWrap>
          {item.PR_IBPITT}
        </Typography>
      )
    },
    {
      title: "Unit",
      field: "PR_IBPUUN",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 100, textAlign: "center" },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_IBPUUN}
        </Typography>
      )
    },
    {
      title: "Stk Rem.",
      field: "MBSTQT",
      type: "numeric",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 100, textAlign: "right" },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.MBSTQT}
        </Typography>
      )
    },
    {
      title: "Qty",
      field: "PR_IBORQA",
      type: "numeric",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 100, textAlign: "right" },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_IBORQA}
        </Typography>
      )
    },
    {
      title: "U/P",
      field: "PR_IBPUPR",
      type: "numeric",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: { maxWidth: 100, textAlign: "right" },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_IBPUPR}
        </Typography>
      )
    },
    {
      title: "Deli. Date",
      field: "PR_IBDWDT",
      type: "date",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 150 },
      render: item => (
        <Typography variant="body1" noWrap>
          {moment(item.PR_IBDWDT).format("DD/MM/YYYY")}
        </Typography>
      )
    },
    {
      title: "Supp No",
      field: "PR_IBSUNO",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 150 },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_IBSUNO}
        </Typography>
      )
    },
    {
      title: "Supp Name",
      field: "SASUNM",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 150 },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.SASUNM}
        </Typography>
      )
    },
    {
      title: "Ord. Type",
      field: "PR_IBORTY",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_IBORTY}
        </Typography>
      )
    },
    {
      title: "Vat.",
      field: "PR_IBVTCD",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_IBPLPN}
        </Typography>
      )
    },
    {
      title: "Total",
      field: "",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 }
      // render: item => <Typography variant="body1" noWrap>{item.PR_IBPLPN}</Typography>
    },
    {
      title: "Curr.",
      field: "PR_IBCUCD",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_IBCUCD}
        </Typography>
      )
    },
    {
      title: "Cost Center",
      field: "PR_REM5",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_REM5}
        </Typography>
      )
    },
    {
      title: "Buyer",
      field: "PR_REM5",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_REM5}
        </Typography>
      )
    },
    {
      title: "PR Rem3",
      field: "PR_REM3",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_REM3}
        </Typography>
      )
    },
    {
      title: "PR Rem5",
      field: "PR_REM5",
      headerStyle: { maxWidth: 0, whiteSpace: "nowrap" },
      cellStyle: { maxWidth: 100 },
      render: item => (
        <Typography variant="body1" noWrap>
          {item.PR_REM5}
        </Typography>
      )
    }
  ];

  const actions = [
    {
      icon: "edit",
      iconProps: { color: "primary" },
      tooltip: "Edit",
      onClick: (event, rowData) => {
        console.log(JSON.stringify(rowData));
      }
      // props.history.push("/stock/edit/" + rowData.product_id),
    },
    {
      icon: "delete",
      iconProps: { color: "action" },
      tooltip: "Delete",
      onClick: (event, rowData) => {
        setSelectedProduct(rowData);
        setOpenDialog(true);
      }
    }
  ];

  return (
    <div className={classes.root}>
      {/* Grid */}
      {/* <p>#Debug prnumber {JSON.stringify(prnumber)}</p> */}
      {/* <p>#Debug prhead {JSON.stringify(prhead)}</p> */}
      {/* <p>#Debug itemdetail {JSON.stringify(itemdetail)}</p> */}
      {/* <p>#Debug editdisable {JSON.stringify(editdisable)}</p> */}
      {/* <p>#Debug warehouse {JSON.stringify(warehouse)}</p> */}
      {/* <p>#Debug approves {JSON.stringify(approve)}</p> */}
      <Formik
        // initialValues={{ username: "", password: "", company: "" }}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(values));
          // dispatch(loginActions.login(values, props.history));
          // dispatch(companyActions.getCompanys());
        }}
      >
        {props => showForm(props)}
      </Formik>

      {/* Plan PR Table */}
      {/* <p>#Debug {JSON.stringify(selectedProduct)}</p> */}
      <MaterialTable
        id="root_prstock"
        title={`Plan PR : ${prhead.vStatus}`}
        columns={columns}
        actions={actions}
        data={prdetailReducer.result ? prdetailReducer.result : []}
        components={{
          Toolbar: props => (
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
                    let phgroup = "PH";
                    setSelectedProduct("rowData");
                    setOpenDialog(true);
                    dispatch(itemActions.getItems(prhead.vWarehouse));
                    dispatch(phgroupActions.getPHGroups(phgroup));
                  }}
                >
                  Create
                </Button>
              </div>
            </div>
          )
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
          }
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
        editable={
          {
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
            //     // console.log("onRowUpdate: " + JSON.stringify(newData));
            //     props.history.push("/stock/edit/" + newData.product_id);
            //     // setTimeout(() => {
            //     //   const data = [newData];
            //     //   data.map(item => {
            //     //     // dispatch(prdetailActions.getPRDetails(item.PR_IBPLPN, "00"));
            //     //   });
            //     //   resolve();
            //     // }, 1000);
            //   }),
            // onRowDelete: oldData =>
            //   new Promise((resolve, reject) => {
            //     // console.log("onRowDelete: " + JSON.stringify(oldData));
            //     setTimeout(() => {
            //       {
            //         let data = prdetailReducer.result;
            //         console.log(data);
            //         const index = data.indexOf(oldData);
            //         data.splice(index, 1);
            //         this.setState({ data }, () => resolve());
            //       }
            //       resolve();
            //     }, 1000);
            //   })
          }
        }
        // onRowClick={(evt, selectedRow) => setSelectedRow({ selectedRow })}
      />

      {/* Dialog */}
      {showDialog()}
    </div>
  );
};
