import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ReportModal({ open, onClose, onReport, storyId }) {
  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Are you sure you want to report this?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Reporting a story will remove it for everyone.</p>

        <p>Please only do this if the prompt is racist, sexist, or otherwise offensive.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            onReport(storyId);
          }}
        >
          Report
        </Button>
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ReportModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReport: PropTypes.func.isRequired,
  storyId: PropTypes.number.isRequired,
};

export default ReportModal;
