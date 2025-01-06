// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Card, CardBody } from "reactstrap";
import { fetchAllDepositsService } from "@/redux/services/cashManagementService";
import { toast } from "react-toastify";
import { FaFileAlt } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { Eye } from "react-feather";
import InvoiceModal from "./InvoiceModal";
import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CiImageOn } from "react-icons/ci";
import Loader from "@/components/Loader/Loader";

type DepositData = {
  id: number;
  depositDate: string;
  depositType: string;
  depositAccount: string;
  depositNumber: string;
  depositAmount: number;
  depositBy: string;
  createdDate: string;
};

const DepositListComponent: React.FC = () => {
  const [deposits, setDeposits] = useState<DepositData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const handleViewClick = (rowData: any) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) setSelectedRow(null);
  };

  useEffect(() => {
    fetchAllDepositsService()
      .then((response) => {
        const mappedDeposits = response.data?.map((item: any) => ({
          id: item.id,
          depositDate: new Date(item.at).toLocaleDateString(),
          depositType: item.depositAccount?.accountType || "N/A",
          depositAccount: item.depositAccount?.accountName || "N/A",
          depositNumber: item.depositAccount?.accountNumber || "N/A",
          baseUrl: item.baseUrl || 0,
          depositAmount: item.totalAmount || 0,
          depositBy: item.by || "N/A",
          createdDate: new Date(item.at).toLocaleDateString(),
          depositConsignments:
            item.depositConsignments?.map((consignment: any) => ({
              consignmentId: consignment.consignmentId,
              amount: consignment.amount || 0,
              type: consignment.type || "N/A",
              totalAmount: consignment.totalAmount || 0,
              cashRecieved: consignment.cashRecieved || 0,
              driverName: consignment.driverName || "N/A",
              transferDate: consignment.transferDate || "N/A",
              vehicleNumber: consignment.vehicleNumber || "N/A",
              ordersCashDetails:
                consignment.ordersCashDetails?.map((order: any) => ({
                  orderId: order.orderId,
                  customerId: order.customerId,
                  customerName: order.customerName || "N/A",
                  paymentType: order.paymentType || "N/A",
                  deliveryDate: order.deliveryDate || "N/A",
                  orderCreatedDate: order.orderCreatedDate || "N/A",
                  customerPaid: order.customerPaid || 0,
                  isUrgent: order.isUrgent || false,
                  qty: order.qty || 0,
                  invoiceType: order.invoiceType || "N/A",
                  total: order.total || 0,
                  onlinePaidAmount: order.onlinePaidAmount || 0,
                  gasPrice: order.gasPrice || 0,
                  securityDeposit: order.securityDeposit || 0,
                  deliveryCharges: order.deliveryCharges || 0,
                  urgentDeliveryCharges: order.urgentDeliveryCharges || 0,
                  tax: order.tax || 0,
                  discount: order.discount || 0,
                })) || [],
            })) || [],
        }));

        setDeposits(mappedDeposits);
      })
      .catch((error) => {
        console.error("Error fetching deposits:", error);
        toast.error("Failed to fetch deposits");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updatedData = deposits?.map((record, index, records) => {
    const updatedConsignments = record.depositConsignments.map(
      (consignment) => {
        if (record.depositType === "Other") {
          // Handle 'Other' type
          if (index === 0) {
            return {
              ...consignment,
              remainingBalance: consignment.totalAmount,
            };
          } else {
            const previousRecords = records
              .slice(0, index)
              .filter((prevRecord) => prevRecord.depositType === "Other");
            const matchingConsignments = previousRecords.flatMap((prevRecord) =>
              prevRecord.depositConsignments.filter(
                (prevConsignment) =>
                  prevConsignment.consignmentId === consignment.consignmentId
              )
            );
            const previousAmountSum = matchingConsignments.reduce(
              (sum, prevConsignment) => sum + prevConsignment.amount,
              0
            );
            return {
              ...consignment,
              remainingBalance: consignment.totalAmount - previousAmountSum,
            };
          }
        } else if (record.depositType === "SecurityDeposit") {
          // Handle 'SecurityDeposit' type
          if (index === 0) {
            return {
              ...consignment,
              remainingBalance: consignment.totalAmount,
            };
          } else {
            const previousRecords = records
              .slice(0, index)
              .filter(
                (prevRecord) => prevRecord.depositType === "SecurityDeposit"
              );
            const matchingConsignments = previousRecords.flatMap((prevRecord) =>
              prevRecord.depositConsignments.filter(
                (prevConsignment) =>
                  prevConsignment.consignmentId === consignment.consignmentId
              )
            );
            const previousAmountSum = matchingConsignments.reduce(
              (sum, prevConsignment) => sum + prevConsignment.amount,
              0
            );
            return {
              ...consignment,
              remainingBalance: consignment.totalAmount - previousAmountSum,
            };
          }
        } else {
          // Fallback for other deposit types
          return consignment;
        }
      }
    );

    return {
      ...record,
      depositConsignments: updatedConsignments,
    };
  });

  // Define table columns
  const columns: MRT_ColumnDef<DepositData>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Deposit ID",
        Cell: ({ cell, row }) => (
          <span
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => row.toggleExpanded()}
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
              {cell.getValue<string>()}
            </a>
          </span>
        ),
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
        accessorKey: "depositDate",
        header: "Deposit Date",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "depositType",
        header: "Deposit Type",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "depositAccount",
        header: "Deposit Account",
        Cell: ({ row }) =>
          row.original.depositAccount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "depositNumber",
        header: "Deposit No.",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "depositAmount",
        header: "Deposit Amount",
        Cell: ({ cell }) => (
          <span style={{ fontWeight: "bold" }}>
            {cell.getValue<number>().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            PKR
          </span>
        ),
        Footer: ({ table }) => {
          const totalDepositAmount = table
            .getFilteredRowModel()
            .rows.reduce(
              (sum, row) => sum + (parseFloat(row.original.depositAmount) || 0),
              0
            );

          return (
            <span
              style={{ fontWeight: "bold", color: "white", padding: "10px 0" }}
            >
              {totalDepositAmount.toLocaleString(undefined, {
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
        accessorKey: "depositBy",
        header: "Deposit By",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "createdDate",
        header: "Created Date",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "baseUrl",
        header: "Deposit Attachment",
        Cell: ({ cell }) => {
          const imageUrl = cell.getValue<string>();
          return (
            <div>
              {imageUrl != "string" ? (
                <IconButton
                  color="primary"
                  onClick={() => setFullScreenImage(imageUrl)}
                >
                  <CiImageOn size={30} />
                </IconButton>
              ) : (
                <span>No Attachment found</span>
              )}
            </div>
          );
        },
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

  const nestedColumns: MRT_ColumnDef<DepositData>[] = useMemo(
    () => [
      {
        accessorKey: "consignmentId",
        header: "Consignment ID",
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
        accessorKey: "transferDate",
        header: "Transfer Date",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "driverName",
        header: "Driver Name",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "vehicleNumber",
        header: "Vehicle Number",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "totalAmount",
        header: "Received Amount",
        Cell: ({ row }) =>
          row.original.totalAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        Footer: ({ table }) => {
          const totaltotalAmount = table
            .getFilteredRowModel()
            .rows.reduce(
              (sum, row) => sum + (parseFloat(row.original.totalAmount) || 0),
              0
            );

          return (
            <span
              style={{ fontWeight: "bold", color: "white", padding: "10px 0" }}
            >
              {totaltotalAmount.toLocaleString(undefined, {
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
        accessorKey: "remainingBalance",
        header: " Balance",
        Cell: ({ row }) =>
          row.original.remainingBalance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        Footer: ({ table }) => {
          const totalremainingBalance = table
            .getFilteredRowModel()
            .rows.reduce(
              (sum, row) =>
                sum + (parseFloat(row.original.remainingBalance) || 0),
              0
            );

          return (
            <span
              style={{ fontWeight: "bold", color: "white", padding: "10px 0" }}
            >
              {totalremainingBalance.toLocaleString(undefined, {
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
        accessorKey: "amount",
        header: "Deposit Amount",
        Footer: ({ table }) => {
          const amount = table
            .getFilteredRowModel()
            .rows.reduce(
              (sum, row) => sum + (parseFloat(row.original.amount) || 0),
              0
            );

          return (
            <span
              style={{ fontWeight: "bold", color: "white", padding: "10px 0" }}
            >
              {amount.toLocaleString(undefined, {
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
        accessorKey: "balance",
        header: " Remaining Balance",
        Cell: ({ row }) => {
          const remainingBalance =
            parseFloat(row.original.remainingBalance) || 0;
          const amount = parseFloat(row.original.amount) || 0;
          const balance = remainingBalance - amount;

          return (
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {Math.abs(balance).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          );
        },
        Footer: ({ table }) => {
          const totalBalance = table
            .getFilteredRowModel()
            .rows.reduce(
              (sum, row) =>
                sum +
                ((parseFloat(row.original.amount) || 0) -
                  (parseFloat(row.original.remainingBalance) || 0)),
              0
            );

          return (
            <span
              style={{
                fontWeight: "bold",
                color: "white",
                padding: "10px 0",
              }}
            >
              {Math.abs(totalBalance).toLocaleString(undefined, {
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
        accessorKey: "actionButton",
        header: "Status",
        Cell: ({ row }) => {
          const remainingBalance =
            parseFloat(row.original.remainingBalance).toFixed(2) || "0.00"; // Format to 2 decimal places
          const amount = parseFloat(row.original.amount).toFixed(2) || "0.00"; // Format to 2 decimal places
          const balance = parseFloat(remainingBalance) - parseFloat(amount); // Calculate balance

          const status = balance === 0 ? "Received" : "Partially Received";
          const color = balance === 0 ? "green" : "orange";

          return (
            <span
              style={{
                color: color,
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              {status}
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
    ],
    []
  );

  const nestedinnerColumns: MRT_ColumnDef<DepositData>[] = useMemo(
    () => [
      {
        accessorKey: "orderId", // Key for the consignment array
        header: "Order ID",
      },
      {
        accessorKey: "customerId",
        header: "Customer ID",
      },
      {
        accessorKey: "customerName",
        header: "Customer Name",
      },
      {
        accessorKey: "paymentType",
        header: "Payment Type",
      },
      // {
      //   accessorKey: "orderCreatedDate",
      //   header: "Order Created Date",
      // },
      // {
      //   accessorKey: "deliveryDate",
      //   header: "Delivery Date",
      // },
      {
        accessorKey: "invoiceType",
        header: "Invoice Type",
      },
      // {
      //   accessorKey: "qty",
      //   header: "Quantity",
      // },
      {
        accessorKey: "total",
        header: "Total Amount",
        enableSorting: true,
        Cell: ({ row }) =>
          row.original.total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        accessorKey: "onlinePaidAmount",
        header: "Wallet Deduction",
        enableSorting: true,
        Cell: ({ row }) =>
          row.original.onlinePaidAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        header: "Order Amount",
        accessorFn: (row) => {
          const total = row.total || 0;
          const onlinePaidAmount = row.onlinePaidAmount || 0;
          return total - onlinePaidAmount;
        },
        Cell: ({ row }) =>
          (row.original.total - row.original.onlinePaidAmount).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          ),

        enableSorting: true,
      },

      {
        header: "Delivery Type",
        accessorFn: (row) => {
          const type =
            row.isUrgent === true ? "Urgent Delivery" : "Standard Delivery";
          return type;
        },
        enableSorting: true,
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
      },
    ],
    []
  );

  return (
    <Card>
      <Dialog
        open={!!fullScreenImage}
        onClose={() => setFullScreenImage(null)}
        maxWidth="xl"
        fullWidth
      >
        <DialogContent style={{ position: "relative", padding: 0 }}>
          <IconButton
            onClick={() => setFullScreenImage(null)}
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={fullScreenImage || ""}
            alt="Full Screen Deposit"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>

      <CardBody>
        <div className="table-responsive">
          {loading ? (
            <Loader />
          ) : (
            <MaterialReactTable
              columns={columns}
              data={updatedData || []}
              enablePagination
              enableExpanding
              initialState={{
                sorting: [
                  {
                    id: "depositDate",
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
                  <MaterialReactTable
                    columns={nestedColumns}
                    data={row?.original?.depositConsignments || []}
                    enableExpanding
                    renderDetailPanel={({ row }) => (
                      <div
                        style={{
                          padding: "10px",
                          backgroundColor: "#f8f9fa",
                          borderRadius: "5px",
                        }}
                      >
                        <MaterialReactTable
                          columns={nestedinnerColumns}
                          data={row?.original?.ordersCashDetails || []}
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
          <InvoiceModal
            isOpen={isModalOpen}
            toggle={toggleModal}
            data={selectedRow}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default DepositListComponent;
