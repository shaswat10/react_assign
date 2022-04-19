import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

function ModalPopup({ status, show, handleClose, handleShow, deleteUser }) {
//   const [show, setShow] = useState(status);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPopup;
