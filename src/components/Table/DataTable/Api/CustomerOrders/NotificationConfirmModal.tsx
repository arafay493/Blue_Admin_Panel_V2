import React from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { NotifyCustomer } from "@/redux/services/customerService";

import { toast } from "react-toastify";

const NotificationConfirmModal = ({ isOpen, toggle, payload }) => {
  const notifyCustomer = async () => {
    const res: any = await NotifyCustomer(payload);
    if (res.statusCode == 422) {
      toast.error(res?.message);
      toggle();
    } else if (res.statusCode == 200) {
      toast.success(res.message);
      toggle();
    } else {
      toast.error(res.message);
      toggle();
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Notification </ModalHeader>
      <ModalBody>Are you sure you want to notify ? </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={notifyCustomer}>
          Yes, Notifiy
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NotificationConfirmModal;
