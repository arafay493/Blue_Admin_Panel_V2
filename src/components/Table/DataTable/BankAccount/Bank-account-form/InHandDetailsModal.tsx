// @ts-nocheck
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchInhandSlice } from "@/redux/slices/cashManagementSlice";
import React, { useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import moment from "moment";

interface InHandDetailsModalProps {
  open: boolean;
  onClose: () => void;
  details: { type: string; amount: number } | null;
}

interface Transaction {
  consignment?: {
    consignmentId: string;
    driverName: string;
    vehicleNumber: string;
    transferDate: string;
  };
  transactionType: "In" | "Out";
  amount: number;
  at: string;
  accountNumber?: string;
  accountName?: string;
  accountType?: string;
}

const InHandDetailsModal: React.FC<InHandDetailsModalProps> = ({
  open,
  onClose,
  details,
}) => {
  const dispatch = useAppDispatch();

  const selectedWarehouseId = useAppSelector(
    (state) => state.globalWarehouse?.selectedWarehouseId ?? null
  );

  useEffect(() => {
    if (selectedWarehouseId) {
      dispatch(fetchInhandSlice(selectedWarehouseId));
    }
  }, [selectedWarehouseId, dispatch]);
  const { logs } = useAppSelector(
    (state) => state.cashManagementReducer.inhandbankAccounts
  );

  const prepareTableData = (type: "SecurityDeposit" | "Other") => {
    if (!logs || !logs.data) {
      console.error("Logs or logs.data is undefined");
      return [];
    }

    const data =
      type === "SecurityDeposit"
        ? logs?.data?.inhandSecurityDeposit
        : logs?.data?.inhandOther;

    if (!data) return [];

    const inRecords = (data.inRecords || []).map((record) => ({
      ...record,
      transactionType: "In" as const,
    }));

    const outRecords = (data.outRecords || []).map((record) => ({
      ...record,
      transactionType: "Out" as const,
    }));

    const combinedRecords = [...inRecords, ...outRecords].sort((a, b) => {
      const dateA = moment(a.at);
      const dateB = moment(b.at);
      return dateA.valueOf() - dateB.valueOf();
    });

    const updatedData = combinedRecords.map((record, index, records) => {
      const currentConsignmentId = record?.consignment?.consignmentId || null;
      const cashReceived =
        type === "SecurityDeposit"
          ? record?.consignment?.securityDeposit || 0
          : record?.consignment?.other || 0;

      if (record.transactionType === "In") {
        if (!currentConsignmentId) {
          return {
            ...record,
            remainingBalance: 0,
          };
        }

        // Find previous "In" records with the same consignmentId
        const previousInRecords = records
          .slice(0, index)
          .filter(
            (prevRecord) =>
              prevRecord.transactionType === "In" &&
              prevRecord?.consignment?.consignmentId === currentConsignmentId
          );

        // If no matching previous "In" records, remainingBalance is cashReceived
        if (previousInRecords.length === 0) {
          return {
            ...record,
            remainingBalance: cashReceived,
          };
        }

        // Sum the amounts from matching "In" records
        const sumOfPreviousInAmounts = previousInRecords.reduce(
          (sum, prevRecord) => sum + (prevRecord.amount || 0),
          0
        );

        // Calculate remaining balance for "In" records
        const remainingBalance = cashReceived - sumOfPreviousInAmounts;

        return {
          ...record,
          remainingBalance,
        };
      }

      // Handle "Out" records
      if (record.transactionType === "Out") {
        // If no consignmentId, remainingBalance is 0 for "Out" records
        if (!currentConsignmentId) {
          return {
            ...record,
            remainingBalance: 0,
          };
        }

        // Find previous "Out" records with the same consignmentId
        const previousOutRecords = records
          .slice(0, index)
          .filter(
            (prevRecord) =>
              prevRecord.transactionType === "Out" &&
              prevRecord?.consignment?.consignmentId === currentConsignmentId
          );

        // If no matching previous "Out" records, remainingBalance is cashReceived
        if (previousOutRecords.length === 0) {
          return {
            ...record,
            remainingBalance: cashReceived,
          };
        }

        // Sum the amounts from matching "Out" records
        const sumOfPreviousOutAmounts = previousOutRecords.reduce(
          (sum, prevRecord) => sum + (prevRecord.amount || 0),
          0
        );

        // Calculate remaining balance for "Out" records
        const remainingBalance = cashReceived - sumOfPreviousOutAmounts;

        return {
          ...record,
          remainingBalance,
        };
      }

      // If no matching transaction type, return the record without changes
      return record;
    });

    return updatedData; // Return the updated data with remainingBalance
  };

  const columns: MRT_ColumnDef<Transaction>[] = [
    {
      accessorKey: "consignment.consignmentId",
      header: "Consignment ID",
    },
    {
      accessorKey: "transactionType",
      header: "Transaction Type",
    },
    {
      accessorKey: "consignment.driverName",
      header: "Driver Name",
    },
    {
      accessorKey: "consignment.vehicleNumber",
      header: "Vehicle Number",
    },
    {
      accessorKey: "consignment.transferDate",
      header: "Transfer Date",
    },
    {
      accessorKey: "remainingBalance",
      header: " Balance",
      Cell: ({ row }) =>
        row.original.remainingBalance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
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
    {
      accessorKey: "balance",
      header: " Remaining Balance",
      Cell: ({ row }) => {
        const balance = row.original.remainingBalance - row.original.amount;
        return balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      },
    },
    {
      accessorKey: "accountNumber",
      header: "Account Number",
      Cell: ({ row }) => row.original.accountNumber || "-",
    },
    {
      accessorKey: "accountName",
      header: "Account Name",
      Cell: ({ row }) => row.original.accountName || "-",
    },
    {
      accessorKey: "message", // You can keep this if you still need to access the message for other purposes.
      header: "Created By",
      Cell: ({ row }) => {
        const userName = localStorage.getItem("UserName") || "Guest";
        return <div>{userName}</div>;
      },
    },

    {
      accessorKey: "at",
      header: "Created At",
      Cell: ({ row }) => moment(row.original.at).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  const newData = prepareTableData("SecurityDeposit");

  const updatedData = newData.map((record, index, records) => {
    const currentConsignmentId = record?.consignment?.consignmentId || null;
    const invoiceTotal = record?.consignment?.invoiceTotal || 0;
    const currentAmount = record.amount || 0;

    if (!currentConsignmentId) {
      return {
        ...record,
        remainingBalance: 0,
      };
    }

    // Find all previous records with the same consignmentId
    const previousRecords = records.slice(0, index); // All records before the current one
    const matchingRecords = previousRecords.filter(
      (prevRecord) =>
        prevRecord?.consignment?.consignmentId === currentConsignmentId
    );

    if (matchingRecords.length === 0) {
      // If no previous matching records, set remainingBalance to invoiceTotal
      return {
        ...record,
        remainingBalance: invoiceTotal,
      };
    }

    // Calculate the sum of amounts from all matching previous records
    const sumOfPreviousAmounts = matchingRecords.reduce(
      (sum, prevRecord) => sum + (prevRecord.amount || 0),
      0
    );

    // Set remainingBalance to invoiceTotal - sumOfPreviousAmounts
    const remainingBalance = invoiceTotal - sumOfPreviousAmounts;

    return {
      ...record,
      remainingBalance,
    };
  });

  return (
    <Modal isOpen={open} toggle={onClose} size="lg">
      <ModalHeader toggle={onClose}>In-Hand Details</ModalHeader>
      <ModalBody>
        {details ? (
          <StaticInputs
            labels={["Account Type", "Amount"]}
            values={[details.type, details.amount.toLocaleString()]}
          />
        ) : (
          <p>No details available</p>
        )}
        {details?.type === "Security Deposit In-hand Hunza" ? (
          <>
            <h5 className="mt-4 mb-3">Security Deposit Transactions</h5>
            <MaterialReactTable
              columns={columns}
              data={prepareTableData("SecurityDeposit")}
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
          </>
        ) : (
          <>
            <h5 className="mt-4 mb-3">Other Transactions</h5>
            <MaterialReactTable
              columns={columns}
              data={prepareTableData("Other")}
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
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

export default InHandDetailsModal;
