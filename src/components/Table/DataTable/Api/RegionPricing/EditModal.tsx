// @ts-nocheck
import { useAppDispatch } from "@/redux/hooks";
import { updateRegionPricing } from "@/redux/services/customerService";
import { fetchRegPricing } from "@/redux/slices/customerSlice";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
} from "reactstrap";

const EditPricingModal = ({ isOpen, data, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    pricingId: data ? data.pricingId : "",
    gstTax: "",
    discount: "",
    deliveryCharges: "",
    securityDeposit: "",
    urgentDeliveryCharges: "",
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      setFormData({
        pricingId: data.pricingId,
        gstTax: data.gstTax.toString(),
        discount: data.discount.toString(),
        deliveryCharges: data.deliveryCharges.toString(),
        securityDeposit: data.securityDeposit.toString(),
        urgentDeliveryCharges: data.urgentDeliveryCharges.toString(),
      });
    }
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedFormData = {
      pricingId: formData.pricingId,
      gstTax: Number(formData.gstTax),
      discount: Number(formData.discount),
      deliveryCharges: Number(formData.deliveryCharges),
      securityDeposit: Number(formData.securityDeposit),
      urgentDeliveryCharges: Number(formData.urgentDeliveryCharges),
    };

    updateRegionPricing(updatedFormData)
      .then((response) => {
        const successMessage =
          response?.data?.message || "Updated successfully";
        toast.success(successMessage);

        onSave(updatedFormData);
        dispatch(fetchRegPricing());
        onClose();
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message || "Failed to update pricing";
        toast.error(errorMessage);
      });
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Edit Pricing</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="gstTax">GST Tax</Label>
            <Input
              type="number"
              name="gstTax"
              id="gstTax"
              value={formData.gstTax}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="discount">Discount</Label>
            <Input
              type="number"
              name="discount"
              id="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="deliveryCharges">Delivery Charges</Label>
            <Input
              type="number"
              name="deliveryCharges"
              id="deliveryCharges"
              value={formData.deliveryCharges}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="deliveryCharges">Security Deposit</Label>
            <Input
              type="number"
              name="securityDeposit"
              id="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="urgentDeliveryCharges">Urgent Delivery Charges</Label>
            <Input
              type="number"
              name="urgentDeliveryCharges"
              id="urgentDeliveryCharges"
              value={formData.urgentDeliveryCharges}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditPricingModal;
