import React ,{useState,useContext} from "react"
import {Modal,Button} from "react-bootstrap"
import {InfoModalContext} from "./RecommendationCard"

export default function InformationModal() {
    const context = useContext(InfoModalContext)
    const [show, setShow] = useState(context.show);
 

  var infoModalCallback=context.callback 
  console.log(context)
    return (
      <>
        <Modal
          show={context.show}
          onHide={()=>{
              infoModalCallback(false)
          }}
          
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Custom Modal Styling
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
              commodi aspernatur enim, consectetur. Cumque deleniti temporibus
              ipsam atque a dolores quisquam quisquam adipisci possimus
              laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
              accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
              reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
              deleniti rem!
            </p>
          </Modal.Body>
        </Modal>
      </>
    );
  }