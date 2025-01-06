import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Card, CardBody, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchCustomers } from "../../../../../redux/slices/customerSlice";
import {
  fetchDiscountedVouchers,
  fetchSingleDiscountedVouchers,
} from "@/redux/slices/discountAndVouchersSlice";
import { VouchersListColumns } from "./columns";
import Loader from "@/components/Loader/Loader";
import AssignModal from "./AssignModal";
import CreateModal from "./CreateModal";
import ViewModal from "./ViewModal";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import { Plus } from "react-feather";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { exportToCSV } from "utils/csvUtils";
import moment from "moment";

const DiscountVouchersTable = () => {
  const dispatch = useAppDispatch();
  const { vouchers, loading } = useAppSelector(
    (state) => state.vouchers.vouchers
  );

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedCityId
  );

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [voucherDetails, setVoucherDetails] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDiscountedVouchers());
  }, [dispatch]);

  const handleOpenAssignModal = (row) => {
    dispatch(fetchSingleDiscountedVouchers(row?.id));
    dispatch(fetchCustomers(selectedCityId));
    setVoucherDetails(row);
    setIsAssignModalOpen(true);
  };

  const handleOpenViewModal = (row) => {
    setVoucherDetails(row);
    dispatch(fetchSingleDiscountedVouchers(row?.id));
    setIsViewModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenUpdateModal = (row) => {
    setVoucherDetails(row);
    setIsUpdateModalOpen(true);
  };

  const handleOpenDeleteModal = (row) => {
    setVoucherDetails(row);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAssignModalOpen(false);
    setIsCreateModalOpen(false);
    setIsViewModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const voucherColumns = VouchersListColumns({
    handleOpenAssignModal,
    handleOpenViewModal,
    handleOpenCreateModal,
    handleOpenUpdateModal,
    handleOpenDeleteModal,
  });

  if (loading) return <Loader />;

  // Export to CSV function
  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "ID",
      "Name",
      "Discount_Type",
      "Discount_Value",
      "Discount_Cap_Amount",
      "Min_Order_Amount",
      "Start_Date",
      "End_Date",
    ];

    const data = rows.map((row) => ({
      ID: row.original.id,
      Name: row.original.name,
      Discount_Type: row.original.discountType,
      Discount_Value: row.original.discountValue,
      Discount_Cap_Amount: row.original.discountCapAmount,
      Min_Order_Amount: row.original.minimumOrderAmount,
      Start_Date: row.original.applicableFrom
        ? moment(row.original.applicableFrom).format("DD-MM-YYYY")
        : "NA",
      End_Date: row.original.applicableTo
        ? moment(row.original.applicableTo).format("DD-MM-YYYY")
        : "NA",
    }));

    exportToCSV(data, headers, "Discount_Vouchers.csv");
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          <Button
            color="primary"
            onClick={handleOpenCreateModal}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Plus size={20} style={{ marginRight: "8px" }} /> Create Voucher
          </Button>

          <Box mt={4}>
            <MaterialReactTable
              columns={voucherColumns}
              data={vouchers || []}
              muiTableProps={{
                sx: {
                  "& th": {
                    background: "#0A80BF",
                    color: "white",
                    whiteSpace: "nowrap",
                    padding: "8px",
                    "& .MuiSvgIcon-root": {
                      color: "white !important",
                    },
                    "& .MuiTableSortLabel-icon": {
                      color: "white !important",
                    },
                    "& .MuiTableSortLabel-root:hover .MuiTableSortLabel-icon": {
                      color: "white !important",
                    },
                    "& .MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon": {
                      color: "white !important",
                    },
                  },
                },
              }}
              renderTopToolbarCustomActions={({ table }) => (
                <Box>
                  <Button
                    className="button-responsive"
                    disabled={
                      table.getPrePaginationRowModel().rows.length === 0
                    }
                    color="primary"
                    onClick={() =>
                      handleExportRowsToCSV(
                        table.getPrePaginationRowModel().rows
                      )
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
          </Box>
        </div>

        {isAssignModalOpen && (
          <AssignModal
            isOpen={isAssignModalOpen}
            toggle={handleCloseModal}
            voucher={voucherDetails}
          />
        )}
        {isCreateModalOpen && (
          <CreateModal isOpen={isCreateModalOpen} toggle={handleCloseModal} />
        )}
        {isViewModalOpen && (
          <ViewModal
            isOpen={isViewModalOpen}
            toggle={handleCloseModal}
            voucher={voucherDetails}
          />
        )}
        {isUpdateModalOpen && (
          <UpdateModal
            isOpen={isUpdateModalOpen}
            toggle={handleCloseModal}
            voucher={voucherDetails}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            toggle={handleCloseModal}
            voucher={voucherDetails}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default DiscountVouchersTable;
