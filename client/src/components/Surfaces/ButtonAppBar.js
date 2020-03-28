import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Explore from "@material-ui/icons/Explore";
import Button from "../CustomButtons/Button";
import { grey } from "@material-ui/core/colors";
import styles from "../../assets/jss/material-kit-react/components/headerStyle";
import { Icon } from "@iconify/react";
import logoutIcon from "@iconify/icons-mdi/logout";
import loginIcon from "@iconify/icons-mdi/login";
import MenuDrawer from "./Drawer";
import { Notifications, NotificationsActive } from "@material-ui/icons";
import { Dropdown, DropdownButton } from "react-bootstrap";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";

import { ButtonGroup, Modal, Popover } from "react-bootstrap";

import Pusher from "pusher-js";
import { Typography, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  root2: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  test: {
    background: "blue"
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  navbarColor: {
    color: grey[900]
  },
  styles
}));
//const useStyles = makeStyles(styles);

export var MenuButtonContext = React.createContext();

export default function DenseAppBar() {
  const classes = useStyles();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleLogout = () => {
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("auth", "");
    sessionStorage.setItem("firstName", "");
    sessionStorage.setItem("lastName", "");
    sessionStorage.setItem("currentJob", "");
    sessionStorage.setItem("notificationId", "");
    sessionStorage.setItem("notificationStudentEmail", "");
    sessionStorage.setItem("notificationUniversityEmail", "");

    document.location.href = "/login";
  };

  var pusher = new Pusher("fadc34fcd344c46d6c16", {
    cluster: "eu",
    forceTLS: true
  });

  var channel = pusher.subscribe("my-channel");

  useEffect(() => {
    if (sessionStorage.getItem("auth") === "Professor") {
      fetch(`http://localhost:3000/api/doctor/getNotifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("token")
        }
      }).then(res => {
        res.json().then(data => {
          setNotifications(data.notifications.reverse());
          setLoaded(true);
        });
      });
      channel.bind("my-event", function(data) {
        setNotifications(notifications => [...notifications, data]);
      });
    }
  }, []);

  const handleNotificationClick = (id, studentEmail, universityEmail) => {
    fetch(`http://localhost:3000/api/doctor/readNotification`, {
      method: "POST",
      body: JSON.stringify({
        notificationId: id
      }),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.status);
      if (res.status === 200) {
        sessionStorage.setItem("notificationId", id);
        sessionStorage.setItem("notificationStudentEmail", studentEmail);
        sessionStorage.setItem("notificationUniversityEmail", universityEmail);

        document.location.href = "/createRecommendation";
      }
    });
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
      className={classes.navLink}
      onClick={e => {
        e.preventDefault();
        onClick(e);
        setShowNotifications(!showNotifications);
      }}
      color="transparent"
      href=""
      ref={ref}
      size="sm"
    >
      {children}
      <Notifications className={classes.icons} />
      Notifications
    </Button>
  ));

  return (
    <div id="navbar" className={classes.root}>
      <AppBar
        position="static"
        style={{ background: "#212121", position: "relative", zIndex: "1000" }}
      >
        <Toolbar variant="dense">
          <MenuButtonContext.Provider
            value={{
              foo: "test",
              handleLogout: handleLogout
            }}
          >
            <MenuDrawer style={{ zIndex: "9999" }} />
          </MenuButtonContext.Provider>
          <div className={classes.title}></div>
          <Button
            className={classes.navLink}
            onClick={e => e.preventDefault()}
            color="transparent"
            size="sm"
          >
            {" "}
            <Explore className={classes.icons} />
            Discover
          </Button>
{sessionStorage.getItem("auth") === "Professor" ?(  notifications.length > 0 ? (
            <Dropdown bsPrefix={{}}>
              <Dropdown.Toggle as={CustomToggle} />

              <Dropdown.Menu>
                <List
                  dense
                  style={{
                    maxHeight: 400,
                    overflow: "auto",
                    position: "relative",
                    zIndex: 5
                  }}
                >
                  {notifications.map((value, i) => {
                    return (
                      <ListItem
                        key={i}
                        button
                        onClick={e => {
                          value.read = true;
                          handleNotificationClick(
                            value._id,
                            value.studentEmail,
                            value.universityEmail
                          );
                        }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="end"
                            disableRipple
                            checked={value.read}
                            inputProps={{ "aria-labelledby": i }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={i}
                          primary={
                            value.studentName +
                            ` has requested your recommendation`
                          }
                        />

                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={e => {
                              console.log("delete");
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
           
            <Dropdown bsPrefix={{}}>
              <Dropdown.Toggle as={CustomToggle} />

              <Dropdown.Menu style={{ background: "#F5F5F5" }}>
                <List
                  dense
                  style={{
                    maxHeight: 400,
                    overflow: "auto",
                    position: "relative",
                    zIndex: 5
                  }}
                >
                  {loaded ? (
                    <Paper style={{ margin: "5%", padding: "2%" }}>
                      <NotificationsActive style={{ alignContent: "center" }} />
                      <Typography variant="subtitle1">
                        No Notifications Available
                      </Typography>
                    </Paper>
                  ) : (
                    <CircularProgress
                      style={{ color: "#8e24aa", marginLeft: "42%" }}
                      thickness={2.5}
                      size={20}
                      color="inherit"
                    />
                  )}
                </List>
              </Dropdown.Menu>
            </Dropdown>
          )):(<></>)

         }

          {sessionStorage.getItem("token") === "" ||
          sessionStorage.getItem("token") === null ? (
            <Button
              className={classes.navLink}
              onClick={e => {
                document.location.href = "/login";
              }}
              color="transparent"
            >
              {" "}
              <Icon icon={loginIcon} />
              LogIn
            </Button>
          ) : (
            <Button
              className={classes.navLink}
              onClick={handleLogout}
              color="transparent"
              size="sm"
            >
              {" "}
              <Icon icon={logoutIcon} />
              LogOut
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
