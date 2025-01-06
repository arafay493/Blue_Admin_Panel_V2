import { updateVehicle } from "@/redux/services/generalSetupService";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";

interface VehicleEditModalProps {
  isOpen: boolean;
  toggle: () => void;
  regNo: string;
  capacity: string;
  contractorCode: string;
  contactPersonId: number;
  objectType: string;
}

const VehicleEditModal: React.FC<VehicleEditModalProps> = ({
  isOpen,
  toggle,
  regNo,
  capacity,
  contractorCode,
  contactPersonId,
  objectType,
}) => {
  const [editedRegNo, setEditedRegNo] = useState(regNo);
  const [editedCapacity, setEditedCapacity] = useState(capacity);

  useEffect(() => {
    if (isOpen) {
      setEditedRegNo(regNo);
      setEditedCapacity(capacity);
    }
  }, [isOpen, regNo, capacity]);

  const handleSave = async () => {
    try {
      const message = await updateVehicle(
        regNo,
        contractorCode,
        editedCapacity,
        contactPersonId,
        objectType
      );
      toast.success(message);
      toggle();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Vehicle</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="regNo">Registration No</Label>
            <Input
              type="text"
              id="regNo"
              value={editedRegNo}
              onChange={(e) => setEditedRegNo(e.target.value)}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="capacity">Capacity</Label>
            <Input
              type="text"
              id="capacity"
              value={editedCapacity}
              onChange={(e) => setEditedCapacity(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Col className="text-center">
          <Button color="primary" onClick={handleSave}>
            Submit
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
  );
};

export default VehicleEditModal;
