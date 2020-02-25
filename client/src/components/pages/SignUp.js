import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/AccountBox";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Switch from "@material-ui/core/Switch";
import { grey, lightBlue, green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import {TestContext} from "../../App"


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Mohamed Atef {new Date().getFullYear()}
      {"."}
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
    backgroundColor: theme.palette.secondary.main
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
  const [viewRecommendation, setViewRecommendation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
  const [confirmPasswordErrorToggle, setConfirmPasswordErrorToggle] = useState(false);

//Test context
const sss= useContext(TestContext)
console.log(sss)

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.normalForm]: !success
  });

  const validate = () => {
    let isError = false;
    const errors = {};
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (firstName.length <=0 ) {
      isError = true;
      errors.firstNameError = "Please fill in the field";
      errors.firstNameErrorToggle=true;
    }else{
      setFirstNameErrorToggle(false)
      setFirstNameError("")
    }

    if (lastName.length <=0 ) {
      isError = true;
      errors.lastNameError = "Please fill in the field";
      errors.lastNameErrorToggle=true;
    }else{
      setLastNameErrorToggle(false)
      setLastNameError("")
    }

    if(!(re.test(email))){
      isError=true;
      errors.emailError="Please enter a valid email"
      errors.emailErrorToggle=true
    }else{
      setEmailErrorToggle(false)
      setEmailError("")
    }

    if (password.length <8 ) {
      isError = true;
      errors.passwordError = "Password must be 8 characters or more";
      errors.passwordErrorToggle=true;
    }else{
      setPasswordErrorToggle(false)
      setPasswordError("")
    }

    if (confirmPassword.length <8 ) {
      isError = true;
      errors.confirmPasswordError = "Password must be 8 characters or more";
      errors.confirmPasswordErrorToggle=true;
    }else{
      setConfirmPasswordErrorToggle(false)
      setConfirmPasswordError("")
    }
    
    if(!(password===confirmPassword)){
      isError=true;
      errors.passwordError = "Passwords do not match ";
      errors.passwordErrorToggle=true;
      errors.confirmPasswordError = "Passwords do not match";
      errors.confirmPasswordErrorToggle=true;
    }


    if (isError) {
      setFirstNameError(errors.firstNameError);
      setFirstNameErrorToggle(errors.firstNameErrorToggle)
      setLastNameError(errors.lastNameError);
      setLastNameErrorToggle(errors.lastNameErrorToggle)
      setEmailError(errors.emailError)
      setEmailErrorToggle(errors.emailErrorToggle)
      setPasswordError(errors.passwordError)
      setPasswordErrorToggle(errors.passwordErrorToggle)
      setConfirmPasswordError(errors.confirmPasswordError)
      setConfirmPasswordErrorToggle(errors.confirmPasswordErrorToggle)
    }

    return isError;
  };

  const handleSignUp = e => {
    e.preventDefault();
    console.log("button clicked");

   
    const err = validate();

    if(!err){
      if (!loading) {
        setLoading(true);
      }
    fetch(`http://localhost:3000/api/student/studentSignup`, {
      method: "POST",
      body: JSON.stringify({
        Name: firstName + "" + lastName,
        email: email,
        password: password,
        viewRecommendation: viewRecommendation
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.status);
      if (res.status === 200) {
        setLoading(false);
        setSuccess(true);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setTimeout(() => (document.location.href = "/login"), 4000);
      } else {
        setLoading(false);
      }
    });
  };
  }
  // console.log(firstName)
  // console.log(lastName)
  // console.log(email)
  // console.log(password)
  //console.log(viewRecommendation);
  // console.log("loading:" + loading);
  // console.log("success:" + success);
 
  return (
    <Container  component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Student SignUp
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
      <Box mt={5}>
        <Copyright />
      </Box>
     
    </Container>
  );
}
