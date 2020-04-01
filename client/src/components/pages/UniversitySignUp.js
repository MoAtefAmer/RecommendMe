import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LocationCity";
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

export default function UniversitySignUp() {
  const classes = useStyles();
  const [Name, setName] = useState("");

  const [uemail, setuEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
 
  const [websiteLink, setWebsiteLink] = useState("");
  const [open, setOpen] = React.useState(false);
  const [contactInfo, setContactInfo] = useState("");
  

  //Validations
  const [nameError, setNameError] = useState("");
  const [nameErrorToggle, setNameErrorToggle] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [emailErrorToggle, setEmailErrorToggle] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorToggle, setPasswordErrorToggle] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPasswordErrorToggle, setConfirmPasswordErrorToggle] = useState(
    false
  );

  //Test context

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.normalForm]: !success
  });

  const validate = () => {
    let isError = false;
    const errors = {};
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (Name.length <= 0) {
      isError = true;
      errors.nameError = "Please fill in the field";
      errors.nameErrorToggle = true;
    } else {
      setNameErrorToggle(false);
      setNameError("");
    }

    if (!re.test(uemail)) {
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
      errors.passwordError = "Passwords do not match";
      errors.passwordErrorToggle = true;
      errors.confirmPasswordError = "Passwords do not match";
      errors.confirmPasswordErrorToggle = true;
    }

    if (isError) {
      setNameError(errors.nameError);
      setNameErrorToggle(errors.nameErrorToggle);
      setEmailError(errors.emailError);
      setEmailErrorToggle(errors.emailErrorToggle);
      setPasswordError(errors.passwordError);
      setPasswordErrorToggle(errors.passwordErrorToggle);
      setConfirmPasswordError(errors.confirmPasswordError);
      setConfirmPasswordErrorToggle(errors.confirmPasswordErrorToggle);
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

  const handleSignUp = e => {
    e.preventDefault();

    const err = validate();

    if (!err) {
      if (!loading) {
        setLoading(true);
      }
 
      
      
      fetch(`https://recommendationsystematef.herokuapp.com/api/university/uniSignup`, {
        method: "POST",
        body: JSON.stringify({
          uemail: uemail,
          password: password,
          websiteLink: websiteLink,
          Name: Name,

          contactInfo: contactInfo
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
          setuEmail("");
          setPassword("");
          setName("");
          setContactInfo("");

          setContactInfo("");
          setTimeout(() => (document.location.href = "/login"), 4000);
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

        <h3 style={{ fontFamily: "Helvetica" }}>Register as a University</h3>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="websiteLink"
                name="websiteLink"
                type="text"
                variant="outlined"
                fullWidth
                placeholder="aa"
                id="websiteLink"
                label="University's Website"
                value={websiteLink}
                onChange={e => {
                  setWebsiteLink(e.target.value);
                }}
               
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                name="contact info"
                label="Contact Information"
                type="text"
                id="contact info"
                autoComplete="contact-info"
                placeholder="Phone Number"
                value={contactInfo}
                onChange={e => {
                  setContactInfo(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                helperText={nameError}
                error={nameErrorToggle}
                id="name"
                label="University Name"
                name="name"
                autoComplete="name"
                value={Name}
                onChange={e => {
                  setName(e.target.value);
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
                label="University's Email Address"
                name="email"
                autoComplete="email"
                value={uemail}
                onChange={e => {
                  setuEmail(e.target.value);
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

      <Grid item>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Sign Up Complete!
          </Alert>
        </Snackbar>
      </Grid>
    </Container>
  );
}
