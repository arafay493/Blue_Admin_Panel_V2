import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import Form from "./Form";
import MapComponent from "./MapComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchConsignmentRouteDetailsThunk } from "@/redux/slices/customerSlice";

const TrackDriverLocation = () => {
  const [selectedConsignmentId, setSelectedConsignmentId] = useState<
    number | null
  >(null);

  const handleConsignmentSelection = (id: number) => {
    setSelectedConsignmentId(id);
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        {/* <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={transaction.transactions}
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
        </div> */}

        <Form onSelectConsignment={handleConsignmentSelection} />
        <div className="mt-3">
          <MapComponent consignmentId={selectedConsignmentId} />
        </div>
      </CardBody>
    </Card>
  );
};

export default TrackDriverLocation;
