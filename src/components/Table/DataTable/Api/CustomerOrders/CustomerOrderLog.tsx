import StaticInputs from "@/components/StaticInputs/StaticInputs";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { CustomerLogDataColumns } from "./columns";
import { MaterialReactTable } from "material-react-table";
import moment from "moment";

const CustomerOrderLogModal = ({ isOpen, toggle, orderLog, orderId }) => {
  const { customerLog } = useAppSelector((state) => state.customerLogSlice);
  const LogsDataColumns = CustomerLogDataColumns();
  const {
    confirmedBy,
    custDetailId,
    customerId,
    customerOrderId,
    driverDropDate,
    driverId,
    driverPickDate,
    driverUpdatedBy,
    driverUpdatedOn,
    numOfDay,
    orderClosedDate,
    orderStatus,
    updatedBy,
    updatedOn,
    vehicleId,
    vehicleUpdatedBy,
    vehicleUpdatedOn,
    logs = [],
  } = orderLog || {};

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Customer Order Logs</ModalHeader>
      <ModalBody>
        <StaticInputs
          labels={[
            "Customer Detail ID",
            "Driver ID",
            "Customer Order ID",
            "Driver Drop Date",
            "Confirmed By",
            "Vehicle ID",
            "Vehicle Updated By",
            "Vehicle Updated On",
            "Driver Updated By",
            "Driver Updated On",
            "Customer ID",
            "Driver Pick Date",
            "Number of Days",
            "Order Closed Date", // New label
            "Order Status", // New label
            "Updated By", // New label
            "Updated On", // New label
          ]}
          values={[
            custDetailId || "NA",
            driverId || "NA",
            customerOrderId || "NA",
            driverDropDate || "NA",
            confirmedBy || "NA",
            vehicleId || "NA",
            vehicleUpdatedBy || "NA",
            moment(vehicleUpdatedOn).format("DD/MM/YYYY hh:mm:ss A") || "NA",
            driverUpdatedBy || "NA",
            driverUpdatedOn || "NA",
            customerId || "NA",
            driverPickDate || "NA",
            numOfDay || "NA",
            orderClosedDate || "NA",
            orderStatus || "NA",
            updatedBy || "NA",
            moment(updatedOn).format("DD/MM/YYYY hh:mm:ss A") || "NA",
          ]}
        />

        <div className="mt-4">
          <h5 style={{ marginTop: "40px" }}>Order Logs</h5>
          {logs?.length > 0 ? (
            <>
              <div className="table-responsive">
                <MaterialReactTable
                  columns={LogsDataColumns}
                  data={logs}
                  muiTableProps={{
                    sx: {
                      "& th": {
                        background: "#0A80BF",
                        color: "white",
                      },
                    },
                  }}
                />
              </div>
            </>
          ) : (
            <p>No orders available for this customer.</p>
          )}
        </div>
      </ModalBody>
      {/* <ModalFooter>
        <Button color="danger" onClick={toggle}>
          Close
        </Button>
      </ModalFooter> */}
    </Modal>
  );
};

export default CustomerOrderLogModal;
