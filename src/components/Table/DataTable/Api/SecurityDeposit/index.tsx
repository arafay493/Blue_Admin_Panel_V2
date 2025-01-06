import React, { useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Card, CardBody, Col } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchSecurityDeposit } from "../../../../../redux/slices/customerSlice";
import { FiDownload } from "react-icons/fi";
import { Box } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";
import moment from "moment";

const SecurityDepositTable = () => {
  const dispatch = useAppDispatch();
  const { securityDesposit } = useAppSelector((state) => state.securityDeposit);

  useEffect(() => {
    dispatch(fetchSecurityDeposit());
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Customer ID",
        enableSorting: true,
        Cell: ({ row }) => (
          <p
            style={{
              cursor: "pointer",
              color: "#1284C1",
              fontWeight: "bolder",
            }}
          >
            {row.original?.id}
          </p>
        ),
      },
      {
        accessorKey: "customerName",
        header: "Name of Volunteer",
        enableSorting: true,
      },
      {
        accessorKey: "customerCNIC",
        header: "CNIC Number",
        enableSorting: true,
      },
      {
        accessorKey: "customerCNICIssueDate",
        header: "CNIC Issue Date",
        enableSorting: true,
      },
      {
        accessorKey: "customerCNICExpiryDate",
        header: "CNIC Expiry Date",
        enableSorting: true,
      },
      {
        accessorKey: "securityDepositSum",
        header: "PKR",
        enableSorting: true,
        Cell: ({ row }) => (
          <p
            style={{
              cursor: "pointer",
              color: "#1284C1",
              fontWeight: "bolder",
            }}
          >
            {row.original?.securityDepositSum}
          </p>
        ),
      },
    ],
    []
  );
  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "Customer ID",
      "Name of Volunteer",
      "CNIC Number",
      "CNIC Issue Date",
      "CNIC Expiry Date",
      "PKR",
    ];

    const data = rows.map((row) => ({
      "Customer ID": row.original.id,
      "Name of Volunteer": row.original.customerName,
      "CNIC Number": row.original.customerCNIC,
      "CNIC Issue Date": row.original.customerCNICIssueDate
        ? moment(row.original.customerCNICIssueDate).format("DD-MM-YYYY")
        : "N/A",
      "CNIC Expiry Date": row.original.customerCNICExpiryDate
        ? moment(row.original.customerCNICExpiryDate).format("DD-MM-YYYY")
        : "N/A",
      PKR: row.original.securityDepositSum,
    }));

    exportToCSV(data, headers, "security_deposit.csv");
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={securityDesposit?.securityDeposit || []}
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
        </div>
      </CardBody>
    </Card>
  );
};

export default SecurityDepositTable;
