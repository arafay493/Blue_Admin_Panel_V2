import React, { useState } from "react";
import { Button, Col, Row, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUserType } from "@/redux/services/administratorService";
import { fetchUserType } from "@/redux/slices/administratorSlice";
import { useAppDispatch } from "../../../../../redux/hooks";

const FormComponent = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    userTypeName: "",
  });

  const [errors, setErrors] = useState({
    userTypeName: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const newErrors = {
  //     userTypeName: !formData.userTypeName,
  //   };

  //   setErrors(newErrors);
  //   const hasErrors = Object.values(newErrors).some((error) => error);

  //   if (!hasErrors) {
  //     const userTypeName = formData.userTypeName;

  //     addUserType(userTypeName)
  //       .then((result) => {
  //         if (result && result.statusCode === 200) {
  //           toast.success(result.message || "User Type added successfully!");
  //           dispatch(fetchUserType());
  //         } else {
  //           toast.error(result.message || "Failed to add User Type.");
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error(error.message || "An error occurred.");
  //       });
  //   } else {
  //     toast.error("Please fill in all required fields.");
  //   }
  // };

  return (
    <form
      // onSubmit={handleSubmit}
      className="needs-validation custom-input"
      noValidate
    >
      <Row className="mb-3">
        <Col md={12}>
          <Label for="userTypeName">Name</Label>
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

      <Row className="mb-3">
        <Col xs={12} className="text-center">
          <Button color="primary" type="submit">
            Add User Type
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default FormComponent;
