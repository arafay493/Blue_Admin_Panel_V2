import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  fetchLocation,
  fetchLocationType,
} from "@/redux/slices/generalSetupSlice";
import locationListColumns from "./LocationColumns";
import AddLocationForm from "./AddLocationForm";
import EditLocationModal from "./EditLocationModal";
import ViewLocationModal from "./ViewLocationModal";
import { FiDownload } from "react-icons/fi";
import { Box } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";

const LocationListTable = () => {
  const dispatch = useAppDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredLocationData, setFilteredLocationData] = useState([]);
  const [locId, setLocId] = useState(null);

  const { location } = useAppSelector((state) => state.location);

  useEffect(() => {
    dispatch(fetchLocation());
    dispatch(fetchLocationType());
  }, [dispatch]);

  const filteredLocationList = useMemo(
    () =>
      location.locationLists.filter(
        (loc) => Number(loc.parentID) === Number(locId)
      ) ?? [],
    [location.locationLists, locId]
  );

  const handleEdit = (location) => {
    setSelectedLocation(location);
    toggleEditModal();
  };

  const handleView = (location) => {
    setLocId(location.id);

    setFilteredLocationData(filteredLocationList);
    setViewModalOpen(true);
  };

  const columns = locationListColumns({
    onEdit: handleEdit,
    onView: handleView,
  });

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const toggleViewModal = () => {
    setViewModalOpen(!viewModalOpen);
  };

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "Location_Name",
      "Location_Type",
      "City",
      "Province",
      "Address",
      "Warehouse_Type",
    ];

    const data = rows.map((row) => ({
      Location_Name: row.original.name,
      Location_Type: row.original.type,
      City: row.original.city,
      Province: row.original.province,
      Address: row.original.address,
      Warehouse_Type:
        row.original.parentID === null || row.original.parentID === 0
          ? "Central Hub"
          : "Distributor",
    }));

    exportToCSV(data, headers, "location-list.csv");
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <AddLocationForm />
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={location.locationLists}
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
      <EditLocationModal
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        locationDetails={selectedLocation || {}}
      />
      <ViewLocationModal
        isOpen={viewModalOpen}
        toggle={toggleViewModal}
        locationData={filteredLocationData}
      />
    </Card>
  );
};

export default LocationListTable;
