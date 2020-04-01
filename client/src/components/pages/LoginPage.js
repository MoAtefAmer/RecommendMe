import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Tooltip from "react-bootstrap/Tooltip";
// core components
import Avatar from "@material-ui/core/Avatar";
import StudentIcon from "@material-ui/icons/School";
import DoctorIcon from "@material-ui/icons/Group";
import UniversityIcon from "@material-ui/icons/LocationCity";
import Footer from "../Footer/Footer";
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import Button from "../CustomButtons/Button.js";
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import CardFooter from "../Card/CardFooter.js";
import CustomInput from "../CustomInput/CustomInput.js";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import clsx from "clsx";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import MuiAlert from "@material-ui/lab/Alert";
import { Spring } from "react-spring/renderprops";

import styles from "../../assets/jss/material-kit-react/views/loginPage.js";

import image from "../Images/studentSignup.jpg";

export var LoginContext = React.createContext();

export default function LoginPage(props) {
  //The State
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorToggle, setEmailErrorToggle] = useState(false);
  const [passwordErrorToggle, setPasswordErrorToggle] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");
  const [severity, setSeverity] = useState("");
  //Test Context

  const useStyles = makeStyles(styles);
  var useStyles2 = makeStyles(theme => ({
    avatarUnselected: {
      backgroundColor: "rgba(0,0,0,0.87)"
    },
    avatarSelected: {
      backgroundColor: "rgb(34,139,34)"
    },
    avatar: {
      backgroundColor: "rgba(0,0,0,0.87)"
    },
    avatarError: {
      backgroundColor: "rgb(220,20,60)"
    }
  }));
  const classes = useStyles();

  const classes2 = useStyles2();

  const studentAvatar = clsx({
    [classes2.avatarSelected]: accountType === "Student",
    [classes2.avatarUnselected]: accountType !== "Student",
    [classes2.avatarError]: accountType === "error"
  });

  const universityAvatar = clsx({
    [classes2.avatarSelected]: accountType === "University",
    [classes2.avatarUnselected]: accountType !== "University",
    [classes2.avatarError]: accountType === "error"
  });

  const professorAvatar = clsx({
    [classes2.avatarSelected]: accountType === "Professor",
    [classes2.avatarUnselected]: accountType !== "Professor",
    [classes2.avatarError]: accountType === "error"
  });

  //Login Validations
  const validate = () => {
    let isError = false;
    const errors = {};
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      isError = true;
      errors.emailErrorToggle = true;
    } else {
      setEmailErrorToggle(false);
    }

    if (password.length < 8) {
      isError = true;
      errors.passwordErrorToggle = true;
    } else {
      setPasswordErrorToggle(false);
    }
    if (accountType === "") {
      isError = true;
    }

    if (isError) {
      setEmailErrorToggle(errors.emailErrorToggle);
      setPasswordErrorToggle(errors.passwordErrorToggle);
      if (errors.emailErrorToggle || errors.passwordErrorToggle) {
        setSeverity("error");
        setSnackbarErrorMessage("Please enter your username and password");
        setOpen(true);
      }
    }

    return isError;
  };

  //Snackbar Alert
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  //Closing snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Login Button
  const handleLogin = e => {
    e.preventDefault();

    const err = validate();
    if (!err) {
      if (accountType) {
        switch (accountType) {
          case "Student":
            fetch(`https://recommendationsystematef.herokuapp.com/api/student/studentLogin`, {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(res => {
              res.json().then(data => {
                if (res.status === 400) {
                  setSeverity("warning");
                  setSnackbarErrorMessage("Please activate your account");
                  setOpen(true);
                }
                if (res.status === 200) {
                  if (data.auth === accountType) {
                    sessionStorage.setItem("email", email);
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("auth", data.auth);

                    setEmail("");
                    setPassword("");
                    setSeverity("success");
                    setSnackbarErrorMessage("Login Successful");
                    setOpen(true);

                    document.location.href = "/viewRecommendations";
                  }
                }

                if (res.status === 401) {
                  setSeverity("error");
                  setSnackbarErrorMessage("Invalid Credentials");
                  setOpen(true);
                }
              });
            });
            break;

          case "Professor":
            fetch(`https://recommendationsystematef.herokuapp.com/api/doctor/docLogin`, {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(res => {
              res.json().then(data => {
                if (res.status === 400) {
                  setSeverity("warning");
                  setSnackbarErrorMessage("Please activate your account");
                  setOpen(true);
                }

                if (res.status === 200) {
                  if (data.auth === accountType) {
                    sessionStorage.setItem("email", email);
                    setEmail("");
                    setPassword("");
                    sessionStorage.setItem("firstName", data.data.firstName);
                    sessionStorage.setItem("lastName", data.data.lastName);
                    sessionStorage.setItem("currentJob", data.data.currentJob);
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("auth", data.auth);
                    sessionStorage.setItem("notificationId", "");
                    sessionStorage.setItem("notificationStudentEmail", "");
                    sessionStorage.setItem("notificationUniversityEmail", "");
                    setSeverity("success");
                    setSnackbarErrorMessage("Login Successful");
                    setOpen(true);

                    document.location.href = "/createRecommendation";
                  }
                }
                if (res.status === 401) {
                  setSeverity("error");
                  setSnackbarErrorMessage("Invalid Credentials");
                  setOpen(true);
                }
              });
            });

            break;

          case "University":
            fetch(`https://recommendationsystematef.herokuapp.com/api/university/uniLogin`, {
              method: "POST",
              body: JSON.stringify({
                uemail: email,
                password: password
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(res => {
              res.json().then(data => {
                if (res.status === 400) {
                  setSeverity("warning");
                  setSnackbarErrorMessage("Please activate your account");
                  setOpen(true);
                }
                if (res.status === 200) {
                  if (data.auth === accountType) {
                    sessionStorage.setItem("email", email);
                    setEmail("");
                    setPassword("");
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("auth", data.auth);
                    setSeverity("success");
                    setSnackbarErrorMessage("Login Successful");
                    setOpen(true);
                    document.location.href = "/viewRecommendations";
                  }
                }
                if (res.status === 401) {
                  setSeverity("error");
                  setSnackbarErrorMessage("Invalid Credentials");
                  setOpen(true);
                }
              });
            });

            break;
          default:
            console.log("default");
        }
      }
    } else {
      if (accountType === "") {
        setSeverity("error");
        setAccountType("error");
        setSnackbarErrorMessage("Please select an account type");
        setOpen(true);
      }
    }
  };

  return (
    <div>
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 600 }}>
        {props => (
          <div style={props}>
            <div
              className={classes.pageHeader}
              style={{
                backgroundImage: "url(" + image + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center"
              }}
            >
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={4}>
                    <Card className={classes[cardAnimaton]}>
                      <form className={classes.form}>
                        <CardHeader
                          color="primary"
                          className={classes.cardHeader}
                        >
                          <h4>Login</h4>
                          <div className={classes.socialLine}>
                            <OverlayTrigger
                              key={"left"}
                              placement={"left"}
                              overlay={
                                <Tooltip id={`tooltip-left`}>
                                  Log in as a <strong>Student</strong>.
                                </Tooltip>
                              }
                            >
                              <Button
                                justIcon
                                color="transparent"
                                onClick={e => {
                                  e.preventDefault();
                                  setAccountType("Student");
                                }}
                              >
                                <Avatar className={studentAvatar}>
                                  <StudentIcon />
                                </Avatar>
                              </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                              key={"bottom"}
                              placement={"bottom"}
                              overlay={
                                <Tooltip id={`tooltip-bottom`}>
                                  Log in as a <strong>University</strong>
                                </Tooltip>
                              }
                            >
                              <Button
                                justIcon
                                color="transparent"
                                onClick={e => {
                                  e.preventDefault();
                                  setAccountType("University");
                                }}
                              >
                                <Avatar className={universityAvatar}>
                                  <UniversityIcon />
                                </Avatar>
                              </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                              key={"right"}
                              placement={"right"}
                              overlay={
                                <Tooltip id={`tooltip-right`}>
                                  Log in as a <strong>Professor</strong>
                                </Tooltip>
                              }
                            >
                              <Button
                                justIcon
                                color="transparent"
                                onClick={e => {
                                  e.preventDefault();
                                  setAccountType("Professor");
                                }}
                              >
                                <Avatar className={professorAvatar}>
                                  <DoctorIcon />
                                </Avatar>
                              </Button>
                            </OverlayTrigger>
                          </div>
                        </CardHeader>

                        <CardBody>
                          <CustomInput
                            labelText="Email..."
                            id="email"
                            value={email}
                            error={emailErrorToggle}
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "email",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Email className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                              onChange: event => setEmail(event.target.value),
                              autoComplete: "off"
                            }}
                          />

                          <CustomInput
                            labelText="Password"
                            id="pass"
                            error={passwordErrorToggle}
                            value={password}
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "password",

                              endAdornment: (
                                <InputAdornment position="end">
                                  <Icon className={classes.inputIconsColor}>
                                    lock_outline
                                  </Icon>
                                </InputAdornment>
                              ),
                              onChange: event =>
                                setPassword(event.target.value),
                              autoComplete: "off"
                            }}
                          />
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                          <Button
                            simple
                            color="primary"
                            size="lg"
                            onClick={handleLogin}
                          >
                            Login
                          </Button>
                        </CardFooter>
                      </form>
                    </Card>
                  </GridItem>

                  <Grid item>
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <Alert onClose={handleClose} severity={severity}>
                        {snackbarErrorMessage}
                      </Alert>
                    </Snackbar>
                  </Grid>
                </GridContainer>
              </div>

              <Footer whiteFont />
            </div>
          </div>
        )}
      </Spring>
    </div>
  );
}
