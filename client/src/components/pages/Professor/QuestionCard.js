import React, { useState, useContext, useEffect } from "react";

import { Typography, Grid, Card, CardContent, Slider } from "@material-ui/core";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { grey,purple } from "@material-ui/core/colors";
import { Group, Search, School } from "@material-ui/icons";
import { CardContext } from "./CreateRecommendation";
import { IoMdAnalytics, IoMdBuild, IoMdTime, IoIosSad } from "react-icons/io";
import { GiChameleonGlyph, GiScaleMail } from "react-icons/gi";
import { FaEtsy, FaChess } from "react-icons/fa";
import clsx from "clsx"
import { Spring } from 'react-spring/renderprops'

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
    fontSize: "72px",
    marginLeft: "40%",
    transition:"10",
    color: "purple",
  
    
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
  }
}));

export default function QuestionCard() {
  const classes = useStyles();

  const [raised, setRaised] = useState(false);
  const [icon, SetIcon] = useState(<div />);
 

  const context = useContext(CardContext);

  const iconClassName = clsx({
    [classes.iconStylingRaised]:raised,
    [classes.iconStyling]:!raised
  });
  useEffect(() => {
    switch (context.element[0].icon) {
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
        SetIcon(<Search className={classes.iconStyling} />);
        break;
      case "punctuality":
        SetIcon(<IoMdTime className={classes.iconStyling} />);
        break;
      case "adaptation":
        SetIcon(<GiChameleonGlyph className={classes.iconStyling} />);
        break;
      case "stress":
        SetIcon(<IoIosSad className={classes.iconStyling} />);
        break;
      case "english":
        SetIcon(<FaEtsy className={classes.iconStyling} />);
        break;
      case "solving":
        SetIcon(<FaChess className={classes.iconStyling} />);
        break;
      case "gpa":
        SetIcon(<School className={classes.iconStyling} />);
    }
  }, [raised]);

  

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
        <Spring
        from={{opacity:0}}
        to={{opacity:1}}
        config={{duration:1000}}
        >
{props =>(
  <div style={props}>
 {icon}
  </div>
)

}

        </Spring>
       
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            {context.element[0].question}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            From a Scale of 1(weakest) to 5(Strongest), How Strong is this
            student's {context.element[0].question}?
          </Typography>
        </CardContent>

        <Slider
          style={{ maxWidth: "50%", position: "relative", marginLeft: "23%" }}
          defaultValue={3}
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
