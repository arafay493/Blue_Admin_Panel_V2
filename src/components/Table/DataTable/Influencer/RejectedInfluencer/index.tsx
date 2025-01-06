import Loader from "@/components/Loader/Loader";
import { MaterialReactTable } from "material-react-table";
import React from "react";
import { RejectedInfluencersColumns } from "../InfluencerMainComponent/columns";
import { FiDownload } from "react-icons/fi";
import { Button } from "reactstrap";
import { Box } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";

const RejectedInfluencerTable = ({ data }) => {
  const { rejectedInfluencers, loading } = data;

  const columns = RejectedInfluencersColumns();

  if (loading) return <Loader />;

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "ID",
      "Name",
      "Phone",
      "Description",
      "Followers Count",
      "Age",
      "Gender",
      "Category",
    ];

    const data = rows.map((row) => ({
      ID: row.original.id,
      Name: row.original.customerName,
      Phone: row.original.customerPhone,
      Description: row.original.description,
      "Followers Count": row.original.followersCount,
      Age: row.original.age,
      Gender: row.original.gender,
      Category: row.original.category,
    }));

    exportToCSV(data, headers, "Rejected-influencers.csv");
  };

  return (
    <>
      {
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={rejectedInfluencers || []}
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
    </>
  );
};

export default RejectedInfluencerTable;