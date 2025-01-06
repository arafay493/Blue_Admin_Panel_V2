// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Col,
  Label,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import { ListAllMasterConsinmentTypes } from "../../../../../redux/models/masterConsignmentTypes";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllItemTypes } from "@/redux/slices/masterItemSlices";
import { fetchAllMasterConsignment } from "@/redux/slices/masterConsignmentSlice";
import { UpdateMasterConsignmentService } from "@/redux/services/masterConsignmentService";
import { toast } from "react-toastify";

interface ConsignmentDetailModalProps {
  modal: boolean;
  toggle: () => void;
  selectedReceivable: ListAllMasterConsinmentTypes | null;
}

const ConsignmentUpdateModal: React.FC<ConsignmentDetailModalProps> = ({
  modal,
  toggle,
  selectedReceivable,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllItemTypes());
  }, []);

  const { allCities } = useAppSelector((state) => state.allCities.allCities);
  const { itemTypes } = useAppSelector((state) => state?.itemTypes?.itemTypes);

  const [subStockDocs, setSubStockDocs] = useState(
    selectedReceivable?.subStockDocs || []
  );

  useEffect(() => {
    setSubStockDocs(selectedReceivable?.subStockDocs || []);
  }, [selectedReceivable]);

  const getItemName = (id: number) => {
    const item = itemTypes?.find((itm) => Number(itm.id) === id);
    return item ? item.name : "Item not found";
  };

  const handleQuantityChange = (
    index: number,
    field: "Filled" | "Empty",
    value: string
  ) => {
    const numericValue = parseFloat(value) || 0;

    setSubStockDocs((prevDocs) =>
      prevDocs.map((doc, idx) => {
        if (idx === index) {
          const updatedDoc = JSON.parse(JSON.stringify(doc));

          if (updatedDoc.lines && updatedDoc.lines[0]) {
            if (field === "Filled" && updatedDoc.itemStatusWill === "Filled") {
              updatedDoc.lines[0].qty = numericValue;
            } else if (
              field === "Empty" &&
              updatedDoc.itemStatusWill === "Empty"
            ) {
              updatedDoc.lines[0].qty = numericValue;
            }
          }
          return updatedDoc;
        }
        return doc;
      })
    );
  };

  const updateMasterConsignment = async () => {
    const payload = subStockDocs
      .filter((doc, index) => {
        const originalDoc = selectedReceivable?.subStockDocs[index];
        const currentQty = doc.lines[0]?.qty || 0;
        const originalQty = originalDoc?.lines[0]?.qty || 0;

        return currentQty !== originalQty;
      })
      .map((doc) => ({
        id: doc.id,
        qty: doc.lines[0]?.qty ? Number(doc.lines[0]?.qty) : 0,
      }));

    try {
      if (payload.length === 0) {
        toast.warning("No changes detected to update.");
        return;
      }

      const res = await UpdateMasterConsignmentService(payload);

      if (res.data.statusCode !== 200) {
        toast.error(res.data.message || "Failed to update consignment.");
      } else {
        toast.success(res.data.message || "Consignment updated successfully.");
        dispatch(fetchAllMasterConsignment());
      }
    } catch (error) {
      console.error("Error updating consignment:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} size="xl">
      <ModalHeader toggle={toggle}>Update Master Consignment</ModalHeader>
      <ModalBody>
        <StaticInputs
          labels={[
            "Location From",
            "Transfer Date",
            "Contractor Code",
            "Driver",
            "Vehicle Reg No.",
            "Remarks",
          ]}
          values={[
            allCities?.find((loc) => loc.id === selectedReceivable?.mainLocId)
              ?.name || "Location Not Found",
            moment(selectedReceivable?.transDate).format("DD-MM-YYYY"),
            selectedReceivable?.contractorCode || "-",
            selectedReceivable?.driverID || "-",
            selectedReceivable?.vehicleRegNo || "-",
            selectedReceivable?.remarks || "-",
          ]}
        />

        <h6 style={{ marginBottom: "10px" }}>Details</h6>

        {subStockDocs?.map((subDoc, index) => (
          <div key={subDoc.id} style={{ marginBottom: "20px" }}>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="itemName">Item</Label>
                  <Input
                    type="text"
                    id="itemName"
                    value={getItemName(subDoc?.lines[0]?.itemId) || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label for="toLocation">To Location</Label>
                  <Input
                    type="text"
                    id="toLocation"
                    value={
                      allCities?.find((loc) => loc.id === subDoc?.locId)
                        ?.name || "Location Not Found"
                    }
                    readOnly
                  />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label for="filledQuantity">Filled Quantity</Label>
                  <Input
                    type="number"
                    id="filledQuantity"
                    value={
                      subDoc?.itemStatusWill === "Filled"
                        ? subDoc?.lines[0]?.qty || 0 // Default to 0 if undefined
                        : 0 // Allow updating even if Empty
                    }
                    onChange={(e) =>
                      handleQuantityChange(index, "Filled", e.target.value)
                    }
                  />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label for="emptyQuantity">Empty Quantity</Label>
                  <Input
                    type="number"
                    id="emptyQuantity"
                    value={
                      subDoc?.itemStatusWill === "Empty"
                        ? subDoc?.lines[0]?.qty || 0 // Default to 0 if undefined
                        : 0 // Allow updating even if Filled
                    }
                    onChange={(e) =>
                      handleQuantityChange(index, "Empty", e.target.value)
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        ))}
        <Col className="text-center">
          <Button color="primary" onClick={updateMasterConsignment}>
            Update Consignment
          </Button>
        </Col>
      </ModalBody>
    </Modal>
  );
};

export default ConsignmentUpdateModal;
