import { useMemo } from "react";
import moment from "moment";
import { Button } from "reactstrap";
import { IconButton } from "@mui/material";
import { Edit } from "react-feather";

export const MasterBatchColumns = ({ fetchBarcodeData, handleEdit }) => {
  const col = useMemo(
    () => [
      // {
      //   accessorKey: "id",
      //   header: "ID",
      //   enableSorting: true,
      // },
      {
        accessorKey: "barCode",
        header: "Barcode",
        enableSorting: true,
        Cell: ({ row }) => (
          <p
            style={{
              cursor: "pointer",
              color: "#1284C1",
              fontWeight: "bolder",
            }}
            onClick={() => fetchBarcodeData(row?.original)}
          >
            {row?.original?.barCode}
          </p>
        ),
      },
      // {
      //   accessorKey: "itemId",
      //   header: "Item ID",
      //   enableSorting: true,
      // },
      // {
      //   accessorKey: "lotNumber",
      //   header: "Lot Number",
      //   enableSorting: false,
      // },

      {
        accessorKey: "mnfDate",
        header: "Manufacturing Date",
        enableSorting: true,
        Cell: ({ cell }) => moment(cell.getValue()).format("DD-MM-YYYY"),
      },
      {
        accessorKey: "expDate",
        header: "Expiration Date",
        enableSorting: true,
        Cell: ({ cell }) => moment(cell.getValue()).format("DD-MM-YYYY"),
      },
      {
        accessorKey: "inDate",
        header: "In Date",
        enableSorting: true,
        Cell: ({ cell }) => moment(cell.getValue()).format("DD-MM-YYYY"),
      },
      {
        accessorKey: "serialNum",
        header: "Serial Number",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() === "" ? "N/A" : cell.getValue()),
      },
      // {
      //   accessorKey: "warrantyStartDate",
      //   header: "Warranty Start Date",
      //   enableSorting: true,
      //   Cell: ({ cell }) =>
      //     cell.getValue() === "0001-01-01T00:00:00"
      //       ? "N/A"
      //       : moment(cell.getValue()).format("DD-MM-YYYY"),
      // },
      // {
      //   accessorKey: "warrentyEndDate",
      //   header: "Warranty End Date",
      //   enableSorting: true,
      //   Cell: ({ cell }) =>
      //     cell.getValue() === "0001-01-01T00:00:00"
      //       ? "N/A"
      //       : moment(cell.getValue()).format("DD-MM-YYYY"),
      // },
      // {
      //   accessorKey: "location",
      //   header: "Location",
      //   enableSorting: true,
      // },
      {
        accessorKey: "status",
        header: "Status",
        enableSorting: true,
      },
      // {
      //   accessorKey: "locked",
      //   header: "Locked",
      //   enableSorting: true,
      //   Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
      // },
      // {
      //   accessorKey: "lastTransDate",
      //   header: "Last Transaction Date",
      //   enableSorting: true,
      //   Cell: ({ cell }) =>
      //     cell.getValue()
      //       ? moment(cell.getValue()).format("DD-MM-YYYY")
      //       : "N/A",
      // },
      // {
      //   accessorKey: "lastTransDoc",
      //   header: "Last Transaction Document",
      //   enableSorting: false,
      // },
      {
        accessorKey: "edit",
        header: "Edit",
        enableSorting: true,
        Cell: ({ row }) => (
          <IconButton color="primary" onClick={() => handleEdit(row.original)}>
            <Edit size={20} />
          </IconButton>
        ),
      },
    ],
    []
  );

  return col;
};
