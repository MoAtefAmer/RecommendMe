import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../../../Grid/GridContainer.js";
import GridItem from "../../../Grid/GridItem.js";
import InfoArea from "../../../InfoArea/InfoArea.js";
import DoctorIcon from "@material-ui/icons/Group";
import UniversityIcon from "@material-ui/icons/LocationCity";
import styles from "../../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import StudentIcon from "@material-ui/icons/School";
import { CardActionArea } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s get started</h2>
          <h5 className={classes.description}>
            First you need to register an account on the website. You need to
            choose an account type from the options down below by simply by
            clicking down below. After you login, please use the dashed button
            on top left corner of the navbar to navigate.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CardActionArea
              onClick={e => {
                document.location.href = "/studentSignup";
              }}
            >
              <InfoArea
                title="Student"
                description="A Student account will enable you to request recommendations from professors registered to our website. However, if your professor does not have an account here on our website, simply type in his email and we will take care of the rest. "
                icon={StudentIcon}
                iconColor="info"
                vertical
              />
            </CardActionArea>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <CardActionArea
              onClick={e => {
                document.location.href = "/doctorSignup";
              }}
            >
              <InfoArea
                title="Professor"
                description="A Professor account will enable you to post student recommendations on our websites for Universities to see. Moreover, you will recieve notifications of recommendation request through our website and by email."
                icon={DoctorIcon}
                iconColor="primary"
                vertical
              />
            </CardActionArea>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CardActionArea
              onClick={e => {
                document.location.href = "/universitySignup";
              }}
            >
              <InfoArea
                title="University"
                description="A University account will enable you to view recommendations posted by professors, so that you are able to evaluate the student concerned."
                icon={UniversityIcon}
                iconColor="danger"
                vertical
              />
            </CardActionArea>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
