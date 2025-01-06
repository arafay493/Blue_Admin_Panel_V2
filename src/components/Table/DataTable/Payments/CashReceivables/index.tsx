import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Button, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchCashReceivables } from "@/redux/slices/paymentSlice";
import { CashReceivables } from "@/redux/models/paymentTypes";
import CashReceivableDetailsModal from "./CashReceivableDetailsModal";
import { FiDownload } from "react-icons/fi";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";
import { BiDetail } from "react-icons/bi";
import Loader from "@/components/Loader/Loader";

interface CashReceivablesTableProps {
  cashReceivables: CashReceivables[];
}

const CashReceivablesTable: React.FC<CashReceivablesTableProps> = ({
  cashReceivables,
}) => {
  const dispatch = useAppDispatch();

  const { cashRece } = useAppSelector((state) => state.cashRece);

  const loading: boolean = useAppSelector(
    (state) => state?.regPricingSlice.regPricing.loading
  );

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [
    selectedReceivable,
    setSelectedReceivable,
  ] = useState<CashReceivables | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const [
    selectedCashReceivable,
    setSelectedCashReceivable,
  ] = useState<CashReceivables | null>(null);

  useEffect(() => {
    dispatch(fetchCashReceivables());
  }, [dispatch]);

  const handleDetailClick = (rowData: CashReceivables) => {
    setSelectedReceivable(rowData);
    toggleModal();
  };

  const columns: MRT_ColumnDef<CashReceivables>[] = useMemo(
    () => [
      {
        accessorKey: "serialNumber",
        header: "S.No.",
        Cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        accessorKey: "id",
        header: "Consignment ID",
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
      { accessorKey: "driverId", header: "Driver ID" },
      { accessorKey: "driverName", header: "Driver Name" },
      { accessorKey: "noOfOrders", header: "Order Quantity" },
      { accessorKey: "vehicleId", header: "Vehicle" },
      { accessorKey: "vehicleLeftDate", header: "Vehicle Left Date" },
      { accessorKey: "vehicleReturnedDate", header: "Vehicle Returned Date" },
      { accessorKey: "codRecieved", header: "Amount Received" },
      { accessorKey: "noOfCashOrders", header: "Cash Orders" },
      { accessorKey: "totalAmount", header: "Total Amount" },
      {
        accessorKey: "details",
        header: "Details",
        Cell: ({ row }) => (
          <IconButton
            color="primary"
            onClick={() => handleDetailClick(row.original)}
          >
            <BiDetail size={20} />
          </IconButton>
        ),
      },
    ],
    []
  );

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "Consignment_ID",
      "Driver_ID",
      "Driver_Name",
      "Order_Quantity",
      "Vehicle",
      "Vehicle_Left_Date",
      "Vehicle_Returned_Date",
      "Amount_Received",
      "Cash_Orders",
      "Total_Amount",
    ];

    const data = rows.map((row) => ({
      Consignment_ID: row.original.id,
      Driver_ID: row.original.driverId,
      Driver_Name: row.original.driverName,
      Order_Quantity: row.original.noOfOrders,
      Vehicle: row.original.vehicleId,
      Vehicle_Left_Date: row.original.vehicleLeftDate,
      Vehicle_Returned_Date: row.original.vehicleReturnedDate,
      Amount_Received: row.original.codRecieved,
      Cash_Orders: row.original.noOfCashOrders,
      Total_Amount: row.original.totalAmount,
    }));

    exportToCSV(data, headers, "Cash-receivables.csv");
  };

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={cashRece.cashReceivables}
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
        <CashReceivableDetailsModal
          modal={modalOpen}
          toggle={toggleModal}
          selectedReceivable={selectedReceivable}
        />
      </CardBody>
    </Card>
  );
};

export default CashReceivablesTable;
