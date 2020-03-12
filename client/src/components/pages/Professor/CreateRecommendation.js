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
import { grey, lightBlue, green, purple } from "@material-ui/core/colors";
import QuestionCard from "./QuestionCard";
import TestIcon from "@material-ui/icons/Group";

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
  }
}));

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)"
  }
}))(Button);

export var CardContext = React.createContext();

export default function CreateRecommendation() {
  const classes = useStyles();
  const [value, setValue] = useState(1);

  const [cardsArray, setCardsArray] = useState([
    { question: "Analytical Skills", id: 0 },
    { question: "C Skills", id: 1 },
    { question: "V Skills", id: 2 }
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
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
                  element: cardsArray.filter(element => element.id===i)
                }}
              >
                <QuestionCard />
              </CardContext.Provider>
            ))}
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}
