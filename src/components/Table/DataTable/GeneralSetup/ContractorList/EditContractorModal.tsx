import { updateContractor } from "@/redux/services/generalSetupService";
import React, { useState, useEffect } from "react";
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
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EditContractorModal = ({ isOpen, toggle, contractor }) => {
  const initialFormData = {
    id: contractor.id,
    code: contractor.code,
    email: contractor.email,
    name: contractor.name,
    phone: contractor.phone,
    mobile: contractor.mobile,
    mobile2: contractor.mobile2,
    isActive: contractor.isActive,
    password: contractor.password,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    updateContractor(
      formData.id,
      formData.name,
      formData.email,
      formData.email,
      formData.mobile,
      formData.mobile2,
      formData.phone,
      formData.code,
      formData.password,
      formData.isActive
    )
      .then((response) => {
        if (response.statusCode !== 200) {
          toast.error(response.message || "Error updating contractor.");
          return;
        }

        toast.success(response.message);
        toggle();
        setFormData(initialFormData);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update contractor.");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Contractor</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="contractorName">Name</Label>
            <Input
              type="text"
              name="name"
              id="contractorName"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="contractorCode">Contractor Code</Label>
            <Input
              type="text"
              name="code"
              id="contractorCode"
              value={formData.code}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="contractorEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="contractorEmail"
              value={formData.email}
              disabled
            />
          </FormGroup>
          <div className="mb-3">
            <Label for="password">Password:</Label>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <InputGroupText
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroupText>
            </InputGroup>
          </div>
          <FormGroup>
            <Label for="mobile">Mobile Number</Label>
            <Input
              type="number"
              name="mobile"
              id="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="mobile2">Second Mobile Number</Label>
            <Input
              type="number"
              name="mobile2"
              id="mobile2"
              value={formData.mobile2}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="contractorPhone">Phone</Label>
            <Input
              type="text"
              name="phone"
              id="contractorPhone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="contractorStatus">Status</Label>
            <Input
              type="select"
              name="status"
              id="contractorStatus"
              value={formData.isActive ? "Active" : "Inactive"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isActive: e.target.value === "Active",
                })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Col className="text-center">
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
  );
};

export default EditContractorModal;
