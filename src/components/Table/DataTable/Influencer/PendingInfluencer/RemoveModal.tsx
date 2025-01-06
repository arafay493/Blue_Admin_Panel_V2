// @ts-nocheck
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RemoveInfluencerRequestService } from "@/redux/services/influencerService";
import {
  fetchAllApprovedInfluencer,
  fetchAllPendingInfluencer,
  fetchAllRejectedInfluencer,
} from "@/redux/slices/influencerSlice";

const RemoveModal = ({ isOpen, toggle, data }) => {
  const dispatch = useAppDispatch();
  const confirmDelete = async () => {
    const res = await RemoveInfluencerRequestService({
      influencerRequestId: data?.id,
    });
   
    if (res.succeeded == false) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      dispatch(fetchAllPendingInfluencer());
      dispatch(fetchAllApprovedInfluencer());
      dispatch(fetchAllRejectedInfluencer());
      toggle();
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Remove</ModalHeader>
      <ModalBody>Are you sure want to remove this request ?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={confirmDelete}>
          Yes, Remove
        </Button>
        {/* <Button color="primary" onClick={toggle}>
          Cancel
        </Button> */}
      </ModalFooter>
    </Modal>
  );
};

export default RemoveModal;
