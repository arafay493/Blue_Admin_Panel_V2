import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Card, CardBody, Button, Toast } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchRegionManagement } from "@/redux/slices/administratorSlice";
import RegionManagementForm from "./RegionManagementForm";
import { FiDownload } from "react-icons/fi";
import { Box, IconButton } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";
import { Trash } from "react-feather";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { deleteRegion } from "@/redux/services/administratorService";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";

const RegionManagement = () => {
  const dispatch = useAppDispatch();
  const { RegionManagement } = useAppSelector(
    (state) => state.regionManagement
  );

  const loading: boolean = useAppSelector(
    (state) => state?.regionManagement?.RegionManagement?.loading
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    dispatch(fetchRegionManagement());
  }, [dispatch]);

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const confirmDelete = () => {
    if (selectedRegion) {
      const provinceId = selectedRegion.provinceDetail.id;
      const cityId = selectedRegion.id;

      deleteRegion(provinceId, cityId)
        .then((response) => {
          if (response.statusCode === 200) {
            toast.success(response.message);
            dispatch(fetchRegionManagement());
          } else {
            toast.error(response.message || "Failed to delete region.");
          }
        })
        .catch((error) => {
          toast.error(error.message || "Failed to delete region.");
        });

      toggleDeleteModal();
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: true,
    },
    {
      accessorKey: "city",
      header: "City",
      enableSorting: true,
    },
    {
      accessorKey: "provinceDetail.province",
      header: "Province",
      enableSorting: true,
    },
    {
      header: "Delete",
      Cell: ({ row }) => (
        <IconButton
          sx={{ color: "red" }}
          onClick={() => {
            setSelectedRegion(row.original);
            toggleDeleteModal();
          }}
        >
          <Trash size={20} />
        </IconButton>
      ),
    },
  ];

  // Export to CSV function
  const handleExportRowsToCSV = (rows) => {
    const headers = ["ID", "City", "Province"];
    const data = rows.map((row) => ({
      ID: row.original.id,
      City: row.original.city,
      Province: row.original.provinceDetail.province,
    }));
    exportToCSV(data, headers, "region-management.csv");
  };

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <RegionManagementForm />
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={RegionManagement.regionManagements}
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

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            toggle={toggleDeleteModal}
            onConfirm={confirmDelete}
            message="Are you sure you want to delete the Region?"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default RegionManagement;
