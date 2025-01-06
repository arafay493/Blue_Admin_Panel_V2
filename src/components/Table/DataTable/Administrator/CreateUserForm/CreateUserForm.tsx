import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  Label,
  FormGroup,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser } from "@/redux/services/administratorService";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUserListType } from "@/redux/slices/administratorSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { fetchCitiesList } from "@/redux/slices/customerSlice";

const CreateUserFormComponent = () => {
  const initialFormState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    mobile: "",
    mobile2: "",
    userType: "",
    isActive: true,
    selectedWarehouses: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    phone: false,
    mobile: false,
    mobile2: false,
    userType: false,
  });

  const { allCities } = useAppSelector((state) => state.customerSlice);
  const warehouseCities =
    allCities?.allCities?.filter((city) => city.type === "WH") || [];

  const { userTypeList } = useAppSelector((state) => state.userTypeList);
  const userTypeListOptions = userTypeList?.addUserTypeList || [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserListType());
    dispatch(fetchCitiesList());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isValidPhoneNumber = /^[0-9]{11}$/;

    if (["phone", "mobile", "mobile2"].includes(name)) {
      setErrors((prev) => ({
        ...prev,
        [name]: !isValidPhoneNumber.test(value),
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      name: !formData.name,
      email: !formData.email,
      password: !formData.password,
      phone: !formData.phone,
      mobile: !formData.mobile,
      mobile2: !formData.mobile2,
      userType: !formData.userType,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.selectedWarehouses.length === 0) {
      toast.error("Please select at least one warehouse.");
      return;
    }

    try {
      const result = await addUser(
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
        formData.mobile,
        formData.mobile2,
        formData.userType,
        formData.isActive,
        formData.email,
        formData.selectedWarehouses
      );

      if (result.statusCode === 200) {
        toast.success(result.message);
        setFormData(initialFormState);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add user.");
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
            <div className="invalid-feedback">Please Enter Name.</div>
          )}
        </Col>

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
            <div className="invalid-feedback">Please Enter Email.</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="password">Password</Label>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "is-invalid" : ""}
              required
            />
            <InputGroupText onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroupText>
          </InputGroup>
          {errors.password && (
            <div className="invalid-feedback">Please Enter Password.</div>
          )}
        </Col>

        <Col md={6}>
          <Label for="phone">Phone Number</Label>
          <Input
            type="number"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange(e)}
            maxLength={11}
            pattern="^\d{11}$"
            className={errors.phone ? "is-invalid" : ""}
            required
          />
          {errors.phone && (
            <div className="invalid-feedback">
              Please enter a valid 11-digit phone number.
            </div>
          )}
        </Col>
      </Row>

      {/* Mobile numbers */}
      <Row className="mb-3">
        <Col md={6}>
          <Label for="mobile">Mobile Number</Label>
          <Input
            type="number"
            name="mobile"
            id="mobile"
            value={formData.mobile}
            onChange={(e) => handleChange(e)}
            maxLength={11}
            pattern="^\d{11}$"
            className={errors.mobile ? "is-invalid" : ""}
            required
          />
          {errors.mobile && (
            <div className="invalid-feedback">
              Please enter a valid 11-digit mobile number.
            </div>
          )}
        </Col>

        <Col md={6}>
          <Label for="mobile2">Second Mobile Number</Label>
          <Input
            type="number"
            name="mobile2"
            id="mobile2"
            value={formData.mobile2}
            onChange={(e) => handleChange(e)}
            maxLength={11}
            pattern="^\d{11}$"
            className={errors.mobile2 ? "is-invalid" : ""}
            required
          />
          {errors.mobile2 && (
            <div className="invalid-feedback">
              Please enter a valid 11-digit second mobile number.
            </div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="userType">User Type</Label>
          <Input
            type="select"
            name="userType"
            id="userType"
            value={formData.userType}
            onChange={handleChange}
            className={errors.userType ? "is-invalid" : ""}
            required
          >
            <option value="">Select User Type</option>
            {userTypeListOptions.map((type: any, index: number) => (
              <option key={index} value={type.key}>
                {type.value}
              </option>
            ))}
          </Input>
          {errors.userType && (
            <div className="invalid-feedback">Please Select User Type.</div>
          )}
        </Col>
      </Row>

      <Col md={6} className="d-flex flex-column mt-4">
        <FormGroup check className="d-flex align-items-center">
          <Input
            type="checkbox"
            name="userActive"
            id="userActive"
            checked={true}
            disabled={true}
            className="me-2 mb-3"
          />
          <Label for="userActive" check>
            User Active
          </Label>
        </FormGroup>
      </Col>

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

export default CreateUserFormComponent;
