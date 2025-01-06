// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, Col, Row, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchRegionManagement } from "@/redux/slices/administratorSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SetRegionalPricingAPI } from "@/redux/services/customerService";
import { fetchRegPricing } from "@/redux/slices/customerSlice";

const FormComponent = () => {
  const dispatch = useAppDispatch();

  const { RegionManagement } = useAppSelector(
    (state) => state.regionManagement
  );

  useEffect(() => {
    dispatch(fetchRegionManagement());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    cityId: "",
    price: "",
    gstTax: "",
    discount: "",
    deliveryCharge: "",
    securityDeposit: "",
    urgentDeliveryCharges: "",
  });

  const [errors, setErrors] = useState({
    cityId: false,
    price: false,
    gstTax: false,
    discount: false,
    deliveryCharge: false,
    securityDeposit: false,
    urgentDeliveryCharges: false,
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = !formData[key];
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formDataAsNumbers = Object.keys(formData).reduce((acc, key) => {
      acc[key] = Number(formData[key]);
      return acc;
    }, {});

    SetRegionalPricingAPI(formDataAsNumbers).then((res) => {
      if (res && res.statusCode === 200) {
        toast.success(res?.message);
        setFormData(formData);
        dispatch(fetchRegPricing());
      } else {
        toast.error(res?.message);
      }
    });
  };

  const citiesList =
    RegionManagement?.regionManagements.length > 0 ? (
      RegionManagement?.regionManagements?.map((city) => (
        <option key={city?.id} value={city?.id}>
          {city.city}
        </option>
      ))
    ) : (
      <option value="" disabled>
        No Cities Found
      </option>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="needs-validation custom-input"
      noValidate
    >
      <Row className="mb-3">
        <Col md={6}>
          <Label for="cityId">City ID</Label>
          <Input
            type="select"
            name="cityId"
            id="cityId"
            value={formData.cityId}
            onChange={handleChange}
            className={errors.cityId ? "is-invalid" : ""}
            required
          >
            <option value="" disabled hidden>
              Choose City...
            </option>
            {citiesList}
          </Input>
          {errors.cityId && (
            <div className="invalid-feedback">Please select a valid city.</div>
          )}
        </Col>

        <Col md={6}>
          <Label for="price">Price</Label>
          <Input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? "is-invalid" : ""}
            required
          />
          {errors.price && (
            <div className="invalid-feedback">Please enter a price.</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="gstTax">GST Tax</Label>
          <Input
            type="number"
            name="gstTax"
            id="gstTax"
            value={formData.gstTax}
            onChange={handleChange}
            className={errors.gstTax ? "is-invalid" : ""}
            required
          />
          {errors.gstTax && (
            <div className="invalid-feedback">Please enter GST tax.</div>
          )}
        </Col>

        <Col md={6}>
          <Label for="discount">Discount</Label>
          <Input
            type="number"
            name="discount"
            id="discount"
            value={formData.discount}
            onChange={handleChange}
            className={errors.discount ? "is-invalid" : ""}
            required
          />
          {errors.discount && (
            <div className="invalid-feedback">
              Please enter discount amount.
            </div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="deliveryCharge">Delivery Charge</Label>
          <Input
            type="number"
            name="deliveryCharge"
            id="deliveryCharge"
            value={formData.deliveryCharge}
            onChange={handleChange}
            className={errors.deliveryCharge ? "is-invalid" : ""}
            required
          />
          {errors.deliveryCharge && (
            <div className="invalid-feedback">
              Please enter delivery charge.
            </div>
          )}
        </Col>

        <Col md={6}>
          <Label for="securityDeposit">Security Deposit</Label>
          <Input
            type="number"
            name="securityDeposit"
            id="securityDeposit"
            value={formData.securityDeposit}
            onChange={handleChange}
            className={errors.securityDeposit ? "is-invalid" : ""}
            required
          />
          {errors.securityDeposit && (
            <div className="invalid-feedback">
              Please enter security deposit.
            </div>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Label for="urgentDeliveryCharges">Urgent Delivery Charge</Label>
          <Input
            type="number"
            name="urgentDeliveryCharges"
            id="urgentDeliveryCharges"
            value={formData.urgentDeliveryCharges}
            onChange={handleChange}
            className={errors.urgentDeliveryCharges ? "is-invalid" : ""}
            required
          />
          {errors.urgentDeliveryCharges && (
            <div className="invalid-feedback">
              Please enter urgent delivery charge.
            </div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} className="mt-3 text-center">
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default FormComponent;
