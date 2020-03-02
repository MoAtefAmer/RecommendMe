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
            href="#pablo"
            className={classes.navLink}
            onClick={e => e.preventDefault()}
            color="transparent"
          > <Explore className={classes.icons} />
            Discover
          </Button>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
