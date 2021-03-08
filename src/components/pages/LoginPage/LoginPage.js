import React, { useEffect, useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as loginActions from "./../../../actions/login.action";
import * as companyActions from "./../../../actions/company.action";
import * as facilityActions from "./../../../actions/facility.action";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 440,
  },
  media: {
    height: 290,
    backgroundSize: "auto",
    display: "block",
  },
  textField: {
    width: 200,
  },
  menu: {
    width: 200,
  },
}));

const LoginPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  const companyReducer = useSelector(({ companyReducer }) => companyReducer);
  const facilityReducer = useSelector(({ facilityReducer }) => facilityReducer);
  const historyReducer = useSelector(({ historyReducer }) => historyReducer);
  const [company, setCompany] = useState("");
  const [facility, setFacility] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDisable, setAlertDisable] = useState(false);

  useEffect(() => {
    dispatch(companyActions.getCompanys());
  }, []);

  const companys = useMemo(() =>
    companyReducer.result ? companyReducer.result : []
  );

  const facilitys = useMemo(() =>
    facilityReducer.result ? facilityReducer.result : []
  );

  const historys = useMemo(() =>
    historyReducer.result ? historyReducer.result : null
  );

  const handleCompanyChange = (cono, divi) => {
    dispatch(facilityActions.getFacilitys(cono, divi));
  };

  // const companys = [
  //   {
  //     ID: 1,
  //     CCCONO: 10,
  //     CCDIVI: "101",
  //     CCCONM: "บริษัท บางกอกแร้นช์ จำกัด (มหาชน) ",
  //     COMPANY: '"10 : 101 : บริษัท บางกอกแร้นช์ จำกัด (มหาชน)"',
  //   },
  //   {
  //     ID: 2,
  //     CCCONO: 100,
  //     CCDIVI: "110",
  //     CCCONM: "บริษัท อนาทิส ฟู๊ดส์ จำกัด ",
  //     COMPANY: '"100 : 110 : บริษัท อนาทิส ฟู๊ดส์ จำกัด"',
  //   },
  //   {
  //     ID: 3,
  //     CCCONO: 100,
  //     CCDIVI: "120",
  //     CCCONM: "ANATIS FOODS LIMITED (HK) ",
  //     COMPANY: '"100 : 120 : ANATIS FOODS LIMITED (HK)"',
  //   },
  //   {
  //     ID: 4,
  //     CCCONO: 100,
  //     CCDIVI: "130",
  //     CCCONM: "ANATIS FOODS LIMITED (SG) ",
  //     COMPANY: '"100 : 130 : ANATIS FOODS LIMITED (SG)"',
  //   },
  //   {
  //     ID: 5,
  //     CCCONO: 200,
  //     CCDIVI: "200",
  //     CCCONM: "บริษัท บีอาร์ การเกษตร จำกัด ",
  //     COMPANY: '"200 : 200 : บริษัท บีอาร์ การเกษตร จำกัด"',
  //   },
  //   {
  //     ID: 6,
  //     CCCONO: 300,
  //     CCDIVI: "300",
  //     CCCONM: "บริษัท บีเอ็ม การเกษตร จำกัด ",
  //     COMPANY: '"300 : 300 : บริษัท บีเอ็ม การเกษตร จำกัด"',
  //   },
  //   {
  //     ID: 7,
  //     CCCONO: 400,
  //     CCDIVI: "400",
  //     CCCONM: "บริษัท ฟู้ด ซิตี้ จำกัด ",
  //     COMPANY: '"400 : 400 : บริษัท ฟู้ด ซิตี้ จำกัด"',
  //   },
  //   {
  //     ID: 8,
  //     CCCONO: 500,
  //     CCDIVI: "500",
  //     CCCONM: "บริษัท เอ็นเอส เดลิคาเทสเซน จำกัด ",
  //     COMPANY: '"500 : 500 : บริษัท เอ็นเอส เดลิคาเทสเซน จำกัด"',
  //   },
  //   {
  //     ID: 9,
  //     CCCONO: 600,
  //     CCDIVI: "600",
  //     CCCONM: "บริษัท วินไทย ฟู้ด จำกัด ",
  //     COMPANY: '"600 : 600 : บริษัท วินไทย ฟู้ด จำกัด"',
  //   },
  // ];

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          size="small"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          size="small"
          required
          fullWidth
          id="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          type="password"
        />

        <TextField
          select
          variant="outlined"
          margin="normal"
          size="small"
          required
          fullWidth
          id="company"
          label="Company"
          value={company}
          onChange={(event) => {
            // console.log(event.target.value);
            values.company = event.target.value;
            setCompany(event.target.value);

            let getCompany = event.target.value.split(" : ");
            let getCono = getCompany[0];
            let getDivi = getCompany[1];
            handleCompanyChange(getCono, getDivi);
          }}
          SelectProps={{
            native: true,
          }}
        >
          <option />
          {companys.map((option) => (
            <option key={option.ID} value={option.COMPANY}>
              {option.COMPANY}
            </option>
          ))}
        </TextField>

        <TextField
          select
          variant="outlined"
          margin="normal"
          size="small"
          required
          fullWidth
          id="facility"
          label="Facility"
          value={facility}
          onChange={(event) => {
            // console.log(event.target.value);
            values.facility = event.target.value;
            setFacility(event.target.value);
          }}
          SelectProps={{
            native: true,
          }}
        >
          <option />
          {facilitys.map((option) => (
            <option key={option.ID} value={option.FACILITY}>
              {option.FACILITY}
            </option>
          ))}
        </TextField>

        {loginReducer.isError && (
          <Alert severity="error" style={{ marginBottom: 8 }}>
            {loginReducer.result}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          className={classes.submit}
        >
          Sign In
        </Button>
        {/* {isSubmitting && <CircularProgress style={{ marginTop: 10 }} />} */}
        <Grid container justify="flex-end">
          {/* <Link component={RouterLink} to="/register" variant="body2">
            Register
          </Link> */}
        </Grid>
      </form>
    );
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/images/duck.png`}
        title="Smart Purchase"
      />
      {/* {"historyReducer: " + historys} */}
      <CardContent>
        {/* <p>#Debug prhead {JSON.stringify(company)}</p> */}
        <Typography variant="h5">Login PM PRD</Typography>
        {/* HOC */}
        <Formik
          initialValues={{
            username: "",
            password: "",
            company: "",
            facility: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            // alert(JSON.stringify(values));
            dispatch(loginActions.login(values, props.history, historys));
            // setInterval(() => {
            setSubmitting(false);
            // }, 1000);
          }}
        >
          {(props) => showForm(props)}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
