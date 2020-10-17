import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ReportModal(props) {
  return (
    <Modal show={props.open} onHide={props.onClose}>
      <Modal.Header>
        <Modal.Title>Are you sure you want to report this?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Reporting a story will remove it for everyone.</p>

        <p>
          Please only do this if the prompt is racist, sexist, or otherwise
          offensive.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            props.onReport(props.storyId);
          }}
        >
          Report
        </Button>
        <Button variant="outline-secondary" onClick={props.onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReportModal;
