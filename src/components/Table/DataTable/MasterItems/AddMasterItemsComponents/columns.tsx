import { IconButton } from "@mui/material";
import { useMemo } from "react";
import { Edit } from "react-feather";

export const ItemTypeColumns = ({ handleOpenEditModal }) => {
  const col = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },
      {
        accessorKey: "uom",
        header: "UOM",
        enableSorting: true,
      },
      {
        accessorKey: "edit",
        header: "Edit",
        enableSorting: true,
        Cell: ({ row }) => (
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(row.original)}
          >
            <Edit size={20} />
          </IconButton>
        ),
      },
    ],
    []
  );

  return col;
};
