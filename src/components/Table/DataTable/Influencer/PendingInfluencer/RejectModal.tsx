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
import { RejectInfluencerRequestService } from "@/redux/services/influencerService";
import {
  fetchAllApprovedInfluencer,
  fetchAllPendingInfluencer,
  fetchAllRejectedInfluencer,
} from "@/redux/slices/influencerSlice";

const RejectModal = ({ isOpen, toggle, data }) => {
  const dispatch = useAppDispatch();
  const confirmDelete = async () => {
    const res = await RejectInfluencerRequestService({
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
      <ModalHeader toggle={toggle}>Confirm Reject</ModalHeader>
      <ModalBody>Are you sure want to reject this request ?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={confirmDelete}>
          Yes, Reject
        </Button>
        {/* <Button color="primary" onClick={toggle}>
          Cancel
        </Button> */}
      </ModalFooter>
    </Modal>
  );
};

export default RejectModal;
