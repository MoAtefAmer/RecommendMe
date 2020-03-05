import React, { useState } from "react";
import {
  Grid,
  CssBaseline,
  TextField,
  Typography,
  Snackbar,
  Button,
  Container,
  CircularProgress,
  Box,
  FormControlLabel,
  Link,
  Switch,
  Avatar
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/School";
import MuiAlert from "@material-ui/lab/Alert";
import { grey, lightBlue, green } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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

export default function RequestRecommendation() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);

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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register as a Student
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                helperText={""}
                error={""}
                autoComplete="current-password"
                value={""}
                onChange={e => {
                  "";
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                helperText={""}
                error={""}
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="confirm password"
                autoComplete="current-password"
                value={""}
                onChange={e => {
                  ""
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <ViewSwitch
                    checked={false}
                    color="primary"
                    onChange={e => {
                     ""
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
              onClick={""}
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
      <Container>
        <Grid item>
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
