// @ts-nocheck
import React from "react";
import { Modal, ModalHeader, ModalBody, Button, Col } from "reactstrap";

interface InvoiceModalProps {
  isOpen: boolean;
  toggle: () => void;
  data: any; // Replace with a specific type if you have a data interface
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  toggle,
  data,
}) => {
  const details: DetailItem[] = [
    { label: "Gas Amount", value: data?.gasPrice || 0 },
    { label: "Security Deposit", value: data?.securityDeposit || 0 },
    {
      label: "Delivery Charges (UDC + DC)",
      value: (data?.deliveryCharges || 0) + (data?.urgentDeliveryCharges || 0),
    },
    { label: "Sales Tax", value: data?.tax || 0, isHighlighted: true },
    { label: "Invoice Total", value: data?.total || 0 },
    {
      label: "Opening Wallet",
      value: data?.onlinePaidAmount || 0,
    },
    {
      label: "Discount",
      value: data?.discount || 0,
      isHighlighted: true,
    },
    {
      label: "Total Receivable",
      value:
        (data?.total || 0) -
        (data?.onlinePaidAmount || 0) -
        (data?.discount || 0),
    },
    {
      label: "Cash Received",
      value: data?.customerPaid || 0,
      isHighlighted: true,
      valueColor: "#0096FF",
    },
    {
      label: "Wallet",
      value: Math.abs(
        (data?.customerPaid || 0) -
        ((data?.total || 0) -
          (data?.onlinePaidAmount || 0) -
          (data?.discount || 0))
      ),
    },
  ];
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader
        toggle={toggle}
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#4686A6",
          // borderBottom: "none",
        }}
      >
        Invoice Details
      </ModalHeader>
      <ModalBody style={{ padding: "20px" }}>
        <div style={{ fontSize: "14px", color: "#333" }}>
          <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ marginRight: "8px" }}>
                  Order ID:
                </span>
                <span style={{ fontWeight: "bold", }}>{data?.orderId || "N/A"}</span>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ marginRight: "8px" }}>
                  Customer ID:
                </span>
                <span style={{ fontWeight: "bold", }}>{data?.customerId || "N/A"}</span>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ marginRight: "8px" }}>
                  Delivery Date:
                </span>
                <span style={{ fontWeight: "bold", }}>{data?.deliveryDate || "N/A"}</span>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ marginRight: "8px" }}>
                  Order Created Date:
                </span>
                <span style={{ fontWeight: "bold", }}>{data?.orderCreatedDate || "N/A"}</span>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ marginRight: "8px" }}>
              Customer Name:
            </span>
            <span style={{ fontWeight: "bold", }}>{data?.customerName || "N/A"}</span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ marginRight: "8px" }}>
              Quantity:
            </span>
            <span style={{ fontWeight: "bold", }}>{data?.qty || 0}</span>
          </div>

          <hr style={{ margin: "15px 0" }} />

          <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <div></div>
            <div style={{ marginBottom: "10px", fontWeight: "bold" }}>RS/-</div>
          </div>
          {/* Details Section */}
          {/* Details Section */}
          {details.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                alignItems: "center", // Center items vertically
              }}
            >
              <span>{item.label}</span>
              <hr style={{ flexGrow: 1, margin: "0 20px", borderTop: "2px dashed gray" }} />
              <span
                style={{
                  display: "inline-block",
                  borderBottom: item.isHighlighted ? "1px solid #ccc" : "none",
                  paddingBottom: item.isHighlighted ? "2px" : "0",
                  color: item.valueColor || "inherit",
                  fontWeight: "bold"
                }}
              >
                {item.label === "Opening Wallet" ? `(${item.value.toFixed(2)})` : item.value.toFixed(2)}
              </span>
            </div>
          ))}

          <Col xs={12} className="text-center">
            <Button
              color="primary"
              style={{
                marginTop: "15px",
                width: "60%",
                backgroundColor: "#007bff",
                border: "none",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              onClick={toggle}
            >
              Back
            </Button>
          </Col>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default InvoiceModal;
