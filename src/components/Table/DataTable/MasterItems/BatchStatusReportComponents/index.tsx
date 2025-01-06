import Loader from "@/components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ListAllBatchStatusReport } from "@/redux/services/masterItemServices";
import { fetchAllBatchStatusReport } from "@/redux/slices/masterItemSlices";
import { MaterialReactTable } from "material-react-table";
import React, { useEffect } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { BatchStatusReportColumns } from "./columns";
import { FiDownload } from "react-icons/fi";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";

const BatchStatusReportTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const { batchStatusReports, loading } = useAppSelector(
    (state) => state.batchStatus.batchStatus
  );
  const columns = BatchStatusReportColumns();
  useEffect(() => {
    dispatch(fetchAllBatchStatusReport());
  }, []);

  if (loading) return <Loader />;

  const handleExportRowsToCSV = (rows) => {
    const headers = ["Item Name", "Status", "WareHouse Location", "Quantity"];

    const data = rows.map((row) => ({
      "Item Name": row.original.itemName,
      Status: row.original.status,
      "WareHouse Location": row.original.warehouseLocation,
      Quantity: row.original.qty,
    }));

    exportToCSV(data, headers, "Master_Batch_Report.csv");
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        {batchStatusReports?.length > 0 && (
          <div className="table-responsive">
            <MaterialReactTable
              columns={columns}
              data={batchStatusReports}
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
                    style={{
                      fontSize: isSmallScreen ? "12px" : "16px",
                    }}
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
        )}
      </CardBody>
    </Card>
  );
};

export default BatchStatusReportTable;
