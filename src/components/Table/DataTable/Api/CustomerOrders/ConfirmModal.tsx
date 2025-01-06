// @ts-nocheck
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { InActiveOrder } from "@/redux/services/customerService";
import { fetchCustomerOrder } from "@/redux/slices/customerSlice";
import { toast } from "react-toastify";

const ConfirmModal = ({ isOpen, toggle, payload }) => {
  const dispatch = useAppDispatch();

  const selectedCityIdParam = useAppSelector(
    (state) => state.globalWarehouse.selectedCityId
  );
  const confirmInActive = async () => {
    const res = await InActiveOrder(payload);
    if (res.succeeded == false) {
      toast.error(res.message);
      toggle();
    } else {
      toast.success(res.message);
      dispatch(fetchCustomerOrder(selectedCityIdParam));
      toggle();
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm</ModalHeader>
      <ModalBody>Are you sure you want to Confirm this order ?</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={confirmInActive}>
          Yes, Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
