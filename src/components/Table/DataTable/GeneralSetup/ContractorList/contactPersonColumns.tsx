import { IconButton } from "@mui/material";
import React from "react";
import { Edit } from "react-feather";

const contactPersonColumns = (handleEdit: (contact: any) => void) => [
  { accessorKey: "name", header: "Contact Person Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "city", header: "City" },
  // {
  //   accessorKey: "edit",
  //   header: "Edit",
  //   Cell: ({ row }) => (
  //     <IconButton color="primary" onClick={() => handleEdit(row.original)}>
  //       <Edit size={20} />
  //     </IconButton>
  //   ),
  // },
];

export default contactPersonColumns;
