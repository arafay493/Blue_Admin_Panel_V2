import StaticInputs from "@/components/StaticInputs/StaticInputs";
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

// Helper components to organize modal content
const Section = ({ title, children }) => (
  <div>
    <h6 className="modal-subheading">{title}</h6>
    {children}
  </div>
);

const Detail = ({ label, value }) => (
  <p>
    <strong>{label}:</strong> {value}
  </p>
);

const FeedbackModal = ({ modal, toggle, selectedFeedback, renderStars }) => (
  <Modal isOpen={modal} toggle={toggle} size="lg">
    <ModalHeader toggle={toggle}>Feedback Details</ModalHeader>
    <ModalBody>
      {selectedFeedback ? (
        <>
          <Section title="Order Details">
            <StaticInputs
              labels={[
                "Order ID",
                "Customer Name",
                "Order Quantity",
                "Order Amount",
                "Order Drop Date",
                "Order Delivery Date",
              ]}
              values={[
                selectedFeedback.orderId || "NA",
                selectedFeedback.customerName || "NA",
                selectedFeedback.orderQTY || "NA",
                selectedFeedback.orderAmount || "NA",
                selectedFeedback.orderDropDate || "NA",
                selectedFeedback.orderDeliveryDate || "NA",
              ]}
            />
          </Section>
          <hr />

          <Section title="Delivery Information">
            <StaticInputs
              labels={["Driver Name", "Pickup Time", "Delivery Time"]}
              values={[
                selectedFeedback.driverName || "NA",
                selectedFeedback.orderPickDate || "NA",
                selectedFeedback.orderDeliveryDate || "NA",
              ]}
            />
          </Section>
          <hr />

          <Section title="Rating">
            <Detail label="Rate" value={renderStars(selectedFeedback.rate)} />
          </Section>
          <hr />

          <Section title="Questions & Answers">
            {selectedFeedback?.answers?.map((item, index) => (
              <div key={index} className="mb-3">
                <div style={{ color: "#5E97CE", marginBottom: "8px" }}>
                  {item?.question}
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`radio_${index}`}
                      checked={item?.answer === "Yes"}
                      disabled
                      style={{ color: "gray", cursor: "not-allowed" }}
                    />
                    Yes
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      type="radio"
                      name={`radio_${index}`}
                      checked={item?.answer === "No"}
                      disabled
                      style={{ color: "gray", cursor: "not-allowed" }}
                    />
                    No
                  </label>
                </div>
              </div>
            ))}
          </Section>

          <Section title="Comment">
            <Detail label="Review" value={selectedFeedback.review} />
          </Section>
        </>
      ) : (
        <p>No feedback selected</p>
      )}
    </ModalBody>

    {/* <ModalFooter>
      <Button color="danger" onClick={toggle}>
        Close
      </Button>
    </ModalFooter> */}
  </Modal>
);

export default FeedbackModal;
