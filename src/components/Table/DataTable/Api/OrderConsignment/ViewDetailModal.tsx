// @ts-nocheck
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customerConsignmentViewDetailsFinished,
  cylinderBackToWarehouse,
} from "@/redux/services/customerService";
import { MaterialReactTable } from "material-react-table";
import moment from "moment";
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
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import {
  fetchCustomerConsignmentDetails,
  fetchCustomerOrder,
  fetchOrderDelivery,
} from "@/redux/slices/customerSlice";

const ViewDetailModal = ({ isOpen, toggle }) => {
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
    totalCodCash,
  } = consignment || {};

  const mappedData = orderAndCustomerInfo?.map((item, index) => ({
    orderId: item.orderInfo.orderId,
    invoiceType: item.orderInfo.invoiceType,
    quantity: item.orderInfo.qty,
    orderAmount: item.orderInfo.orderAmount,
    paymentType: item.orderInfo.paymentType,
    customer: item.customerInfo.customerName,
    status: item.orderInfo.status,
    isPaid: item.orderInfo.isPaid,
    customerId: item.customerInfo.customerId,
  }));

  //   const mappedData1 = orderAndCustomerInfo?.map((item, index) => ({
  //     at: item.customerInfo?.customerLocation?.cylinderAtThisLocation?.[0]?.at,
  //     barCodeId:
  //       item.customerInfo?.customerLocation?.cylinderAtThisLocation?.[0]
  //         ?.barCodeId,
  //     barcode:
  //       item.customerInfo?.customerLocation?.cylinderAtThisLocation?.[0]?.barcode,
  //     id: item.customerInfo?.customerLocation?.cylinderAtThisLocation?.[0]?.id,
  //     isFilled:
  //       item.customerInfo?.customerLocation?.cylinderAtThisLocation?.[0]
  //         ?.isFilled,
  //     locateAt:
  //       item.customerInfo?.customerLocation?.cylinderAtThisLocation?.[0]
  //         ?.locateAt,
  //     status:
  //       item.customerInfo?.customerLocation?.cylinderAtThisLocation?.[0]?.status,
  //     statusDescription:
  //       item.customerInfo?.customerLocation?.cylinderAtThisLocation?.[0]
  //         ?.statusDescription,
  //   }));

  const mappedData1 = consignment.filledCylindersInVehicle?.map(
    (item, index) => ({
      at: item?.at,
      barCodeId: item?.barCodeId,
      barcode: item?.barcode,
      id: item?.id,
      isFilled: item?.isFilled,
      locateAt: item?.locateAt,
      status: item?.status,
      statusDescription: item?.statusDescription,
    })
  );

  const mappedData2 = consignment?.emptyCylindersInVehicle?.map(
    (item, index) => ({
      at: item?.at,
      barCodeId: item?.barCodeId,
      barcode: item?.barcode,
      id: item?.id,
      isFilled: item?.isFilled,
      locateAt: item?.locateAt,
      status: item?.status,
      statusDescription: item?.statusDescription,
    })
  );

  const total_sum = orderAndCustomerInfo?.reduce((total, item) => {
    if (item.orderInfo?.isPaid) {
      return total + item.orderInfo.orderAmount;
    }
    return total;
  }, 0);

  const dispatch = useAppDispatch();

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedWarehouseId
  );

  const handleFinish = async () => {
    // TODO: Finish consignment and redirect to dashboard
    try {
      const res = await customerConsignmentViewDetailsFinished({
        id: consignment.consignmentId,
        remarks: consignment.remarks,
        tranferQuantity: consignment.tranferQuantity,
        isQuantityLock: consignment.isQuantityLock,
        updatedBy: consignment.updatedBy,
        createdBy: consignment.createdBy,
        vehicleLeftDate: consignment.vehicleLeftDate,
        vehicleReturnDate: moment(new Date()).format("MM/DD/YYYY"),
        warehouseLocationId: consignment.warehouseLocationId,
        createdOn: consignment.createdOn,
        updatedOn: consignment.updatedOn,
        driverId: consignment.driverInfo.driverId,
        vehicleId: consignment.vehicleInfo.vehicleRegNo,
      });

      if (res.statusCode === 200) {
        toast.success(res.message);
        toggle();
        dispatch(fetchCustomerOrder(selectedCityId));
        dispatch(fetchOrderDelivery(selectedCityId));
      } else {
        toast.error(res.message || "Failed to finish consignment.");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while finishing the consignment."
      );
    }
  };

  const handleCylinderBackToWarehouse = async (row) => {
    try {
      const res = await cylinderBackToWarehouse({
        isPickup: false,
        documentId: consignment.consignmentId,
        barcode: row.barcode,
      });

      if (res.statusCode === 200) {
        toast.success(res?.message);
        dispatch(fetchCustomerConsignmentDetails(consignment.consignmentId));
      } else {
        toast.error(res?.message);
      }

      // toggle();
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    }
  };

  const columns = [
    {
      accessorKey: "orderId",
      header: "Order ID",
      enableSorting: true,
      Cell: ({ row }) => (
        <span
          style={{
            cursor: "pointer",
            color: "#1284C1",
            fontWeight: "bolder",
          }}
        >
          OR-{row?.original?.orderId}
        </span>
      ),
    },
    {
      accessorKey: "customerId",
      header: "Customer ID",
      enableSorting: true,
      Cell: ({ row }) => (
        <span
          style={{
            cursor: "pointer",
            color: "#1284C1",
            fontWeight: "bolder",
          }}
        >
          CU-{row?.original?.customerId}
        </span>
      ),
    },

    {
      accessorKey: "invoiceType",
      header: "Invoice Type",
      enableSorting: true,
    },
    { accessorKey: "quantity", header: "Quantity", enableSorting: true },
    { accessorKey: "orderAmount", header: "Order Amount", enableSorting: true },
    { accessorKey: "paymentType", header: "Payment Type", enableSorting: true },
    { accessorKey: "customer", header: "Customer", enableSorting: true },
    { accessorKey: "status", header: "Status", enableSorting: true },
    {
      accessorKey: "isPaid",
      header: "Is Paid",
      enableSorting: true,
      Cell: ({ row }) => (row.original.isPaid ? "Paid" : "Unpaid"),
    },
  ];

  const columns1 = [
    {
      accessorKey: "barcode",
      header: "Barcode",
      enableSorting: true,
    },
    {
      accessorKey: "isFilled",
      header: "Filled Status",
      enableSorting: true,
      Cell: ({ row }) => (row.original.isFilled ? "Filled" : "Empty"),
    },
    {
      accessorKey: "statusDescription",
      header: "Status Description",
      enableSorting: true,
    },
    { accessorKey: "status", header: "Status", enableSorting: true },
    {
      id: "Restock",
      header: "Restock",
      enableSorting: true,
      Cell: ({ row }) => (
        <Button
          color="primary"
          onClick={() => handleCylinderBackToWarehouse(row.original)}
        >
          Back to Warehouse
        </Button>
      ),
    },
  ];

  const columns2 = [
    {
      accessorKey: "barcode",
      header: "Barcode",
      enableSorting: true,
    },
    {
      accessorKey: "isFilled",
      header: "Filled Status",
      enableSorting: true,
      Cell: ({ row }) => (row.original.isFilled ? "Filled" : "Empty"),
    },
    {
      accessorKey: "statusDescription",
      header: "Status Description",
      enableSorting: true,
    },
    { accessorKey: "status", header: "Status", enableSorting: true },
    {
      id: "Restock",
      header: "Restock",
      enableSorting: true,
      Cell: ({ row }) => (
        <Button
          color="primary"
          onClick={() => handleCylinderBackToWarehouse(row.original)}
        >
          Back to Warehouse
        </Button>
      ),
    },
  ];
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl">
      <ModalHeader toggle={toggle}>Order Assignment</ModalHeader>
      <ModalBody>
        <StaticInputs
          labels={[
            "Driver Name",
            "Vehicle Id",
            "Transfer Quantity",
            "Created On",
            "Updated On",
            "Total COD",
          ]}
          values={[
            driverInfo?.driverName,
            vehicleInfo?.vehicleRegNo,
            tranferQuantity,
            moment(createdOn).format("DD-MM-YYYY") || "NA",
            moment(updatedOn).format("DD-MM-YYYY") || "NA",
            totalCodCash || "NA",
          ]}
        />
        {mappedData?.length > 0 && (
          <div className="table-responsive">
            <MaterialReactTable
              columns={columns}
              data={mappedData}
              muiTableProps={{
                sx: {
                  "& th": {
                    background: "#0A80BF",
                    color: "white",
                    whiteSpace: "nowrap",
                    padding: "10px",
                    minWidth: "230px",
                  },
                },
              }}
            />
          </div>
        )}
        {mappedData1?.length > 0 && (
          <>
            <h5 style={{ marginTop: "40px" }}>
              Returning filled cylinder to warehouse
            </h5>
            <div className="table-responsive">
              <MaterialReactTable
                columns={columns1}
                data={mappedData1}
                muiTableProps={{
                  sx: {
                    "& th": {
                      background: "#0A80BF",
                      color: "white",
                      whiteSpace: "nowrap",
                      padding: "10px",
                      minWidth: "230px",
                    },
                  },
                }}
              />
            </div>
          </>
        )}
        {mappedData2?.length > 0 && (
          <>
            <h5 style={{ marginTop: "40px" }}>
              Returning Empty cylinder to warehouse
            </h5>
            <div className="table-responsive">
              <MaterialReactTable
                columns={columns2}
                data={mappedData2}
                muiTableProps={{
                  sx: {
                    "& th": {
                      background: "#0A80BF",
                      color: "white",
                      whiteSpace: "nowrap",
                      padding: "10px",
                      minWidth: "230px",
                    },
                  },
                }}
              />
            </div>
          </>
        )}
        <Row className="mb-3">
          <Col xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={handleFinish}
            >
              Finish
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ViewDetailModal;
