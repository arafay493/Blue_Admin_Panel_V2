import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteMasterItemType } from "@/redux/services/masterItemServices";
import { useAppDispatch } from "@/redux/hooks";
import { fetchAllMasterItemTypes } from "@/redux/slices/masterItemSlices";

type DeleteModalProps = {
  isOpen: boolean;
  toggle: () => void;
  details: { id: number; name: string } | null;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  toggle,
  details,
}) => {
  const dispatch = useAppDispatch();

  const confirmDelete = async () => {
    if (details) {
      const res = await DeleteMasterItemType({ id: details.id });
      if (res.succeeded === false) {
        toast.error(res.message);
        toggle();
      } else {
        toast.success(res.message);
        dispatch(fetchAllMasterItemTypes());
        toggle();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Deletion</ModalHeader>
      <ModalBody>
        Are you sure you want to delete the item "{details?.name}"?
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

export default DeleteModal;
