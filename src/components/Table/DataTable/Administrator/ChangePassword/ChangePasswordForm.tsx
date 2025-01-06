import React, { useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { toast } from "react-toastify";
import { changePassword } from "../../../../../redux/services/administratorService";
import { useAppSelector } from "@/redux/hooks";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePasswordForm = () => {
  const initialFormState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { userId: storedUserID } = useAppSelector((state) => state.authreducer);

  const userID = storedUserID;

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      oldPassword: !formData.oldPassword,
      newPassword: !formData.newPassword,
      confirmPassword: !formData.confirmPassword,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      toast.error(
        "Please fill in all required fields and ensure passwords match."
      );
      return;
    }

    try {
      const response = await changePassword(
        userID,
        formData.oldPassword,
        formData.newPassword,
        formData.confirmPassword
      );

      if (response.statusCode === 200) {
        toast.success(response.message || "Password updated successfully.");
        setFormData(initialFormState);
      } else {
        toast.error(response.message || "Failed to update password.");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while updating password."
      );
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="needs-validation custom-input"
        noValidate
      >
        <Row className="mb-3">
          <Col xs={12}>
            <FormGroup>
              <Label className="col-form-label">Old Password</Label>
              <InputGroup>
                <Input
                  type={showPassword.oldPassword ? "text" : "password"}
                  placeholder="*********"
                  onChange={handleChange}
                  value={formData.oldPassword}
                  name="oldPassword"
                  className={errors.oldPassword ? "is-invalid" : ""}
                  required
                />
                <InputGroupText
                  onClick={() => togglePasswordVisibility("oldPassword")}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword.oldPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroupText>
                {errors.oldPassword && (
                  <div className="invalid-feedback">
                    Please enter your old password.
                  </div>
                )}
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <FormGroup>
              <Label className="col-form-label">New Password</Label>
              <InputGroup>
                <Input
                  type={showPassword.newPassword ? "text" : "password"}
                  placeholder="*********"
                  onChange={handleChange}
                  value={formData.newPassword}
                  name="newPassword"
                  className={errors.newPassword ? "is-invalid" : ""}
                  required
                />
                <InputGroupText
                  onClick={() => togglePasswordVisibility("newPassword")}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroupText>
                {errors.newPassword && (
                  <div className="invalid-feedback">
                    {formData.newPassword.length < 6
                      ? "New password must be at least 6 characters long."
                      : "Please enter a new password."}
                  </div>
                )}
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <FormGroup>
              <Label className="col-form-label">Confirm New Password</Label>
              <InputGroup>
                <Input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="*********"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  className={errors.confirmPassword ? "is-invalid" : ""}
                  required
                />
                <InputGroupText
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroupText>
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    Passwords do not match.
                  </div>
                )}
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3 justify-content-center">
          <Col xs={12} className="text-center">
            <Button color="primary" type="submit">
              Update Password
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default ChangePasswordForm;
