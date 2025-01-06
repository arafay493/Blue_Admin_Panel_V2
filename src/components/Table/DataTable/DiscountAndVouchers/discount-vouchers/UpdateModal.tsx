// @ts-nocheck
import React, { useState } from "react";
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
import {
  CreateVoucherToCustomerService,
  UpdateVoucherToCustomerService,
} from "@/redux/services/discountAndVouchersService";
import { fetchDiscountedVouchers } from "@/redux/slices/discountAndVouchersSlice";
import { useAppDispatch } from "@/redux/hooks";

const UpdateModal = ({ isOpen, toggle, voucher }) => {
  const dispatch = useAppDispatch();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  const [formData, setFormData] = useState({
    id: voucher?.id,
    name: voucher?.name,
    discountValue: voucher?.discountValue,
    discountType: "Percentage",
    minimumOrderAmount: voucher?.minimumOrderAmount,
    discountCapAmount: voucher?.discountCapAmount,
    applicableTo: formatDate(voucher?.applicableTo),
    applicableFrom: formatDate(voucher?.applicableFrom),
    expiryDays: voucher?.expiryDays,
    applicableRegion: voucher?.applicableRegion,
  });
  const [errors, setErrors] = useState({
    name: false,
    discountValue: false,
    discountType: false,
    discountCapAmount: false,
    applicableTo: false,
    applicableFrom: false,
    minimumOrderAmount: false,
    expiryDays: false,
    applicableRegion: false,
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
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      const res = await UpdateVoucherToCustomerService(formData);
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

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Update Discount Voucher</ModalHeader>
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
                disabled
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
                disabled
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
              <Label for="applicableRegion">Applicable Region</Label>
              <Input
                type="text"
                name="applicableRegion"
                id="applicableRegion"
                value={formData.applicableRegion}
                onChange={handleChange}
                className={errors.applicableRegion ? "is-invalid" : ""}
                required
                disabled
              />
            </Col>

            <Col md={6} className="mb-3">
              <Label for="usageLimit">Usage Limit</Label>
              <Input
                type="number"
                name="usageLimit"
                id="usageLimit"
                value={formData.expiryDays}
                onChange={handleChange}
                className={errors.usageLimit ? "is-invalid" : ""}
                required
                disabled
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} className="text-center">
              <Button color="primary" type="submit">
                Update
              </Button>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default UpdateModal;
