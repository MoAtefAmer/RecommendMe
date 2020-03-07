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
  Box,
  FormControlLabel,
  Link,
  Switch,
  Avatar,
  IconButton,
  InputAdornment,
  FormControl,
  Input
} from "@material-ui/core";
import { Info } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { grey, lightBlue, green } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TestContext } from "../../../App";
import clsx from "clsx";
import { IoIosCreate } from "react-icons/io";

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

export default function RequestRecommendation() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [professorEmail, setProfessorEmail] = useState("");
  const [universityEmail,setUniversityEmail]=useState([])
  const [professorsEmailList, setProfessorEmailList] = useState([]);
  const [universityEmailList,setUniversityEmailList]=useState([])

  const [emailError, setEmailError] = useState("");
  const [emailErrorToggle, setEmailErrorToggle] = useState(false);
  
  const [uemailError, setUEmailError] = useState("");
  const [uemailErrorToggle, setUEmailErrorToggle] = useState(false);


  const validate = () => {
    let isError = false;
    const errors = {};
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (!re.test(professorEmail)) {
      isError = true;
      errors.emailError = "Please enter a valid email";
      errors.emailErrorToggle = true;
    } else {
      setEmailErrorToggle(false);
      setEmailError("");
    }
    
    // if(universityEmail!==""){
    //   universityEmail.map(item=>{console.log("Mapping Function: "+item)})
    //   }
    universityEmail.map(item=>{
      if(!re.test(item)){
        isError = true;
        errors.uemailError = "Please enter a valid email";
        errors.uemailErrorToggle = true;
      }else{
        setUEmailErrorToggle(false);
        setUEmailError("");
      }
    })

    // if (!(universityEmail.map(item=>{re.test(item)}))) {
    //   isError = true;
    //   errors.uemailError = "Please enter a valid email";
    //   errors.uemailErrorToggle = true;
    // } else {
    //   setUEmailErrorToggle(false);
    //   setUEmailError("");
    // }



    if (isError) {
     
      setEmailError(errors.emailError);
      setEmailErrorToggle(errors.emailErrorToggle);
      setUEmailError(errors.uemailError);
      setUEmailErrorToggle(errors.uemailErrorToggle);
     
    }

    return isError;
  };

  const handleSendRequest = e => {
    e.preventDefault();

    const err = validate();

    if (!err) {
      if (!loading) {
        setLoading(true);
      }
      fetch(`http://localhost:3000/api/student/requestRecommendation`, {
        method: "POST",
        body: JSON.stringify({
          
          remail: professorEmail,
          uemail:universityEmail.toString()
      
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
          setProfessorEmail("");
          setUniversityEmail("")
         
          setTimeout(() => (document.location.reload()), 4000);
        } else {
          setLoading(false);
        }
      });
    }
  };



  useEffect(() => {
    console.log("useEffect");
    fetch(`http://localhost:3000/api/doctor/getDocEmails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      res.json().then(data => {
        setProfessorEmailList(data.docList);
      });
    });

    fetch(`http://localhost:3000/api/university/getUniEmails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      res.json().then(data => {
        setUniversityEmailList(data.uniList);
      });
    });
  }, []);

  const context = useContext(TestContext);

  console.log("Email: " + sessionStorage.getItem("email"));
 


  console.log(universityEmail.toString());
 
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
        <IoIosCreate style={{ fontSize: "40px" }} />

        <Typography component="h1" variant="h5">
          Request a recommendation
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={1} alignItems="flex-end">
            <OverlayTrigger
              key={"left"}
              placement={"left"}
              overlay={
                <Tooltip id={`tooltip-left`}>
                  Choose a <strong>Professor</strong> from our website <br />
                  OR
                  <br />
                  Fill in a <strong>Professor's email</strong> and he/she will
                  recieve an email notification and a new account on our website
                </Tooltip>
              }
            >
              <Button
                onClick={e => {
                  e.preventDefault();
                }}
              >
                <Grid style={{ cursor: "pointer" }} item>
                  <Info />
                </Grid>
              </Button>
            </OverlayTrigger>

            <Grid style={{ width: "80%" }} item>
              <Autocomplete
                id="combo-box-demo"
                clearOnEscape
                options={professorsEmailList.map(option => option.email)}
                style={{ width: "100%" }}
                freeSolo
           
                onChange={(e, value) => {
                  if (value !== null) {
                    console.log(value);
                    setProfessorEmail(value);
                  }else{
                    setProfessorEmail("")
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Professor's Email"
                    variant="standard"
                    error={emailErrorToggle}
                    helperText={emailError}
                    value={professorEmail}
                    onChange={e => {
                      setProfessorEmail(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <br/>
          <Grid container spacing={1} alignItems="flex-end">
            <OverlayTrigger
              key={"left"}
              placement={"left"}
              overlay={
                <Tooltip id={`tooltip-left`}>
                  Choose <strong>Universities</strong> from our website <br /> you wish to get recommended to
                  <br />
                  OR
                  <br />
                  Fill in  <strong>Universitiess' email(s)</strong> you wish to get recommended tooltip.
                  <br/>
                  (<i>Multiple selections is allowed</i>)
                </Tooltip>
              }
            >
              <Button
                onClick={e => {
                  e.preventDefault();
                }}
              >
                <Grid style={{ cursor: "pointer" }} item>
                  <Info />
                </Grid>
              </Button>
            </OverlayTrigger>

            <Grid style={{ width: "80%" }} item>
              <Autocomplete
                id="combo-box-demo"
                clearOnEscape
                options={universityEmailList.map(option => option.uemail)}
                style={{ width: "100%" }}
                freeSolo
                multiple
                onChange={(e, value) => {
                  if (value !== null) {
                    console.log(value);
                    setUniversityEmail(value);
                  }else{
                    setUniversityEmail("")
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Universitys' Email(s)"
                    variant="standard"
                    error={uemailErrorToggle}
                    helperText={uemailError}
                    value={universityEmail}
                    onChange={e => {
                      setUniversityEmail(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>

          <div className={classes.wrapper}>
            <Button
              type="submit"
              size="medium"
              variant="contained"
              color="primary"
              className={buttonClassname}
             
              disabled={loading}
              onClick={handleSendRequest}
              disabled={loading}
            >
              Send Request
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>

      <Container>
        <Grid item>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
             Request Sent
            </Alert>
          </Snackbar>
        </Grid>
      </Container>
    </Container>
  );
}
