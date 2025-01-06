import { useMemo } from "react";

export const BatchStatusReportColumns = () => {
  const col = useMemo(
    () => [
      {
        accessorKey: "itemName", // Key from the data
        header: "Item Name", // Header to display
        enableSorting: true,
      },
      {
        accessorKey: "status", // Key from the data
        header: "Status", // Header to display
        enableSorting: true,
      },
      {
        accessorKey: "warehouseLocation", // Key from the data
        header: "Warehouse Location", // Header to display
        enableSorting: true,
      },
      {
        accessorKey: "qty", // Key from the data
        header: "Quantity", // Header to display
        enableSorting: true,
      },
    ],
    []
  );

  return col;
};
