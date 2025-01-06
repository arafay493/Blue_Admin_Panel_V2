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
import {
  fetchAllApprovedInfluencer,
  fetchAllPendingInfluencer,
  fetchAllRejectedInfluencer,
} from "@/redux/slices/influencerSlice";
import { ApproveInfluencerRequestService } from "@/redux/services/influencerService";

const ApproveModal = ({ isOpen, toggle, data }) => {
  const dispatch = useAppDispatch();
  const confirmDelete = async () => {
    const res = await ApproveInfluencerRequestService({
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
      <ModalHeader toggle={toggle}>Confirm Deletion</ModalHeader>
      <ModalBody>Are you sure want to approve this request ?</ModalBody>
      <ModalFooter>
        <Button color="success" onClick={confirmDelete}>
          Yes, Approve
        </Button>
        {/* <Button color="primary" onClick={toggle}>
          Cancel
        </Button> */}
      </ModalFooter>
    </Modal>
  );
};

export default ApproveModal;
