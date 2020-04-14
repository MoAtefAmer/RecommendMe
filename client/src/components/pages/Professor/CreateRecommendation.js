import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  CssBaseline,
  Box,
  Tab,
  Tabs,
  AppBar,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Snackbar
} from "@material-ui/core";
import { grey, blue, green, purple } from "@material-ui/core/colors";
import MuiAlert from "@material-ui/lab/Alert";
import QuestionCard from "./QuestionCard";
import { FormControl } from "react-bootstrap";
import { CloudUpload } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { storage } from "../../../firebase";
import { FaFolderOpen, FaFolderPlus } from "react-icons/fa";
import { Spring } from "react-spring/renderprops";
import UniversityImage from "../../Images/university.jpg";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

//Snackbar Alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: "url(" + UniversityImage + ")",
    backgroundSize: "cover",
    height: "94vh"
  },
  form: {
    padding: "3%",
    width: "100%"
  },
  paper: {
    display: "flex",
    flexDirection: "column"
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -14,
    marginLeft: -12
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },

  wrapper: {
    margin: theme.spacing(1)
  },
  normalForm: {
    backgroundColor: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    "&:hover": {
      backgroundColor: grey[900]
    }
  },
  tabBackgroundColor: {
    backgroundImage: "url(" + UniversityImage + ")",
    backgroundSize: "cover",
    height: "150vh"
  },

  iconStyling: {
    fontSize: "65px",
    marginLeft: "40%"
  },
  CardMaster: {
    "&:hover": {
      cursor: "pointer",
      boxShadow: "rgba(0,0,0,0.25)  0 14px 28px",
      transform: "translate3d(0px, -0.5px, 0px)"
    }
  },

  CardMaster2: {
    backgroundColor: "black"
  },
  input: {
    display: "none"
  }
}));

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    margin: theme.spacing(1)
  }
}))(Button);

const BackButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    background: "linear-gradient(60deg, #1e88e5, #1565c0)",
    margin: theme.spacing(1)
  }
}))(Button);

export var CardContext = React.createContext();

