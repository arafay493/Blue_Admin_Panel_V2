import { useMemo } from "react";
import moment from "moment";

export const CustomerColumns = (fetchBarcodeData) => {
  const col = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Customer Name",
        enableSorting: true,
      },
      {
        accessorKey: "orderId",
        header: "Order ID",
        enableSorting: true,
      },
      {
        accessorKey: "address",
        header: "Address",
        enableSorting: false,
      },
      {
        accessorKey: "locationId",
        header: "Location ID",
        enableSorting: true,
      },
      {
        accessorKey: "customerId",
        header: "Customer ID",
        enableSorting: true,
      },
      {
        accessorKey: "at",
        header: "Date/Time",
        enableSorting: true,
        Cell: ({ cell }) =>
          moment(cell.getValue()).format("DD-MM-YYYY hh:mm A"),
      },
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "cylinderId",
        header: "Cylinder ID",
        enableSorting: true,
      },
      {
        accessorKey: "isFilled",
        header: "Filled Status",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Filled" : "Empty"),
      },
      {
        accessorKey: "status",
        header: "Cylinder Status",
        enableSorting: true,
      },
      {
        accessorKey: "barcode",
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
            {row?.original?.barcode}
          </p>
        ),
      },
      {
        accessorKey: "locateAt",
        header: "Location",
        enableSorting: false,
      },
      {
        accessorKey: "statusDescription",
        header: "Status Description",
        enableSorting: false,
      },
    ],
    [fetchBarcodeData]
  );

  return col;
};

export const BottlingUnitColumns = (fetchBarcodeData) => {
  const col = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "cylinderId",
        header: "Cylinder ID",
        enableSorting: true,
      },
      {
        accessorKey: "isFilled",
        header: "Filled Status",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Filled" : "Empty"),
      },
      {
        accessorKey: "at",
        header: "Date/Time",
        enableSorting: true,
        Cell: ({ cell }) =>
          moment(cell.getValue()).format("DD-MM-YYYY hh:mm A"),
      },
      {
        accessorKey: "status",
        header: "Cylinder Status",
        enableSorting: true,
      },
      {
        accessorKey: "barcode",
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
            {row?.original?.barcode}
          </p>
        ),
      },
      {
        accessorKey: "locateAt",
        header: "Location",
        enableSorting: false,
      },
      {
        accessorKey: "statusDescription",
        header: "Status Description",
        enableSorting: false,
      },
    ],
    []
  );

  return col;
};

export const GeneralReportColumns = () => {
  const col = useMemo(
    () => [
      {
        accessorKey: "itemName",
        header: "Item Name",
        enableSorting: true,
      },
      {
        accessorKey: "qty",
        header: "Quantity",
        enableSorting: true,
      },
      {
        accessorKey: "locateAt",
        header: "Location",
        enableSorting: true,
      },
      {
        accessorKey: "isFilled",
        header: "Filled Status",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Filled" : "Empty"),
      },
    ],
    []
  );

  return col;
};

export const VehiclesColumns = (fetchBarcodeData) => {
  const col = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "cylinderId",
        header: "Cylinder ID",
        enableSorting: true,
      },
      {
        accessorKey: "isFilled",
        header: "Filled Status",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Filled" : "Empty"),
      },
      {
        accessorKey: "at",
        header: "Date/Time",
        enableSorting: true,
        Cell: ({ cell }) =>
          moment(cell.getValue()).format("DD-MM-YYYY hh:mm A"),
      },
      {
        accessorKey: "status",
        header: "Cylinder Status",
        enableSorting: true,
      },
      {
        accessorKey: "barcode",
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
            {row?.original?.barcode}
          </p>
        ),
      },
      {
        accessorKey: "locateAt",
        header: "Location",
        enableSorting: true,
      },
      {
        accessorKey: "statusDescription",
        header: "Status Description",
        enableSorting: false,
      },
    ],
    []
  );

  return col;
};

export const WarehouseColumns = (fetchBarcodeData) => {
  const col = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "cylinderId",
        header: "Cylinder ID",
        enableSorting: true,
      },
      {
        accessorKey: "isFilled",
        header: "Filled Status",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Filled" : "Empty"),
      },
      {
        accessorKey: "at",
        header: "Date/Time",
        enableSorting: true,
        Cell: ({ cell }) =>
          moment(cell.getValue()).format("DD-MM-YYYY hh:mm A"),
      },
      {
        accessorKey: "status",
        header: "Cylinder Status",
        enableSorting: true,
      },
      {
        accessorKey: "barcode",
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
            {row?.original?.barcode}
          </p>
        ),
      },
      {
        accessorKey: "locateAt",
        header: "Location",
        enableSorting: true,
      },
      {
        accessorKey: "statusDescription",
        header: "Status Description",
        enableSorting: false,
      },
    ],
    []
  );

  return col;
};




export const CylinderHistoryColumns = () => {
  const col = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "at",
        header: "Date/Time",
        enableSorting: true,
        Cell: ({ cell }) => moment(cell.getValue()).format("DD-MM-YYYY hh:mm A"),
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        enableSorting: true,
      },
      {
        accessorKey: "locationId",
        header: "Location ID",
        enableSorting: true,
      },
      {
        accessorKey: "address",
        header: "Address",
        enableSorting: false,
      },
      {
        accessorKey: "description",
        header: "Description",
        enableSorting: false,
      },
    ],
    []
  );

  return col;
};