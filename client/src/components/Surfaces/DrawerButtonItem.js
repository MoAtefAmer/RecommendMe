import React, {useContext} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StudentIcon from "@material-ui/icons/School";
import {DrawerContext} from "./Drawer"

export default function DrawerButtonItem() {


const context = useContext(DrawerContext)

const handleOnClick= ()=>{

    switch(context.onClick){
        case "rr":
            document.location.href="/requestRecommendation";
            break;
        case "cp":
            document.location.href="/changePassword";    
            break;
            default:console.log("default")
            break;
    }
}




  return (
    <ListItem button key={"Request Recommendation"}>
      <ListItemIcon>
      {context.icon}
      </ListItemIcon>
      <ListItemText
        onClick={handleOnClick}
        primary={context.primary}
      />
    </ListItem>
  );
}


