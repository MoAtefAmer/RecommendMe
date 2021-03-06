import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { MenuButtonContext } from "./ButtonAppBar";
import StudentIcon from "@material-ui/icons/School";
import DoctorIcon from "@material-ui/icons/Group";
import UniversityIcon from "@material-ui/icons/LocationCity";
import DrawerButtonItem from "./DrawerButtonItem";

import {
  IoIosCreate,
  IoIosUnlock,
  IoIosLogOut,
  IoIosLogIn
} from "react-icons/io";
import { MdLibraryBooks, MdLibraryAdd } from "react-icons/md";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export var DrawerContext = React.createContext();

export default function TemporaryDrawer() {
  const classes = useStyles();

  const openDrawer = useContext(MenuButtonContext);

  const [left, setLeft] = useState(openDrawer.menuClick);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setLeft(open);
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {sessionStorage.getItem("token") === "" ||
        sessionStorage.getItem("token") === null ? (
          <>
            <ListItem
              button
              key={"Sign Up as a Student"}
              onClick={() => {
                document.location.href = "/studentSignup";
              }}
            >
              <ListItemIcon>
                <StudentIcon />
              </ListItemIcon>
              <ListItemText primary={"Register as a Student"} />
            </ListItem>
            <ListItem
              button
              key={"Sign Up as a University"}
              onClick={() => {
                document.location.href = "/universitySignup";
              }}
            >
              <ListItemIcon>
                <UniversityIcon />
              </ListItemIcon>
              <ListItemText primary={"Register as a University"} />
            </ListItem>
            <ListItem
              button
              key={"Sign Up as a Professor"}
              onClick={() => {
                document.location.href = "/doctorSignup";
              }}
            >
              <ListItemIcon>
                <DoctorIcon />
              </ListItemIcon>
              <ListItemText primary={"Register as a Professor"} />
            </ListItem>
          </>
        ) : sessionStorage.getItem("auth") === "Student" ? (
          <>
            <DrawerContext.Provider
              value={{
                key: "Request Recommendation",
                primary: "Request Recommendation",
                onClick: "rr",
                icon: <IoIosCreate style={{ fontSize: "25px" }} />
              }}
            >
              <DrawerButtonItem />
            </DrawerContext.Provider>

            <DrawerContext.Provider
              value={{
                key: "View Recommendations3",
                primary: "View Recommendations",
                onClick: "vr",
                icon: <MdLibraryBooks style={{ fontSize: "25px" }} />
              }}
            >
              <DrawerButtonItem />
            </DrawerContext.Provider>

            <DrawerContext.Provider
              value={{
                key: "Change Password",
                primary: "Change Password",
                onClick: "cp",
                icon: <IoIosUnlock style={{ fontSize: "25px" }} />
              }}
            >
              <DrawerButtonItem />
            </DrawerContext.Provider>
          </>
        ) : sessionStorage.getItem("auth") === "Professor" ? (
          <>
            <DrawerContext.Provider
              value={{
                key: "Create Recommendation",
                primary: "Create Recommendation",
                onClick: "cr",
                icon: <MdLibraryAdd style={{ fontSize: "25px" }} />
              }}
            >
              <DrawerButtonItem />
            </DrawerContext.Provider>

            <DrawerContext.Provider
              value={{
                key: "View My Recommendations",
                primary: "View My Recommendations",
                onClick: "vr",
                icon: <MdLibraryBooks style={{ fontSize: "25px" }} />
              }}
            >
              <DrawerButtonItem />
            </DrawerContext.Provider>
            <DrawerContext.Provider
              value={{
                key: "Change Password",
                primary: "Change Password",
                onClick: "changePassword",
                icon: <IoIosUnlock style={{ fontSize: "25px" }} />
              }}
            >
              <DrawerButtonItem />
            </DrawerContext.Provider>
          </>
        ) : sessionStorage.getItem("auth") === "University" ? (
          <>
            <DrawerContext.Provider
              value={{
                key: "View Recommendations2",
                primary: "View Recommendations",
                onClick: "vr",
                icon: <MdLibraryBooks style={{ fontSize: "25px" }} />
              }}
            >
              <DrawerButtonItem />
            </DrawerContext.Provider>

            <DrawerContext.Provider
              value={{
                key: "Change Password",
                primary: "Change Password",
                onClick: "changePassword",
                icon: <IoIosUnlock style={{ fontSize: "25px" }} />
              }}
            >
              <DrawerButtonItem />
            </DrawerContext.Provider>
          </>
        ) : (
          <>
            <DrawerContext.Provider
              value={{
                key: "Admin",
                primary: "Admin",
                onClick: "rr"
              }}
            >
              <DrawerButtonItem />
            </DrawerContext.Provider>
          </>
        )}
      </List>

      <Divider />
      <List>
        {sessionStorage.getItem("token") === "" ||
        sessionStorage.getItem("token") === null ? (
          <ListItem
            button
            key={"LogIn"}
            onClick={() => {
              document.location.href = "/login";
            }}
          >
            <ListItemIcon>
              <IoIosLogIn style={{ fontSize: "25px" }} />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>
        ) : (
          <ListItem
            button
            key={"logout"}
            onClick={() => {
              openDrawer.handleLogout();
            }}
          >
            <ListItemIcon>
              <IoIosLogOut style={{ fontSize: "25px" }} />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        onClick={toggleDrawer("left", true)}
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>

      <Drawer open={left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}
