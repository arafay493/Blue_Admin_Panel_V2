// @ts-nocheck
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import { useAppSelector } from "@/redux/hooks";
import moment from "moment";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const DetailModal = ({ isOpen, toggle }) => {
  const { consignment } = useAppSelector(
    (state) => state.customerConsignmentDetails.customerConsignmentDetails
  );
  const {
    pickAndDropManagement,
    emptyCylindersInVehicle,
    filledCylindersInVehicle,
    capacity,
    driverName,
    driverPhoneNumber,
    id,
    remarks,
    tranferQuantity,
    isQuantityLock,
    updatedBy,
    createdBy,
    vehicleLeftDate,
    vehicleReturnDate,
    createdOn,
    updatedOn,
    warehouseLocationId,
    driverInfo,
    vehicleInfo,
    serialNumber,
    consignmentNumber,
    orderAndCustomerInfo,
  } = consignment || {};

  const total_sum = orderAndCustomerInfo?.reduce((total, item) => {
    if (item.orderInfo?.isPaid) {
      return total + item.orderInfo.orderAmount;
    }
    return total;
  }, 0);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Consignment Details</ModalHeader>
      <ModalBody>
        <StaticInputs
          labels={[
            "Driver Id",
            "Vehicle Id",
            "Capacity",
            "Driver Name",
            "Driver Phone Number",
            "Remarks",
            "Transfer Quantity",
            "Created By",
            "Updated By",
            "Vehicle Left Date",
            "Vehicle Return Date",
            "Created On",
            "Updated On",
            "Empty Cylinder In Vehicle",
            "Filled Cylinder In Vehicle",
            "Total Amount",
          ]}
          values={[
            driverInfo?.driverId || "NA",
            vehicleInfo?.vehicleRegNo || "NA",
            vehicleInfo?.vehicleCapacity || "NA",
            driverInfo?.driverName || "NA",
            driverInfo?.driverPhoneNumber,
            remarks || "NA",
            tranferQuantity || "NA",
            createdBy || "NA",
            updatedBy || "NA",
            moment(vehicleLeftDate).format("DD-MM-YYYY") || "NA",
            moment(vehicleReturnDate).format("DD-MM-YYYY") || "NA",
            moment(createdOn).format("DD-MM-YYYY") || "NA",
            moment(updatedOn).format("DD-MM-YYYY") || "NA",
            emptyCylindersInVehicle?.length || "0",
            filledCylindersInVehicle?.length || "0",
            total_sum?.toFixed(2) || "NA",
          ]}
        />
      </ModalBody>
      {/* <ModalFooter>
        <Button color="danger" onClick={toggle}>
          Close
        </Button>
      </ModalFooter> */}
    </Modal>
  );
};

export default DetailModal;
