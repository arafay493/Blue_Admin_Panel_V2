import React, { useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Card, CardBody, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchPaymentTypes } from "../../../../../redux/slices/customerSlice";
import usePaymentMethodColumns from "./PaymentMethodColumns";
import AddPaymentMethod from "./PaymentMethodForm";
import { FiDownload } from "react-icons/fi";
import { Box } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";

const PaymentMethodTable = () => {
  const dispatch = useAppDispatch();
  const { paymentTypes } = useAppSelector((state) => state.paymentTypes);

  useEffect(() => {
    dispatch(fetchPaymentTypes());
  }, [dispatch]);

  const columns = usePaymentMethodColumns();

  // Export to CSV function
  const handleExportRowsToCSV = (rows) => {
    const headers = ["ID", "Payment_method", "Updated_By", "Updated_On"];

    const data = rows.map((row) => ({
      ID: row.original.id,
      Payment_method: row.original.paymentMethod,
      Updated_By: row.original.updatedBy,
      Updated_On: row.original.updatedOn,
    }));

    exportToCSV(data, headers, "payment_method-list.csv");
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <AddPaymentMethod />
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={paymentTypes.paymentTypes}
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

export default PaymentMethodTable;
