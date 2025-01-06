import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchOrderDelivery } from "@/redux/slices/customerSlice";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Row } from "reactstrap";
import Select from "react-select";

const Form = ({
  onSelectConsignment,
}: {
  onSelectConsignment: (id: number) => void;
}) => {
  const [formData, setFormData] = useState({
    consignmentNumber: "",
  });

  const [errors, setErrors] = useState({
    consignmentNumber: false,
  });

  const handleChange = (selectedOption: any) => {
    setFormData({
      ...formData,
      consignmentNumber: selectedOption ? selectedOption.value : "",
    });

    setErrors({
      ...errors,
      consignmentNumber: false,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      consignmentNumber: !formData.consignmentNumber,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const selectedId = Number(formData.consignmentNumber);

    onSelectConsignment(selectedId);

    toast.success("Consignment selected successfully!");
  };

  const dispatch = useAppDispatch();

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedWarehouseId
  );

  useEffect(() => {
    dispatch(fetchOrderDelivery(selectedCityId));
  }, [dispatch]);

  const { orderDelivery } = useAppSelector((state) => state.orderDelivery);

  const NewallOrderDeliveryList = Array.isArray(orderDelivery?.orderDelivery)
    ? orderDelivery.orderDelivery.map((item) => ({
        value: String(item.id),
        label: String(item.id),
      }))
    : [];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={12}>
            <Select
              name="consignmentNumber"
              id="consignmentNumber"
              value={NewallOrderDeliveryList.find(
                (option) => option.value === formData.consignmentNumber
              )}
              onChange={handleChange}
              options={NewallOrderDeliveryList}
              className={errors.consignmentNumber ? "is-invalid" : ""}
              isClearable
              isSearchable
              placeholder="Choose Consignment Number..."
              required
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                  position: "absolute",
                  width: "100%",
                  backgroundColor: "white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "white",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }),
              }}
            />
            {errors.consignmentNumber && (
              <div className="invalid-feedback">
                Please select a valid consignment number.
              </div>
            )}
          </Col>
        </Row>

        <Col className="text-center">
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
      </form>
    </div>
  );
};

export default Form;