export default function CreateRecommendation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [universityEmail, setUniversityEmail] = useState(
    sessionStorage.getItem("notificationUniversityEmail")
  );


  const [progress, setProgress] = useState(0);
  const [value0, setValue0] = useState(3);
  const [value1, setValue1] = useState(3);
  const [value2, setValue2] = useState(3);
  const [value3, setValue3] = useState(3);
  const [value4, setValue4] = useState(3);
  const [value5, setValue5] = useState(3);
  const [value6, setValue6] = useState(3);
  const [value7, setValue7] = useState(3);
  const [value8, setValue8] = useState(3);
  const [value9, setValue9] = useState(3);
  const [studentsEmailList, setStudentsEmailList] = useState([]);
  const [universityEmailList, setUniversityEmailList] = useState([]);
  const [studentEmail, setStudentEmail] = useState(
    sessionStorage.getItem("notificationStudentEmail")
  );
  const [studentName, setStudentName] = useState("");
  const [studentMajor, setStudentMajor] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [universityWebsiteLink, setUniversityWebsiteLink] = useState("");
  const [studentNameErrorToggle, setStudentNameErrorToggle] = useState(false);
  const [studentNameError, setStudentNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [chooseFileLoading, setChooseFileLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [universityWebsiteLinkError, setUniversityWebsiteLinkError] = useState(
    ""
  );
  const [
    universityWebsiteLinkErrorToggle,
    setUniversityWebsiteLinkErrorToggle
  ] = useState(false);

  const [file, setFile] = useState();
  const [studentMajorError, setStudentMajorError] = useState("");
  const [studentMajorErrorToggle, setStudentMajorErrorToggle] = useState(false);
  const [universityNameError, setUniversityNameError] = useState("");
  const [universityNameErrorToggle, setUniversityNameErrorToggle] = useState(
    false
  );
  const [studentEmailError, setStudentEmailError] = useState("");
  const [studentEmailErrorToggle, setStudentEmailErrorToggle] = useState(false);
  const [universityEmailError, setUniversityEmailError] = useState("");
  const [universityEmailErrorToggle, setUniversityEmailErrorToggle] = useState(
    false
  );
  const [isFileUploaded, setIsFileUploaded] = useState(true);
  const [fileSelectedText, setFileSelectedText] = useState("No File Selected");
  const [open, setOpen] = useState(false);
  const [pdfLink, setPdfLink] = useState("3eeb");
  
  const [superImportantBoolean, setSuperImportantBoolean] = useState(false);

  const SliderCallback = (count, i) => {
    switch (i) {
      case 0:
        setValue0(count);
        break;
      case 1:
        setValue1(count);
        break;
      case 2:
        setValue2(count);
        break;
      case 3:
        setValue3(count);
        break;
      case 4:
        setValue4(count);
        break;
      case 5:
        setValue5(count);
        break;
      case 6:
        setValue6(count);
        break;
      case 7:
        setValue7(count);
        break;
      case 8:
        setValue8(count);
        break;
      case 9:
        setValue9(count);
        break;
    }
  };

  var testArray = [
    value0,
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9
  ];

  useEffect(() => {



    if ( superImportantBoolean === true) {
      fetch(`https://recommendationsystematef.herokuapp.com/api/doctor/sendRecommendation`, {
        method: "POST",
        body: JSON.stringify({
          subject: "Notification Email from RecommendME",
          message:
            "Professor " +
            sessionStorage.getItem("firstName") +
            " " +
            sessionStorage.getItem("lastName") +
            " has posted a new recommendation for Student: " +
            studentName +
            " to " +
            universityName +
            "\n https://recommendationsystematef.herokuapp.com/" +
            "\n",
          studentName: studentName,
          studentEmail: studentEmail,
          major: studentMajor,
          professorName:
            sessionStorage.getItem("firstName") +
            " " +
            sessionStorage.getItem("lastName"),
          professorEmail: sessionStorage.getItem("email"),
          professorCurrentJob: sessionStorage.getItem("currentJob"),
          uemail: universityEmail,
          universityName: universityName,
          universityLink: universityWebsiteLink,
          communicationSkills: value1,
          problemSolvingSkills: value4,
          researchSkills: value3,
          technicalKnowledge: value2,
          analyticalSkills: value0,
          stressHandling: value8,
          punctuality: value6,
          adaptationSkills: value5,
          grades: value9,
          englishSkills: value7,
          pdfLink: pdfLink,
          remarks: remarks
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "x-access-token": sessionStorage.getItem("token")
        }
      }).then(res => {
        if (res.status === 200) {
          setLoading(false);

          setOpen(true);
          

          document.location.href = "/createRecommendation";
        } else {
          // setLoading(false);

         
        }
      });
    }
  }, [superImportantBoolean]);

  useEffect(() => {
    if (studentName.length >= 1) {
      setStudentNameErrorToggle(false);
      setStudentNameError("");
    }
  }, [studentName]);

  useEffect(() => {
    if (studentMajor.length >= 1) {
      setStudentMajorErrorToggle(false);
      setStudentMajorError("");
    }
  }, [studentMajor]);

  useEffect(() => {
    if (universityWebsiteLinkError.length >= 1) {
      setUniversityWebsiteLinkErrorToggle(false);
      setUniversityWebsiteLinkError("");
    }
  }, [universityWebsiteLink]);

  useEffect(() => {
    if (studentEmail !== "") {
      studentsEmailList.filter(element => {
        if (element.email === studentEmail) {
          setStudentName(element.Name);
          setStudentMajor(element.major);
        }
      });
    }

    if (studentEmail.length >= 1) {
      setStudentEmailErrorToggle(false);
      setStudentEmailError("");
    }
  }, [studentEmail, studentsEmailList]);

  useEffect(() => {
    if (universityEmail !== "") {
      universityEmailList.filter(element => {
        if (element.uemail === universityEmail) {
          setUniversityName(element.Name);
          setUniversityWebsiteLink(element.websiteLink);
        }
      });
    }
    if (universityEmail.length >= 1) {
      setUniversityEmailErrorToggle(false);
      setUniversityEmailError("");
    }
  }, [universityEmail, universityEmailList]);

  useEffect(() => {
    if (universityName !== "") {
      universityEmailList.filter(element => {
        if (element.Name === universityName) {
          setUniversityEmail(element.uemail);
          setUniversityWebsiteLink(element.websiteLink);
        }
      });
    }
    if (universityName.length >= 1) {
      setUniversityNameErrorToggle(false);
      setUniversityNameError("");
    }
  }, [universityName, universityEmailList]);

  useEffect(() => {
    fetch(`https://recommendationsystematef.herokuapp.com/api/student/getStudentsEmails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      res.json().then(data => {
        setStudentsEmailList(data.stuList);
      });
    });

    fetch(`https://recommendationsystematef.herokuapp.com/api/university/getUniEmails`, {
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

    if (!re.test(studentEmail)) {
      isError = true;
      errors.studentEmailError = "Please enter a valid email";
      errors.studentEmailErrorToggle = true;
    } else {
      setStudentEmailErrorToggle(false);
      setStudentEmailError("");
    }

    if (!re.test(universityEmail)) {
      isError = true;
      errors.universityEmailError = "Please enter a valid email";
      errors.universityEmailErrorToggle = true;
    } else {
      setUniversityEmailErrorToggle(false);
      setUniversityEmailError("");
    }

    if (studentName.length <= 0) {
      isError = true;
      errors.studentNameError = "Please enter the Student's Name";
      errors.studentNameErrorToggle = true;
    } else {
      setStudentNameErrorToggle(false);
      setStudentNameError("");
    }

    if (studentMajor.length <= 0) {
      isError = true;
      errors.studentMajorError = "Please enter the Student's Name";
      errors.studentMajorErrorToggle = true;
    } else {
      setStudentMajorErrorToggle(false);
      setStudentMajorError("");
    }

    if (universityName.length <= 2) {
      isError = true;
      errors.universityNameError = "Please enter the University's Name";
      errors.universityNameErrorToggle = true;
    } else {
      setUniversityNameErrorToggle(false);
      setUniversityNameError("");
    }

    if (universityWebsiteLink.length <= 8) {
      isError = true;
      errors.universityWebsiteLinkError =
        "Please enter the University's Website Link";
      errors.universityWebsiteLinkErrorToggle = true;
    } else {
      setUniversityWebsiteLinkErrorToggle(false);
      setUniversityWebsiteLinkError("");
    }

    if (isError) {
      // setEmailError(errors.emailError);
      // setEmailErrorToggle(errors.emailErrorToggle);

      setStudentEmailErrorToggle(errors.studentEmailErrorToggle);
      setStudentEmailError(errors.studentEmailError);

      setStudentNameError(errors.studentNameError);
      setStudentNameErrorToggle(errors.studentNameErrorToggle);
      setUniversityNameErrorToggle(errors.universityNameErrorToggle);
      setUniversityNameError(errors.universityNameError);
      setStudentMajorErrorToggle(errors.studentMajorErrorToggle);
      setStudentMajorError(errors.studentMajorError);
      setUniversityEmailErrorToggle(errors.universityEmailErrorToggle);
      setUniversityEmailError(errors.universityEmailError);
      setUniversityWebsiteLinkErrorToggle(
        errors.universityWebsiteLinkErrorToggle
      );
      setUniversityWebsiteLinkError(errors.universityWebsiteLinkError);
    }

    return isError;
  };

  
  const [cardsArray] = useState([
    { question: "Analytical Skills", id: 0, icon: "analytics" },
    { question: "Communication Skills", id: 1, icon: "communication" },
    { question: "Technical Knowledge", id: 2, icon: "technical" },
    { question: "Research Skills", id: 3, icon: "research" },
    { question: "Problem Solving Skills", id: 4, icon: "solving" },
    { question: "Adaptation Skills", id: 5, icon: "adaptation" },
    { question: "Punctuality", id: 6, icon: "punctuality" },
    { question: "English Language Level", id: 7, icon: "english" },
    { question: "Stress Handling", id: 8, icon: "stress" },
    { question: "GPA", id: 9, icon: "gpa" }
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmitRequest = e => {
    e.preventDefault();

    const err = validate();

    if (!err) {
      if (!loading) {
        setLoading(true);
      }

      if (file != null) {
        setIsFileUploaded(false);
        handleUpload();
      }
      if (isFileUploaded === true) {
        setChooseFileLoading(true);
        setSuperImportantBoolean(true);
      } else {
        if(fileSelectedText==="No File Selected"){
          setSuperImportantBoolean(true)
        }
      }
    } else {
      if (err) setValue(0);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`recommendationPdfs/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //Progress function
        const loaded = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(loaded);
      },
      error => {},
      () => {
        //complete Function
        storage
          .ref("recommendationPdfs")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            setIsFileUploaded(true);

            setPdfLink(url);
          });
      }
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default" style={{ zIndex: "998" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="General Information" {...a11yProps(0)} />
          <Tab label="Student Evaluation" {...a11yProps(1)} />
          <Tab label="Upload PDF" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CssBaseline />

        <Container maxWidth="lg" style={{ flexGrow: 1 }}>
          <div style={{ zIndex: "-1", position: "static" }}>
            <Spring
              from={{ opacity: 0, transform: "translate3d(-100%,0,0)" }}
              to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            >
              {props => (
                <div style={props}>
                  <Paper elevation={3} style={{ height: "auto" }}>
                    <form className={classes.form}>
                      <div>
                        <div style={{ textAlign: "center" }}>
                          <p
                            style={{
                              fontSize: "1.5625rem",
                              lineHeight: "1.4em"
                            }}
                          >
                            Student Information
                          </p>
                        </div>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              name="Student Name"
                              variant="outlined"
                              required
                              fullWidth
                              id="StudentName"
                              label="Student Name"
                              value={studentName}
                              error={studentNameErrorToggle}
                              helperText={studentNameError}
                              onChange={e => {
                                setStudentName(e.target.value);
                              }}
                              autoFocus
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Autocomplete
                              id="combo-box-demo"
                              clearOnEscape
                              options={studentsEmailList.map(
                                option => option.email
                              )}
                              style={{ width: "100%" }}
                              freeSolo
                              value={studentEmail}
                              onChange={(e, value) => {
                                if (value !== null) {
                                  setStudentEmail(value);
                                } else {
                                  setStudentEmail("");
                                }
                              }}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="Student Email"
                                  variant="outlined"
                                  required
                                  error={studentEmailErrorToggle}
                                  helperText={studentEmailError}
                                  value={studentEmail}
                                  onChange={e => {
                                    setStudentEmail(e.target.value);
                                  }}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              autoComplete="Major"
                              name="Major"
                              variant="outlined"
                              required
                              fullWidth
                              id="Major"
                              value={studentMajor}
                              error={studentMajorErrorToggle}
                              helperText={studentMajorError}
                              label="Major"
                              onChange={e => {
                                setStudentMajor(e.target.value);
                              }}
                              autoFocus
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <div style={{ textAlign: "center" }}>
                          <p
                            style={{
                              fontSize: "1.5625rem",
                              lineHeight: "1.4em",
                              paddingTop: "4%"
                            }}
                          >
                            University Information
                          </p>
                        </div>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <Autocomplete
                              id="combo-box-demo"
                              clearOnEscape
                              options={universityEmailList.map(
                                option => option.Name
                              )}
                              style={{ width: "100%" }}
                              freeSolo
                              required
                              value={universityName}
                              onChange={(e, value) => {
                                if (value !== null) {
                                  setUniversityName(value);
                                } else {
                                  setUniversityName("");
                                }
                              }}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="University Name"
                                  variant="outlined"
                                  required
                                  error={universityNameErrorToggle}
                                  helperText={universityNameError}
                                  value={universityName}
                                  onChange={e => {
                                    setUniversityName(e.target.value);
                                  }}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Autocomplete
                              id="combo-box-demo"
                              clearOnEscape
                              options={universityEmailList.map(
                                option => option.uemail
                              )}
                              style={{ width: "100%" }}
                              freeSolo
                              required
                              value={universityEmail}
                              onChange={(e, value) => {
                                if (value !== null) {
                                  setUniversityEmail(value);
                                } else {
                                  setUniversityEmail("");
                                }
                              }}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="University Email"
                                  variant="outlined"
                                  required
                                  error={universityEmailErrorToggle}
                                  helperText={universityEmailError}
                                  value={universityEmail}
                                  onChange={e => {
                                    setUniversityEmail(e.target.value);
                                  }}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              name="University Link"
                              variant="outlined"
                              fullWidth
                              id="University Link"
                              label="University Website Link"
                              value={universityWebsiteLink}
                              required
                              error={universityWebsiteLinkErrorToggle}
                              helperText={universityWebsiteLinkError}
                              onChange={e => {
                                setUniversityWebsiteLink(e.target.value);
                              }}
                              autoFocus
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <div style={{ textAlign: "center" }}>
                          <p
                            style={{
                              fontSize: "1.5625rem",
                              lineHeight: "1.4em",
                              paddingTop: "4%"
                            }}
                          >
                            My Information
                          </p>
                        </div>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              name="Name"
                              variant="standard"
                              fullWidth
                              id="Name"
                              label="Name"
                              value={
                                sessionStorage.getItem("firstName") +
                                " " +
                                sessionStorage.getItem("lastName")
                              }
                              autoFocus
                              disabled
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              name="Email"
                              variant="standard"
                              required
                              fullWidth
                              id="Email"
                              label="Email"
                              value={sessionStorage.getItem("email")}
                              autoFocus
                              disabled
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              name="Current Job"
                              variant="standard"
                              fullWidth
                              id="CurrentJob"
                              label="Current Job"
                              autoFocus
                              disabled
                              value={sessionStorage.getItem("currentJob")}
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <div style={{ textAlign: "right", paddingTop: "5%" }}>
                        <ColorButton
                          variant="contained"
                          onClick={e => {
                            setValue(1);
                          }}
                        >
                          {" "}
                          Next
                        </ColorButton>
                      </div>
                    </form>
                  </Paper>
                </div>
              )}
            </Spring>
          </div>
        </Container>
      </TabPanel>
      {/* //Atef */}
      <TabPanel className={classes.tabBackgroundColor} value={value} index={1}>
        <Container maxWidth="lg">
          <Spring
            from={{ opacity: 0, transform: "translate3d(-100%,0,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          >
            {props => (
              <div style={props}>
                <Grid container spacing={2}>
                  {cardsArray.map((card, i) => (
                    <CardContext.Provider
                      key={i}
                      value={{
                        icon: card.icon,
                        callback: SliderCallback,
                        index: i,
                        valueArray: testArray[i],
                        question: card.question
                      }}
                    >
                      <QuestionCard />
                    </CardContext.Provider>
                  ))}

                  <Grid item xs={12} sm={4}></Grid>

                  <Grid item xs={12} sm={4}>
                    <div
                      style={{
                        textAlign: "right",
                        paddingTop: "5%",
                        marginTop: "25%"
                      }}
                    >
                      <BackButton
                        variant="contained"
                        onClick={e => {
                          setValue(0);
                        }}
                      >
                        {" "}
                        Back
                      </BackButton>
                      <ColorButton
                        variant="contained"
                        onClick={e => {
                          setValue(2);
                        }}
                      >
                        {" "}
                        Next
                      </ColorButton>
                    </div>
                  </Grid>
                </Grid>
              </div>
            )}
          </Spring>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container maxWidth="sm" style={{ flexGrow: 1 }}>
          <Spring
            from={{ opacity: 0, transform: "translate3d(-100%,0,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          >
            {props => (
              <div style={props}>
                <Paper elevation={3} style={{ height: "auto" }}>
                  <form className={classes.form}>
                    <div>
                      <div style={{ textAlign: "Left" }}>
                        <p
                          style={{ fontSize: "1.5625rem", lineHeight: "1.4em" }}
                        >
                          Remarks
                        </p>
                      </div>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                          <FormControl
                            as="textarea"
                            aria-label="With textarea"
                            rows="4"
                            onChange={e => {
                              setRemarks(e.target.value);
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <br />
                    <div>
                      <div style={{ textAlign: "Left" }}>
                        <p
                          style={{ fontSize: "1.5625rem", lineHeight: "1.4em" }}
                        >
                          Upload Recommendation Letter
                        </p>
                      </div>
                      <Grid item xs={12} sm={4}>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={e => {
                            setFile(e.target.files[0]);
                            if (e.target.files[0] != null)
                              setFileSelectedText(e.target.files[0].name);
                          }}
                        />
                        <label htmlFor="contained-button-file">
                          <Chip
                            variant="outlined"
                            label={fileSelectedText}
                            color="primary"
                            icon={
                              fileSelectedText === "No File Selected" ? (
                                <FaFolderOpen style={{ fontSize: "25px" }} />
                              ) : (
                                <FaFolderPlus style={{ fontSize: "25px" }} />
                              )
                            }
                          />
                          <br />
                          <br />
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            disabled={chooseFileLoading}
                          >
                            <CloudUpload
                              style={{ fontSize: "30px", marginRight: "10px" }}
                            />
                            {"  "}
                            Choose File
                            {loading && (
                              <CircularProgress
                                size={30}
                                className={classes.buttonProgress}
                                variant="determinate"
                                value={progress}
                              />
                            )}
                          </Button>
                        </label>
                      </Grid>
                    </div>
                    <div style={{ textAlign: "right", paddingTop: "5%" }}>
                      <div className={classes.wrapper}>
                        <BackButton
                          variant="contained"
                          onClick={e => {
                            setValue(1);
                          }}
                        >
                          {" "}
                          Back
                        </BackButton>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleSubmitRequest}
                          disabled={loading}
                        >
                          {" "}
                          Submit
                        </Button>
                      </div>
                    </div>
                  </form>
                </Paper>
              </div>
            )}
          </Spring>
        </Container>

        <Spring
          from={{ opacity: 0, transform: "translate3d(0,100%,0)" }}
          to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        >
          {props => (
            <div style={props}>
              <br />
              <br />
              <br />
              <Container>
                <Grid item>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="success">
                      Recommendation Posted
                    </Alert>
                  </Snackbar>
                </Grid>
              </Container>
            </div>
          )}
        </Spring>
      </TabPanel>
    </div>
  );
}
