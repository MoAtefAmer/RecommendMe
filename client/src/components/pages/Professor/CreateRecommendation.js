import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
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
  FormControl,
  FormLabel,
  FormGroup
} from "@material-ui/core";

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
  
    backgroundColor: theme.palette.background.paper
  },
  form: {
    padding: "3%",
    width: "100%"
  },
  paper: {
    display: "flex",
    flexDirection: "column"
  }
}));

export default function CreateRecommendation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
          <Tab label="Student Information" {...a11yProps(0)} />
          <Tab label="Student Evaluation" {...a11yProps(1)} />
          <Tab label="Univeristy Information" {...a11yProps(2)} />
          <Tab label="My Information" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel style={{ backgroundColor: "#F5F5F5" }} value={value} index={0}>
        <CssBaseline />

        <Container maxWidth="lg" style={{ flexGrow: 1 }}>
          <Paper elevation={3} style={{ height: "80vh" }}>
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
                <p style={{ fontSize: "1.5625rem", lineHeight: "1.4em",paddingTop:"4%" }}>
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

            </form>
          </Paper>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
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
