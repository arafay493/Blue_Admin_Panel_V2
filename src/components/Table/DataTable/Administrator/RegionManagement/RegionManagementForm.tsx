import React, { useState } from "react";
import { Button, Col, Row, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addAreaManagement } from "@/redux/services/administratorService";
import { fetchRegionManagement } from "@/redux/slices/administratorSlice";
import { useAppDispatch } from "@/redux/hooks";

const RegionManagementForm = () => {
  const initialFormState = {
    city: "",
    province: "",
    cityDescription: "",
    provinceDescription: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const [errors, setErrors] = useState({
    city: false,
    province: false,
    cityDescription: false,
    provinceDescription: false,
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

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      city: !formData.city,
      province: !formData.province,
      cityDescription: !formData.cityDescription,
      provinceDescription: !formData.provinceDescription,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const result = await addAreaManagement(
        formData.city,
        formData.province,
        formData.cityDescription,
        formData.provinceDescription
      );

      if (result.statusCode === 200) {
        toast.success(result.message || "Area added successfully!");
        setFormData(initialFormState);
        dispatch(fetchRegionManagement());
      } else {
        toast.error(result.message || "Failed to add area.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add area.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="needs-validation custom-input"
      noValidate
    >
      <Row className="mb-3">
        <Col md={6}>
          <Label for="city">City</Label>
          <Input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? "is-invalid" : ""}
            required
          />
          {errors.city && (
            <div className="invalid-feedback">Please Enter City.</div>
          )}
        </Col>

        <Col md={6}>
          <Label for="province">Province</Label>
          <Input
            type="text"
            name="province"
            id="province"
            value={formData.province}
            onChange={handleChange}
            className={errors.province ? "is-invalid" : ""}
            required
          />
          {errors.province && (
            <div className="invalid-feedback">Please Enter Province.</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="cityDescription">City Description</Label>
          <Input
            type="textarea"
            name="cityDescription"
            id="cityDescription"
            value={formData.cityDescription}
            onChange={handleChange}
            className={errors.cityDescription ? "is-invalid" : ""}
            required
          />
          {errors.cityDescription && (
            <div className="invalid-feedback">
              Please Enter City Description.
            </div>
          )}
        </Col>

        <Col md={6}>
          <Label for="provinceDescription">Province Description</Label>
          <Input
            type="textarea"
            name="provinceDescription"
            id="provinceDescription"
            value={formData.provinceDescription}
            onChange={handleChange}
            className={errors.provinceDescription ? "is-invalid" : ""}
            required
          />
          {errors.provinceDescription && (
            <div className="invalid-feedback">
              Please Enter Province Description.
            </div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} className="text-center">
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default RegionManagementForm;
