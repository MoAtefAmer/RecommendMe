import React ,{useState,useContext}from 'react'

import {
    Container,
    Typography,
    CssBaseline,
    Box,
    Tab,
    Tabs,
    AppBar,
    Paper,
    Grid,
    TextField,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Slider
  } from "@material-ui/core";

  import { makeStyles, withStyles } from "@material-ui/core/styles";
  import { grey, lightBlue, green, purple } from "@material-ui/core/colors";
  import TestIcon from "@material-ui/icons/Group";
  import {CardContext} from "./CreateRecommendation"

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: "#F5F5F5"
    },
    form: {
      padding: "3%",
      width: "100%"
    },
    paper: {
      display: "flex",
      flexDirection: "column"
    },
    normalForm: {
      backgroundColor: "linear-gradient(60deg, #ab47bc, #8e24aa)",
      "&:hover": {
        backgroundColor: grey[900]
      }
    },
    tabBackgroundColor: {
      backgroundColor: "#F5F5F5"
    },
  
    
    iconStyling: {
      position: "relative",
      fontSize: "65px",
      marginLeft: "40%"
    },
    CardMaster: {
    
      "&:hover": {
     cursor:"Pointer"
      
      }
    },
  
    CardMaster2: {
      backgroundColor: "black"
    },
  rootSlider:{
    color:"#7b1fa2"
  }
  }));

export default function QuestionCard() {
    const classes = useStyles();


const [raised,setRaised]=useState(false)



const context=useContext(CardContext);

console.log(context.element[0].question)

const CardMouseEnter= (e)=>{
  setRaised(true)
 
 
}
const CardMouseLeave= (e)=>{

   setRaised(false)
}


    return (
       
              <Grid item xs={12} sm={4}>
             <Card onMouseEnter={CardMouseEnter} onMouseLeave={CardMouseLeave} raised={raised} className={classes.CardMaster}>
               
                  <TestIcon className={classes.iconStyling} />
                  <CardContent>
                    <Typography align="center" gutterBottom variant="h5" component="h2">
                  {  context.element[0].question}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      From a Scale of 1(weakest) to 5(Strongest), How Strong is this student's analytical skills? 
                    </Typography>
                  </CardContent>
         
                  <Slider 
                  style={{maxWidth:"50%",position:"relative",marginLeft:"23%"}}
        defaultValue={3}
       classes={{root: classes.rootSlider}}
        aria-labelledby="discrete-slider-small-steps"
        step={1}
        marks={[{value:1,label:"Weakest"},{value:2},{value:3},{value:4},{value:5,label:"Strongest"}]}
        min={1}
        max={5}
       visible
  
      />
              
              </Card>
      
        </Grid>
    )
}
