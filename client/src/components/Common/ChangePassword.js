import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  CssBaseline,
  TextField,
  Typography,
  Snackbar,
  Button,
  Container,
  CircularProgress,
  Switch,
  Card

} from "@material-ui/core";
import { Info, SettingsInputComponent } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { grey, lightBlue, green,purple } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TestContext } from "../../App";
import clsx from "clsx";
import { IoIosUnlock } from "react-icons/io";
import {Spring} from 'react-spring/renderprops';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Mohamed Atef {" © "} {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
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
    margin: theme.spacing(2),
    position: "relative",
    textAlign: "center"
  },
  infoIcon: {}
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

export default function ChangePassword() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);


  const [oldPassword,setOldPassword]=useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [oldPasswordErrorToggle, setOldPasswordErrorToggle] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorToggle, setPasswordErrorToggle] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPasswordErrorToggle, setConfirmPasswordErrorToggle] = useState(
    false
  );

  const [snackbarMessage,setSnackbarMessage]=useState("")
  const [snackbarVariant,setSnackbarVariant]=useState("")

  const ColorButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
     
    }
  }))(Button);

  useEffect(() => {
    if ((password === confirmPassword)) {
   
      setPasswordError("")
      setPasswordErrorToggle(false)
      setConfirmPasswordError("")
    setConfirmPasswordErrorToggle(false)
    }
  

  }, [password,confirmPassword]);


  useEffect(() => {
    
    if (oldPassword.length >= 8) {
        setOldPasswordErrorToggle(false);
        setOldPasswordError("");
      } 

    if (password.length >= 8) {
        setPasswordErrorToggle(false);
        setPasswordError("");
      } 
  
      if (confirmPassword.length >= 8) {
        setConfirmPasswordErrorToggle(false);
        setConfirmPasswordError("");
      } 
  

  }, [password,confirmPassword,oldPassword]);






  const validate = () => {
    let isError = false;
    const errors = {};


    if (oldPassword.length < 8) {
        isError = true;
        errors.oldPasswordError = "Password must be 8 characters or more";
        errors.oldPasswordErrorToggle = true;
      } else {
        setOldPasswordErrorToggle(false);
        setOldPasswordError("");
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
        setOldPasswordError(errors.oldPasswordError);
        setOldPasswordErrorToggle(errors.oldPasswordErrorToggle);
        setPasswordError(errors.passwordError);
        setPasswordErrorToggle(errors.passwordErrorToggle);
        setConfirmPasswordError(errors.confirmPasswordError);
        setConfirmPasswordErrorToggle(errors.confirmPasswordErrorToggle);
    
     
    }

    return isError;
  };

  const handleSendRequest = e => {
    e.preventDefault();

    setOpen(false)
    const err = validate();

    if (!err) {
      if (!loading) {
        setLoading(true);
      }


      var stateLoad="";
      switch(sessionStorage.getItem("auth")){
        case "Professor":stateLoad="doctor";
        break;
        case "University": stateLoad="university";
        break;
        case "Student":stateLoad="student";
        break;
      
      }

      fetch(`http://localhost:3000/api/${stateLoad}/changePassword`, {
        method: "POST",
        body: JSON.stringify({
          
          oldPassword: oldPassword,
          newPassword:password
      
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "x-access-token":sessionStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.status);
        if (res.status === 200) {
          setLoading(false);
          setSuccess(true);
          setOpen(true);
          setSnackbarMessage("Password Changed");
          setSnackbarVariant("success")
          
         
          document.location.reload()
        } else {
          setLoading(false);
          if(res.status===401){
          setSnackbarMessage("Old Password does not match");
          setSnackbarVariant("error");
          setOpen(true)
          }
          if(res.status===400){
            setSnackbarMessage("You cannot set the same password");
            setSnackbarVariant("warning");
            setOpen(true)
          }
        }



      });
    }
  };




  



 
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



      <Spring
  from={{ opacity: 0,transform: 'translate3d(0,-100%,0)'}}
  to={{ opacity: 1,transform: 'translate3d(0px,0,0)' }}
  
  >
  {props => <div style={props}>
    
  <Card
          raised
          style={{marginTop:"20%"}}
          >
      <div className={classes.paper}>
        <IoIosUnlock style={{ fontSize: "60px" }} />

        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} noValidate>
         
          
        <Grid style={{ width: "80%",marginLeft:"7%" }} item>
            <TextField
                variant="standard"
                required
                fullWidth
                name="old password"
                label="Old Password"
                type="password"
                id="password"
                helperText={oldPasswordError}
                error={oldPasswordErrorToggle}
                autoComplete="current-password"
                value={oldPassword}
                onChange={e => {
                  setOldPassword(e.target.value);
                }}
              />
            </Grid>
          
          <br/>

            <Grid style={{ width: "80%",marginLeft:"7%" }} item>
            <TextField
                variant="standard"
                required
                fullWidth
                name="password"
                label="New Password"
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
          
          <br/>
       
       

            <Grid style={{ width: "80%",marginLeft:"7%" }} item>
            <TextField
                variant="standard"
                required
                fullWidth
                helperText={confirmPasswordError}
                error={confirmPasswordErrorToggle}
                name="confirm password"
                label="Confirm New Password"
                type="password"
                id="confirm password"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                }}
              />
              
            </Grid>
          

          <div className={classes.wrapper}>
            <ColorButton
              type="submit"
              size="medium"
              variant="contained"
              color="primary"
              className={buttonClassname}
             
              disabled={loading}
              onClick={handleSendRequest}
              disabled={loading}
            >
              Change Password
            </ColorButton>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>
      </Card>
    
    
    </div>}
</Spring>
         
      <Container>
        <Grid item>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackbarVariant}>
          {snackbarMessage}
            </Alert>
          </Snackbar>
        </Grid>
      </Container>
    </Container>
  );
}
