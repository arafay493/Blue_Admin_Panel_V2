// @ts-nocheck
import React, { useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchOrderReports } from "../../../../../redux/slices/customerSlice";
import { exportToCSV } from "utils/csvUtils";
import { Box } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import Loader from "@/components/Loader/Loader";

interface Order {
  status: string;
  cylinderCount: number;
}

const OrderReportTable = () => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.orderSlice);
  const loading: boolean = useAppSelector(
    (state) => state?.orderSlice?.order?.loading
  );

  useEffect(() => {
    dispatch(fetchOrderReports());
  }, [dispatch]);

  const orderReport = order?.orders;

  const transformedData = useMemo(() => {
    if (!orderReport || !Array.isArray(orderReport) || orderReport.length === 0)
      return [];

    const rowData: { [key: string]: number } = {
      Pending: 0,
      Assigned: 0,
      "Ready to dispatch": 0,
      Delivered: 0,
      "Pickup Request Initiated": 0,
      "Total Cylinder In WareHouse": 0,
      "Reserved for customer": 0,
      "Available for sale": 0,
    };

    orderReport.forEach((item: Order) => {
      switch (item.status) {
        case "AvailableCylindersAtWarehouse":
          rowData["Available Cylinders At Warehouse"] = item.cylinderCount;
          break;
        case "Pending":
          rowData["Pending"] = item.cylinderCount;
          break;
        case "Assigned":
          rowData["Assigned"] = item.cylinderCount;
          break;
        case "Ready to dispatch":
          rowData["Ready to dispatch"] = item.cylinderCount;
          break;
        case "Delivered":
          rowData["Delivered"] = item.cylinderCount;
          break;
        case "Pickup Request Initiated.":
          rowData["Pickup Request Initiated"] = item.cylinderCount;
          break;
        case "TotalCylinderInWareHouse":
          rowData["Total Cylinder In WareHouse"] = item.cylinderCount;
          break;
        case "Reserved for customer":
          rowData["Reserved for customer"] = item.cylinderCount;
          break;
        case "Available for sale":
          rowData["Available for sale"] = item.cylinderCount;
          break;
        default:
          break;
      }
    });

    return [rowData];
  }, [orderReport]);

  const columns = useMemo(
    () =>
      Object.keys(transformedData[0] || {}).map((key) => ({
        accessorKey: key,
        header: key,
        muiTableBodyCellProps: {
          sx: {
            color:
              key === "Delivered"
                ? "#388E3C"
                : key === "Ready to dispatch"
                ? "#F57C00"
                : "inherit",
          },
        },
      })),
    [transformedData]
  );

  const handleExportRowsToCSV = (rows) => {
    const headers = rows.length > 0 ? Object.keys(rows[0].original) : [];

    const data = rows.map((row) => {
      const rowData = {};
      headers.forEach((header) => {
        rowData[header] = row.original[header] || 0;
      });
      return rowData;
    });

    exportToCSV(data, headers, "Order_Report.csv");
  };

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          {orderReport && orderReport.length > 0 ? (
            <div style={{ marginTop: 20 }}>
              <MaterialReactTable
                columns={columns}
                data={transformedData}
                enableFilters
                muiTableProps={{
                  sx: {
                    "& th": {
                      background: "#0A80BF",
                      color: "white",
                      whiteSpace: "nowrap",
                      padding: "8px",
                      minWidth: "180px",
                    },
                    "& td": {
                      padding: "8px",
                      minWidth: "180px",
                    },
                  },
                }}
                renderTopToolbarCustomActions={({ table }) => (
                  <Box>
                    <Button
                      disabled={
                        table.getPrePaginationRowModel().rows.length === 0
                      }
                      color="primary"
                      onClick={() =>
                        handleExportRowsToCSV(
                          table.getPrePaginationRowModel().rows
                        )
                      }
                      variant="text"
                    >
                      <FiDownload
                        color="primary"
                        style={{
                          fontSize: "18px",
                          color: "inherit",
                          verticalAlign: "middle",
                          marginRight: "10px",
                        }}
                      />
                      Export to CSV
                    </Button>
                  </Box>
                )}
              />
            </div>
          ) : (
            <p>No orders available</p>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderReportTable;
