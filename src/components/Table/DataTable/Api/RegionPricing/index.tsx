import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchRegPricing } from "../../../../../redux/slices/customerSlice";
import { regionalPricingColumns } from "../RegionalPricing/RegionalPricingColumns";
import { Box, IconButton } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import moment from "moment";
import { exportToCSV } from "utils/csvUtils";
import { Edit } from "react-feather";
import EditPricingModal from "./EditModal";
import Loader from "@/components/Loader/Loader";

const RegionPricingTable = () => {
  const dispatch = useAppDispatch();
  const { regPricing } = useAppSelector((state) => state.regPricingSlice);

  const loading: boolean = useAppSelector(
    (state) => state?.regPricingSlice.regPricing.loading
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    dispatch(fetchRegPricing());
  }, [dispatch]);

  const handleEdit = (data) => {
    setSelectedData(data);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedData(null);
  };

  const handleSaveChanges = (updatedData) => {
    setIsEditModalOpen(false);
  };

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "Current Price ID",
      "Price",
      "City",
      "Province",
      "GST Tax",
      "Discount",
      "Delivery Charges",
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

  const columnsWithEdit = [
    ...regionalPricingColumns,

    {
      id: "edit",
      header: "Edit",
      Cell: ({ row }) => (
        <IconButton color="primary" onClick={() => handleEdit(row.original)}>
          <Edit />
        </IconButton>
      ),
    },
  ];

  if (loading) return <Loader />;
  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          <MaterialReactTable
            columns={columnsWithEdit}
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
                >
                  <FiDownload
                    style={{ fontSize: "18px", marginRight: "10px" }}
                  />
                  Export to CSV
                </Button>
              </Box>
            )}
          />
          {isEditModalOpen && (
            <EditPricingModal
              isOpen={isEditModalOpen}
              data={selectedData}
              onClose={handleCloseModal}
              onSave={handleSaveChanges}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default RegionPricingTable;
