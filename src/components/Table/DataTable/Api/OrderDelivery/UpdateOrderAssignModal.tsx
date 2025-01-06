// @ts-nocheck
import { useAppSelector } from "@/redux/hooks";
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
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateOrderAssignmentConsignment } from "@/redux/services/customerService";
import StaticInputs from "@/components/StaticInputs/StaticInputs";

const UpdateOrderAssignModal = ({ isOpen, toggle, driverDetails }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const { consignment } = useAppSelector(
    (state) => state.customerConsignmentDetails.customerConsignmentDetails
  );
  const { customerOrders } = useAppSelector(
    (state) => state.customerOrder.customerOrder
  );

  const { paymentTypes } = useAppSelector(
    (state) => state.paymentTypes.paymentTypes
  );
  const [dataReady, setDataReady] = useState(false);
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

  const updateInvoiceType = (type: string): string => {
    switch (type) {
      case "SecurityDeposit":
        return "Security Deposit";
      case "EmptyReturn":
        return "Refill Order";
      case "EmptyPickupOnly":
        return "Empty Return";
      default:
        return type;
    }
  };

  const mappedData = useMemo(() => {
    return customerOrders?.length > 0
      ? customerOrders.map((item) => ({
          orderId: item.id,
          customerId: item.customerCode,
          invoiceType: updateInvoiceType(item.invoiceType),
          quantity: item.orderDetail.qty,
          totalAmount: item.orderDetail.total,
          paidAmount: item.orderDetail.paidAmount,
          discount: item.orderPricingDetails.discount,
          urgentDeliveryCharges:
            item.orderPricingDetails.urgentDelieveryCharges,
          paymentType: item.paymentMethodId,
          isUrgent: item.isUrgent,
          customerName: item.customerName,
          customerPhone: item.customerPhone,
          status: item.status,
          city: item.city,
          requiredDate:
            moment(item.currentScheduleStatus.requiredDate).format(
              "DD-MM-YYYY"
            ) || "NA",
          confirmedDate:
            moment(item.currentScheduleStatus.confirmedDate).format(
              "DD-MM-YYYY"
            ) || "NA",
          vehicleId: item.currentScheduleStatus.vehicleId,
          driverId: item.currentScheduleStatus.driverId,
          oId: item.id,
          sId: item.currentScheduleStatus.id,
          transferStockId: consignment?.consignmentId,
        }))
      : [];
  }, [customerOrders]);

  const total_sum = orderAndCustomerInfo?.reduce((total, item) => {
    if (item.orderInfo?.isPaid) {
      return total + item.orderInfo.orderAmount;
    }
    return total;
  }, 0);

  const filteredData = useMemo(() => {
    return mappedData?.filter(
      (item) => item.status === "Request Initiated" || item.status === "Pending"
    );
  }, [mappedData]);

  const transformData = (data) => {
    return {
      title: "Order Assigned",
      messageToCustomer: "Your Order has been assigned",
      orderDetails: data.map((order) => ({
        orderId: order.oId,
        scheduleId: order.sId,
      })),
      transferStockId: data[0].transferStockId || consignment?.consignmentId,
    };
  };

  const handleFinish = async () => {
    if (selectedRows.length > 0) {
      const result = transformData(selectedRows);

      const res = await updateOrderAssignmentConsignment(result);
      if (res.succeeded == false) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        toggle();
      }
    } else {
      toast.error("Please select at least one order.");
    }
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    if (checked) {
      const selectedRowsData = filteredData?.map((row) => {
        const oId = row?.oId;
        const sId = row?.sId;
        return { oId, sId };
      });
      setSelectedRows(selectedRowsData);
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (row) => {
    const orderId = row?.oId;
    if (selectedRows.some((item) => item.oId === orderId)) {
      setSelectedRows(selectedRows.filter((item) => item.oId !== orderId));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const columns = [
    {
      accessorKey: "orderId",
      header: "Order ID",
      enableSorting: true,
      Cell: ({ cell }) => `OR-${cell.getValue<string>()}`,
    },
    {
      accessorKey: "customerId",
      header: "Customer ID",
      enableSorting: true,
    },
    {
      accessorKey: "checkbox",
      header: (
        <>
          <input type="checkbox" onChange={handleSelectAll} />
          &nbsp; Select All
        </>
      ),
      Cell: ({ row }) => (
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(row?.original)}
          checked={selectedRows.some((item) => item.oId === row?.original?.oId)}
        />
      ),
    },
    {
      accessorKey: "invoiceType",
      header: "Invoice Type",
      enableSorting: true,
    },
    {
      accessorKey: "city",
      header: "City",
      enableSorting: true,
    },
    {
      accessorKey: "paymentType",
      header: "Payment Type",
      enableSorting: true,
      Cell: ({ row }) =>
        row.original.paymentType == 1
          ? "COD"
          : row.original.paymentType == 2
          ? "DigiCash"
          : "VirtualWallet",
    },
    {
      accessorKey: "isUrgent",
      header: "Delivery Type",
      enableSorting: true,
      Cell: ({ row }) =>
        row.original.isUrgent == true ? "Urgent" : "Standard",
    },
    { accessorKey: "status", header: "Status", enableSorting: true },
    { accessorKey: "quantity", header: "Order Quantity", enableSorting: true },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      enableSorting: true,
    },
    {
      accessorKey: "customerPhone",
      header: "Customer Phone",
      enableSorting: true,
    },

    { accessorKey: "totalAmount", header: "Total Amount", enableSorting: true },
    {
      accessorKey: "paidAmount",
      header: "Wallet Deduction",
      enableSorting: true,
    },
    {
      accessorKey: "discount",
      header: "Discount Amount",
      enableSorting: true,
    },
    {
      accessorKey: "urgentDeliveryCharges",
      header: "Urgent Delivery Charges",
      enableSorting: true,
    },
    {
      header: "Order Amount",
      accessorFn: (row) => {
        const total = row.totalAmount || 0;
        const paidAmount = row.paidAmount || 0;
        const discountAmount = row.discount || 0;
        return Math.abs(total - paidAmount - discountAmount);
      },
      enableSorting: true,
    },

    {
      accessorKey: "requiredDate",
      header: "Required Date",
      enableSorting: true,
    },
    {
      accessorKey: "confirmedDate",
      header: "Confirmed Date",
      enableSorting: true,
    },
  ];

  useEffect(() => {
    if (customerOrders?.length > 0) {
      setDataReady(true);
    }
  }, [customerOrders]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Update Order Assignment</ModalHeader>
      <ModalBody>
        <StaticInputs
          labels={[
            "Driver Name",
            "Vehicle Id",
            "Transfer Quantity",
            "Created On",
            "Updated On",
          ]}
          values={[
            driverInfo?.driverName || "NA",
            vehicleInfo?.vehicleRegNo || "NA",
            tranferQuantity || "NA",
            moment(createdOn).format("DD-MM-YYYY") || "NA",
            moment(updatedOn).format("DD-MM-YYYY") || "NA",
          ]}
        />
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={filteredData || []}
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
      </ModalBody>
      <ModalFooter>
        <Col xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleFinish}
          >
            Submit
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateOrderAssignModal;
