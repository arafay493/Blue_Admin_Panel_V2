// @ts-nocheck
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import moment from "moment";
import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CiImageOn } from "react-icons/ci";
import { IconButton } from "@mui/material";

interface ConsignmentDepositLog {
  consignmentId: string;
  amount: number;
}

interface Log {
  id: number;
  accountName: string;
  accountType: string;
  amount: number;
  depositNumber: string;
  createdAt: string;
  createdBy: string;
  consignmentDepositLogsForAccounts: ConsignmentDepositLog[];
}

interface LogsModalProps {
  open: boolean;
  logs: Log[];
  onClose: () => void;
}

const LogsModal: React.FC<LogsModalProps> = ({ open, logs, onClose }) => {
  if (!logs || logs.length === 0) return null; // Ensure logs are available

  const tableData = logs[0]?.depositLogs;

  const nestedData = logs[0]?.depositLogs[0]?.consignmentDepositLogsForAccounts;
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const updatedData = tableData.map((record, index, records) => {
    const cutoffDate = new Date(record.at); // Use the "at" field dynamically as the cutoff date
    const updatedLogs = record.consignmentDepositLogsForAccounts.map((log) => {
      // Check previous records for the same consignmentId
      const previousRecords = records.slice(0, index); // All records before the current one
      const matchingLogs = previousRecords.flatMap((prevRecord) =>
        prevRecord.consignmentDepositLogsForAccounts.filter(
          (prevLog) =>
            prevLog.consignmentId === log.consignmentId &&
            new Date(prevRecord.at) < cutoffDate // Check if before the cutoffDate
        )
      );

      // Calculate the sum of the amounts from matching logs
      const previousAmountSum = matchingLogs.reduce(
        (sum, prevLog) => sum + prevLog.amount,
        0
      );

      // Calculate remainingBalance based on previous amounts
      const remainingBalance =
        matchingLogs.length > 0
          ? log.totalAmount - previousAmountSum
          : log.totalAmount;

      return {
        ...log,
        remainingBalance,
      };
    });

    return {
      ...record,
      consignmentDepositLogsForAccounts: updatedLogs,
    };
  });

  // Define columns for main log table
  const mainColumns: MRT_ColumnDef<Log>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "by",
      header: "Created By",
    },
    {
      accessorKey: "at",
      header: "Created At",
      Cell: ({ cell }) =>
        moment(cell.getValue<string>()).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      accessorKey: "depositNumber",
      header: "Deposit Number",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      Cell: ({ row }) =>
        row.original.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    },
    // {
    //   accessorKey: "baseUrl",
    //   header: "Deposit Attachment",
    //   Cell: ({ cell }) => {
    //     const imageUrl = cell.getValue<string>();
    //     return (
    //       <div>
    //         {imageUrl != "string" ? (
    //           <IconButton
    //             color="primary"
    //             onClick={() => setFullScreenImage(imageUrl)}
    //           >
    //             <CiImageOn size={30} />
    //           </IconButton>
    //         ) : (
    //           <span>No Attachment found</span>
    //         )}
    //       </div>
    //     );
    //   },
    //   muiTableFooterCellProps: {
    //     sx: {
    //       backgroundColor: "gray",
    //       color: "white",
    //     },
    //   },
    // },
  ];

  const nestedColumns: MRT_ColumnDef<ConsignmentDepositLog>[] = [
    {
      accessorKey: "consignmentId", // Key for the consignment array
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
      accessorKey: "type", // Key for the consignment array
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
      header: "Consignment Received Amount",
      Cell: ({ row }) =>
        parseFloat(row.original.totalAmount || 0).toLocaleString(undefined, {
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
        parseFloat(row.original.remainingBalance || 0).toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        ),
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
      Cell: ({ row }) =>
        parseFloat(row.original.amount || 0).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
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
      header: "Remaining Balance",
      Cell: ({ row }) => {
        const remainingBalance = parseFloat(row.original.remainingBalance) || 0;
        const amount = parseFloat(row.original.amount) || 0;
        const balance = remainingBalance - amount;

        return (
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {Math.abs(Number(balance)).toLocaleString(undefined, {
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
  ];

  return (
    <Modal isOpen={open} toggle={onClose} size="lg">
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

      <ModalHeader toggle={onClose}>Bank Account Logs</ModalHeader>
      <ModalBody>
        <StaticInputs
          labels={[
            "ID",
            "Account Name",
            "Account Number",
            "Account Type",
            "Amount",
          ]}
          values={[
            logs[0]?.id || "N/A",
            logs[0]?.accountName || "N/A",
            logs[0]?.accountNumber || "N/A",
            logs[0]?.accountType || "N/A",
            logs[0]?.amount !== undefined
              ? logs[0].amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "0.00",
          ]}
        />

        <MaterialReactTable
          columns={mainColumns}
          data={updatedData}
          enableExpanding
          renderDetailPanel={({ row }) => (
            <div style={{ padding: "16px" }}>
              <MaterialReactTable
                columns={nestedColumns}
                data={row?.original?.consignmentDepositLogsForAccounts}
                initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
                muiTableProps={{
                  sx: {
                    "& th": {
                      background: "#0A80BF",
                      color: "white",
                      whiteSpace: "nowrap",
                      padding: "8px",
                      "& .MuiSvgIcon-root": {
                        color: "white !important", // Forces SVG icons to stay white
                      },
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important", // Ensures sorting icons remain white
                      },
                      "& .MuiTableSortLabel-root:hover .MuiTableSortLabel-icon": {
                        color: "white !important", // Prevents hover color change
                      },
                      "& .MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon": {
                        color: "white !important", // Ensures active icons stay white
                      },
                    },
                  },
                }}
              />
            </div>
          )}
          initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
          muiTableProps={{
            sx: {
              "& th": {
                background: "#0A80BF",
                color: "white",
                whiteSpace: "nowrap",
                padding: "8px",
                "& .MuiSvgIcon-root": {
                  color: "white !important", // Forces SVG icons to stay white
                },
                "& .MuiTableSortLabel-icon": {
                  color: "white !important", // Ensures sorting icons remain white
                },
                "& .MuiTableSortLabel-root:hover .MuiTableSortLabel-icon": {
                  color: "white !important", // Prevents hover color change
                },
                "& .MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon": {
                  color: "white !important", // Ensures active icons stay white
                },
              },
            },
          }}
        />
      </ModalBody>
    </Modal>
  );
};

export default LogsModal;
