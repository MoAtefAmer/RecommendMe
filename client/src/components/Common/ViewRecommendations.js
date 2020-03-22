import React, { useState, useEffect } from "react";

import { Typography, Container, Grid, Button,Backdrop,CircularProgress } from "@material-ui/core";
import RecommendationCard from "./RecommendationCard";
import Pagination from "@material-ui/lab/Pagination";

import { makeStyles } from "@material-ui/core/styles";
import { Spring } from "react-spring/renderprops";
import InfiniteScroll from "react-infinite-scroll-component";
import {PaginationItem} from "@material-ui/lab"


const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    background: "black"
  },
  cards: {
    display: "flex",
    maxWidth: "80%",
    margin: "2% auto",
    flexWrap: "wrap",
    alignItems: "flexStart"
  },

  Pagination: {
    "& > *": {}
  },
  backdrop:{
    color:"#8e24aa"
  },
  pag:{
    color:"#8e24aa",
  
  }
}));

export var RecommendationCardContext = React.createContext();

export default function ViewRecommendations() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [page,setPage]=useState(1)
  const [limit,setLimit]=useState(6);
  const [cardsArray, setCardsArray] = useState([]);
  const [count,setCount]=useState();
  const [shouldILoad,setShouldILoad]=useState(true)

 

  useEffect(() => {

var stateLoad="";
switch(sessionStorage.getItem("auth")){
  case "Professor":stateLoad="doctor";
  break;
  case "University": stateLoad="university";
  break;
  case "Student":stateLoad="student";
  break;

}

    setLoading(true)
    fetch(`http://localhost:3000/api/${stateLoad}/getRecommendations?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token":sessionStorage.getItem("token")
      },
    }).then(res => {
      res.json().then(data => {
        setCardsArray(data.data);
        setCount(Math.ceil((data.count)/limit))
        setLoading(false)
      });
    });
    

  }, [page]);
 




console.log(cardsArray)
 console.log(count) 

 
useEffect(()=>{
if(count===1 || count===0){
  setShouldILoad(false)
}

},[count])


  return (
    <Container maxWidth="lg" style={{ flexGrow: 1, marginTop: "2%" }}>



     {!loading ? (<Spring
   from={{ opacity: 0, transform: "translate3d(-100%,0,0)" }}
   to={{ opacity: 1, transform: "translate3d(0,0,0)" }}>
  {props => <div style={props}>
  <Grid container spacing={2}>
        {cardsArray.map((card, i) => (
         
          <RecommendationCardContext.Provider key={i} value={{
            studentName:card.studentName,
            studentEmail:card.studentEmail,
            major:card.major,
            universityEmail:card.uemail,
            universityName:card.universityName,
            universityLink:card.universityLink,
            evaluation:[card.communicationSkills,card.problemSolvingSkills,card.researchSkills,card.technicalKnowledge,card.analyticalSkills,card.stressHandling,card.punctuality,card.adaptationSkills,card.grades,card.englishSkills],
            remarks:card.remarks,
            pdfLink:card.pdfLink,
            docId:card._id,
            professorName:card.professorName,
            professorEmail:card.professorEmail,
            professorCurrentJob:card.professorCurrentJob

          }}>
            <RecommendationCard />
          </RecommendationCardContext.Provider>
        ))}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}></Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={{ marginTop: "5%", marginLeft: "2%" }}
           
          >
            {shouldILoad &&
            <Pagination  count={count} color="secondary" page={page} onChange={(e,pageNumber) =>{
             
              setPage(pageNumber)
             
            }} />

          }


          {
            cardsArray.length===0 &&<h1>Looks like there is nothing to load!</h1>
          }
          </Grid>
          <Grid item xs={12} sm={4}></Grid>
        </Grid>
      </Grid>
    
    </div>}
</Spring> ):(<Backdrop className={classes.backdrop} invisible open={true} >
        <CircularProgress className={classes.backdrop} color="inherit" />
      </Backdrop>)}
     
    </Container>
  );
}
