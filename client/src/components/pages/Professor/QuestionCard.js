import React, { useState, useContext, useEffect } from "react";

import { Typography, Grid, Card, CardContent, Slider } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Group, Search, School } from "@material-ui/icons";
import { CardContext } from "./CreateRecommendation";
import { IoMdAnalytics, IoMdBuild, IoMdTime, IoIosSad } from "react-icons/io";
import { GiChameleonGlyph } from "react-icons/gi";
import { FaEtsy, FaChess } from "react-icons/fa";
import clsx from "clsx"

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
    fontSize: "62px",
    marginLeft: "40%",
    color:"black"
  
  },
  iconStylingRaised:{
    position: "relative",
    fontSize: "62px",
    marginLeft: "40%",
    transition:"10",
 
  
    
  },
  CardMaster: {

    "&:hover": {
      cursor: "Pointer"
    },
  },

  CardMaster2: {
    backgroundColor: "black"
  },
  rootSlider: {
    color: "#7b1fa2"
  },



}));

export default function QuestionCard() {
  const classes = useStyles();

  const [raised, setRaised] = useState(false);
  const [icon, SetIcon] = useState(<div />);

  const context = useContext(CardContext);
  var parentCallback=context.callback

const [slizor,setSlizor]=useState(context.valueArray);
 

  const iconClassName = clsx({
    [classes.iconStylingRaised]:raised,
    [classes.iconStyling]:!raised
  });




 
  useEffect(() => {
  
    switch (context.icon) {
      default:
        SetIcon(<Group className={iconClassName} />);
        break;
      case "analytics":
        SetIcon(<IoMdAnalytics className={iconClassName} />);
        break;
      case "technical":
        SetIcon(<IoMdBuild className={iconClassName} />);
        break;
      case "research":
        SetIcon(<Search className={iconClassName} />);
        break;
      case "punctuality":
        SetIcon(<IoMdTime className={iconClassName} />);
        break;
      case "adaptation":
        SetIcon(<GiChameleonGlyph className={iconClassName} />);
        break;
      case "stress":
        SetIcon(<IoIosSad className={iconClassName} />);
        break;
      case "english":
        SetIcon(<FaEtsy className={iconClassName}/>);
        break;
      case "solving":
        SetIcon(<FaChess className={iconClassName} />);
        break;
      case "gpa":
        SetIcon(<School className={iconClassName} />);
    }
    
// console.log("Child: "+context.sliderValue)
  }, [raised,iconClassName,context.element]);

 

  const CardMouseEnter = e => {
    setRaised(true);
  };
  const CardMouseLeave = e => {
    setRaised(false);
  };

  return (
    <Grid item xs={12} sm={4}>
      <Card
        onMouseEnter={CardMouseEnter}
        onMouseLeave={CardMouseLeave}
        raised={raised}
        className={classes.CardMaster}
     
      >
 
{icon}
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            {context.question}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            From a Scale of 1(weakest) to 5(Strongest), How Strong is this
            student's {context.question}?
          </Typography>
        </CardContent>
        <Slider
    style={{ maxWidth: "50%", position: "relative", marginLeft: "23%" }}
    onChangeCommitted={(e,value) =>{
      setSlizor(value)
     
     
     parentCallback(value,context.index)
     
     
    }}
    value={slizor}
    classes={{ root: classes.rootSlider }}
    aria-labelledby="discrete-slider-small-steps"
    step={1}
    marks={[
      { value: 1, label: "Weakest" },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5, label: "Strongest" }
    ]}
    min={1}
    max={5}
    valueLabelDisplay="auto"
  />
         
      </Card>
    </Grid>
  );
}

