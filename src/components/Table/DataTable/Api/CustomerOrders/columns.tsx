import moment from "moment";
import { useMemo } from "react";

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
