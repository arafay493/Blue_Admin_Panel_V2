import Loader from "@/components/Loader/Loader";
import { MaterialReactTable } from "material-react-table";
import React, { useState } from "react";
import { PendingInfluencersColumns } from "../InfluencerMainComponent/columns";
import RemoveModal from "./RemoveModal";
import ApproveModal from "./ApproveModal";
import RejectModal from "./RejectModal";
import { Button } from "reactstrap";
import { FiDownload } from "react-icons/fi";
import { exportToCSV } from "utils/csvUtils";
import { Box } from "@mui/material";

const PendingInfluencerTable = ({ data }) => {
  const { pendingInfluencers, loading } = data;
  const [rowData, setRowData] = useState(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const handleApprove = (row) => {
    setRowData(row);
    setIsApproveModalOpen(true);
  };
  const handleReject = (row) => {
    setRowData(row);
    setIsRejectModalOpen(true);
  };
  const handleRemove = (row) => {
    setRowData(row);
    setIsRemoveModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsRemoveModalOpen(false);
    setIsRejectModalOpen(false);
    setIsApproveModalOpen(false);
    setRowData(null);
  };
  const columns = PendingInfluencersColumns({
    handleApprove,
    handleReject,
    handleRemove,
  });

  if (loading) return <Loader />;

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "Influencer ID",
      "Name",
      "Phone",
      "Description",
      "Followers Count",
      "Age",
      "Gender",
      "Category",
    ];

    const data = rows.map((row) => ({
      "Influencer ID" : row.original.id,
      Name: row.original.customerName,
      Phone: row.original.customerPhone,
      Description: row.original.description,
      "Followers Count": row.original.followersCount,
      Age: row.original.age,
      Gender: row.original.gender,
      Category: row.original.category,
    }));

    exportToCSV(data, headers, "Pending-influencers.csv");
  };

  return (
    <>
      {
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={pendingInfluencers || []}
            muiTableProps={{
              sx: {
                "& th": {
                  background: "#0A80BF",
                  color: "white",
                  whiteSpace: "nowrap",
                  padding: "10px",
                  minWidth: "230px",
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
      }
      {isRemoveModalOpen && (
        <RemoveModal
          isOpen={isRemoveModalOpen}
          toggle={handleCloseModal}
          data={rowData}
        />
      )}
      {isApproveModalOpen && (
        <ApproveModal
          isOpen={isApproveModalOpen}
          toggle={handleCloseModal}
          data={rowData}
        />
      )}
      {isRejectModalOpen && (
        <RejectModal
          isOpen={isRejectModalOpen}
          toggle={handleCloseModal}
          data={rowData}
        />
      )}
    </>
  );
};

export default PendingInfluencerTable;
