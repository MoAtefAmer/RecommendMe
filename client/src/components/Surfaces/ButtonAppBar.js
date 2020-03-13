import React, { useContext, useState } from "react";
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
import { Notifications } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,  
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

  const handleLogout = () => {
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("auth", "");
    sessionStorage.setItem("firstName", "");
    sessionStorage.setItem("lastName", "");
    sessionStorage.setItem("currentJob", "");
    document.location.href = "/login";
  };

  return (
    <div id="navbar" className={classes.root}>
      <AppBar position="static" style={{ background: "#212121" }}>
        <Toolbar variant="dense" >
          <MenuButtonContext.Provider
            value={{
              foo: "test",
              handleLogout: handleLogout
            }}
          >
            <MenuDrawer />
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

          {sessionStorage.getItem("auth") === "Professor" ? (
            <Button
              className={classes.navLink}
              onClick={e => e.preventDefault()}
              color="transparent"
              size="sm"
            >
              {" "}
              <Notifications className={classes.icons} />
              Notifications
            </Button>
            // console.log('t')
          ) : (
         console.log('t')
          )}

          {sessionStorage.getItem("token") !== "" ? (
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
          ) : (
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
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
