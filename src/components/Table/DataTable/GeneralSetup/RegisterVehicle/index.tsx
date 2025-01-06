import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Button, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  fetchContractor,
  fetchVehcile,
} from "@/redux/slices/generalSetupSlice";
import { Vehicle } from "@/redux/models/generalSetupTypes";
import VehicleEditModal from "./VehicleEditModal";
import AddVehicleForm from "./AddVehicleForm";
import { FiDownload } from "react-icons/fi";
import { exportToCSV } from "utils/csvUtils";
import { Box, IconButton } from "@mui/material";
import { Edit } from "react-feather";

const RegisterVehicle = () => {
  const dispatch = useAppDispatch();
  const { vehcile } = useAppSelector((state) => state.vehicle);
  const { contractor } = useAppSelector((state) => state.contractor);
  
  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedWarehouseId
  );
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchVehcile(selectedCityId));
    dispatch(fetchContractor(selectedCityId));
  }, [dispatch, selectedCityId]);

  const contractorCodeToName = (row) => {
    let contractorName = "Unknown";
    contractor?.contractors?.forEach((con) => {
      if (con.code === row?.original?.contractorCode) {
        contractorName = con.name;
      }
    });
    return contractorName;
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const columns = useMemo<MRT_ColumnDef<Vehicle>[]>(
    () => [
      {
        accessorKey: "regNo",
        header: "Registration No",
      },
      {
        accessorKey: "contractorCode",
        id: "contractorCode",
        header: "Contractor",
        size: 200,
        Cell: ({ row }) => <p>{contractorCodeToName(row)}</p>,
      },
      {
        accessorKey: "capacity",
        header: "Capacity",
      },
      {
        id: "edit",
        header: "Edit",
        Cell: ({ row }) => (
          <IconButton color="primary" onClick={() => handleEdit(row.original)}>
            <Edit size={20} />
          </IconButton>
        ),
      },
    ],
    [contractor]
  );

  // Export to CSV function
  const handleExportRowsToCSV = (rows) => {
    const headers = ["Reg_No", "Contractor", "Capacity"];

    const data = rows.map((row) => ({
      Reg_No: row.original.regNo,
      Contractor: contractorCodeToName(row),
      Capacity: row.original.capacity,
    }));

    exportToCSV(data, headers, "vehicle-list.csv");
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <AddVehicleForm />
        <div className="table-responsive">
          {vehcile.vehicles && vehcile.vehicles.length > 0 ? (
            <MaterialReactTable
              columns={columns}
              data={vehcile.vehicles}
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
          ) : (
            <p>No vehicles available</p>
          )}
        </div>
      </CardBody>

      {selectedVehicle && (
        <VehicleEditModal
          isOpen={isModalOpen}
          toggle={toggleModal}
          regNo={selectedVehicle.regNo}
          capacity={selectedVehicle.capacity}
          contractorCode={selectedVehicle.contractorCode}
          contactPersonId={selectedVehicle.contactPersonId}
          objectType={selectedVehicle.objectType}
        />
      )}
    </Card>
  );
};

export default RegisterVehicle;
