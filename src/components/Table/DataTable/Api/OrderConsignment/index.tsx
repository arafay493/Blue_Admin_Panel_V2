// @ts-nocheck
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import { Card, CardBody, Button } from "reactstrap";
import { Box, IconButton } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  fetchOrderDelivery,
  fetchCustomerConsignmentDetails,
  fetchCustomerOrder,
  fetchPaymentTypes,
} from "../../../../../redux/slices/customerSlice";
import DetailModal from "./DetailModal";
import ViewDetailModal from "./ViewDetailModal";
import UpdateOrderConsignmentModal from "./UpdateOrderConsignmentModal";
import Download_CSV_Btn from "@/components/Download_CSV_Btn/Download_CSV_Btn";
import { exportToCSV } from "utils/csvUtils";
import { Edit, Eye } from "react-feather";
import { BiDetail } from "react-icons/bi";
import Loader from "@/components/Loader/Loader";

const OrderConsignmentTable = () => {
  const dispatch = useAppDispatch();

  const { orderDelivery } = useAppSelector((state) => state.orderDelivery);

  const loading = useAppSelector(
    (state) => state?.orderDelivery?.orderDelivery?.loading
  );

  const selectedCityIdParam = useAppSelector(
    (state) => state.globalWarehouse.selectedCityId
  );

  const [isDetailsModalOpen, setIsDetailModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [
    isUpdateOrderConsignmentModalOpen,
    setIsUpdateOrderConsignmentModalOpen,
  ] = useState(false);
  const [details, setDetails] = useState(null);
  const [data, setData] = useState(null);

  const transformedData = useMemo(() => {
    return orderDelivery?.orderDelivery?.map((item) => ({
      ...item,
      serialNumber: item.id,
      consignmentNumber: item.id,
    }));
  }, [orderDelivery]);

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedWarehouseId
  );

  useEffect(() => {
    dispatch(fetchOrderDelivery(selectedCityId));
  }, [dispatch, selectedCityId]);

  const handleOpenModal = useCallback(
    (type, row) => {
      setData(row);
      setDetails(row);

      if (type === "details") {
        dispatch(fetchCustomerConsignmentDetails(row.id));
        setIsDetailModalOpen(true);
      } else if (type === "view") {
        dispatch(fetchCustomerConsignmentDetails(row.id));
        setIsViewModalOpen(true);
      } else if (type === "update") {
        dispatch(fetchCustomerOrder(selectedCityIdParam));
        dispatch(fetchCustomerConsignmentDetails(row.id));
        dispatch(fetchPaymentTypes());
        setIsUpdateOrderConsignmentModalOpen(true);
      }
    },
    [dispatch]
  );

  const handleCloseModal = (type) => {
    if (type === "details") setIsDetailModalOpen(false);
    else if (type === "view") setIsViewModalOpen(false);
    else if (type === "update") setIsUpdateOrderConsignmentModalOpen(false);
  };

  // Export to CSV function
  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "serialNumber",
      "consignmentNumber",
      "driverName",
      "vehicleId",
      "tranferQuantity",
      "capacity",
      "vehicleLeftDate",
      "vehicleReturnDate",
    ];

    exportToCSV(
      rows.map((row) => ({
        ...row.original,
      })),
      headers,
      "order-consignment-details.csv"
    );
  };

  const columns = [
    {
      accessorKey: "serialNumber",
      header: "Serial Number",
      enableSorting: true,
    },
    {
      accessorKey: "consignmentNumber",
      header: "Consignment Number",
      enableSorting: true,
      Cell: ({ row }) => (
        <p
          style={{
            cursor: "pointer",
            color: "#1284C1",
            fontWeight: "bolder",
          }}
        >
          {row.original?.consignmentNumber}
        </p>
      ),
    },
    { accessorKey: "driverName", header: "Driver", enableSorting: true },
    { accessorKey: "vehicleId", header: "Vehicle Reg No", enableSorting: true },
    {
      accessorKey: "tranferQuantity",
      header: "Order Quantity",
      enableSorting: true,
    },
    { accessorKey: "capacity", header: "Capacity", enableSorting: true },
    {
      accessorKey: "vehicleLeftDate",
      header: "Vehicle Left Date",
      enableSorting: true,
    },
    {
      accessorKey: "vehicleReturnDate",
      header: "Vehicle Return Date",
      enableSorting: true,
    },
    {
      id: "View",
      header: "View Details",
      enableSorting: true,
      Cell: ({ row }) => {
        const vehicleLeftDate = row.original.vehicleLeftDate;
        const isDisabled = vehicleLeftDate === "NA";

        return (
          <IconButton
            color="primary"
            onClick={() => handleOpenModal("view", row.original)}
            disabled={isDisabled}
          >
            <Eye size={20} />
          </IconButton>
        );
      },
    },

    {
      id: "Update",
      header: "Update Details",
      enableSorting: true,
      Cell: ({ row }) => (
        <IconButton
          color="primary"
          onClick={() => handleOpenModal("update", row.original)}
        >
          <Edit size={20} />
        </IconButton>
      ),
    },
    {
      id: "Details",
      header: "Details",
      enableSorting: true,
      Cell: ({ row }) => (
        <IconButton
          color="primary"
          onClick={() => handleOpenModal("details", row.original)}
        >
          <BiDetail size={20} />
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
            key={selectedCityId || "default"}
            columns={columns}
            data={transformedData || []}
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

        {isDetailsModalOpen && (
          <DetailModal
            isOpen={isDetailsModalOpen}
            toggle={() => handleCloseModal("details")}
            details={details}
            ApiData={data}
          />
        )}

        {isViewModalOpen && (
          <ViewDetailModal
            isOpen={isViewModalOpen}
            toggle={() => handleCloseModal("view")}
            details={details}
            ApiData={data}
          />
        )}

        {isUpdateOrderConsignmentModalOpen && (
          <UpdateOrderConsignmentModal
            isOpen={isUpdateOrderConsignmentModalOpen}
            toggle={() => handleCloseModal("update")}
            details={details}
            ApiData={data}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default OrderConsignmentTable;
