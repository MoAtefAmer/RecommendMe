import React,{useState,useContext, createContext,useEffect} from "react";


import {Typography,Card,Grid,CardContent, CardActionArea, IconButton,Button} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

import {RecommendationCardContext} from "./ViewRecommendations"
import { FaClipboard,FaClipboardList } from "react-icons/fa";
import { FiClipboard } from "react-icons/fi";
import {Delete} from "@material-ui/icons"
import InformationModal from "./InformationModal"
import AreYouSureModal from "./AreYouSureModal";
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
    color: "black"
  },
  iconStylingRaised: {
    position: "relative",
    fontSize: "62px",
    marginLeft: "40%",
    transition: "10"
  },
  CardMaster: {
   
    "&:hover": {
      cursor: "Pointer"
    }
  },

  CardMaster2: {
    backgroundColor: "black"
  },
  rootSlider: {
    color: "#7b1fa2"
  },
  iconStyling: {
    position: "relative",
    fontSize: "45px",
    marginLeft: "45%",
    color:"black"
  
  },
 deleteButton:{
   color:"#8e24aa"
 }
  
}));

export var InfoModalContext=React.createContext();

export var SmallModalContext=React.createContext();

export default function RecommendationCard() {
const classes = useStyles();


const context = useContext(RecommendationCardContext)
// console.log(context)

const CardMouseEnter = e => {
    setRaised(true);
  };
  const CardMouseLeave = e => {
    setRaised(false);
  };
  
  


  const [icon, SetIcon] = useState(<div />);
  const [raised, setRaised] = useState(false);
  const [infoModal,setInfoModal]=useState(<div/>)
  const [infoModalShow,setInfoModalShow]=useState(false)
  const [smallModal,setSmallModal]=useState(<div/>)
  const [smallModalShow,setSmallModalShow]=useState(false)


const infoModalCallback= (show)=>{
  setInfoModalShow(show)

}

const smallModalCallback =(show)=>{
  setSmallModalShow(show)
}

useEffect(()=>{
  setSmallModal(
    <SmallModalContext.Provider
   value={{
     show:smallModalShow,
     callback:smallModalCallback,
     docId:context.docId
   }}
    ><AreYouSureModal/></SmallModalContext.Provider>
    )

 },[smallModalShow])





 useEffect(()=>{
  setInfoModal(
    <InfoModalContext.Provider
   value={{
     show:infoModalShow,
     callback:infoModalCallback,
     studentName:context.studentName,
     studentEmail:context.studentEmail,
     major:context.major,
     universityEmail:context.universityEmail,
     universityName:context.universityName,
     universityLink:context.universityLink,
     evaluation:context.evaluation,
     remarks:context.remarks,
     pdfLink:context.pdfLink
   }}
    ><InformationModal/></InfoModalContext.Provider>
    )

 },[infoModalShow])




  return (
    <>
    <Grid item xs={12} sm={4}>
      <Card
        onMouseEnter={CardMouseEnter}
        onMouseLeave={CardMouseLeave}
        raised={raised}
        className={classes.CardMaster}
      >
        <CardActionArea onClick={e=>{
      setInfoModalShow(true)
       
        }}>
        {<FaClipboardList className={classes.iconStyling}/>}
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="h2">
         {context.studentName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
          to {context.universityName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
          Major: {context.major}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
         Student Email: {context.studentEmail}  
          </Typography>
        </CardContent>
        </CardActionArea>
        <Button
    
        color="secondary"
       onClick={e =>{
         setSmallModalShow(true)
       }}
        startIcon={<Delete />}
        fullWidth
      >
        Delete 
      </Button>
      </Card>
    </Grid>
    {infoModal}
    {smallModal}
    </>
  );
}
