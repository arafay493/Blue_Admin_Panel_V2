import React from "react";
import { Modal, ModalHeader, ModalBody, Col, Button } from "reactstrap";

interface ViewDetailsModalProps {
  isOpen: boolean;
  toggle: () => void;
  rowData: any;
}

interface DetailItem {
  label: string;
  value: number;
  isHighlighted?: boolean;
  valueColor?: string;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({
  isOpen,
  toggle,
  rowData,
}) => {
  const details: DetailItem[] = [
    { label: "Gas Amount", value: rowData?.gasPrice || 0 },
    { label: "Security Deposit", value: rowData?.securityDeposit || 0 },
    {
      label: "Delivery Charges (UDC + DC)",
      value:
        (rowData?.deliveryCharges || 0) + (rowData?.urgentDeliveryCharges || 0),
    },
    { label: "Sales Tax", value: rowData?.tax || 0, isHighlighted: true },
    { label: "Invoice Total", value: rowData?.total || 0 },
    {
      label: "Opening Wallet",
      value: rowData?.onlinePaidAmount || 0,
    },
    {
      label: "Discount",
      value: rowData?.discount || 0,
      isHighlighted: true,
    },
    {
      label: "Total Receivable",
      value:
        (rowData?.total || 0) -
        (rowData?.onlinePaidAmount || 0) -
        (rowData?.discount || 0),
    },
    {
      label: "Cash Received",
      value: rowData?.customerPaid || 0,
      isHighlighted: true,
      valueColor: "#0096FF",
    },
    {
      label: "Wallet",
      value: Math.abs(
        (rowData?.customerPaid || 0) -
        ((rowData?.total || 0) -
          (rowData?.onlinePaidAmount || 0) -
          (rowData?.discount || 0))
      ),
    },
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md">
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
                <span style={{ fontWeight: "bold", }}>{rowData?.orderId || "N/A"}</span>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ marginRight: "8px" }}>
                  Customer ID:
                </span>
                <span style={{ fontWeight: "bold", }}>{rowData?.customerId || "N/A"}</span>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ marginRight: "8px" }}>
                  Delivery Date:
                </span>
                <span style={{ fontWeight: "bold", }}>{rowData?.deliveryDate || "N/A"}</span>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ marginRight: "8px" }}>
                  Order Created Date:
                </span>
                <span style={{ fontWeight: "bold", }}>{rowData?.orderCreatedDate || "N/A"}</span>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ marginRight: "8px" }}>
              Customer Name:
            </span>
            <span style={{ fontWeight: "bold", }}>{rowData?.customerName || "N/A"}</span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ marginRight: "8px" }}>
              Quantity:
            </span>
            <span style={{ fontWeight: "bold", }}>{rowData?.qty || 0}</span>
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

export default ViewDetailsModal;
