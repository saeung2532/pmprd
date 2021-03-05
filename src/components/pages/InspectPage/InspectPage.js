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
import { Link, NavLink } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import moment from "moment";
import NumberFormat from "react-number-format";
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
    console.log(params);
    dispatch(wodetailActions.getWODetails(params.wonumber));
    // setWoDetail(data);
  }, []);

  useEffect(() => {
    // if (wodetailReducer.length > 0) {
    if (wodetailReducer.result) {
      dispatch(companyActions.setCompanys(wodetailReducer.result[0].CCCONM));
      dispatch(wonumberActions.setWoNumbers(wodetailReducer.result[0].M7MWNO));
      setWoDetail(wodetailReducer.result);
      setLoading(false);
    }
  }, [wodetailReducer]);

  useEffect(() => {
    if (rowdata.length === 0) {
      wodetail.map((item, index) => {
        setRowData(
          ...rowdata,
          rowdata.push({ value: item.M7RVAL, remark: "" })
        );
      });
    }
    console.log(wodetail);
  }, [wodetail]);

  const handleGoBack = () => {
    props.history.goBack();
  };

  const handlePMRadioChange = (index, values) => {
    // console.log("index: " + index + " values: " + values);
    // const updatepm = update(wodetail[index], {
    //   $merge: { M7RVAL: values },
    // });
    const updatevalue = update(wodetail[index], {
      // Update field M7RVAL refer index
      M7RVAL: { $set: values },
    });
    // Replace new value to wostate refer index
    setWoDetail(update(wodetail, { [index]: { $set: updatevalue } }));
    console.log(updatevalue);
  };

  const handlePMTextChange = (type, index, values) => {
    console.log("type: " + type + " index: " + index + " values: " + values);
    // const updatepm = update(wodetail[index], {
    //   $merge: { M7RVAL: values },
    // });

    if (type === "input") {
      const updatevalue = update(wodetail[index], {
        M7RVAL: { $set: values },
      });

      setWoDetail(update(wodetail, { [index]: { $set: updatevalue } }));
      console.log(updatevalue);
    } else {
      const updatevalue = update(wodetail[index], {
        REM: { $set: values },
      });

      setWoDetail(update(wodetail, { [index]: { $set: updatevalue } }));
      console.log(updatevalue);
    }
  };

  const radioForm = ({ index, values }) => {
    return (
      <div>
        {console.log("radio index: " + index + " values: " + values)}
        <Radio
          // checked={selectedValue === "a"}
          id={`vRadioYes${index}`}
          color="primary"
          value={values}
          inputProps={{ "aria-label": "A" }}
          label="Yes"
          onChange={(event) => {
            // console.log(event.target.value);
            values.rowdata[index].value = "YES";
            handlePMRadioChange(index, "YES");
          }}
        />
        <Radio
          // checked={selectedValue === "a"}
          id={`vRadioNo${index}`}
          color="secondary"
          value={values}
          inputProps={{ "aria-label": "A" }}
          label="No"
          onChange={(event) => {
            // console.log(event.target.value);
            values.rowdata[index].value = "NO";
            handlePMRadioChange(index, "NO");
          }}
        />
      </div>
    );
  };

  const textForm = ({ index, values }) => {
    return (
      <div>
        {console.log("text index: " + index + " values: " + values)}
        <TextField
          className={classes.margin}
          size="small"
          id={`vText${index}`}
          required
          // label="CAP No"
          placeholder="Input Value."
          variant="outlined"
          value={values}
          values={`values.vText${index}`}
          onChange={(event) => {
            // console.log(event.target.value);
            handlePMTextChange(index, event.target.value);
          }}
          InputLabelProps={{ shrink: true }}
        ></TextField>
      </div>
    );
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
        {wodetail.map((item, index) => (
          <Grid key={index} container spacing={3}>
            {/* {console.log(rowdata)} */}
            <Grid item xs={12}>
              <Card>
                <h3>
                  {item.ID} {".) "} {item.PJTX40}
                </h3>
                <h4>{"Std. " + item.STD}</h4>
                {/* <h6>{item.M7RVAL}</h6> */}
                {/* <h6> {item.M7RVAL ? "true" : "false"}</h6> */}
                {item.PJRSIY === "VISUAL" ? (
                  <div key={index}>
                    <FormControl
                      name={`formcontrol${index}`}
                      required
                      error
                      component="fieldset"
                    >
                      <FormLabel component="legend">Check Value</FormLabel>
                      <RadioGroup
                        row
                        name={`radio${index}`}
                        aria-label="position"
                        name="position"
                        value={item.M7RVAL}
                        defaultValue="top"
                        onChange={(event) => {
                          // console.log(event.target.value);
                          values.rowdata[index].value = event.target.value;
                          handlePMRadioChange(index, event.target.value);
                        }}
                      >
                        <FormControlLabel
                          value="YES"
                          control={
                            <Radio
                              name={`radioyes${index}`}
                              required={item.M7RVAL ? false : true}
                              color="primary"
                            />
                          }
                          label="YES"
                        />
                        <FormControlLabel
                          value="NO"
                          control={
                            <Radio
                              name={`radiono${index}`}
                              required={item.M7RVAL ? false : true}
                              color="secondary"
                            />
                          }
                          label="NO"
                        />
                      </RadioGroup>
                      <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                    <Grid item xs={12} className={classes.margin}>
                      <TextField
                        className={classes.margin}
                        name={`radioRemark${index}`}
                        size="small"
                        // required
                        label="Remark."
                        placeholder="Input Remark."
                        variant="outlined"
                        // value={item.M7RVAL}
                        onChange={(event) => {
                          // console.log(event.target.value);
                          values.rowdata[index].remark = event.target.value;
                          handlePMTextChange(
                            "remark",
                            index,
                            event.target.value
                          );
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </div>
                ) : (
                  <div key={index}>
                    <Grid item xs={12}>
                      <TextField
                        className={classes.margin}
                        name={`text${index}`}
                        size="small"
                        required
                        error
                        label="Value."
                        placeholder="Input Value."
                        variant="outlined"
                        type="number"
                        value={item.M7RVAL}
                        onChange={(event) => {
                          // console.log(event.target.value);
                          values.rowdata[index].value = event.target.value;
                          handlePMTextChange(
                            "input",
                            index,
                            event.target.value
                          );
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={classes.margin}
                        name={`textRemark${index}`}
                        size="small"
                        // required
                        placeholder="Remark."
                        variant="outlined"
                        // value={item.M7RVAL}
                        onChange={(event) => {
                          // console.log(event.target.value);
                          values.rowdata[index].remark = event.target.value;
                          handlePMTextChange(
                            "remark",
                            index,
                            event.target.value
                          );
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </div>
                )}
              </Card>
            </Grid>
          </Grid>
        ))}
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        <Grid container spacing={3}>
          <Grid className={classes.buttonSave} item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="small"
              color="primary"
              disabled={wodetailReducer.result ? isSubmitting : true}
            >
              Save
            </Button>
            {loadingsave && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              color="secondary"
              startIcon={<ArrowBackIosIcon />}
              onClick={handleGoBack}
              // component={Link}
              // to={props.history.goBack()}
              raised
            >
              Back
            </Button>
            {/* <Button
              fullWidth
              variant="contained"
              size="small"
              color="secondary"
              startIcon={<ArrowBackIosIcon />}
              component={Link}
              to={"/wolist"}
              raised
            >
              Back
            </Button> */}
          </Grid>
        </Grid>
      </form>
    );
  };

  const data = [
    {
      M7SPOS: "1",
      M7PRNO: "RF04M0010010   ",
      M7MWNO: "0001100780",
      M7INSI: "RF-00M03001    ",
      LIINSN: "CR-RF-01            ",
      M7RVAL: "YES",
      M7RPDT: "20210118",
      PJSPOS: "1",
      PJTX15: "ตรวจเช็คการทำงา",
      PJTX40: "ตรวจเช็คการทำงาน/PROGRAME",
      STD: "ทำงานปกติ",
      PJRSIY: "VISUAL",
      PJRUOM: "UNT",
      QHWHST: "90",
      QHWHHS: "90",
    },
    {
      M7SPOS: "2",
      M7PRNO: "RF04M0010010   ",
      M7MWNO: "0001100780",
      M7INSI: "RF-00M03001    ",
      LIINSN: "CR-RF-01            ",
      M7RVAL: "5.000",
      M7RPDT: "20210118",
      PJSPOS: "2",
      PJTX15: "ตรวจเช็ค SUCTIO",
      PJTX40: "ตรวจเช็ค SUCTION PRESSURE",
      STD: "5 psi +-7 >= 2.000- <= 12.000",
      PJRSIY: "PRESSURE",
      PJRUOM: "PSI",
      QHWHST: "90",
      QHWHHS: "90",
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

      <Formik
        initialValues={{ rowdata }}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(wodetail));
          setLoadingSave(true);
          let formData = new FormData();
          formData.append("values", JSON.stringify(wodetail));
          formData.append("device", deviceType + browserName);
          dispatch(wodetailActions.addWODetails(formData, props.history));
        }}
      >
        {wodetailReducer.result ? (props) => showForm(props) : ""}
      </Formik>
      {/* {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )} */}
    </div>
  );
};
