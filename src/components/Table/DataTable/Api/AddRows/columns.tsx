import { Box, IconButton } from "@mui/material";
import moment from "moment";
import { useMemo } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineFileText } from "react-icons/ai";

export const CustomerListColumns = ({ handleFetchLogs, handleAddAmount }) => {
  const col = useMemo(
    () => [
      {
        accessorKey: "customerId",
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
            CU-{row.original?.customerId}
          </p>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        enableSorting: true,
      },
      {
        accessorKey: "cnic",
        header: "CNIC",
        enableSorting: true,
      },
      {
        accessorKey: "cnicExpiryDate",
        header: "CNIC Expiry Date",
        enableSorting: true,
      },
      {
        accessorKey: "cnicIssueDate",
        header: "CNIC Issue Date",
        enableSorting: true,
      },
      {
        id: "Logs",
        header: "Logs",
        enableSorting: true,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              color="primary"
              onClick={() => handleFetchLogs(row.original.id)}
            >
              <AiOutlineFileText size={20} />
            </IconButton>
          </Box>
        ),
      },

      {
        id: "AddAmount",
        header: "Add Amount",
        enableSorting: true,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              color="primary"
              onClick={() => handleAddAmount(row.original.customerId)}
            >
              <IoWalletOutline size={20} />
            </IconButton>
          </Box>
        ),
      },
    ],
    []
  );

  return col;
};

export const CustomerLogOrder = () => {
  const col = useMemo(
    () => [
      {
        accessorKey: "orderDetails.id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "createdOn",
        header: "Created On",
        enableSorting: true,
        Cell: ({ row }) => (
          <div>
            {moment(row?.original.createdOn).format("DD-MM-YYYY") || "NA"}
          </div>
        ),
      },
      {
        accessorKey: "invoiceType",
        header: "Invoice Type",
        enableSorting: true,
      },
      {
        accessorKey: "status",
        header: "Status",
        enableSorting: true,
      },
      {
        accessorKey: "orderDetails.qty",
        header: "Quantity",
        enableSorting: true,
      },
      {
        accessorKey: "orderDetails.total",
        header: "Total",
        enableSorting: true,
      },
    ],
    []
  );

  return col;
};

export const CustomerLogDataColumns = () => {
  const col = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "statusDescription",
        header: "Status Description",
        enableSorting: true,
      },
      {
        accessorKey: "createdOn",
        header: "Created On",
        enableSorting: true,
        Cell: ({ row }) => (
          <div>
            {moment(row?.original.createdOn).format("DD-MM-YYYY") || "NA"}
          </div>
        ),
      },
    ],
    []
  );

  return col;
};
