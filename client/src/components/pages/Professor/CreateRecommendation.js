import React, { useState } from "react";
import clsx from "clsx";
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
  Card,
  CardActionArea,
  CardContent
} from "@material-ui/core";
import { grey, blue, green, purple } from "@material-ui/core/colors";
import QuestionCard from "./QuestionCard";
import { FormControl } from "react-bootstrap";
import { CloudUpload } from "@material-ui/icons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Mohamed Atef {" © "} {new Date().getFullYear()}
    </Typography>
  );
}
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5"
  },
  form: {
    padding: "3%",
    width: "100%"
  },
  paper: {
    display: "flex",
    flexDirection: "column"
  },
  normalForm: {
    backgroundColor: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    "&:hover": {
      backgroundColor: grey[900]
    }
  },
  tabBackgroundColor: {
    backgroundColor: "#F5F5F5"
  },

  iconStyling: {
    position: "relative",
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
    display: 'none',
  },
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
  const [value, setValue] = useState(1);
  const [cardIcon, setCardIcon] = useState("");

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

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
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
          <Paper elevation={3} style={{ height: "auto" }}>
            <form className={classes.form}>
              <div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "1.5625rem", lineHeight: "1.4em" }}>
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
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="Student Email"
                      variant="outlined"
                      required
                      fullWidth
                      id="Student Email"
                      label="Student Email"
                      autoFocus
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
                      label="Major"
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
                    <TextField
                      name="University Name"
                      variant="outlined"
                      fullWidth
                      id="UniversityName"
                      label="University Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="University Email"
                      variant="outlined"
                      required
                      fullWidth
                      id="University Email"
                      label="University Email"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="University Link"
                      variant="outlined"
                      fullWidth
                      id="University Link"
                      label="University Website Link"
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
        </Container>
      </TabPanel>
      {/* //Atef */}
      <TabPanel className={classes.tabBackgroundColor} value={value} index={1}>
        <Container maxWidth="lg" style={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {cardsArray.map((card, i) => (
              <CardContext.Provider
                key={i}
                value={{
                  element: cardsArray.filter(element => element.id === i)
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
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container maxWidth="lg" style={{ flexGrow: 1 }}>
          <Paper elevation={3} style={{ height: "auto" }}>
            <form className={classes.form}>
              <div>
                <div style={{ textAlign: "Left" }}>
                  <p style={{ fontSize: "1.5625rem", lineHeight: "1.4em" }}>
                    Remarks
                  </p>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={5}>
                    <FormControl
                      as="textarea"
                      aria-label="With textarea"
                      rows="3"
                    />
                  </Grid>
                </Grid>
              </div>
              <br/>
              <div>
            
              <div style={{ textAlign: "Left" }}>
                  <p style={{ fontSize: "1.5625rem", lineHeight: "1.4em" }}>
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
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
        <CloudUpload style={{fontSize:"30px",marginRight:"10px"}}/>{"  "}
          Upload
        </Button>
      </label>
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
        </Container>
      </TabPanel>
    </div>
  );
}
