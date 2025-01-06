import { MaterialReactTable } from "material-react-table";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const EditMasterBatchModal = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Edit Batch Modal</ModalHeader>
      <ModalBody>
        {/* <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={cylinderHistory}
            muiTableProps={{
              sx: {
                "& th": {
                  background: "#0A80BF",
                  color: "white",
                  whiteSpace: "nowrap",
                  padding: "10px",
                  minWidth: "230px",
                },
              },
            }}
            initialState={{
              pagination: { pageSize: 5, pageIndex: 0 }, // Show 5 items by default
            }}
          />
        </div> */}
      </ModalBody>
      {/* <ModalFooter>
    <Button color="danger" onClick={toggle}>
      Close
    </Button>
  </ModalFooter> */}
    </Modal>
  );
};

export default EditMasterBatchModal;
