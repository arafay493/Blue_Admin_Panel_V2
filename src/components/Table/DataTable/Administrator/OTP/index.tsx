import React, { useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Card, CardBody, Col } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchOTPType } from "@/redux/slices/administratorSlice";
import { FiDownload } from "react-icons/fi";
import { Box } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";
import Loader from "@/components/Loader/Loader";

const OTP = () => {
  const dispatch = useAppDispatch();

  const { otp } = useAppSelector((state) => state.otp);

  const loading: boolean = useAppSelector((state) => state?.otp?.otp?.loading);

  useEffect(() => {
    dispatch(fetchOTPType());
  }, [dispatch]);

  const columns = [
    {
      accessorKey: "id",
      header: "Number",
      enableSorting: true,
    },
    {
      accessorKey: "otpCode",
      header: "Code",
      enableSorting: true,
    },
    {
      accessorKey: "currentStatus",
      header: "Status",
      enableSorting: true,
    },
  ];

  // Export to CSV function
  const handleExportRowsToCSV = (rows) => {
    const headers = ["Number", "Code", "Status"];

    const data = rows.map((row) => ({
      Number: row.original.id,
      Code: row.original.otpCode,
      Status: row.original.currentStatus,
    }));

    exportToCSV(data, headers, "Otp.csv");
  };

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={otp.otp}
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
                  Export All Rows to CSV
                </Button>
              </Box>
            )}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default OTP;
