import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Container from "@material-ui/core/Container";
import { grey, lightBlue, green } from "@material-ui/core/colors";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Spring } from "react-spring/renderprops";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
    Mohamed Atef {" © "} {new Date().getFullYear()}
  </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.text.primary
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  paperContainer: {
    backgroundImage: `url(${Image})`
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
    width: "100%"
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  normalForm: {
    backgroundColor: lightBlue[900],
    "&:hover": {
      backgroundColor: grey[900]
    }
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  }
}));

export default function DocSignUp() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentJob, setCurrentJob] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [researchPaperslink, setResearchPaperslink] = useState("");
  const [mastersTitle, setMastersTitle] = useState("");
  const [phdTitle, setPhdTitle] = useState("");
  const [open, setOpen] = React.useState(false);

  //Validations
  const [firstNameError, setFirstNameError] = useState("");
  const [firstNameErrorToggle, setFirstNameErrorToggle] = useState(false);
  const [lastNameError, setLastNameError] = useState("");
  const [lastNameErrorToggle, setLastNameErrorToggle] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailErrorToggle, setEmailErrorToggle] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorToggle, setPasswordErrorToggle] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPasswordErrorToggle, setConfirmPasswordErrorToggle] = useState(
    false
  );
  const [currentJobError, setCurrentJobError] = useState("");
  const [currentJobErrorToggle, setCurrentJobErrorToggle] = useState(false);

  

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.normalForm]: !success
  });

  const validate = () => {
    let isError = false;
    const errors = {};
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (firstName.length <= 0) {
      isError = true;
      errors.firstNameError = "Please fill in the field";
      errors.firstNameErrorToggle = true;
    } else {
      setFirstNameErrorToggle(false);
      setFirstNameError("");
    }

    if (lastName.length <= 0) {
      isError = true;
      errors.lastNameError = "Please fill in the field";
      errors.lastNameErrorToggle = true;
    } else {
      setLastNameErrorToggle(false);
      setLastNameError("");
    }

    if (!re.test(email)) {
      isError = true;
      errors.emailError = "Please enter a valid email";
      errors.emailErrorToggle = true;
    } else {
      setEmailErrorToggle(false);
      setEmailError("");
    }

    if (password.length < 8) {
      isError = true;
      errors.passwordError = "Password must be 8 characters or more";
      errors.passwordErrorToggle = true;
    } else {
      setPasswordErrorToggle(false);
      setPasswordError("");
    }

    if (confirmPassword.length < 8) {
      isError = true;
      errors.confirmPasswordError = "Password must be 8 characters or more";
      errors.confirmPasswordErrorToggle = true;
    } else {
      setConfirmPasswordErrorToggle(false);
      setConfirmPasswordError("");
    }
    if (currentJob.length <= 0) {
      isError = true;
      errors.currentJobError = "Please fill in the field";
      errors.currentJobErrorToggle = true;
    } else {
      setCurrentJobErrorToggle(false);
      setCurrentJobError("");
    }

    if (!(password === confirmPassword)) {
      isError = true;
      errors.passwordError = "Passwords do not match ";
      errors.passwordErrorToggle = true;
      errors.confirmPasswordError = "Passwords do not match";
      errors.confirmPasswordErrorToggle = true;
    }

    if (isError) {
      setFirstNameError(errors.firstNameError);
      setFirstNameErrorToggle(errors.firstNameErrorToggle);
      setLastNameError(errors.lastNameError);
      setLastNameErrorToggle(errors.lastNameErrorToggle);
      setEmailError(errors.emailError);
      setEmailErrorToggle(errors.emailErrorToggle);
      setPasswordError(errors.passwordError);
      setPasswordErrorToggle(errors.passwordErrorToggle);
      setConfirmPasswordError(errors.confirmPasswordError);
      setConfirmPasswordErrorToggle(errors.confirmPasswordErrorToggle);
      setCurrentJobError(errors.currentJobError);
      setCurrentJobErrorToggle(errors.currentJobErrorToggle);
    }

    return isError;
  };


  useEffect(() => {
    if (firstName.length >= 1) {
      setFirstNameErrorToggle(false);
      setFirstNameError("");
    }
  }, [firstName]);

  
  useEffect(() => {
    if (lastName.length >= 1) {
      setLastNameErrorToggle(false);
      setLastNameError("");
    }
  }, [lastName]);


  useEffect(() => {
    if (currentJob.length >= 1) {
      setCurrentJobErrorToggle(false);
      setCurrentJobError("");
    }
  }, [currentJob]);

  useEffect(() => {
    if (email.length >= 1) {
      setEmailErrorToggle(false);
      setEmailError("");
    }
  }, [email]);



  useEffect(() => {
    if ((password === confirmPassword)) {
   
      setPasswordError("")
      setPasswordErrorToggle(false)
      setConfirmPasswordError("")
    setConfirmPasswordErrorToggle(false)
    }
  

  }, [password,confirmPassword]);



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

  const handleSignUp = e => {
    e.preventDefault();


    const err = validate();

    if (!err) {
      if (!loading) {
        setLoading(true);
      }
      fetch(`http://localhost:3000/api/doctor/docSignup`, {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          currentJob: currentJob,
          contactInfo: contactInfo,
          mastersTitle: mastersTitle,
          phdTitle: phdTitle,
          researchPaperslink: researchPaperslink
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res.status);
        if (res.status === 200) {
          setLoading(false);
          setSuccess(true);
          setOpen(true);
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setContactInfo("");
          setCurrentJob("");
          setMastersTitle("");
          setPhdTitle("");
          setContactInfo("");
         document.location.href = "/login"
        } else {
          setLoading(false);
        }
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Spring
 from={{ opacity: 0, transform: "translate3d(-100%,0,0)" }}
 to={{ opacity: 1, transform: "translate3d(0,0,0)" }}>
  {props => <div style={props}>
    
  <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <h3 style={{ fontFamily: "Helvetica" }}>Register as a Professor</h3>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                helperText={firstNameError}
                error={firstNameErrorToggle}
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                required
                id="lastName"
                helperText={lastNameError}
                error={lastNameErrorToggle}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="email"
                required
                fullWidth
                helperText={emailError}
                error={emailErrorToggle}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                helperText={currentJobError}
                error={currentJobErrorToggle}
                name="current job"
                label="Current Job"
                type="current job"
                id="current job"
                autoComplete="current-job"
                value={currentJob}
                onChange={e => {
                  setCurrentJob(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="contact info"
                label="Contact Information"
                type="contact info"
                id="contact info"
                autoComplete="contact-info"
                placeholder="Phone Number"
                value={contactInfo}
                onChange={e => {
                  setContactInfo(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="mastersTitle"
                name="mastersTitle"
                variant="outlined"
                fullWidth
                placeholder="if any"
                id="mastersTitle"
                label="Masters Title"
                value={mastersTitle}
                onChange={e => {
                  setMastersTitle(e.target.value);
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                name="researchPapersLink"
                placeholder="if any"
                label="Research Papers Link"
                type="researchPapersLink"
                id="researchPapersLink"
                autoComplete="research-Paper-Link"
                value={researchPaperslink}
                onChange={e => {
                  setResearchPaperslink(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="phdTitle"
                label="PHD Title"
                name="phdTitle"
                autoComplete="phdTitle"
                placeholder="if any"
                value={phdTitle}
                onChange={e => {
                  setPhdTitle(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                helperText={passwordError}
                error={passwordErrorToggle}
                autoComplete="current-password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                helperText={confirmPasswordError}
                error={confirmPasswordErrorToggle}
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="confirm password"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Grid>
          </Grid>

          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={buttonClassname}
              onClick={handleSignUp}
              disabled={loading}
            >
              Sign Up
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    
    </div>}
</Spring>

     
      <Box mt={5}>
        <Copyright />
      </Box>

      <Container>
        <Grid item >
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Sign Up Complete!
            </Alert>
          </Snackbar>
        </Grid>
      </Container>
    </Container>
  );
}
