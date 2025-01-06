import React, { useState } from "react";
import { Button, Col, Row, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPaymentMethod } from "@/redux/services/generalSetupService";
import { useAppSelector } from "@/redux/hooks";
import moment from "moment";

const AddPaymentMethod = () => {
  const { userId } = useAppSelector((state) => state.authreducer);
  const initialFormState = {
    paymentMethod: "",
    updatedOn: new Date(),
    updatedBy: userId,
  };
  const [formData, setFormData] = useState(initialFormState);

  const [errors, setErrors] = useState({
    paymentMethod: false,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      paymentMethod: !formData.paymentMethod,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const { message, statusCode } = await addPaymentMethod(
        formData.paymentMethod,
        formData.updatedOn,
        formData.updatedBy
      );

      if (statusCode === 200) {
        toast.success(message || "Payment method added successfully!");
        setFormData(initialFormState);
      } else {
        toast.error(message || "Failed to add payment method.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add payment method.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="needs-validation custom-input"
      noValidate
    >
      <Row className="mb-3">
        <Col md={12}>
          <Label for="city">Payment Method</Label>
          <Input
            type="text"
            name="paymentMethod"
            id="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={errors.paymentMethod ? "is-invalid" : ""}
            required
          />
          {errors.paymentMethod && (
            <div className="invalid-feedback">Please Enter Payment Method.</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} className="text-center">
          <Button color="primary" type="submit">
            Add Payment Method
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default AddPaymentMethod;
