import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import { CashReceivables } from "@/redux/models/paymentTypes";

interface CashReceivableDetailsModalProps {
  modal: boolean;
  toggle: () => void;
  selectedReceivable: CashReceivables | null;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div>
    <h6 className="modal-subheading">{title}</h6>
    {children}
  </div>
);

const CashReceivableDetailsModal: React.FC<CashReceivableDetailsModalProps> = ({
  modal,
  toggle,
  selectedReceivable,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Cash Receivable Details</ModalHeader>
      <ModalBody>
        {selectedReceivable ? (
          <>
            <Section title="Consignment Details">
              <StaticInputs
                labels={[
                  "Consignment ID",
                  "Driver ID",
                  "Driver Name",
                  "Vehicle",
                  "Order Quantity",
                  "Vehicle Left Date",
                  "Vehicle Returned Date",
                  "Amount Received",
                  "Cash Orders",
                  "Total Amount",
                ]}
                values={[
                  selectedReceivable.id.toString(),
                  selectedReceivable.driverId.toString(),
                  selectedReceivable.driverName || "NA",
                  selectedReceivable.vehicleId || "NA",
                  selectedReceivable.noOfOrders.toString(),
                  selectedReceivable.vehicleLeftDate || "NA",
                  selectedReceivable.vehicleReturnedDate || "NA",
                  selectedReceivable.codRecieved.toString(),
                  selectedReceivable.noOfCashOrders.toString(),
                  selectedReceivable.totalAmount.toString(),
                ]}
              />
            </Section>
          </>
        ) : (
          <p>No receivable selected</p>
        )}
      </ModalBody>
    </Modal>
  );
};

export default CashReceivableDetailsModal;
