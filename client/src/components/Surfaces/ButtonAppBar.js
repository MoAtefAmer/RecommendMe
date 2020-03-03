import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Explore from "@material-ui/icons/Explore";
import Button from "../CustomButtons/Button";
import { grey } from "@material-ui/core/colors";
import styles from "../../assets/jss/material-kit-react/components/headerStyle";
import { Icon, InlineIcon } from "@iconify/react";
import logoutIcon from "@iconify/icons-mdi/logout";
import loginIcon from "@iconify/icons-mdi/login";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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

export default function DenseAppBar() {
  const classes = useStyles();

  const handleLogout = e => {
    e.preventDefault();
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("auth", "");
    document.location.href = "/login";
  };

  return (
    <div id="navbar" className={classes.root}>
      <AppBar position="static" style={{ background: "#212121" }}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.title}></div>
          <Button
            className={classes.navLink}
            onClick={e => e.preventDefault()}
            color="transparent"
          >
            {" "}
            <Explore className={classes.icons} />
            Discover
          </Button>

          {sessionStorage.getItem("token") !== "" ? (
            <Button
              className={classes.navLink}
              onClick={handleLogout}
              color="transparent"
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
