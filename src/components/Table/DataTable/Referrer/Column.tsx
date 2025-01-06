import { IconButton } from "@mui/material";
import { Eye } from "react-feather";

export const columns = [
  {
    accessorKey: "id",
    header: "Referrer ID",
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    enableSorting: true,
  },
  {
    accessorKey: "cnicIssueDate",
    header: "CNIC Issue Date",
    enableSorting: true,
  },
  {
    accessorKey: "cnicExpiryDate",
    header: "CNIC Expiry Date",
    enableSorting: true,
  },
  {
    header: "View",
    Cell: ({ row }) => (
      <IconButton color="primary">
        <Eye size={20} />
      </IconButton>
    ),
  },
];
