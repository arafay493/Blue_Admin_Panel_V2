import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const DeleteConfirmationModal = ({
  isOpen,
  toggle,
  confirmDelete,
  //   selectedUser,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Deletion</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this doc ?
        {/* {selectedUser?.name || "this user"}? */}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={confirmDelete}>
          Yes, Delete
        </Button>
        {/* <Button color="primary" onClick={toggle}>
          Cancel
        </Button> */}
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmationModal;
