// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Row,
  Input,
  Label,
} from "reactstrap";
import { toast } from "react-toastify";

interface EditContactModalProps {
  isOpen: boolean;
  toggle: () => void;
  contact: any;
}

const EditContactModal: React.FC<EditContactModalProps> = ({
  isOpen,
  toggle,
  contact,
}) => {
  const [formData, setFormData] = useState(contact);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {};

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      toast.error("Please fill in all required fields.");
      return;
    }

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Contact Person</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} noValidate>
            <Row className="mb-3">
              <Col md={6}>
                <Label for="contractorName">Contractor Name</Label>
                <Input
                  type="text"
                  name="contractorName"
                  id="contractorName"
                  value={formData.contractorName}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Update Contact
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
};

export default EditContactModal;
