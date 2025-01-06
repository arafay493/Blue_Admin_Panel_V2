// @ts-nocheck
import React, { useEffect, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Card, CardBody } from "reactstrap";
import { FaFileAlt } from "react-icons/fa";
import {
  fetchCashReceivables,
  fetchCheckAdminWalletSlice,
  fetchConsignmentDetails,
  fetchReceiveCashThunk,
  fetchReceiveConsignmentThunk,
} from "@/redux/slices/cashManagementSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ViewDetailsModal from "./ViewModal";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import { Eye } from "react-feather";
import { fetchReceiveCashService } from "@/redux/services/cashManagementService";
import ConfirmationModal from "./ConfirmationModal";
import Loader from "@/components/Loader/Loader";

interface OrdersCashDetail {
  orderId: number;
  isUrgent: boolean;
  qty: number;
  invoiceType: string;
  total: number;
  onlinePaidAmount: number;
  gasPrice: number;
  securityDeposit: number;
  deliveryCharges: number;
  urgentDeliveryCharges: number;
  tax: number;
  discount: number;
}

interface CashReceivableData {
  documentId: number;
  totalOrderNumbers: number;
  total: number;
  gasPrice: number;
  onlinePaidAmount: number;
  securityDeposit: number;
  deliveryCharges: number;
  urgentDeliveryCharges: number;
  tax: number;
  discount: number;
  ordersCashDetails?: OrdersCashDetail[];
}

interface ConsignmentDetailsData {
  documentId: number;
}

