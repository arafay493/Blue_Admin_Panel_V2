// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAllAccounts,
  fetchBankAccountLogsThunk,
} from "@/redux/slices/cashManagementSlice";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { AiOutlineFileText } from "react-icons/ai";
import { Box, IconButton } from "@mui/material";
import LogsModal from "./LogsModal";
import moment from "moment";

// Define the log type (adjust as needed based on your actual log structure)
interface Log {
  id: number;
  accountId: number;
  amount: number;
  depositNumber: string;
  createdAt: string;
  createdBy: string;
  consignmentDepositLogsForAccounts: Array<{
    consignmentId: number;
    amount: number;
  }>;
}

interface Account {
  id: number;
  accountName: string;
  accountType: string;
  glCode: string;
  bankChargesAccount: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  branchCode: string;
  bankAddress: string;
  chartOfAccount: string | null;
  amount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

const AccountsTableComponent: React.FC = () => {
  const [openLogsModal, setOpenLogsModal] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState<Log[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllAccounts());
    dispatch(fetchBankAccountLogsThunk());
  }, [dispatch]);

  const { accounts } = useAppSelector(
    (state) => state.cashManagementReducer.allAcounts
  );

  const { logs } = useAppSelector(
    (state) => state.cashManagementReducer.bankAccountLogs
  );

  const tableData: Account[] = Array.isArray(accounts) ? accounts : [];

  const columns = useMemo<MRT_ColumnDef<Account>[]>(
    () => [
      {
        header: "Account Name",
        accessorKey: "accountName",
      },
      {
        header: "Type",
        accessorKey: "accountType",
      },
      {
        header: "GL Code",
        accessorKey: "glCode",
      },
      {
        header: "Charges Account",
        accessorKey: "bankChargesAccount",
      },
      {
        header: "Bank Name",
        accessorKey: "bankName",
      },
      {
        header: "Account Number",
        accessorKey: "accountNumber",
      },
      {
        header: "IBAN Number",
        accessorKey: "iban",
      },
      {
        header: "Branch & Swift Code",
        accessorKey: "branchCode",
      },
      {
        header: "Bank Address",
        accessorKey: "bankAddress",
      },
      {
        header: "Updated By",
        accessorKey: "updatedBy",
      },
      {
        header: "Updated At",
        accessorKey: "updatedAt",
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue
            ? moment(dateValue).format("DD-MM-YYYY HH:mm:ss")
            : "-";
        },
      },
      {
        header: "Amount",
        accessorKey: "amount",
        Cell: ({ row }) =>
          row.original.amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        id: "Logs",
        header: "Logs",
        enableSorting: true,
        Cell: ({ row }) => {
          const accountId = row.original.id;
          const accountLogs = Array.isArray(logs?.data)
            ? logs.data.filter((log) => log.id === accountId)
            : [];
          return (
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                color="primary"
                onClick={() => {
                  setSelectedLogs(accountLogs || []);
                  setOpenLogsModal(true);
                }}
              >
                <AiOutlineFileText size={20} />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    [logs]
  );

  const handleCloseLogsModal = () => {
    setOpenLogsModal(false);
    setSelectedLogs([]);
  };

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={tableData}
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
      <LogsModal
        open={openLogsModal}
        logs={selectedLogs}
        onClose={handleCloseLogsModal}
      />
    </div>
  );
};

export default AccountsTableComponent;
