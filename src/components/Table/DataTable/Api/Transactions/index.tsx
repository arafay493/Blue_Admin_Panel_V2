import React, { useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchTransactions } from "../../../../../redux/slices/customerSlice";
import { FiDownload } from "react-icons/fi";
import { Box } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";
import moment from "moment";
import Loader from "@/components/Loader/Loader";

const TransactionTable = () => {
  const dispatch = useAppDispatch();
  const { transaction } = useAppSelector((state) => state.transactionSlice);

  const loading: boolean = useAppSelector(
    (state) => state?.transactionSlice.transaction.loading
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: true,
    },
    {
      accessorKey: "merchantTransactionId",
      header: "Merchant Transaction ID",
      enableSorting: true,
    },
    {
      accessorKey: "customerId",
      header: "Customer ID",
      enableSorting: true,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      enableSorting: true,
    },
    {
      accessorKey: "preTransactionDate",
      header: "Pre Transaction Date",
      enableSorting: true,
      Cell: ({ cell }) => moment(cell.getValue()).format("DD-MM-YYYY") || "N/A",
    },
    {
      accessorKey: "postTransactionDate",
      header: "Post Transaction Date",
      enableSorting: true,
      Cell: ({ cell }) => moment(cell.getValue()).format("DD-MM-YYYY") || "N/A",
    },
    {
      accessorKey: "isSuccess",
      header: "Status",
      enableSorting: true,
      Cell: ({ cell }) => {
        const status = cell.getValue() ? "Success" : "Failed";
        const statusColor = cell.getValue() ? "green" : "red";
        return (
          <span style={{ color: statusColor, fontWeight: "bold" }}>
            {status}
          </span>
        );
      },
    },
  ];

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "ID",
      "Merchant Transaction ID",
      "Customer ID",
      "Amount",
      "Pre Transaction Date",
      "Post Transaction Date",
      "Status",
    ];

    const data = rows.map((row) => ({
      ID: row.original.id,
      "Merchant Transaction ID": row.original.merchantTransactionId,
      "Customer ID": row.original.customerId,
      Amount: row.original.amount,
      "Pre Transaction Date": row.original.preTransactionDate
        ? moment(row.original.preTransactionDate).format("DD-MM-YYYY")
        : "N/A",
      "Post Transaction Date": row.original.postTransactionDate
        ? moment(row.original.postTransactionDate).format("DD-MM-YYYY")
        : "N/A",
      Status: row.original.isSuccess ? "Success" : "Failed",
    }));

    exportToCSV(data, headers, "Transaction_Report.csv");
  };

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
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
        </div>
      </CardBody>
    </Card>
  );
};

export default TransactionTable;
