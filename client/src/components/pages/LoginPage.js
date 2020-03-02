import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Tooltip from "react-bootstrap/Tooltip";
// core components
import Avatar from "@material-ui/core/Avatar";
import StudentIcon from "@material-ui/icons/School";
import DoctorIcon from "@material-ui/icons/Group";
import UniversityIcon from "@material-ui/icons/LocationCity";
import Footer from "../Footer/Footer";
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import Button from "../CustomButtons/Button.js";
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import CardFooter from "../Card/CardFooter.js";
import CustomInput from "../CustomInput/CustomInput.js";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import TextField from "@material-ui/core/TextField";

import styles from "../../assets/jss/material-kit-react/views/loginPage.js";

import image from "../Images/studentSignup.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = e => {
    e.preventDefault();
    if (accountType) {
      switch (accountType) {
        case "Student":
          fetch(`http://localhost:3000/api/student/studentLogin`, {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            console.log(res.status);
            if (res.status === 200) {
              setEmail("");
              setPassword("");

              setTimeout(() => (document.location.href = "/"), 1000);
            }
          });
          break;
      }
    } else {
      console.log("Please select an account type");
    }
  };

  //console.log(accountType);
  console.log(email);
  console.log(password);
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      <OverlayTrigger
                        key={"left"}
                        placement={"left"}
                        overlay={
                          <Tooltip id={`tooltip-left`}>
                            Log in as a <strong>Student</strong>.
                          </Tooltip>
                        }
                      >
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => {
                            e.preventDefault();
                            setAccountType("Student");
                          }}
                        >
                          <Avatar className={classes.avatar}>
                            <StudentIcon />
                          </Avatar>
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        key={"bottom"}
                        placement={"bottom"}
                        overlay={
                          <Tooltip id={`tooltip-bottom`}>
                            Log in as a <strong>University</strong>
                          </Tooltip>
                        }
                      >
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => {
                            e.preventDefault();
                            setAccountType("University");
                          }}
                        >
                          <Avatar className={classes.avatar}>
                            <UniversityIcon />
                          </Avatar>
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        key={"right"}
                        placement={"right"}
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Log in as a <strong>Professor</strong>
                          </Tooltip>
                        }
                      >
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => {
                            e.preventDefault();
                            setAccountType("Professor");
                          }}
                        >
                          <Avatar className={classes.avatar}>
                            <DoctorIcon />
                          </Avatar>
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </CardHeader>

                  <CardBody>
                  <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />

                    <CustomInput
                      labelText="Password"
                      id="pass"
                      value={password}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",

                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        onChange: event => setPassword(event.target.value),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
