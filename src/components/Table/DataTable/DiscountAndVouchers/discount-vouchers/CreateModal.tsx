// @ts-nocheck
import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateVoucherToCustomerService } from "@/redux/services/discountAndVouchersService";
import {
  fetchDiscountedVouchers,
  fetchVoucherTypes,
} from "@/redux/slices/discountAndVouchersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRegionManagement } from "@/redux/slices/administratorSlice";

const CreateModal = ({ isOpen, toggle }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVoucherTypes());
    dispatch(fetchRegionManagement());
  }, []);

  const { voucherTypes } = useAppSelector(
    (state) => state.vouchers.voucherTypes
  );

  const { RegionManagement } = useAppSelector(
    (state) => state.regionManagement
  );

  const [formData, setFormData] = useState({
    name: "",
    discountValue: "",
    voucherTypes: "",
    discountType: "Percentage",
    minimumOrderAmount: "",
    discountCapAmount: "",
    applicableTo: "",
    applicableFrom: "",
    expiryDays: "",
    signUpsCap: "",
    applicableRegion: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    discountValue: false,
    discountType: false,
    discountCapAmount: false,
    applicableTo: false,
    applicableFrom: false,
    minimumOrderAmount: false,
    voucherTypes: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const newValue = type === "number" ? Number(value) : value;

    if (type === "number" && typeof newValue === "number" && newValue < 0) {
      return toast.error("Field value cannot be negative");
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name,
      discountValue: !formData.discountValue,
      discountType: !formData.discountType,
      minimumOrderAmount: !formData.minimumOrderAmount,
      discountCapAmount: !formData.discountCapAmount,
      applicableTo: !formData.applicableTo,
      applicableFrom: !formData.applicableFrom,
      voucherTypes: !formData.voucherTypes,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    const newFormData = Object.entries(formData).map(([key, value]) => {
      if (key === "SubType") return;
      return !value ? (formData[key] = null) : (formData[key] = value);
    });

    if (!hasErrors) {
      const res = await CreateVoucherToCustomerService(formData);
      if (res.succeeded == false) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        dispatch(fetchDiscountedVouchers());
        toggle();
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const [selectedMainType, setSelectedMainType] = useState("");

  const handleMainTypeChange = (e) => {
    const mainType = e.target.value;

    setFormData({ ...formData, voucherTypes: mainType });
    setSelectedMainType(mainType);
  };

  const filteredSubTypes =
    voucherTypes?.voucherTypes?.find(
      (type) => type.mainType === selectedMainType
    )?.subTypes || [];

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Create New Discount Voucher</ModalHeader>
      <ModalBody>
        <form
          onSubmit={handleSubmit}
          className="needs-validation custom-input"
          noValidate
        >
          <Row className="mb-3">
            <Col md={6} className="mb-3">
              <Label for="voucherName">Voucher Name</Label>
              <Input
                type="text"
                name="name"
                id="voucherName"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "is-invalid" : ""}
                required
                placeholder="Voucher Name"
              />
              {errors.name && (
                <div className="invalid-feedback">Please give name</div>
              )}
            </Col>

            <Col md={6} className="mb-3">
              <Label for="discountValue">Discount %</Label>
              <Input
                type="number"
                name="discountValue"
                id="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                className={errors.discountValue ? "is-invalid" : ""}
                required
                placeholder="Discount"
              />
              {errors.discountValue && (
                <div className="invalid-feedback">
                  Please give discount value in %
                </div>
              )}
            </Col>

            <Col md={6} className="mb-3">
              <Label for="minimumOrderAmount">Min Order Amount</Label>
              <Input
                type="number"
                name="minimumOrderAmount"
                id="minimumOrderAmount"
                value={formData.minimumOrderAmount}
                onChange={handleChange}
                className={errors.minimumOrderAmount ? "is-invalid" : ""}
                placeholder="Min Order Amount"
                required
              />
              {errors.minimumOrderAmount && (
                <div className="invalid-feedback">
                  Please enter min order amount
                </div>
              )}
            </Col>

            <Col md={6} className="mb-3">
              <Label for="discountCapAmount">Discount Cap Amount</Label>
              <Input
                type="number"
                name="discountCapAmount"
                id="discountCapAmount"
                value={formData.discountCapAmount}
                onChange={handleChange}
                className={errors.discountCapAmount ? "is-invalid" : ""}
                required
                placeholder="Cap Amount"
              />
              {errors.discountCapAmount && (
                <div className="invalid-feedback">Please enter cap amount</div>
              )}
            </Col>

            <Col md={6} className="mb-3">
              <Label for="applicableFrom">Applicable From</Label>
              <Input
                type="date"
                name="applicableFrom"
                id="applicableFrom"
                value={formData.applicableFrom}
                onChange={handleChange}
                className={errors.applicableFrom ? "is-invalid" : ""}
                required
              />
              {errors.applicableFrom && (
                <div className="invalid-feedback">
                  Please select applicable from date
                </div>
              )}
            </Col>

            <Col md={6} className="mb-3">
              <Label for="applicableTo">Applicable To</Label>
              <Input
                type="date"
                name="applicableTo"
                id="applicableTo"
                value={formData.applicableTo}
                onChange={handleChange}
                className={errors.applicableTo ? "is-invalid" : ""}
                required
              />
              {errors.applicableTo && (
                <div className="invalid-feedback">
                  Please select applicable to date
                </div>
              )}
            </Col>

            <Col md={6} className="mb-3">
              <Label for="voucherTypes">Voucher Type</Label>
              <Input
                type="select"
                name="voucherTypes"
                id="voucherTypes"
                value={formData.voucherTypes}
                onChange={handleMainTypeChange}
                className={errors.voucherTypes ? "is-invalid" : ""}
                required
              >
                <option value="">Select Voucher Type</option>
                {voucherTypes?.voucherTypes?.map((type) => (
                  <option key={type.mainType} value={type.mainType}>
                    {type.mainType}
                  </option>
                ))}
              </Input>

              {errors.voucherTypes && (
                <div className="invalid-feedback">
                  Please select a voucher type
                </div>
              )}
            </Col>

            {formData.voucherTypes && (
              <Col md={6} className="mb-3">
                <Label for="SubType">SubType</Label>
                <Input
                  type="select"
                  name="SubType"
                  id="SubType"
                  value={formData.SubType}
                  onChange={handleChange}
                  className={errors.SubType ? "is-invalid" : ""}
                  required
                >
                  <option value="">Select SubType</option>
                  {filteredSubTypes.map((subType, index) => (
                    <option key={index} value={subType}>
                      {subType}
                    </option>
                  ))}
                </Input>

                {errors.SubType && (
                  <div className="invalid-feedback">
                    Please select a sub type
                  </div>
                )}
              </Col>
            )}

            {formData.SubType === "SignUps" && (
              <Col md={12} className="mb-3">
                <Label for="signUpsCap">SignUp Count</Label>
                <Input
                  type="number"
                  name="signUpsCap"
                  id="signUpsCap"
                  value={formData.signUpsCap}
                  onChange={handleChange}
                  className={errors.signUpsCap ? "is-invalid" : ""}
                />
              </Col>
            )}

            {formData.voucherTypes === "Discount" && (
              <>
                <Col md={6} className="mb-3">
                  <Label for="expiryDays">Number Of Days</Label>
                  <Input
                    type="number"
                    name="expiryDays"
                    id="expiryDays"
                    value={formData.NoOfDays}
                    onChange={handleChange}
                    className={errors.expiryDays ? "is-invalid" : ""}
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Label for="applicableRegion">Applicable Region</Label>
                  <Input
                    type="select"
                    name="applicableRegion"
                    id="applicableRegion"
                    value={formData.applicableRegion}
                    onChange={handleChange}
                    className={errors.applicableRegion ? "is-invalid" : ""}
                  >
                    <option value="">Select Region</option>
                    {RegionManagement?.regionManagements?.map((city, index) => (
                      <option key={`${city.city}-${index}`} value={city.city}>
                        {city.city}
                      </option>
                    ))}
                  </Input>
                </Col>
              </>
            )}
          </Row>

          <Row className="mb-3">
            <Col xs={12} className="text-center">
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CreateModal;
