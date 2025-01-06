// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, Col, Row, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchContactedPersonList,
  fetchDriversList,
  fetchOrderDelivery,
  fetchVehiclesList,
} from "@/redux/slices/customerSlice";
import { submitOrderDeliveryRequest } from "@/redux/services/customerService";
import { info } from "console";
import { fetchUserWarehouseThunk } from "@/redux/slices/administratorSlice";

const OrderDeliveryForm = () => {
  const dispatch = useAppDispatch();
  const { contactedPerson } = useAppSelector(
    (state) => state.contactedPerson.contactedPerson
  );

  const { allCities } = useAppSelector((state) => state.allCities.allCities);
  const { driver } = useAppSelector((state) => state.allDrivers.allDrivers);
  const { vehicles } = useAppSelector((state) => state.allVehicles.allVehicles);

  const { userWarehouses, loading } = useAppSelector(
    (state) => state.administratorReducer.userWarehouse
  );

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedWarehouseId
  );

  const [formData, setFormData] = useState({
    contactPerson: "",
    driver: "",
    vehicle: "",
    warehouse: "",
    transferQuantity: "",
    remarks: "",
  });
  const [errors, setErrors] = useState({
    contactPerson: false,
    driver: false,
    vehicle: false,
    warehouse: false,
    transferQuantity: false,
    remarks: false,
  });

  useEffect(() => {
    dispatch(fetchUserWarehouseThunk());
    dispatch(fetchContactedPersonList(selectedCityId));
  }, [dispatch]);

  useEffect(() => {
    if (formData.contactPerson !== "") {
      dispatch(fetchDriversList(Number(formData.contactPerson)));
      dispatch(fetchVehiclesList(Number(formData.contactPerson)));
    }
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "transferQuantity" && e.target.value < 1) {
      setFormData({
        ...formData,
        transferQuantity: 1,
      });
      toast.error("Transfer Quantity must be greater than or equal to 1.");
    } else {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.name === "contactPerson" ||
          e.target.name === "driver" ||
          e.target.name === "warehouse" ||
          e.target.name === "transferQuantity"
            ? Number(e.target.value)
            : e.target.value,
      });
    }

    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      contactPerson: !formData.contactPerson,
      driver: !formData.driver,
      vehicle: !formData.vehicle,
      warehouse: !formData.warehouse,
      transferQuantity: !formData.transferQuantity,
      remarks: !formData.remarks,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      try {
        const response: any = await submitOrderDeliveryRequest({
          driverId: formData.driver,
          remarks: formData.remarks,
          tranferQuantity: formData.transferQuantity,
          vehicleId: formData.vehicle,
          warehouseLocationId: formData.warehouse,
        });

        if (response.statusCode === 200) {
          toast.success(response.message);
          dispatch(fetchOrderDelivery(selectedCityId));
        } else {
          toast.error(response.message || "Failed to submit delivery request.");
        }

        setFormData({
          contactPerson: "",
          driver: "",
          vehicle: "",
          warehouse: "",
          transferQuantity: "",
          remarks: "",
        });
      } catch (error) {
        toast.error("An error occurred while submitting the delivery request.");
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const conactedPersonsList =
    contactedPerson.length > 0 ? (
      contactedPerson?.map((contactPerson) => (
        <option key={contactPerson?.id} value={contactPerson?.id}>
          {contactPerson.userDetails?.name}
        </option>
      ))
    ) : (
      <option value="" disabled>
        No Contacted Person Found
      </option>
    );

  const allCitiesList =
    allCities.length > 0 ? (
      allCities
        .filter((city) => city.type === "WH")
        .map((filteredCity) => (
          <option key={filteredCity.id} value={filteredCity.id}>
            {filteredCity.name}
          </option>
        ))
    ) : (
      <option value="" disabled>
        No Warehouse Found
      </option>
    );

  const allDrivers =
    driver.length > 0 ? (
      driver
        .filter((driver) => driver?.driverType === "WH")
        .map((filteredDriver) => (
          <option key={filteredDriver.id} value={filteredDriver.id}>
            {filteredDriver.userDetails.name}
          </option>
        ))
    ) : (
      <option value="" disabled>
        No Driver Found
      </option>
    );

  const allVehicles =
    vehicles.length > 0 ? (
      vehicles?.map((vehicle) => (
        <option key={vehicle?.regNo} value={vehicle?.regNo}>
          {vehicle.regNo}
        </option>
      ))
    ) : (
      <option value="" disabled>
        No Vehicles Found
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
          <Label for="contactPerson">Contact Person</Label>
          <Input
            type="select"
            name="contactPerson"
            id="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className={errors.contactPerson ? "is-invalid" : ""}
            required
            placeholder="Choose Contacted Person"
          >
            <option value="" disabled hidden>
              Choose Contacted Person
            </option>
            {conactedPersonsList}
          </Input>
          {errors.contactPerson && (
            <div className="invalid-feedback">Please select a person.</div>
          )}
        </Col>
        <Col md={6}>
          <Label for="driver">Driver</Label>
          <Input
            type="select"
            name="driver"
            id="driver"
            value={formData.driver}
            onChange={handleChange}
            className={errors.driver ? "is-invalid" : ""}
            required
          >
            <option value="" disabled hidden>
              Choose Driver
            </option>
            {allDrivers}
          </Input>
          {errors.driver && (
            <div className="invalid-feedback">Please select a driver.</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="vehicle">Vehicle</Label>
          <Input
            type="select"
            name="vehicle"
            id="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className={errors.vehicle ? "is-invalid" : ""}
            required
          >
            <option value="" disabled hidden>
              Choose Vehicle
            </option>
            {allVehicles}
          </Input>
          {errors.vehicle && (
            <div className="invalid-feedback">Please select a vehicle.</div>
          )}
        </Col>

        <Col md={6}>
          <Label for="vehicle">Warehouse</Label>
          <Input
            type="select"
            name="warehouse"
            id="warehouse"
            value={formData.warehouse}
            onChange={handleChange}
            className={errors.warehouse ? "is-invalid" : ""}
            required
          >
            <option value="" disabled hidden>
              Choose Warehouse
            </option>
            {userWarehouses?.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse?.name}
              </option>
            ))}
          </Input>
          {errors.warehouse && (
            <div className="invalid-feedback">Please select a warehouse.</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Label for="deliveryCharge">Transfer Quantity</Label>
          <Input
            type="number"
            name="transferQuantity"
            id="transferQuantity"
            value={formData.transferQuantity}
            onChange={handleChange}
            className={errors.transferQuantity ? "is-invalid" : ""}
            required
          />
          {errors.transferQuantity && (
            <div className="invalid-feedback">
              Please enter Transfer Quantity.
            </div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Label for="securityDeposit">Remarks</Label>
          <Input
            type="textarea"
            name="remarks"
            id="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className={errors.remarks ? "is-invalid" : ""}
            required
          />
          {errors.remarks && (
            <div className="invalid-feedback">Please enter Remarks.</div>
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

export default OrderDeliveryForm;
