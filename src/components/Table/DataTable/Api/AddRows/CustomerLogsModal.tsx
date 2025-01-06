// @ts-nocheck
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import { useAppSelector } from "@/redux/hooks";
import { MaterialReactTable } from "material-react-table";
import moment from "moment";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CustomerLogDataColumns, CustomerLogOrder } from "./columns";

const CustomerLogsModal = ({ logModal, toggle, toggleClose }) => {
  const { customerLog } = useAppSelector((state) => state.customerLogSlice);
  const CustomerLogOrderColumns = CustomerLogOrder();
  const LogsDataColumns = CustomerLogDataColumns();

  return (
    <Modal
      isOpen={logModal}
      toggle={toggle}
      size="lg"
      style={{ maxHeight: "90vh" }}
    >
      <ModalHeader toggle={toggleClose}>Customer Log</ModalHeader>
      <ModalBody>
        <div>
          {/* Display Customer Details */}
          <StaticInputs
            labels={[
              "Customer ID",
              "Customer Name",
              "Customer Email",
              "Customer Created On",
            ]}
            values={[
              customerLog?.logs?.user?.id,
              customerLog?.logs?.user?.name,
              customerLog?.logs?.user?.email,
              moment(customerLog?.logs?.user?.createdOn).format("DD-MM-YYYY") ||
                "NA",
            ]}
          />

          {/* Display Logs Table */}
          <div className="mt-4">
            <h5 style={{ marginTop: "40px" }}>Order Logs</h5>
            {customerLog?.logs?.orders?.length > 0 ? (
              <>
                <div className="table-responsive">
                  <MaterialReactTable
                    columns={CustomerLogOrderColumns}
                    data={customerLog?.logs?.orders}
                    muiTableProps={{
                      sx: {
                        "& th": {
                          background: "#0A80BF",
                          color: "white",
                        },
                      },
                    }}
                    enableRowSelection={false}
                    enableExpanding
                    renderDetailPanel={({ row }) => {
                      return (
                        <MaterialReactTable
                          columns={LogsDataColumns}
                          data={row.original.orderScheduleLogsResponse.logs}
                          muiTableProps={{
                            sx: {
                              "& th": {
                                background: "#0A80BF",
                                color: "white",
                              },
                            },
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </>
            ) : (
              <p>No orders available for this customer.</p>
            )}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CustomerLogsModal;
