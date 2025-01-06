// @ts-nocheck
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Row,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import { MaterialReactTable } from "material-react-table";
import { toast } from "react-toastify";
import { addContactPerson } from "@/redux/services/generalSetupService";
import { fetchUserWarehouseThunk } from "@/redux/slices/administratorSlice";
import contactPersonColumns from "./contactPersonColumns";
import IconButton from "@mui/material/IconButton";
import { X } from "react-feather";

interface AddContactModalProps {
  isOpen: boolean;
  toggle: () => void;
  contractorCode: string; // Add contractorCode prop
}

const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  toggle,
  contractorCode, // Destructure contractorCode prop
}) => {
  const dispatch = useAppDispatch();
  const { contractorById } = useAppSelector((state) => state.contractorById);
  const contactPer = contractorById?.contractorById?.contactPersons || [];
  const { userWarehouses } = useAppSelector(
    (state) => state.administratorReducer.userWarehouse
  );

  const initialFormData = {
    contractorName: "",
    contractorCode: contractorCode || "", // Use contractorCode prop
    mobile: "",
    secondMobile: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
    city: "",
    province: "",
    latitude: "",
    longitude: "",
    mobile2: "",
    selectedWarehouses: [],
  };

  const initialErrors = {
    contractorName: false,
    contractorCode: false,
    mobile: false,
    secondMobile: false,
    email: false,
    phoneNumber: false,
    password: false,
    address: false,
    city: false,
    province: false,
    latitude: false,
    longitude: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    dispatch(fetchUserWarehouseThunk());
  }, [dispatch]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      contractorCode: contractorCode,
    }));
  }, [contractorCode]);

  const handleEdit = (contact) => {
    console.log(contact);
  };

  const columns = useMemo(() => contactPersonColumns(handleEdit), [contactPer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (
      (name === "mobile" ||
        name === "secondMobile" ||
        name === "phoneNumber") &&
      /\D/.test(value)
    ) {
      return;
    }

    setFormData({ ...formData, [name]: value });

    setErrors({
      ...errors,
      [name]:
        name === "mobile" || name === "secondMobile" || name === "phoneNumber"
          ? value.length !== 11
          : !value,
    });
  };

  const handleWarehouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    const warehouseId = parseInt(value, 10);

    setFormData((prev) => {
      const selectedWarehouses = checked
        ? [...prev.selectedWarehouses, warehouseId]
        : prev.selectedWarehouses.filter((id) => id !== warehouseId);

      return { ...prev, selectedWarehouses };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      contractorName: !formData.contractorName,
      contractorCode: !formData.contractorCode,
      mobile: !formData.mobile,
      secondMobile: !formData.secondMobile,
      email: !formData.email,
      phoneNumber: !formData.phoneNumber,
      password: !formData.password,
      address: !formData.address,
      city: !formData.city,
      province: !formData.province,
      // latitude: !formData.latitude,
      // longitude: !formData.longitude,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const response = await addContactPerson(
        formData.email,
        formData.contractorName,
        formData.password,
        true, // Defaulting isActive to true
        formData.mobile,
        formData.secondMobile,
        formData.phoneNumber,
        formData.email,
        formData.contractorCode,
        formData.address,
        formData.latitude,
        formData.longitude,
        formData.city,
        formData.province,
        formData.selectedWarehouses, // Pass selected warehouses
        []
      );

      if (response.statusCode === 200) {
        toast.success(response.message || "Contact added successfully!");
        setFormData(initialFormData);
        toggle(); // Assuming toggle closes the form modal or some UI element
      } else {
        toast.error(response.message || "Failed to add contact person.");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  const handleToggle = () => {
    toggle(); // Close the modal
    setFormData(initialFormData); // Reset the form fields
    setErrors(initialErrors); // Reset the errors
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={handleToggle} size="lg">
        <ModalHeader toggle={handleToggle}>Add Contact Person</ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit} noValidate>
            <Row className="mb-3">
              <Col md={4}>
                <Label for="contractorName">Contact Person</Label>
                <Input
                  type="text"
                  name="contractorName"
                  id="contractorName"
                  value={formData.contractorName}
                  onChange={handleChange}
                  className={errors.contractorName ? "is-invalid" : ""}
                  required
                />
                {errors.contractorName && (
                  <div className="invalid-feedback">
                    Please enter a contractor name.
                  </div>
                )}
              </Col>
              <Col md={4}>
                <Label for="contractorCode">Contractor Code</Label>
                <Input
                  type="text"
                  name="contractorCode"
                  id="contractorCode"
                  value={formData.contractorCode}
                  onChange={handleChange}
                  required
                  disabled
                />
              </Col>
              <Col md={4}>
                <Label for="mobile">Mobile</Label>
                <Input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={errors.mobile ? "is-invalid" : ""}
                  maxLength={11}
                  pattern="\d{11}"
                  required
                />
                {errors.mobile && (
                  <div className="invalid-feedback">
                    Please enter an 11-digit mobile number.
                  </div>
                )}
              </Col>
              <Col md={4}>
                <Label for="secondMobile">Second Mobile</Label>
                <Input
                  type="tel"
                  name="secondMobile"
                  id="secondMobile"
                  value={formData.secondMobile}
                  onChange={handleChange}
                  className={errors.secondMobile ? "is-invalid" : ""}
                  maxLength={11}
                  pattern="\d{11}"
                />
                {errors.secondMobile && (
                  <div className="invalid-feedback">
                    Please enter an 11-digit second mobile number.
                  </div>
                )}
              </Col>
              <Col md={4}>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "is-invalid" : ""}
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    Please enter a valid email.
                  </div>
                )}
              </Col>
              <Col md={4}>
                <Label for="phoneNumber">Phone Number</Label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={errors.phoneNumber ? "is-invalid" : ""}
                  maxLength={11}
                  pattern="\d{11}"
                  required
                />
                {errors.phoneNumber && (
                  <div className="invalid-feedback">
                    Please enter an 11-digit phone number.
                  </div>
                )}
              </Col>
              <Col md={4}>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "is-invalid" : ""}
                  required
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    Please enter a password.
                  </div>
                )}
              </Col>
              <Col md={4}>
                <Label for="address">Address</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "is-invalid" : ""}
                  required
                />
                {errors.address && (
                  <div className="invalid-feedback">
                    Please enter an address.
                  </div>
                )}
              </Col>
              <Col md={4}>
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
                  <div className="invalid-feedback">Please enter a city.</div>
                )}
              </Col>
              <Col md={4}>
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
                  <div className="invalid-feedback">
                    Please enter a province.
                  </div>
                )}
              </Col>
              <Col md={4}>
                <Label for="latitude">Latitude</Label>
                <Input
                  type="text"
                  name="latitude"
                  id="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  // className={errors.latitude ? "is-invalid" : ""}
                  // required
                />
                {/* {errors.latitude && (
                  <div className="invalid-feedback">Please enter latitude.</div>
                )} */}
              </Col>
              <Col md={4}>
                <Label for="longitude">Longitude</Label>
                <Input
                  type="text"
                  name="longitude"
                  id="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  // className={errors.longitude ? "is-invalid" : ""}
                  // required
                />
                {/* {errors.longitude && (
                  <div className="invalid-feedback">
                    Please enter a longitude.
                  </div>
                )} */}
              </Col>
              <Col md={12} className="mt-3">
                <Label>Select Warehouses</Label>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {userWarehouses.map((warehouse) => (
                    <FormGroup check key={warehouse.id}>
                      <Label check>
                        <input
                          type="checkbox"
                          value={warehouse.id}
                          onChange={handleWarehouseChange}
                          checked={formData.selectedWarehouses.includes(
                            warehouse.id
                          )}
                          style={{ accentColor: "#0A80BF", marginRight: "5px" }}
                        />
                        {warehouse.name}
                      </Label>
                    </FormGroup>
                  ))}
                </div>
              </Col>
            </Row>
          </form>

          <Col xs={12} className="text-center">
            <Button color="primary" onClick={handleSubmit} className="mb-3">
              Add Contact Person
            </Button>
          </Col>

          <MaterialReactTable columns={columns} data={contactPer} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddContactModal;
