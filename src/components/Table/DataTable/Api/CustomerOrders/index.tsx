// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Card, CardBody, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  fetchCustomerOrder,
  fetchPaymentTypes,
  fetchCustomerOrderLog,
} from "../../../../../redux/slices/customerSlice";
import CustomerOrderLogModal from "./CustomerOrderLog";
import CustomerOrderDetailModal from "./CustomerDetailModal";
import {
  Box,
  IconButton,
  Switch,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AiOutlineFileText } from "react-icons/ai";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";
import NotificationConfirmModal from "./NotificationConfirmModal";
import { FiCheckCircle, FiDownload } from "react-icons/fi";
import moment from "moment";
import { exportToCSV } from "utils/csvUtils";
import { Bell, CheckCircle, Eye, LogIn } from "react-feather";
import { BiDetail } from "react-icons/bi";
import FontSize from "@/components/Ui-kits/HelperClasses/FontSize";
import Loader from "@/components/Loader/Loader";
import OrderIDModal from "./OrderIDModal";

const CustomerOrderTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const { customerOrder } = useAppSelector((state) => state.customerOrder);
  const { paymentTypes } = useAppSelector((state) => state.paymentTypes);
  const { customerOrderLog } = useAppSelector(
    (state) => state.customerOrderLog
  );

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedCityId
  );

  const loading: boolean = useAppSelector(
    (state) => state.customerOrder.loading
  );
  const modalData = customerOrderLog.customerOrderLog;

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isOrderIDModalOpen, setisOrderIDModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [payload, setPayload] = useState(null);

  const handleOpenActiveInactive = (row) => {
    let orderStatus = "";
    if (row?.status === "Deactivated") {
      orderStatus = "Pending";
    } else {
      orderStatus = "Deactivated";
    }

    const formData = {
      orderID: row?.id,
      orderStatus: orderStatus,
    };
    setPayload(formData);
    setIsConfirmModalOpen(true);
  };

  const handleCloseActiveInactive = () => {
    setIsConfirmModalOpen(false);
  };

  useEffect(() => {
    if (selectedCityId) {
      dispatch(fetchCustomerOrder(selectedCityId));
    } else {
      dispatch(fetchCustomerOrder(null));
    }
    dispatch(fetchPaymentTypes());
  }, [dispatch, selectedCityId]);

  const handleOpenLogModal = (orderid) => {
    setSelectedOrderId(orderid);
    setIsLogModalOpen(true);
  };

  const handleOpenOrderIDModal = (orderid) => {
    setSelectedOrderId(orderid);
    setisOrderIDModalOpen(true);
    dispatch(fetchCustomerOrderLog(orderid));
  };

  const handleCloseOrderIDModal = () => {
    setisOrderIDModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleOpenDetailModal = (row) => {
    setSelectedOrderDetail(row.original);
    setIsDetailModalOpen(true);
  };

  const handleOpenNotificationModal = (row) => {
    setSelectedOrderDetail(row);
    if (row?.status === "Deactivated") {
      return toast.error("This order has been deactivated");
    }

    let key = "123213sadhdsadjhasdas1@#123sdsa";

    let formData = {
      title: "Blue Customer App",
      messageToCustomer: `Your refill order has been scheduled for delivery on ${row?.upcomingOrderRequiredDate}. Kindly confirm for delivery.`,
      orderRequiredDate: row?.upcomingOrderRequiredDate,
    };
    setPayload({ formData, key });
    setIsNotificationModalOpen(true);
  };

  const handleCloseNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };

  const handleCloseLogModal = () => {
    setIsLogModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrderDetail(null);
  };

  const handleConfirm = (row) => {
    const confirmationMessage = `Are you sure you want to confirm the order ID: ${row.original.orderCode}?`;
    setIsConfirmModalOpen(true);
    setPayload({
      orderID: row.original.id,
      message: confirmationMessage,
      orderStatus: row.original.status,
    });
  };

  const handleRowPaymentType = (row) => {
    switch (row.original.paymentMethodId) {
      case 1:
        return paymentTypes?.paymentTypes[0]?.paymentMethod;
      case 2:
        return paymentTypes?.paymentTypes[1]?.paymentMethod;
      case 3:
        return paymentTypes?.paymentTypes[2]?.paymentMethod;
      default:
        return "-";
    }
  };

  const handleExportRowsToCSV = (rows) => {
    const headers = [
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
      "Active/Inactive",
    ];

    const data = rows.map((row) => ({
      "Order ID": row.original.orderCode,
      "Customer Code": row.original.customerCode,
      "Customer Name": row.original.customerName,
      "Customer Phone": row.original.customerPhone,
      Status: row.original.status,
      "Invoice Type": row.original.invoiceType,
      "Payment Type": handleRowPaymentType(row),
      Quantity: row.original.orderDetail?.qty || 0,
      "Delivery Date": row.original.currentScheduleStatus?.requiredDate
        ? moment(row.original.currentScheduleStatus.requiredDate).format(
            "DD-MM-YYYY"
          )
        : "N/A",
      "Order Required Date": row.original.upcomingOrderRequiredDate
        ? moment(row.original.upcomingOrderRequiredDate).format("DD-MM-YYYY")
        : "N/A",
      "Confirmed Date": row.original.currentScheduleStatus?.confirmedDate
        ? moment(row.original.currentScheduleStatus.confirmedDate).format(
            "DD-MM-YYYY"
          )
        : "N/A",
      "Total Amount": row.original.total || 0,
      "Wallet Deduction": row.original.paidAmount || 0,
      "Order Amount":
        (row.original.total || 0) - (row.original.paidAmount || 0),
      Vehicle: row.original.currentScheduleStatus?.vehicleId || "N/A",
      "Active/Inactive":
        row.original.status !== "Deactivated" ? "Active" : "Inactive",
    }));

    exportToCSV(data, headers, "Customer_Orders.csv");
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "orderCode",
        header: "Order ID",
        enableSorting: true,
        Cell: ({ row }) => (
          <p
            style={{
              cursor: "pointer",
              color: "#1284C1",
              fontWeight: "bolder",
            }}
            // onClick={() => handleOpenOrderIDModal(row.original.id)}
          >
            {row.original?.orderCode}
          </p>
        ),
      },

      {
        accessorKey: "customerCode",
        header: "Customer ID",
        enableSorting: true,
        Cell: ({ row }) => (
          <p
            style={{
              cursor: "pointer",
              color: "#1284C1",
              fontWeight: "bolder",
            }}
          >
            {row.original?.customerCode}
          </p>
        ),
      },
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
      { accessorKey: "status", header: "Status", enableSorting: true },
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
        accessorKey: "paymentMethodId",
        header: "Payment Type",
        accessorFn: (row) => {
          switch (row?.paymentMethodId) {
            case 1:
              return "COD" || "-";
            case 2:
              return "DigiCash" || "-";
            case 3:
              return "VirtualWallet" || "-";
            default:
              return "-";
          }
        },
        enableSorting: true,
        // Cell: ({ row }) => <div>{handleRowPaymentType(row)}</div>,
      },
      {
        header: "Quantity",
        accessorKey: "orderDetail.qty",
        enableSorting: true,
      },
      {
        accessorKey: "currentScheduleStatus.requiredDate",
        header: "Delivery Date",
        enableSorting: true,
        Cell: ({ cell }) =>
          cell.getValue()
            ? moment(cell.getValue()).format("DD-MM-YYYY")
            : "N/A",
      },
      {
        accessorKey: "upcomingOrderRequiredDate",
        header: "Order Required Date",
        enableSorting: true,
        Cell: ({ cell }) =>
          cell.getValue()
            ? moment(cell.getValue()).format("DD-MM-YYYY")
            : "N/A",
      },
      {
        accessorKey: "currentScheduleStatus.confirmedDate",
        header: "Confirmed Date",
        enableSorting: true,
        Cell: ({ cell }) =>
          cell.getValue()
            ? moment(cell.getValue()).format("DD-MM-YYYY")
            : "N/A",
      },
      { accessorKey: "total", header: "Total Amount", enableSorting: true },
      {
        accessorKey: "paidAmount",
        header: "Wallet Deduction",
        enableSorting: true,
      },
      {
        accessorKey: "discountAmount",
        header: "Discount Amount",
        enableSorting: true,
      },
      {
        accessorKey: "orderPricingDetails.urgentDelieveryCharges",
        header: "Urgent Delivery Charges",
        enableSorting: true,
      },
      {
        header: "Order Amount",
        accessorFn: (row) => {
          const total = row.total || 0;
          const paidAmount = row.paidAmount || 0;
          const discountAmount = row.discountAmount || 0;
          return Math.abs(total - paidAmount - discountAmount);
        },
        enableSorting: true,
      },
      {
        header: "Delivery Type",
        accessorFn: (row) => {
          const type = row.isUrgent === true ? "Urgent" : "Standard";
          return type;
        },
        enableSorting: true,
      },

      {
        accessorKey: "currentScheduleStatus.vehicleId",
        header: "Vehicle",
        enableSorting: true,
      },

      {
        accessorKey: "active/inactive",
        header: "Active/Inactive",
        enableSorting: true,
        Cell: ({ row }) => (
          <Switch
            onClick={() => handleOpenActiveInactive(row.original)}
            checked={row.original.status !== "Deactivated"}
            disabled={row?.original?.status === "Deactivated"}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "white",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "green",
              },

              "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                backgroundColor: "red",
              },
            }}
          />
        ),
      },
      {
        id: "log",
        header: "Log",
        enableSorting: true,
        Cell: ({ row }) => (
          <IconButton
            color="primary"
            onClick={() =>
              handleOpenLogModal(row.original.orderDetail.customerOrderId)
            }
          >
            <AiOutlineFileText size={20} />
          </IconButton>
        ),
      },
      {
        header: "Details",
        Cell: ({ row }) => (
          <IconButton
            color="primary"
            onClick={() => handleOpenDetailModal(row)}
          >
            <BiDetail size={20} />
          </IconButton>
        ),
      },
      // {
      //   header: "Confirm",
      //   Cell: ({ row }) => (
      //     <IconButton color="primary" onClick={() => handleConfirm(row)}>
      //       <FiCheckCircle size={20} />
      //     </IconButton>
      //   ),
      // },
      // {
      //   header: "Notification",
      //   Cell: ({ row }) => (
      //     <IconButton
      //       color="primary"
      //       onClick={() => handleOpenNotificationModal(row.original)}
      //     >
      //       <Bell size={20} />
      //     </IconButton>
      //   ),
      // },
    ],
    [selectedCityId, paymentTypes]
  );
  const urgentOrder = customerOrder?.customerOrders?.filter(
    (order) => order.status === "Awaiting Confirmation" && order.isUrgent
  );

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div style={styles.tickerContainer}>
          <div style={styles.tickerContainer}>
            {urgentOrder?.length > 0 && (
              <div style={styles.tickerContent}>
                <marquee style={styles.marque}>
                  Currently, there are {urgentOrder?.length} Urgent Delivery
                  Orders pending in the system. Please prioritize these first.
                </marquee>
              </div>
            )}
          </div>
        </div>
        <div className="table-responsive">
          <MaterialReactTable
            key={selectedCityId || "default"}
            columns={columns}
            data={customerOrder.customerOrders || []}
            muiTableProps={{
              sx: {
                "& th": {
                  background: "#0A80BF",
                  color: "white",
                  whiteSpace: "nowrap",
                  padding: "8px",
                  minWidth: "180px",
                },
                "& td": {
                  padding: "8px",
                  minWidth: "180px",
                },
              },
            }}
            renderTopToolbarCustomActions={({ table }) => (
              <Box>
                <Button
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  color="primary"
                  onClick={() =>
                    handleExportRowsToCSV(table.getPrePaginationRowModel().rows)
                  }
                  variant="text"
                  style={{
                    fontSize: isSmallScreen ? "12px" : "16px",
                  }}
                >
                  <FiDownload
                    color="primary"
                    style={{
                      fontSize: "18px",
                      color: "inherit",
                      verticalAlign: "middle",
                      marginRight: "10px",
                    }}
                  />
                  Export to CSV
                </Button>
              </Box>
            )}
          />
        </div>

        {isLogModalOpen && (
          <CustomerOrderLogModal
            isOpen={isLogModalOpen}
            toggle={handleCloseLogModal}
            orderLog={modalData}
            orderId={selectedOrderId}
          />
        )}

        {isConfirmModalOpen && (
          <ConfirmModal
            isOpen={isConfirmModalOpen}
            toggle={handleCloseActiveInactive}
            payload={payload}
          />
        )}

        {isNotificationModalOpen && (
          <NotificationConfirmModal
            isOpen={isNotificationModalOpen}
            toggle={handleCloseNotificationModal}
            payload={payload}
          />
        )}

        {isOrderIDModalOpen && (
          <OrderIDModal
            isOpen={isOrderIDModalOpen}
            toggle={handleCloseOrderIDModal}
            orderId={selectedOrderId}
          />
        )}

        {isDetailModalOpen && selectedOrderDetail && (
          <CustomerOrderDetailModal
            isOpen={isDetailModalOpen}
            toggle={handleCloseDetailModal}
            orderDetail={selectedOrderDetail}
          />
        )}
      </CardBody>
    </Card>
  );
};

const styles = {
  tickerContainer: {
    width: "100%",
    // backgroundColor: "#ff4d4d",
    padding: "13px 10px 0 0",
    borderRadius: "5px",
    // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    // border: "2px solid #ff1a1a",
  },
  tickerContent: {
    fontSize: "18px",
    color: "#fff",
    // fontWeight: "bold",
  },
  marque: {
    margin: "0 0 0 0",
    letterSpacing: "2px",
    color: "red",
  },
};

export default CustomerOrderTable;
