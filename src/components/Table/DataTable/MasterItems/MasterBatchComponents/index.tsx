import Loader from "@/components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMasterBatchReports } from "@/redux/slices/masterItemSlices";
import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { MasterBatchColumns } from "./columns";
import EditMasterBatchModal from "./EditMasterBatchModal";
import { fetchSingleMasterBatch } from "@/redux/services/masterItemServices";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { exportToCSV } from "utils/csvUtils";
import moment from "moment";

const MasterBatchTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const [rowData, setRowData] = useState(null);
  const [isMasterBatchModalOpen, setIsMasterBatchModalOpen] = useState(false);
  const { masterBatch, loading } = useAppSelector(
    (state) => state.masterBatch.masterBatch
  );

  useEffect(() => {
    dispatch(fetchMasterBatchReports());
  }, []);

  const fetchBarcodeData = (row) => {
    setRowData(row);
  };

  const handleEdit = (row) => {
    setRowData(row);
    fetchSingleMasterBatch(row.id);

    setIsMasterBatchModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsMasterBatchModalOpen(false);
  };

  const columns = MasterBatchColumns({ fetchBarcodeData, handleEdit });

  if (loading) return <Loader />;

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "Barcode",
      "Manufacturing Date",
      "Expiration Date",
      "In Date",
      "Serial Number",
      "Status",
    ];

    const data = rows.map((row) => ({
      Barcode: row.original.barCode,
      "Manufacturing Date": moment(row.original.mnfDate).format("DD-MM-YYYY"),
      "Expiration Date": moment(row.original.expDate).format("DD-MM-YYYY"),
      "In Date": moment(row.original.inDate).format("DD-MM-YYYY"),
      "Serial Number": row.original.serialNum || "N/A",
      Status: row.original.status,
    }));

    exportToCSV(data, headers, "Master_Batch.csv");
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={Array.isArray(masterBatch) ? masterBatch : [masterBatch]}
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
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  color="primary"
                  onClick={() =>
                    handleExportRowsToCSV(table.getPrePaginationRowModel().rows)
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

        {isMasterBatchModalOpen && (
          <EditMasterBatchModal
            isOpen={isMasterBatchModalOpen}
            toggle={handleCloseModal}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default MasterBatchTable;
