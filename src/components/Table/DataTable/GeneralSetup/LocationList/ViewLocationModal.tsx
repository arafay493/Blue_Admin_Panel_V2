import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { MaterialReactTable } from "material-react-table";

const ViewLocationModal = ({ isOpen, toggle, locationData }) => {
  const columns = [
    { accessorKey: "name", header: "Location Name", size: 150 },
    { accessorKey: "type", header: "Location Type", size: 100 },
    { accessorKey: "city", header: "City", size: 200 },
    { accessorKey: "province", header: "Province", size: 100 },
    { accessorKey: "address", header: "Address", size: 200 },
    {
      accessorKey: "warehouseType",
      header: "Warehouse Type",
      size: 150,
      Cell: ({ row }) => {
        const { parentID } = row.original;
        return parentID === null || parentID === 0
          ? "Central Hub"
          : "Distributor";
      },
    },
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>View Location</ModalHeader>
      <ModalBody>
        <MaterialReactTable
          columns={columns}
          data={locationData}
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
        />
      </ModalBody>
    </Modal>
  );
};

export default ViewLocationModal;
