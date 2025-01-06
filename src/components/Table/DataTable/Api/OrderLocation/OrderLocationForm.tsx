import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { toast } from "react-toastify";
import OrderLocationMap from "./OrderLocationMap";
import { useAppSelector } from "@/redux/hooks";

const OrderLocationForm = () => {
  const initialFormState = {
    toDate: "",
    fromDate: "",
    status: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [errors, setErrors] = useState({
    toDate: false,
    fromDate: false,
    status: false,
  });

  const { orderLocation } = useAppSelector((state) => state.orderLocation);
  const Options = orderLocation?.orderLocations || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      toDate: !formData.toDate,
      fromDate: !formData.fromDate,
      status: !formData.status,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      toast.error("All fields are required!");
      return;
    }

    setFormSubmitted(true);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={6}>
            <FormGroup>
              <Label className="col-form-label">From Date</Label>
              <Input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className={errors.fromDate ? "is-invalid" : ""}
                required
              />
              {errors.fromDate && (
                <div className="invalid-feedback">
                  Please select a From Date.
                </div>
              )}
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <Label className="col-form-label">To Date</Label>
              <Input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className={errors.toDate ? "is-invalid" : ""}
                required
              />
              {errors.toDate && (
                <div className="invalid-feedback">Please select a To Date.</div>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <FormGroup>
              <Label className="col-form-label">Status</Label>
              <div className="form-input position-relative">
                <Input
                  type="select"
                  onChange={handleChange}
                  value={formData.status}
                  name="status"
                  className={errors.status ? "is-invalid" : ""}
                  required
                >
                  <option value="" disabled hidden>
                    Select a status
                  </option>
                  {Options.map((location) => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </Input>
                {errors.status && (
                  <div className="invalid-feedback">
                    Please select a status.
                  </div>
                )}
              </div>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} className="text-center">
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </form>

      {formSubmitted && (
        <OrderLocationMap
          startDate={formData.fromDate}
          endDate={formData.toDate}
          orderStatus={formData.status}
        />
      )}
    </Container>
  );
};

export default OrderLocationForm;
