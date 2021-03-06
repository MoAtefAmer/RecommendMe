import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/School";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Switch from "@material-ui/core/Switch";
import { grey, lightBlue, green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
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
    alignItems: "center",
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

const ViewSwitch = withStyles({
  switchBase: {
    color: grey[300],
    "&$checked": {
      color: green[700]
    },
    "&$checked + $track": {
      backgroundColor: green[900]
    }
  },
  checked: {},
  track: {}
})(Switch);

export default function SignUp() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [viewRecommendation, setViewRecommendation] = useState(true);
  const [major,setMajor]=useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
  const [majorError,setMajorError]=useState("");
  const [majorErrorToggle,setMajorErrorToggle]=useState(false)



  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.normalForm]: !success
  });

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

    if (major.length <= 0) {
      isError = true;
      errors.majorError = "Please fill in the field";
      errors.majorErrorToggle = true;
    } else {
      setMajorErrorToggle(false);
      setMajorError("");
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
      setMajorError(errors.majorError);
      setMajorErrorToggle(errors.majorErrorToggle)
    }

    return isError;
  };

  useEffect(() => {
    if (major.length >= 1) {
      setMajorErrorToggle(false);
      setMajorError("");
    }
  }, [major]);


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



 



  const handleSignUp = e => {
    e.preventDefault();

    const err = validate();

    if (!err) {
      if (!loading) {
        setLoading(true);
      }
      fetch(`https://recommendationsystematef.herokuapp.com/api/student/studentSignup`, {
        method: "POST",
        body: JSON.stringify({
          Name: firstName + "" + lastName,
          email: email,
          password: password,
          viewRecommendation: viewRecommendation,
          major:major
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*"
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
          document.location.href = "/login"
        } else {
          setLoading(false);
        }
      });
    }
  };


  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />

      <Spring
  from={{ opacity: 0, transform: "translate3d(-100%,0,0)" }}
   to={{ opacity: 1, transform: "translate3d(0,0,0)" }}>
  {props => <div style={props}>
    
  <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register as a Student
        </Typography>
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
                type="text"
                required
                fullWidth
                helperText={majorError}
                error={majorErrorToggle}
                id="major"
                label="Major"
                name="major"
              
                value={major}
                onChange={e => {
                  setMajor(e.target.value);
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
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <ViewSwitch
                    checked={viewRecommendation}
                    color="primary"
                    onChange={e => {
                      setViewRecommendation(e.target.checked);
                    }}
                  />
                }
                label="I want to be able to view my recommendations after being submitted."
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
