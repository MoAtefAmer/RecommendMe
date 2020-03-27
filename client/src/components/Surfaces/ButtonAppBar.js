import React, { useEffect, useState,useContext } from "react";
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
import { Dropdown, DropdownButton } from "react-bootstrap";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { ButtonGroup ,Modal,Popover} from "react-bootstrap";

import Pusher from "pusher-js"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    
  },
  root2: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    
  },
  test:{
background:"blue",

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
 
  const [notifications,setNotifications]=useState([])
  const [showNotifications,setShowNotifications]=useState(false)
const [studentEmail,setStudentEmail]=useState("")

  
  const handleLogout = () => {
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("auth", "");
    sessionStorage.setItem("firstName", "");
    sessionStorage.setItem("lastName", "");
    sessionStorage.setItem("currentJob", "");
    sessionStorage.setItem("notificationId","")
    sessionStorage.setItem("notificationStudentEmail","")
    sessionStorage.setItem("notificationUniversityEmail","")
   
    document.location.href = "/login";
  };

  var pusher = new Pusher('fadc34fcd344c46d6c16', {
    cluster: 'eu',
    forceTLS: true
  });

  var channel = pusher.subscribe('my-channel');

  useEffect(() => {
   if(sessionStorage.getItem("auth")==="Professor"){

   
    fetch(`http://localhost:3000/api/doctor/getNotifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token":sessionStorage.getItem("token")
      }
    }).then(res => {
      res.json().then(data => {
        setNotifications(data.notifications.reverse());
        
      });
    });
    channel.bind('my-event', function(data) {
      console.log(data.studentEmail)
      setStudentEmail(data.studentEmail)
      console.log(data.id)
      console.log(data.universityEmail)
      console.log(data.studentName)
      //Here you need to create an instance of a notification by adding it to the array 
      //and find a way to dynamically make the mapping function detect the array change
      //so that it would appear as a notification
     });
   

  }
}, []);

  console.log(notifications)


 


  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
      className={classes.navLink}
      onClick={e => {
        e.preventDefault();
        onClick(e);
        setShowNotifications(!showNotifications)
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
      
      <AppBar position="static" style={{ background: "#212121",position:"relative",zIndex:"1000" }}>
        <Toolbar variant="dense">
          <MenuButtonContext.Provider
            value={{
              foo: "test",
              handleLogout: handleLogout
            }}
          >
            <MenuDrawer style={{zIndex:"9999"}}/>
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
            
            <Dropdown  bsPrefix={{}}>
              <Dropdown.Toggle as={CustomToggle} />
            
  
              
              <Dropdown.Menu  >
              
                <List
                  dense
                  
                  style={{ maxHeight: 400, overflow: "auto",position:"relative",zIndex:5 }}
                >
                  {notifications.map((value,i) => {
           
                    return (
                      <ListItem key={i} button  onClick={e=>{
                      sessionStorage.setItem("notificationId",value._id)
                      sessionStorage.setItem("notificationStudentEmail",value.studentEmail)
                      sessionStorage.setItem("notificationUniversityEmail",value.universityEmail)
                        
                        document.location.href="/createRecommendation"
                      }}>
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
                          primary={value.studentName+  ` has requested your recommendation`}
                        />

                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={e=>{console.log("delete")}}>
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
            // console.log('t')
            console.log("t")
          )}

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
