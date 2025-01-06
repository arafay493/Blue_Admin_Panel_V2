// @ts-nocheck
import React, { useEffect, useState, useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Card, CardBody } from "reactstrap";
import { FaFileAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchReceiveConsignmentThunk } from "@/redux/slices/cashManagementSlice";
import { IconButton } from "@mui/material";
import { Eye } from "react-feather";
import {
  CustomApiResponse,
  MainData,
} from "@/redux/models/cashManagementTypes";
import ViewDetailsModal from "./ViewModal";
import Loader from "@/components/Loader/Loader";

const ReceivablesConsginment = () => {
  const selectedWarehouseId = useAppSelector(
    (state) => state.globalWarehouse?.selectedWarehouseId ?? null
  );
  const { data, loading } = useAppSelector(
    (state) => state.cashManagementReducer.receivedConsignment
  );
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CustomApiResponse | null>(
    null
  );

  useEffect(() => {
    if (selectedWarehouseId) {
      dispatch(fetchReceiveConsignmentThunk(selectedWarehouseId));
    }
  }, [selectedWarehouseId, dispatch]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleViewClick = (row: any) => {
    setSelectedRow(row);
    toggleModal();
  };

  const columns: MRT_ColumnDef<MainData[]>[] = useMemo(
    () => [
      {
        accessorKey: "documentId",
        header: "Consignment ID.",
        Cell: ({ cell }) => {
          const value = cell.getValue<number>();
          return value ? (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
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
                {value}
              </a>
            </span>
          ) : (
            "NA"
          );
        },
      },
      {
        accessorKey: "transferDate",
        header: "Transfer Date",
        Cell: ({ cell }) => cell.getValue() || "NA",
      },
      {
        accessorKey: "recievedOn",
        header: "Consignment Receiving Date",
        Cell: ({ row }) => {
          const recievedOn = row?.original?.receivingDetails?.recievedOn;

          return recievedOn;
        },
      },
      {
        accessorKey: "recievedBy",
        header: "Consignment Recieved By",
        Cell: ({ row }) => {
          const recievedBy = row?.original?.receivingDetails?.recievedBy;

          return recievedBy;
        },
      },
      {
        accessorKey: "driverName",
        header: "Driver Name",
        Cell: ({ cell }) => cell.getValue() || "NA",
      },
      {
        accessorKey: "vehicleNo",
        header: "Vehicle No",
        Cell: ({ cell }) => cell.getValue() || "NA",
      },
      {
        accessorKey: "total",
        header: "Consignment Amount",
        Cell: ({ row }) => {
          const baseTotal = parseFloat(row?.original?.total) || 0;
          const onlinePaidAmount =
            parseFloat(row?.original?.onlinePaidAmount) || 0;
          const discount = parseFloat(row?.original?.discount) || 0;

          const totalCashReceived = (
            row?.original?.ordersCashDetails ?? []
          ).reduce(
            (sum: number, order: any) =>
              sum + (parseFloat(order.customerPaid) || 0),
            0
          );

          const finalTotal = totalCashReceived;

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
          const customerPaid = parseFloat(row?.original?.customerPaid) || 0;
          const securityDeposit =
            parseFloat(row?.original?.securityDeposit) || 0;

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
        accessorKey: "customerPaid",
        header: "Cash Received ",
        Cell: ({ row }) =>
          row?.original?.customerPaid.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        accessorKey: "difference",
        header: "Difference",
        Cell: ({ row }) => {
          const customerPaid = parseFloat(row?.original?.customerPaid || 0);

          const totalCashReceived = (
            row?.original?.ordersCashDetails ?? []
          ).reduce(
            (sum: number, order: any) =>
              sum + (parseFloat(order.customerPaid) || 0),
            0
          );

          const difference = totalCashReceived - customerPaid;

          return (
            <span>
              {Math.abs(difference).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0.00"}
            </span>
          );
        },
      },

      {
        accessorKey: "actionButton",
        header: "Status",
        Cell: ({ row }) => {
          return (
            <span
              style={{
                color: "green",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
                cursor: "not-allowed",
                fontWeight: "bold",
              }}
              disabled
            >
              Received
            </span>
          );
        },
      },
    ],
    []
  );

  const nestedColumns: MRT_ColumnDef<MainData[]>[] = useMemo(
    () => [
      {
        accessorKey: "orderId",
        header: "Order ID",
        Cell: ({ cell }) => cell.getValue() || "NA",
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
        Cell: ({ cell }) => cell.getValue() || "NA",
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
        Cell: ({ cell }) => cell.getValue() || "NA",
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
        Cell: ({ cell }) => cell.getValue() || "NA",
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
        Cell: ({ row }) =>
          row.original.securityDeposit.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        Footer: ({ table }) => {
          const totalSecurityDeposit = table
            .getFilteredRowModel()
            .rows.reduce(
              (sum, row) =>
                sum + (parseFloat(row.original.securityDeposit) || 0),
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
          const securityDeposit =
            parseFloat(row?.original?.securityDeposit) || 0;

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
    ],
    []
  );

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          {loading ? (
            <Loader />
          ) : data && data.length === 0 ? (
            <div className="text-center p-4">
              <h4>No consignments found for the selected warehouse.</h4>
            </div>
          ) : (
            <MaterialReactTable
              columns={columns}
              data={data || []}
              enableExpanding
              initialState={{
                sorting: [
                  {
                    id: "transferDate",
                    desc: true,
                  },
                ],
              }}
              renderDetailPanel={({ row }) => (
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
                </div>
              )}
              muiTableProps={{
                sx: {
                  "& th": {
                    background: "#0A80BF",
                    color: "white",
                    whiteSpace: "nowrap",
                    padding: "8px",
                  },
                  "& td": {
                    padding: "8px",
                  },
                },
              }}
            />
          )}
        </div>
      </CardBody>
      <ViewDetailsModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        rowData={selectedRow}
      />
    </Card>
  );
};

export default ReceivablesConsginment;
