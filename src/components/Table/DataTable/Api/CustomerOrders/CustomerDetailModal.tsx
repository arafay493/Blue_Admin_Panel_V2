import StaticInputs from "@/components/StaticInputs/StaticInputs";
import moment from "moment";
import React from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";

const CustomerOrderDetailModal = ({ isOpen, toggle, orderDetail }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Order Details</ModalHeader>
      <ModalBody>
        <StaticInputs
          labels={[
            "Order ID",
            "Customer Code",
            "Customer Name",
            "Customer Phone",
            "Status",
            "Invoice Type",
            "Payment Type",
            "Quantity",
            "Delivery Date",
            "Order Required Date",
            "Confirmed Date",
            "Total Amount",
            "Wallet Deduction",
            "Order Amount",
            "Vehicle",
            "City",
            "Province",
          ]}
          values={[
            orderDetail.orderCode || "NA",
            orderDetail.customerCode || "NA",
            orderDetail.customerName || "NA",
            orderDetail.customerPhone || "NA",
            orderDetail.status || "NA",
            orderDetail.invoiceType || "NA",
            orderDetail.paymentMethodId || "NA",
            orderDetail.orderDetail?.qty || "NA",
            moment(orderDetail.currentScheduleStatus.requiredDate).format(
              "DD/MM/YYYY hh:mm:ss A"
            ) || "NA",
            moment(orderDetail.upcomingOrderRequiredDate).format(
              "DD/MM/YYYY"
            ) || "NA",
            moment(orderDetail.currentScheduleStatus.confirmedDate).format(
              "DD/MM/YYYY hh:mm:ss A"
            ) || "NA",
            orderDetail.total || "NA",
            orderDetail.paidAmount || "NA",
            orderDetail.orderAmount || "NA",
            orderDetail.currentScheduleStatus?.vehicleId || "-",
            orderDetail.city || "-",
            orderDetail.province || "-",
          ]}
        />
        <h5 style={{ margin: "40px 0" }}>Current Schedule Status</h5>
        <StaticInputs
          labels={[
            "Order ID",
            "Order Closed Date",
            "Driver Drop Date",
            "Driver Pick Date",
            "Confirmed Date",
            "Confirmed By",
            "Vehicle Updated On",
            "Vehicle Updated By",
            "Driver Updated By",
            "Driver Updated On",
            "Customer Updated On",
            "Customer Updated By",
            "Required Date",
            "Number of Days",
            "Updated By",
            "Updated On",
            "Order Latitude",
            "Order Longitude",
            "Latitude When Placed Order",
            "Longitude When Placed Order",
            "Customer Detail ID",
            "Vehicle ID",
            "Driver ID",
          ]}
          values={[
            orderDetail?.currentScheduleStatus?.id || "NA",
            moment(orderDetail?.currentScheduleStatus?.orderClosedDate).format(
              "DD/MM/YYYY hh:mm:ss A"
            ) || "NA",
            moment(orderDetail?.currentScheduleStatus?.driverDropDate).format(
              "DD/MM/YYYY hh:mm:ss A"
            ) || "NA",
            orderDetail?.currentScheduleStatus?.driverPickDate || "NA",
            moment(orderDetail?.currentScheduleStatus?.confirmedDate).format(
              "DD/MM/YYYY hh:mm:ss A"
            ) || "NA",
            orderDetail?.currentScheduleStatus?.confirmedBy || "NA",
            moment(orderDetail?.currentScheduleStatus?.vehicleUpdatedOn).format(
              "DD/MM/YYYY hh:mm:ss A"
            ) || "NA",
            orderDetail?.currentScheduleStatus?.vehicleUpdatedBy || "NA",
            orderDetail?.currentScheduleStatus?.driverUpdatedBy || "NA",
            moment(orderDetail?.currentScheduleStatus?.driverUpdatedOn).format(
              "DD/MM/YYYY hh:mm:ss A"
            ) || "NA",
            moment(orderDetail?.currentScheduleStatus?.custUpdatedOn).format(
              "DD/MM/YYYY hh:mm:ss A"
            ) || "NA",
            orderDetail?.currentScheduleStatus?.custUpdatedBy || "NA",
            moment(orderDetail?.currentScheduleStatus?.requiredDate).format(
              "DD/MM/YYYY hh:mm:ss A"
            ) || "NA",
            orderDetail?.currentScheduleStatus?.numOfDay || "NA",
            orderDetail?.currentScheduleStatus?.updatedBy || "NA",
            moment(orderDetail?.currentScheduleStatus?.updatedOn).format(
              "DD/MM/YYYY hh:mm:ss A"
            ) || "NA",
            orderDetail?.currentScheduleStatus?.orderAtLat || "NA",
            orderDetail?.currentScheduleStatus?.orderAtLang || "NA",
            orderDetail?.currentScheduleStatus?.selectedLatWhenPlacedOrder ||
              "NA",
            orderDetail?.currentScheduleStatus?.selectedLongWhenPlacedOrder ||
              "NA",
            orderDetail?.currentScheduleStatus?.custDetailId || "NA",
            orderDetail?.currentScheduleStatus?.vehicleId || "NA",
            orderDetail?.currentScheduleStatus?.driverId || "NA",
          ]}
        />
      </ModalBody>
    </Modal>
  );
};

export default CustomerOrderDetailModal;
