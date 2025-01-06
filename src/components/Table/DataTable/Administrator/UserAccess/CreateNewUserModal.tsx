// @ts-nocheck
import { addUserType } from "@/redux/services/administratorService";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row,
} from "reactstrap";
import { fetchUserType } from "@/redux/slices/administratorSlice";
import { useAppDispatch } from "@/redux/hooks";

const CreateUserTypeModal = ({ isOpen, toggle, onCreate }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    userTypeName: "",
    hasAccess: false,
  });

  const [errors, setErrors] = useState({
    userTypeName: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, checked, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      userTypeName: !formData.userTypeName,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      const { userTypeName, hasAccess } = formData;

      addUserType(userTypeName, hasAccess)
        .then((result) => {
          if (result && result.statusCode === 200) {
            toast.success(result.message || "User Type added successfully!");
            dispatch(fetchUserType()); // Fetch the updated user types list
            toggle(); // Close the modal
            if (onCreate) onCreate(); // Call onCreate callback if passed
          } else {
            toast.error(result.message || "Failed to add User Type.");
          }
        })
        .catch((error) => {
          toast.error(error.message || "An error occurred.");
        });
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Add New User Type</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Row className="mb-3">
            <Col md={12}>
              <Label for="userTypeName">Enter New User Type</Label>
              <Input
                type="text"
                name="userTypeName"
                id="userTypeName"
                value={formData.userTypeName}
                onChange={handleChange}
                className={errors.userTypeName ? "is-invalid" : ""}
                required
              />
              {errors.userTypeName && (
                <div className="invalid-feedback">Please enter a name.</div>
              )}
            </Col>
          </Row>
          <Col md={12}>
            <Input
              type="checkbox"
              name="hasAccess"
              id="hasAccess"
              checked={formData.hasAccess}
              onChange={handleChange}
              className="me-2 mb-3"
            />
            <Label for="hasAccess">Receive Partial Consignments</Label>
          </Col>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Col className="text-center">
          <Button color="primary" onClick={handleSubmit}>
            Add UserType
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
  );
};

export default CreateUserTypeModal;
