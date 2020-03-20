import React,{useState,useContext} from 'react'
import {SmallModalContext} from "./RecommendationCard"
import {Modal} from "react-bootstrap"

export default function AreYouSureModal() {

const context = useContext(SmallModalContext)

var smallModalCallback=context.callback
console.log(smallModalCallback)
    return (
        <div>

<Modal
        size="sm"
        show={context.show}
        onHide={()=>{
            smallModalCallback(false)
        }}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
            
        </div>
    )
}
