import { IconButton } from "@mui/material";
import React, { useMemo } from "react";
import { Edit, Eye } from "react-feather";

const locationListColumns = ({ onEdit, onView }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Location Name",
        enableSorting: true,
      },
      {
        accessorKey: "type",
        header: "Location Type",
        enableSorting: true,
      },
      {
        accessorKey: "city",
        header: "City",
        enableSorting: true,
      },
      {
        accessorKey: "province",
        header: "Province",
        enableSorting: true,
      },
      {
        accessorKey: "address",
        header: "Address",
        enableSorting: true,
      },

      {
        accessorKey: "warehouseType",
        header: "Warehouse Type",
        size: 150,
        Cell: ({ row }) => {
          const { parentID } = row.original;
          return parentID === null || parentID === 0
            ? "Central Hub"
            : "Distributor";
        },
      },
      {
        id: "view",
        header: "View",
        Cell: ({ row }) => {
          const { parentID } = row.original;
          return parentID === null || parentID === 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IconButton color="primary" onClick={() => onView(row.original)}>
                <Eye size={20} />{" "}
              </IconButton>
            </div>
          ) : null;
        },
      },

      {
        id: "edit",
        header: "Edit",
        Cell: ({ row }) => (
          <IconButton color="primary" onClick={() => onEdit(row.original)}>
            <Edit size={20} />
          </IconButton>
        ),
      },
    ],
    [onEdit]
  );

  return columns;
};

export default locationListColumns;
