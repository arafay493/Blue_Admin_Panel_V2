import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllItemTypes } from "@/redux/slices/masterItemSlices";
import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { ItemTypeColumns } from "./columns";
import EditModal from "./EditModal";
import AddMasterItemForm from "./AddMasterItemForm";
import Download_CSV_Btn from "@/components/Download_CSV_Btn/Download_CSV_Btn";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { exportToCSV } from "utils/csvUtils";

const AddMasterItemsTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const { itemTypes } = useAppSelector((state) => state?.itemTypes?.itemTypes);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState(null);

  useEffect(() => {
    dispatch(fetchAllItemTypes());
  }, []);

  const handleOpenEditModal = (row) => {
    setRowDetails(row);
    setIsEditModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };
  const columns = ItemTypeColumns({ handleOpenEditModal });

  // Export to CSV function
  const handleExportRowsToCSV = (rows) => {
    const headers = ["ID", "Name", "UOM"];

    const data = rows.map((row) => ({
      ID: row.original.id,
      Name: row.original.name,
      UOM: row.original.uom,
    }));

    exportToCSV(data, headers, "Add_Master_Items.csv");
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <AddMasterItemForm />
        {itemTypes?.length > 0 && (
          <div className="table-responsive">
            <MaterialReactTable
              columns={columns}
              data={itemTypes}
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
                    className="button-responsive"
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

        {isEditModalOpen && (
          <EditModal
            isOpen={isEditModalOpen}
            toggle={handleCloseModal}
            details={rowDetails}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default AddMasterItemsTable;
