import React, { ChangeEvent, FormEvent } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

interface FormData {
  customerId: number;
  amount: number;
}

interface AddAmountModalProps {
  isOpen: boolean;
  toggle: () => void;
  toggleClose: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AddAmountModal: React.FC<AddAmountModalProps> = ({
  isOpen,
  toggle,
  toggleClose,
  formData,
  setFormData,
  handleSubmit,
  handleChange,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="md">
      <ModalHeader toggle={toggleClose}>Add Wallet Amount</ModalHeader>
      <ModalBody>
        <form
          onSubmit={handleSubmit}
          className="needs-validation custom-input"
          noValidate
        >
          <Row className="mb-3">
            <Col md={6}>
              <Label for="customerId">Customer Id</Label>
              <Input
                disabled={true}
                type="number"
                name="customerId"
                id="customerId"
                value={formData.customerId}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6}>
              <Label for="amount">Amount</Label>
              <Input
                type="number"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} className="text-center">
              <Button color="primary" type="submit">
                Add Wallet Amount
              </Button>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddAmountModal;
