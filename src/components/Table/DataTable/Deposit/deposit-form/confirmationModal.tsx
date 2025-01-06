// components/ConfirmationModal.js
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ConfirmationModal = ({ isOpen, toggle, onConfirm, message }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Deposit </ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onConfirm}>
          Yes, Deposit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
