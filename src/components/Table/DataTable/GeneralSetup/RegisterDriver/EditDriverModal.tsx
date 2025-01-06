// EditDriverModal.tsx
import { Driver } from "@/redux/models/generalSetupTypes";
import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
  InputGroup,
  InputGroupText,
  Col,
} from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateDriver } from "@/redux/services/generalSetupService";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";

interface EditDriverModalProps {
  isOpen: boolean;
  toggle: () => void;
  driverData: Driver | null;
  onSave: (updatedDriver: Driver) => void;
}

const EditDriverModal: React.FC<EditDriverModalProps> = ({
  isOpen,
  toggle,
  driverData,
  onSave,
}) => {
  const [editData, setEditData] = useState<Driver | null>(driverData);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (driverData) {
      setEditData({
        ...driverData,
        cnicexpiry: driverData.cnicexpiry
          ? moment(driverData.cnicexpiry).format("DD/MM/YYYY")
          : "",
        licExpiry: driverData.licExpiry
          ? moment(driverData.licExpiry).format("DD/MM/YYYY")
          : "",
      });
    }
  }, [driverData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editData) {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleSave = () => {
    if (editData) {
      updateDriver(
        editData.id,
        editData.email,
        editData.name,
        editData.password,
        editData.isActive,
        editData.mobile,
        editData.phone,
        editData.email,
        editData.contractorCode,
        editData.contactPersonId,
        editData.mobile2,
        editData.cnic,
        moment(editData.cnicexpiry, "DD/MM/YYYY").toISOString(),
        editData.licNo,
        moment(editData.licExpiry, "DD/MM/YYYY").toISOString(),
        editData.address,
        editData.driverType
      )
        .then((response) => {
          toast.success(response.message);
          onSave(editData);
          toggle();
        })
        .catch((error) => {
          toast.error(error.message || "Failed to update driver.");
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Driver</ModalHeader>
      <ModalBody>
        <div className="mb-3">
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            value={editData?.name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <Label for="email">Email:</Label>
          <Input
            type="email"
            name="email"
            value={editData?.email || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <Label for="password">Password:</Label>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={editData?.password || ""}
              onChange={handleChange}
            />
            <InputGroupText
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroupText>
          </InputGroup>
        </div>

        <div className="mb-3">
          <Label for="phone">Phone:</Label>
          <Input
            type="text"
            name="phone"
            value={editData?.phone || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <Label for="mobile1">Mobile 1:</Label>
          <Input
            type="text"
            name="mobile1"
            value={editData?.mobile || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <Label for="mobile2">Mobile 2:</Label>
          <Input
            type="text"
            name="mobile2"
            value={editData?.mobile2 || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <Label for="cnic">CNIC:</Label>
          <Input
            type="text"
            name="cnic"
            value={editData?.cnic || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <Label for="cnicExpiry">CNIC Expiry Date:</Label>
          <Input
            type="text"
            name="cnicExpiry"
            value={editData?.cnicexpiry || ""}
            onChange={handleChange}
            placeholder="DD/MM/YYYY"
          />
        </div>

        <div className="mb-3">
          <Label for="licenseNumber">License Number:</Label>
          <Input
            type="text"
            name="licenseNumber"
            value={editData?.licNo || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <Label for="licenseExpiry">License Expiry Date:</Label>
          <Input
            type="text"
            name="licenseExpiry"
            value={editData?.licExpiry || ""}
            onChange={handleChange}
            placeholder="DD/MM/YYYY"
          />
        </div>

        <div className="mb-3">
          <Label for="address">Address:</Label>
          <Input
            type="textarea"
            name="address"
            value={editData?.address || ""}
            onChange={handleChange}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Col className="text-center">
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </Col>
        {/* <Button color="danger" onClick={toggle}>
          Cancel
        </Button> */}
      </ModalFooter>
    </Modal>
  );
};

export default EditDriverModal;
