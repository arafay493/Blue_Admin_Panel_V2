import React, { useEffect, useState } from "react";
import { Button, Col, Row, Input, Label, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addContractor } from "@/redux/services/generalSetupService";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchUserListType,
  fetchUserWarehouseThunk,
} from "@/redux/slices/administratorSlice";
import { fetchCitiesList } from "@/redux/slices/customerSlice";
import { fetchContractor } from "@/redux/slices/generalSetupSlice";

// Define the type for the form data
interface FormData {
  name: string;
  code: string;
  email: string;
  password: string;
  mobileNumber: string;
  secondMobileNumber: string;
  phoneNumber: string;
  userActive: boolean;
  selectedWarehouses: number[];
}

// Define the type for the errors
interface FormErrors {
  name: boolean;
  code: boolean;
  email: boolean;
  password: boolean;
  mobileNumber: boolean;
  secondMobileNumber: boolean;
  phoneNumber: boolean;
}

const RegisterContractorForm = () => {
  const initialFormState: FormData = {
    name: "",
    code: "",
    email: "",
    password: "",
    mobileNumber: "",
    secondMobileNumber: "",
    phoneNumber: "",
    userActive: true,
    selectedWarehouses: [],
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({
    name: false,
    code: false,
    email: false,
    password: false,
    mobileNumber: false,
    secondMobileNumber: false,
    phoneNumber: false,
  });

  const dispatch = useAppDispatch();

  const { allCities } = useAppSelector((state) => state.customerSlice);
  const warehouseCities = allCities?.allCities?.filter(
    (city) => city.type === "WH"
  );

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedWarehouseId
  );

  useEffect(() => {
    dispatch(fetchUserWarehouseThunk());
    dispatch(fetchCitiesList());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox =
      e.target instanceof HTMLInputElement && type === "checkbox";

    // Trim whitespace for the 'name' field
    const trimmedValue = name === "name" ? value.trim() : value;

    // Prevent non-numeric input for phone numbers
    if (
      (name === "mobileNumber" ||
        name === "secondMobileNumber" ||
        name === "phoneNumber") &&
      /\D/.test(value)
    ) {
      return;
    }

    setFormData({
      ...formData,
      [name]: isCheckbox
        ? (e.target as HTMLInputElement).checked
        : trimmedValue,
    });

    setErrors({
      ...errors,
      [name]: false,
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

    const newErrors: FormErrors = {
      name: !formData.name,
      code: !formData.code,
      email: !formData.email,
      password: !formData.password,
      mobileNumber:
        !formData.mobileNumber || formData.mobileNumber.length !== 11,
      secondMobileNumber:
        !formData.secondMobileNumber ||
        formData.secondMobileNumber.length !== 11,
      phoneNumber: !formData.phoneNumber || formData.phoneNumber.length !== 11,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (formData.selectedWarehouses.length === 0) {
      toast.error("Please select at least one warehouse.");
      return;
    }

    try {
      const response = await addContractor(
        formData.email,
        formData.name,
        formData.code,
        formData.password,
        formData.mobileNumber,
        formData.secondMobileNumber,
        formData.phoneNumber,
        formData.email,
        formData.userActive,
        formData.selectedWarehouses
      );

      if (response.statusCode === 200) {
        toast.success(
          response.message || "Contractor registered successfully!"
        );
        setFormData(initialFormState);
        dispatch(fetchContractor(selectedCityId));
      } else {
        toast.error(response.message || "Failed to register contractor.");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
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
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "is-invalid" : ""}
            required
          />
          {errors.name && (
            <div className="invalid-feedback">Enter Contractor Name</div>
          )}
        </Col>
        <Col md={6}>
          <Label for="code">Code</Label>
          <Input
            type="text"
            name="code"
            id="code"
            value={formData.code}
            onChange={handleChange}
            className={errors.code ? "is-invalid" : ""}
            required
          />
          {errors.code && (
            <div className="invalid-feedback">Enter Contractor Code </div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
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
            <div className="invalid-feedback">Enter Contractor Email</div>
          )}
        </Col>
        <Col md={6}>
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
            <div className="invalid-feedback">Enter Contractor Password</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="mobileNumber">Mobile Number</Label>
          <Input
            type="text"
            name="mobileNumber"
            id="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className={errors.mobileNumber ? "is-invalid" : ""}
            required
            maxLength={11}
            pattern="\d{11}"
          />
          {errors.mobileNumber && (
            <div className="invalid-feedback">
              Phone Number should be 11 digits
            </div>
          )}
        </Col>
        <Col md={6}>
          <Label for="secondMobileNumber">Second Mobile Number</Label>
          <Input
            type="text"
            name="secondMobileNumber"
            id="secondMobileNumber"
            value={formData.secondMobileNumber}
            onChange={handleChange}
            className={errors.secondMobileNumber ? "is-invalid" : ""}
            required
            maxLength={11}
            pattern="\d{11}"
          />
          {errors.secondMobileNumber && (
            <div className="invalid-feedback">
              Phone Number should be 11 digits
            </div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="phoneNumber">Phone Number</Label>
          <Input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={errors.phoneNumber ? "is-invalid" : ""}
            required
            maxLength={11}
            pattern="\d{11}"
          />
          {errors.phoneNumber && (
            <div className="invalid-feedback">
              Phone Number should be 11 digits
            </div>
          )}
        </Col>

        <Col md={6} className="d-flex align-items-center">
          <Input
            type="checkbox"
            name="userActive"
            id="userActive"
            checked={formData.userActive}
            onChange={handleChange}
          />
          <Label for="userActive" className="ms-2">
            User Active
          </Label>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Label>Select Warehouses</Label>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {warehouseCities.map((city) => (
              <FormGroup check key={city.id}>
                <input
                  type="checkbox"
                  name="selectedWarehouses"
                  value={city.id}
                  onChange={handleWarehouseChange}
                  checked={formData.selectedWarehouses.includes(city.id)}
                  style={{ accentColor: "#0A80BF", marginRight: "5px" }}
                />
                <Label check>{city.name}</Label>
              </FormGroup>
            ))}
          </div>
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

export default RegisterContractorForm;
