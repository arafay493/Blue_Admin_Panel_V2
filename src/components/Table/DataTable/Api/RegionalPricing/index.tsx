import React, { useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchRegPricing } from "../../../../../redux/slices/customerSlice";
import FormComponent from "./RegionalPricingForm";
import { regionalPricingColumns } from "./RegionalPricingColumns";
import { Box } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { exportToCSV } from "utils/csvUtils";
import moment from "moment";
import Loader from "@/components/Loader/Loader";

const RegionalPricingTable = () => {
  const dispatch = useAppDispatch();

  const { regPricing } = useAppSelector((state) => state.regPricingSlice);
  const loading: boolean = useAppSelector(
    (state) => state?.regPricingSlice.regPricing.loading
  );

  useEffect(() => {
    dispatch(fetchRegPricing());
  }, [dispatch]);

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "Current Price ID",
      "Price",
      "City",
      "Province",
      "GST Tax",
      "Discount",
      "Delivery Charges",
      "Security Deposit",
      "Urgent Delivery Charges",
      "Created By",
      "Created On",
      "Updated By",
      "Updated On",
      "Pricing ID",
    ];

    const data = rows.map((row) => ({
      "Current Price ID": row.original.currentPriceId,
      Price: row.original.price,
      City: row.original.city,
      Province: row.original.province,
      "GST Tax": row.original.gstTax,
      Discount: row.original.discount,
      "Delivery Charges": row.original.deliveryCharges,
      "Security Deposit": row.original.securityDeposit,
      "Urgent Delivery Charges": row.original.urgentDeliveryCharges,
      "Created By": row.original.createdBy,
      "Created On": row.original.createdOn
        ? moment(row.original.createdOn).format("DD-MM-YYYY")
        : "N/A",
      "Updated By": row.original.updatedBy,
      "Updated On": row.original.updatedOn
        ? moment(row.original.updatedOn).format("DD-MM-YYYY")
        : "N/A",
      "Pricing ID": row.original.pricingId,
    }));

    exportToCSV(data, headers, "Regional_Pricing_Report.csv");
  };

  const dynamicColumns = useMemo(() => [...regionalPricingColumns], []);

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <FormComponent />
        <div className="table-responsive">
          <MaterialReactTable
            columns={dynamicColumns}
            data={regPricing.regPricing}
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

export default RegionalPricingTable;
