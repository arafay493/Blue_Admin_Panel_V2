// @ts-nocheck
import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Card, CardBody, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  fetchOrderDelivery,
  fetchContactedPersonList,
  fetchCitiesList,
  fetchCustomerOrder,
  fetchCustomerConsignmentDetails,
} from "../../../../../redux/slices/customerSlice";
import UpdateOrderAssignModal from "./UpdateOrderAssignModal";
import OrderDeliveryForm from "./OrderDeliveryForm";
import { deleteOrderDeliveryDetails } from "@/redux/services/customerService";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import moment from "moment";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { exportToCSV } from "utils/csvUtils";
import { Trash } from "react-feather";
import Loader from "@/components/Loader/Loader";

const OrderDeliveryTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const { orderDelivery } = useAppSelector((state) => state.orderDelivery);

  const loading: boolean = useAppSelector(
    (state) => state?.orderDelivery?.orderDelivery?.loading
  );
  const [isUpdateOrderAssignOpen, setIsUpdateOrderAssignOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [driverDetails, setDriverDetails] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  const selectedCityIdParam = useAppSelector(
    (state) => state.globalWarehouse.selectedCityId
  );
  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedWarehouseId
  );

  useEffect(() => {
    dispatch(fetchCitiesList());
    dispatch(fetchOrderDelivery(selectedCityId));
  }, [dispatch, selectedCityId]);

  useEffect(() => {
    if (needsRefresh) {
      dispatch(fetchOrderDelivery(selectedCityId));
      setNeedsRefresh(false);
    }
  }, [needsRefresh, dispatch, selectedCityId]);

  const handleOpenAssignModal = (row) => {
    dispatch(fetchCustomerOrder(selectedCityIdParam));
    dispatch(fetchCustomerConsignmentDetails(row.id));
    setDriverDetails(row);
    setIsUpdateOrderAssignOpen(true);
  };

  const handleCloseUpdateOrderAssignOpen = () => {
    setIsUpdateOrderAssignOpen(false);
    setNeedsRefresh(true);
  };

  const handleCloseDeleteModalOpen = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteRow = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedRow) {
      try {
        setIsDeleteModalOpen(false);
        await deleteOrderDeliveryDetails(selectedRow.id);
        toast.success("Row deleted successfully");
        setNeedsRefresh(true);
      } catch (error) {
        console.error("Failed to delete the row:", error);
        toast.error("Failed to delete the row");
      }
    }
  };

  if (loading) return <Loader />;

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
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
    { accessorKey: "vehicleId", header: "Vehicle Reg No", enableSorting: true },
    {
      accessorKey: "tranferQuantity",
      header: "Transfer Quantity",
      enableSorting: true,
    },
    {
      accessorKey: "vehicleLeftDate",
      header: "Left Date",
      enableSorting: true,
    },
    { accessorKey: "capacity", header: "Capacity", enableSorting: true },
    {
      accessorKey: "vehicleReturnDate",
      header: "Return Date",
      enableSorting: true,
    },
    {
      id: "Assign",
      header: "Assign",
      enableSorting: false,
      Cell: ({ row }) => (
        <IconButton
          color="primary"
          onClick={() => handleOpenAssignModal(row.original)}
        >
          <AiOutlineDeliveredProcedure size={25} />
        </IconButton>
      ),
    },
    {
      header: "Delete",
      Cell: ({ row }) => (
        <IconButton
          color="danger"
          onClick={() => handleDeleteRow(row.original)}
        >
          <Trash size={20} style={{ color: "red" }} />
        </IconButton>
      ),
    },
  ];

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "ID",
      "Vehicle Reg No",
      "Transfer Quantity",
      "Left Date",
      "Capacity",
      "Return Date",
    ];
    const data = rows.map((row) => ({
      ID: row.original.id,
      "Vehicle Reg No": row.original.vehicleId,
      "Transfer Quantity": row.original.tranferQuantity || 0,
      "Left Date": row.original.vehicleLeftDate
        ? moment(row.original.vehicleLeftDate).format("DD-MM-YYYY")
        : "N/A",
      Capacity: row.original.capacity || 0,
      "Return Date": row.original.vehicleReturnDate
        ? moment(row.original.vehicleReturnDate).format("DD-MM-YYYY")
        : "N/A",
    }));

    exportToCSV(data, headers, "Order_delivery.csv");
  };

  const filteredRows =
    orderDelivery?.orderDelivery?.filter(
      (row) => row.vehicleLeftDate === "NA"
    ) || [];

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <OrderDeliveryForm />
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={filteredRows}
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
                  style={{ fontSize: isSmallScreen ? "12px" : "16px" }}
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

        {isUpdateOrderAssignOpen && (
          <UpdateOrderAssignModal
            isOpen={isUpdateOrderAssignOpen}
            toggle={handleCloseUpdateOrderAssignOpen}
            driverDetails={driverDetails}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            toggle={handleCloseDeleteModalOpen}
            confirmDelete={confirmDelete}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default OrderDeliveryTable;
