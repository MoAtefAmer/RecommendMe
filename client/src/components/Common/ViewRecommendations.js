import React, { useState, useEffect } from "react";

import { Container, Grid, Backdrop, CircularProgress } from "@material-ui/core";
import RecommendationCard from "./RecommendationCard";
import Pagination from "@material-ui/lab/Pagination";

import { makeStyles } from "@material-ui/core/styles";
import { Spring } from "react-spring/renderprops";


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
  backdrop: {
    color: "white",
    zIndex: "100000",
    size: "200px"
  },
  pag: {
    color: "#8e24aa"
  }
}));

export var RecommendationCardContext = React.createContext();

export default function ViewRecommendations() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [cardsArray, setCardsArray] = useState([]);
  const [count, setCount] = useState();
  const [shouldILoad, setShouldILoad] = useState(true);

  useEffect(() => {
    var stateLoad = "";
    switch (sessionStorage.getItem("auth")) {
      case "Professor":
        stateLoad = "doctor";
        break;
      case "University":
        stateLoad = "university";
        break;
      case "Student":
        stateLoad = "student";
        break;
    }

    setLoading(true);
    fetch(
      `https://recommendationsystematef.herokuapp.com/api/${stateLoad}/getRecommendations?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("token")
        }
      }
    ).then(res => {
      res.json().then(data => {
        setCardsArray(data.data);
        setCount(Math.ceil(data.count / limit));
        setLoading(false);
      });
    });
  }, [page]);

  useEffect(() => {
    if (count === 1 || count === 0) {
      setShouldILoad(false);
    }
  }, [count]);

  return (
    <Container maxWidth="lg" style={{ flexGrow: 1, marginTop: "2%" }}>
      {!loading ? (
        <Spring
          from={{ opacity: 0, transform: "translate3d(-100%,0,0)" }}
          to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        >
          {props => (
            <div style={props}>
              <Grid container spacing={2}>
                {cardsArray.map((card, i) => (
                  <RecommendationCardContext.Provider
                    key={i}
                    value={{
                      studentName: card.studentName,
                      studentEmail: card.studentEmail,
                      major: card.major,
                      universityEmail: card.uemail,
                      universityName: card.universityName,
                      universityLink: card.universityLink,
                      evaluation: [
                        card.communicationSkills,
                        card.problemSolvingSkills,
                        card.researchSkills,
                        card.technicalKnowledge,
                        card.analyticalSkills,
                        card.stressHandling,
                        card.punctuality,
                        card.adaptationSkills,
                        card.grades,
                        card.englishSkills
                      ],
                      remarks: card.remarks,
                      pdfLink: card.pdfLink,
                      docId: card._id,
                      professorName: card.professorName,
                      professorEmail: card.professorEmail,
                      professorCurrentJob: card.professorCurrentJob
                    }}
                  >
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
                    {shouldILoad && (
                      <Pagination
                        size="large"
                        count={count}
                        color="secondary"
                        page={page}
                        onChange={(e, pageNumber) => {
                          setPage(pageNumber);
                        }}
                      />
                    )}

                    {cardsArray.length === 0 && (
                      <h1>There are no Recommendations posted yet!</h1>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}></Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </Spring>
      ) : (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress className={classes.backdrop} color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
}
