import React, { useState, useContext } from "react";
import { SmallModalContext } from "./RecommendationCard";
import { Modal } from "react-bootstrap";
import { withStyles, Button } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

export default function AreYouSureModal() {
  const context = useContext(SmallModalContext);

  const ColorButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
      margin: theme.spacing(1)
    }
  }))(Button);

  var smallModalCallback = context.callback;
  const docId = context.docId;

  const handleYes = e => {

 
if(sessionStorage.getItem("auth")==="Professor"){

  fetch(`http://localhost:3000/api/doctor/deleteProfView`, {
    method: "POST",
    body: JSON.stringify({ id: docId }),

    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("token")
    }
  }).then(res => {
    console.log("yeahhh");
    window.location.reload();
  });

}

if(sessionStorage.getItem("auth")==="University"){

  fetch(`http://localhost:3000/api/university/deleteUniView`, {
    method: "POST",
    body: JSON.stringify({ id: docId }),

    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("token")
    }
  }).then(res => {
    console.log("yeahhh");
    window.location.reload();
  });

}

if(sessionStorage.getItem("auth")==="Student"){

  fetch(`http://localhost:3000/api/student/deleteStudentView`, {
    method: "POST",
    body: JSON.stringify({ id: docId }),

    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("token")
    }
  }).then(res => {
    console.log("yeahhh");
    window.location.reload();
  });

}

   
  };

  return (
    <div>
      <Modal
        size="sm"
        show={context.show}
        onHide={() => {
          smallModalCallback(false);
        }}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Are you Sure you want to delete this form?
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="contained" color="secondary" onClick={handleYes}>
            Yes
          </Button>
          <ColorButton
            onClick={e => {
              smallModalCallback(false);
            }}
          >
            No
          </ColorButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
