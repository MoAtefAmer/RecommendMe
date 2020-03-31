import React from "react";

import classNames from "classnames";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import { Spring } from "react-spring/renderprops";

import GridContainer from "../../Grid/GridContainer.js";
import GridItem from "../../Grid/GridItem.js";

import { Link } from "react-scroll";

import Parallax from "../../Parallax/Parallax.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPage.js";

import ProductSection from "./Sections/ProductSection.js";
import { Button } from "@material-ui/core";

import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(styles);

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    background: "linear-gradient(60deg, #f44336, #f44336)",
    margin: theme.spacing(1)
  }
}))(Button);

export default function LandingPage(props) {
  const classes = useStyles();
 
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 600 }}>
      {props => (
        <div style={props}>
          <div>
            <Parallax filter image={require("../../Images/university.jpg")}>
              <div className={classes.container}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <h1 className={classes.title}>Recommend Me</h1>
                    <h4>
                      Welcome to Recommend Me, a platform that facilitates and
                      makes recommending students to universities easier.
                    </h4>
                    <br />
                    <Link
                      activeClass="active"
                      to="down"
                      spy={true}
                      smooth={true}
                      duration={1000}
                      offset={0}
                    >
                      <ColorButton variant="outlined" size="large">
                        Get Started
                      </ColorButton>
                    </Link>
                  </GridItem>
                </GridContainer>
              </div>
            </Parallax>

            <div className={classNames(classes.main, classes.mainRaised)}>
              <div className={classes.container} id="down">
                <ProductSection />
              </div>
            </div>
          </div>
        </div>
      )}
    </Spring>
  );
}
