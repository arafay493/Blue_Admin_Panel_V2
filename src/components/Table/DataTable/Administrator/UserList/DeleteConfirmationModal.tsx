import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  toggle: () => void;
  confirmDelete: () => void;
  selectedUser?: { name: string } | null;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  toggle,
  confirmDelete,
  selectedUser,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Deletion</ModalHeader>
      <ModalBody>
        Are you sure you want to delete the user{" "}
        {selectedUser?.name || "this user"}?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={confirmDelete}>
          Yes, Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmationModal;
