import React from "react";
import { Modal, ModalBody, ModalFooter, Button, ModalHeader } from "reactstrap";

const DeleteConfirmationModal = ({ isOpen, toggle, onConfirm, message }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Deletion</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onConfirm}>
          Yes, Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmationModal;
