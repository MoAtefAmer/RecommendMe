import React, { useState, useContext } from "react";
import { Modal, ModalFooter, FormControl } from "react-bootstrap";
import { InfoModalContext } from "./RecommendationCard";
import {
  Typography,
  Grid,
  makeStyles,
  Slider,
  Avata,
  Button,
  Container
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { IoMdContact, IoIosContact } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";

const useStyles = makeStyles(theme => ({
  rootSlider: {
    color: "#7b1fa2"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function InformationModal() {
  const classes = useStyles();
  const context = useContext(InfoModalContext);
  //const [show, setShow] = useState(context.show);
  //var otherWindow = window.open();
  //otherWindow.opener = null;
  //otherWindow.location = "url";
  var target = "_blank";

  var infoModalCallback = context.callback;
  console.log(context);
  return (
    <>
      <Modal
        show={context.show}
        onHide={() => {
          infoModalCallback(false);
        }}
        size="xl"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {context.studentName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container maxWidth="lg" style={{ flexGrow: 1, marginTop: "2%" }}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Communication Skills:
                    <br />
                    <Slider
                      value={context.evaluation[0]}
                      classes={{ root: classes.rootSlider }}
                      aria-labelledby="discrete-slider-small-steps"
                      step={1}
                      min={1}
                      max={5}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    Problem Solving Skills:
                    <br />
                    <Slider
                      value={context.evaluation[1]}
                      classes={{ root: classes.rootSlider }}
                      aria-labelledby="discrete-slider-small-steps"
                      step={1}
                      min={1}
                      max={5}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  Research Skills:
                  <br />
                  <Slider
                    value={context.evaluation[2]}
                    classes={{ root: classes.rootSlider }}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    min={1}
                    max={5}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Technical Knowledge:
                  <br />
                  <Slider
                    value={context.evaluation[3]}
                    classes={{ root: classes.rootSlider }}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    min={1}
                    max={5}
                  />
                </Grid>
                </Grid>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  Analytical Skills:
                  <br />
                  <Slider
                    value={context.evaluation[4]}
                    classes={{ root: classes.rootSlider }}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    min={1}
                    max={5}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  Stress Handling:
                  <br />
                  <Slider
                    value={context.evaluation[6]}
                    classes={{ root: classes.rootSlider }}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    min={1}
                    max={5}
                  />
                </Grid>
                </Grid>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={5}>
                  Punctuality:
                  <br />
                  <Slider
                    value={context.evaluation[6]}
                    classes={{ root: classes.rootSlider }}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    min={1}
                    max={5}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  Adaptation Skills:
                  <br />
                  <Slider
                    value={context.evaluation[7]}
                    classes={{ root: classes.rootSlider }}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    min={1}
                    max={5}
                  />
                </Grid>
                </Grid>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  Grades:
                  <br />
                  <Slider
                    value={context.evaluation[8]}
                    classes={{ root: classes.rootSlider }}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    min={1}
                    max={5}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  English Skills:
                  <br />
                  <Slider
                    value={context.evaluation[9]}
                    classes={{ root: classes.rootSlider }}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    min={1}
                    max={5}
                  />
                </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} style={{ marginLeft: "14%" }} sm={3}>
                <IoIosContact style={{ fontSize: "200px" }} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h5"> Professor's Remarks:</Typography>
                <FormControl
                  as="textarea"
                  style={{ resize: "none" }}
                  rows="10"
                  disabled
                  value={context.remarks}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<FaFilePdf />}
                  onClick={e => {
                    window.open(context.pdfLink, "_blank");
                  }}
                >
                  View attached Pdf
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Modal.Body>
        <ModalFooter>
          <Typography variant="subtitle1" component="h2">
            From: {context.professorName}{" "}
            
            <br />
            Occupation: {context.professorCurrentJob}
            <br />
            Professor Email: {context.professorEmail}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            to {context.universityName}{" "}
            <a target={target} href={context.universityLink}>
              {" "}
              {context.universityLink}
            </a>
            <br />
            Major: {context.major}
            <br />
            Student Email: {context.studentEmail}
          </Typography>
        </ModalFooter>
        
      </Modal>
    </>
  );
}