const UnreceivedConsignment = () => {
  const selectedWarehouseId = useAppSelector(
    (state) => state.globalWarehouse?.selectedWarehouseId ?? null
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedWarehouseId) {
      dispatch(fetchCashReceivables(selectedWarehouseId));
    }
  }, [selectedWarehouseId, dispatch]);

  const { cashReceivable } = useAppSelector(
    (state) => state.cashManagementReducer.cashReceivable
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedRowForConfirm, setSelectedRowForConfirm] = useState(null);

  const toggleConfirmModal = () => setConfirmModalOpen((prev) => !prev);

  const handleReceiveClick = (row) => {
    setSelectedRowForConfirm(row);
    toggleConfirmModal();
  };

  const handleConfirmReceive = async () => {
    if (selectedRowForConfirm) {
      try {
        const response = await fetchReceiveCashService(
          selectedRowForConfirm.documentId
        );

        if (response.statusCode === 200) {
          toast.success(response.message);

          dispatch(fetchCashReceivables());
        } else {
          toast.error(
            response.message || "Failed to receive cash. Please try again."
          );
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
        console.error(error);
      } finally {
        toggleConfirmModal();
      }
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleViewClick = (row: any) => {
    setSelectedRow(row);
    toggleModal();
  };

  const { data, loading, error, message } = useAppSelector(
    (state) => state.cashManagementReducer.receiveCash
  );

  const tableData: CashReceivableData[] = Array.isArray(cashReceivable?.data)
    ? cashReceivable.data
    : [];

  const [rowValues, setRowValues] = useState<
    { id: number; inputValue: string }[]
  >([]);

  useEffect(() => {
    if (tableData.length > 0) {
      setRowValues(
        tableData.map((row) => ({ id: row.documentId, inputValue: "" }))
      );
    }
  }, [tableData]);

  const handleInputChange = (id: number, value: string) => {
    setRowValues((prev) =>
      prev.map((row) => (row.id === id ? { ...row, inputValue: value } : row))
    );
  };

  const columns: MRT_ColumnDef<CashReceivableData>[] = [
    {
      accessorKey: "documentId",
      header: "Consignment ID.",
      Cell: ({ cell }) => (
        <span
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <FaFileAlt style={{ marginRight: "8px", color: "#0A80BF" }} />
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "#0A80BF",
              fontWeight: "bold",
            }}
          >
            {cell.getValue<number>()}
          </a>
        </span>
      ),
    },
    {
      accessorKey: "transferDate",
      header: "Transfer Date",
    },
    {
      accessorKey: "driverName",
      header: "Driver Name",
    },
    {
      accessorKey: "vehicleNo",
      header: "Vehicle No",
    },
    {
      accessorKey: "total",
      header: "Consignment Amount",
      Cell: ({ row }) => {
        const totalCashReceived = (
          row?.original?.ordersCashDetails ?? []
        ).reduce(
          (sum: number, order: any) =>
            sum + (parseFloat(order.customerPaid) || 0),
          0
        );

        const finalTotal = Math.floor(totalCashReceived);

        // Return formatted finalTotal with thousands separators and two decimal places
        return finalTotal
          ? finalTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "0.00";
      },
    },
    {
      accessorKey: "securityDeposit",
      header: "Security Deposit",
      Cell: ({ row }) =>
        row.original.securityDeposit.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    },
    {
      accessorKey: "other",
      header: "Other",
      Cell: ({ row }) => {
        const customerPaid = row?.original?.customerPaid || 0;
        const securityDeposit = row?.original?.securityDeposit || 0;

        const finalTotal = customerPaid - securityDeposit;

        return finalTotal
          ? finalTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "0.00";
      },
    },

    {
      accessorKey: "amountInput",
      header: "Received Amount",
      Cell: ({ row }) => {
        const currentRow = rowValues.find(
          (r) => r.id === row.original.documentId
        );
        const value = currentRow?.inputValue ?? "";

        const totalCashReceived = (
          row?.original?.ordersCashDetails ?? []
        ).reduce(
          (sum: number, order: any) =>
            sum + (parseFloat(order.customerPaid) || 0),
          0
        );
        const maxAmount = Math.floor(totalCashReceived);

        const hasError = value > maxAmount;

        return (
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <input
              type="number"
              value={value}
              max={maxAmount}
              onChange={(e) => {
                const inputValue = parseFloat(e.target.value) || 0;

                if (inputValue > maxAmount) {
                  toast.error(
                    `The received amount can't be greater than the consignment amount (${maxAmount}).`,
                    { position: toast.POSITION.TOP_RIGHT }
                  );
                  return;
                }

                handleInputChange(row.original.documentId, e.target.value);
              }}
              style={{
                width: "65%",
                padding: "8px",
                fontSize: "14px",
                border: hasError ? "1px solid red" : "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                cursor: "auto",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #0A80BF")}
              onBlur={(e) =>
                (e.target.style.border = hasError
                  ? "1px solid red"
                  : "1px solid #ccc")
              }
            />

            {hasError && (
              <span
                style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
              >
                Amount cannot exceed the Consignment Amount ({maxAmount}).
              </span>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "difference",
      header: "Difference",
      Cell: ({ row }) => {
        const currentRow = rowValues.find(
          (r) => r.id === row.original.documentId
        );
        const inputValue = Math.floor(parseFloat(currentRow?.inputValue ?? 0));

        const totalCashReceived = (
          row?.original?.ordersCashDetails ?? []
        ).reduce(
          (sum: number, order: any) =>
            sum + (parseFloat(order.customerPaid) || 0),
          0
        );

        const flooredTotalCashReceived = Math.floor(totalCashReceived);
        const difference = flooredTotalCashReceived - inputValue;

        return (
          <span>
            {difference
              ? difference.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "0.00"}
          </span>
        );
      },
    },

    {
      accessorKey: "actionButton",
      header: "Status",
      Cell: ({ row }) => {
        const currentRow = rowValues.find(
          (r) => r.id === row.original.documentId
        );
        const inputValue = Math.floor(parseFloat(currentRow?.inputValue ?? 0));

        const baseTotal = row?.original?.total || 0;
        const onlinePaidAmount = row?.original?.onlinePaidAmount || 0;
        const discount = row?.original?.discount || 0;

        const totalCashReceived = (
          row?.original?.ordersCashDetails ?? []
        ).reduce(
          (sum, order) => sum + (parseFloat(order.customerPaid) || 0),
          0
        );

        const flooredTotalCashReceived = Math.floor(totalCashReceived);
        const total = Math.floor(baseTotal - onlinePaidAmount - discount);
        const difference = Math.abs(flooredTotalCashReceived - inputValue);
        const isReceived = difference === 0;

        return (
          <button
            onClick={() => handleReceiveClick(row.original)}
            style={{
              backgroundColor: isReceived ? "green" : "gray",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              cursor: isReceived ? "pointer" : "not-allowed",
            }}
            disabled={!isReceived}
          >
            {isReceived ? "Receive Cash" : "Pending"}
          </button>
        );
      },
    },
  ];

  const nestedColumns: MRT_ColumnDef<CashReceivableData>[] = [
    {
      accessorKey: "orderId",
      header: "Order ID",
      Footer: ({ table }) => {
        return (
          <span
            style={{ fontWeight: "bold", color: "white", padding: "10px 0" }}
          >
            Total Amount
          </span>
        );
      },
      muiTableFooterCellProps: {
        sx: {
          backgroundColor: "gray",
          color: "white",
        },
      },
    },
    {
      accessorKey: "customerId",
      header: "Customer ID",
      muiTableFooterCellProps: {
        sx: {
          backgroundColor: "gray",
          color: "white",
        },
      },
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      muiTableFooterCellProps: {
        sx: {
          backgroundColor: "gray",
          color: "white",
        },
      },
    },
    {
      accessorKey: "invoiceType",
      header: "Invoice Type",
      muiTableFooterCellProps: {
        sx: {
          backgroundColor: "gray",
          color: "white",
        },
      },
    },
    {
      accessorKey: "paymentType",
      header: "Payment Type",
      Cell: ({ cell }) => cell.getValue() || "NA",
      muiTableFooterCellProps: {
        sx: {
          backgroundColor: "gray",
          color: "white",
        },
      },
    },
    {
      accessorFn: (row) => {
        const total = parseFloat(row.total) || 0;
        const onlinePaidAmount = parseFloat(row.onlinePaidAmount) || 0;
        const discount = parseFloat(row.discount) || 0;
        return total - onlinePaidAmount - discount || 0;
      },
      header: "Invoice Total",
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return (
          <span>
            {value
              ? parseFloat(value).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "0.00"}
          </span>
        );
      },

      Footer: ({ table }) => {
        const invoiceTotalSum = table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => {
            const total = parseFloat(row.original.total) || 0;
            const onlinePaidAmount =
              parseFloat(row.original.onlinePaidAmount) || 0;
            const discount = parseFloat(row.original.discount) || 0;
            return sum + (total - onlinePaidAmount - discount);
          }, 0);

        return (
          <span
            style={{ fontWeight: "bold", color: "white", padding: "10px 0" }}
          >
            {invoiceTotalSum.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        );
      },
      muiTableFooterCellProps: {
        sx: {
          backgroundColor: "gray",
          color: "white",
        },
      },
    },
    {
      accessorKey: "securityDeposit",
      header: "Security Deposit",
      Cell: ({ cell }) =>
        cell.getValue()
          ? parseFloat(cell.getValue()).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "NA",
      Footer: ({ table }) => {
        const totalSecurityDeposit = table
          .getFilteredRowModel()
          .rows.reduce(
            (sum, row) => sum + (parseFloat(row.original.securityDeposit) || 0),
            0
          );

        return (
          <span
            style={{ fontWeight: "bold", color: "white", padding: "10px 0" }}
          >
            {totalSecurityDeposit.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        );
      },
      muiTableFooterCellProps: {
        sx: {
          backgroundColor: "gray",
          color: "white",
        },
      },
    },
    {
      accessorKey: "other",
      header: "Other",
      Cell: ({ row }) => {
        const customerPaid = parseFloat(row?.original?.customerPaid) || 0;
        const securityDeposit = parseFloat(row?.original?.securityDeposit) || 0;

        const finalTotal = customerPaid - securityDeposit;
        return (
          <span>
            {finalTotal
              ? finalTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "0.00"}
          </span>
        );
      },
      Footer: ({ table }) => {
        const totalOther = table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => {
            const customerPaid = parseFloat(row.original.customerPaid) || 0;
            const securityDeposit =
              parseFloat(row.original.securityDeposit) || 0;
            return sum + (customerPaid - securityDeposit);
          }, 0);

        return (
          <span
            style={{ fontWeight: "bold", color: "white", padding: "10px 0" }}
          >
            {totalOther.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        );
      },
      muiTableFooterCellProps: {
        sx: {
          backgroundColor: "gray",
          color: "white",
        },
      },
    },
    {
      header: "Cash Received",
      accessorKey: "customerPaid",
      Cell: ({ row }) =>
        row.original.customerPaid.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      Footer: ({ table }) => {
        const totalCashReceived = table
          .getFilteredRowModel()
          .rows.reduce(
            (sum, row) => sum + (parseFloat(row.original.customerPaid) || 0),
            0
          );

        return (
          <span
            style={{ fontWeight: "bold", color: "white", padding: "10px 0" }}
          >
            {totalCashReceived.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        );
      },
      muiTableFooterCellProps: {
        sx: {
          backgroundColor: "gray",
          color: "white",
        },
      },
    },
    {
      accessorKey: "view",
      header: "Details",
      Cell: ({ row }) => (
        <IconButton
          color="primary"
          onClick={() => handleViewClick(row.original)}
        >
          <Eye />
        </IconButton>
      ),
      muiTableFooterCellProps: {
        sx: {
          backgroundColor: "gray",
          color: "white",
        },
      },
    },
  ];

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          {cashReceivable === null ? (
            <Loader />
          ) : (
            <MaterialReactTable
              columns={columns}
              data={tableData}
              enableExpanding
              initialState={{
                sorting: [
                  {
                    id: "transferDate",
                    desc: true,
                  },
                ],
              }}
              renderDetailPanel={({ row }) => {
                const nestedData = row?.original?.ordersCashDetails ?? [];

                const totalInvoice = nestedData.reduce((sum, item) => {
                  const total = parseFloat(item.total) || 0;
                  const onlinePaidAmount =
                    parseFloat(item.onlinePaidAmount) || 0;
                  const discount = parseFloat(item.discount) || 0;
                  return sum + (total - onlinePaidAmount - discount);
                }, 0);

                const totalCashReceived = nestedData.reduce(
                  (sum, item) => sum + (parseFloat(item.customerPaid) || 0),
                  0
                );

                return (
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "5px",
                    }}
                  >
                    <h5
                      style={{
                        margin: "10px 0",
                        color: "#0A80BF",
                        fontWeight: "bold",
                      }}
                    >
                      Consignment Detail ({row?.original?.documentId})
                    </h5>
                    <MaterialReactTable
                      columns={nestedColumns}
                      data={row?.original?.ordersCashDetails ?? []}
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
                          "& tfoot": {
                            backgroundColor: "#f0f0f0",
                            fontWeight: "bold",
                            borderTop: "1px solid #ccc",
                          },
                        },
                      }}
                    />
                  </div>
                );
              }}
              muiTableProps={{
                sx: {
                  "& th": {
                    background: "#0A80BF",
                    color: "white",
                    whiteSpace: "nowrap",
                    padding: "8px",
                    "& .MuiSvgIcon-root": {
                      color: "white !important",
                    },
                    "& .MuiTableSortLabel-icon": {
                      color: "white !important",
                    },
                    "& .MuiTableSortLabel-root:hover .MuiTableSortLabel-icon": {
                      color: "white !important",
                    },
                    "& .MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon": {
                      color: "white !important",
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </CardBody>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        toggle={toggleConfirmModal}
        onConfirm={handleConfirmReceive}
        message={`Are you sure you want to receive the amount for consignment ${selectedRowForConfirm?.documentId}?`}
      />

      {/* View Details Modal */}
      <ViewDetailsModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        rowData={selectedRow}
      />
    </Card>
  );
};

export default UnreceivedConsignment;
