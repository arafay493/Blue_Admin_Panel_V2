import { MaterialReactTable } from "material-react-table";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { CylinderHistoryColumns } from "./columns";

const CylinderHistoryModal = ({ isOpen, toggle, cylinderHistory }) => {
  const columns = CylinderHistoryColumns();
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Cylinder History</ModalHeader>
      <ModalBody>
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={cylinderHistory}
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
            initialState={{
              pagination: { pageSize: 5, pageIndex: 0 },
            }}
          />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CylinderHistoryModal;
