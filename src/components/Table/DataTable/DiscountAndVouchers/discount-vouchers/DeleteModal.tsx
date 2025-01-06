// @ts-nocheck
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MaterialReactTable } from "material-react-table";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
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
import { updateOrderAssignmentConsignment } from "@/redux/services/customerService";
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import { DeleteVoucherService } from "@/redux/services/discountAndVouchersService";
import { fetchDiscountedVouchers } from "@/redux/slices/discountAndVouchersSlice";

const DeleteModal = ({ isOpen, toggle, voucher }) => {
  const dispatch = useAppDispatch();
  const confirmDelete = async () => {
    const res = await DeleteVoucherService({ voucherId: voucher?.id });
    if (res.succeeded == false) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      dispatch(fetchDiscountedVouchers());
      toggle();
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Inactive/Active</ModalHeader>
      <ModalBody>Are you sure you want to Inactive this voucher ? </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={confirmDelete}>
          Yes, Inactive
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
