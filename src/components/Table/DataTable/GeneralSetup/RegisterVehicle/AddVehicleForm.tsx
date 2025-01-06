// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addVehicle } from "@/redux/services/generalSetupService";
import {
  fetchContractor,
  fetchContractorById,
  fetchVehcile,
} from "@/redux/slices/generalSetupSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const AddVehicleForm = () => {
  const dispatch = useAppDispatch();

  const { contractor } = useAppSelector((state) => state.contractor);

  const { contractorById } = useAppSelector((state) => state.contractorById);

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedWarehouseId
  );
  const initialFormState = {
    RegNo: "",
    capacity: "",
    contractorCode: "",
    contactPersonId: "",
    objectType: "",
  };

  useEffect(() => {
    dispatch(fetchContractor(selectedCityId));
  }, [dispatch, selectedCityId]);

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({
    RegNo: false,
    capacity: false,
    contractorCode: false,
    contactPersonId: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "contractorCode") {
      setFormData({
        ...formData,
        [name]: value,
        contactPersonId: "",
      });

      dispatch(fetchContractorById(value));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  useEffect(() => {
    if (contractorById) {
      setFormData((prev) => ({
        ...prev,
        contactPersonId: "",
      }));
    }
  }, [contractorById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      RegNo: !formData.RegNo,
      capacity: !formData.capacity,
      contractorCode: !formData.contractorCode,
      contactPersonId: !formData.contactPersonId,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const { message, statusCode } = await addVehicle(
        formData.RegNo,
        formData.contractorCode,
        Number(formData.contactPersonId),
        formData.capacity,
        formData.objectType
      );

      if (statusCode === 200) {
        toast.success(message || "Vehicle added successfully!");
        setFormData(initialFormState);
        dispatch(fetchVehcile(selectedCityId));
      } else {
        toast.error(message || "Failed to add vehicle.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add vehicle.");
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
          <Label for="RegNo">Registration Number</Label>
          <Input
            type="text"
            name="RegNo"
            id="RegNo"
            value={formData.RegNo}
            onChange={handleChange}
            className={errors.RegNo ? "is-invalid" : ""}
            required
          />
          {errors.RegNo && (
            <div className="invalid-feedback">
              Please Enter Registration Number.
            </div>
          )}
        </Col>
        <Col md={6}>
          <Label for="capacity">Capacity</Label>
          <Input
            type="number"
            name="capacity"
            id="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className={errors.capacity ? "is-invalid" : ""}
            required
          />
          {errors.capacity && (
            <div className="invalid-feedback">Please Enter Capacity.</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="contractorCode">Contractor</Label>
          <Input
            type="select"
            name="contractorCode"
            id="contractorCode"
            value={formData.contractorCode}
            onChange={handleChange}
            className={errors.contractorCode ? "is-invalid" : ""}
            required
          >
            <option value="" disabled>
              Select a contractor
            </option>
            {contractor.contractors.map((contractor) => (
              <option key={contractor.id} value={contractor.code}>
                {contractor.name}
              </option>
            ))}
          </Input>
          {errors.contractorCode && (
            <div className="invalid-feedback">Please Select a Contractor.</div>
          )}
        </Col>
        <Col md={6}>
          <Label for="contactPersonId">Contact Person</Label>
          <Input
            type="select"
            name="contactPersonId"
            id="contactPersonId"
            value={formData.contactPersonId}
            onChange={handleChange}
            className={errors.contactPersonId ? "is-invalid" : ""}
            required
          >
            <option value="" disabled hidden>
              Select a contact person
            </option>
            {contractorById &&
            contractorById.contractorById.contactPersons &&
            contractorById.contractorById.contactPersons.length > 0 ? (
              contractorById.contractorById.contactPersons.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No contact persons available
              </option>
            )}
          </Input>
          {errors.contactPersonId && (
            <div className="invalid-feedback">
              Please Select a Contact Person.
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

export default AddVehicleForm;
