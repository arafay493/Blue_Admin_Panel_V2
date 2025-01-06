import { useAppSelector } from "@/redux/hooks";
import { updateLocation } from "@/redux/services/generalSetupService";
import React from "react";
import { toast } from "react-toastify";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

const EditLocationModal = ({ isOpen, toggle, locationDetails }) => {
  const [formData, setFormData] = React.useState(locationDetails);
  const { locationType } = useAppSelector((state) => state.locationType);
  const locationTypeArray = locationType.locationTypes;

  const { location } = useAppSelector((state) => state.location);

  React.useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ...locationDetails,
      warehouseType:
        locationDetails.parentID === null || locationDetails.parentID === 0
          ? "Central Hub"
          : "Distributor",
    }));
  }, [locationDetails]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "centralHub") {
        setFormData((prevData) => ({
          ...prevData,
          parentID: null,
          warehouseType: checked ? "Central Hub" : "",
        }));
      } else if (name === "distributor") {
        setFormData((prevData) => ({
          ...prevData,
          parentID: checked ? 1 : "",
          warehouseType: checked ? "Distributor" : "",
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    const updatedLocation = {
      id: formData.id,
      name: formData.name,
      type: formData.type,
      address: formData.address,
      longitude: formData.longitude,
      latitude: formData.latitude,
      city: formData.city,
      province: formData.province,
      objectType: "null",
      parentID: formData.warehouseType === "Central Hub" ? 0 : 1,
    };

    updateLocation(
      updatedLocation.id,
      updatedLocation.name,
      updatedLocation.type,
      updatedLocation.address,
      updatedLocation.longitude,
      updatedLocation.latitude,
      updatedLocation.city,
      updatedLocation.province,
      updatedLocation.objectType,
      updatedLocation.parentID
    )
      .then((response) => {
        toast.success(response.message);
        toggle();
      })
      .catch((error) => {
        console.error("Error updating location:", error);
        toast.error(error.message || "Failed to update location.");
      });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Edit Location</ModalHeader>

      <ModalBody>
        <FormGroup>
          <Label for="name">Location Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="locationType">Location Type</Label>
          <Input
            type="select"
            name="type"
            id="locationType"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select location type</option>
            {locationTypeArray.map((type) => (
              <option key={type.key} value={type.value}>
                {type.value}
              </option>
            ))}
          </Input>
        </FormGroup>

        <Row className="mb-3 mr-2 align-items-center">
          <Col md={4}>
            <Label check for="centralHub">
              <Input
                type="checkbox"
                name="centralHub"
                id="centralHub"
                checked={formData.warehouseType === "Central Hub"}
                onChange={handleChange}
              />
              <span style={{ marginLeft: "8px" }}>Central Hub</span>
            </Label>
          </Col>

          {formData.type === "WH" && (
            <Col md={4}>
              <Label check for="distributor">
                <Input
                  type="checkbox"
                  name="distributor"
                  id="distributor"
                  checked={formData.warehouseType === "Distributor"}
                  onChange={handleChange}
                />
                <span style={{ marginLeft: "8px" }}>Distributor</span>
              </Label>
            </Col>
          )}

          {formData.warehouseType === "Distributor" && (
            <Col md={4}>
              <Input
                type="select"
                name="selectedCentralHub"
                id="selectedCentralHub"
                value={formData.selectedCentralHub}
                onChange={handleChange}
                className="ml-3"
              >
                <option value="" hidden>
                  Select Central Hub
                </option>
                {location?.locationLists
                  .filter((loc) => loc.type === "WH")
                  .map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
              </Input>
            </Col>
          )}
        </Row>

        <FormGroup>
          <Label for="city">City</Label>
          <Input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="province">Province</Label>
          <Input
            type="text"
            name="province"
            id="province"
            value={formData.province}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="latitude">Latitude</Label>
          <Input
            type="number"
            name="latitude"
            id="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="longitude">Longitude</Label>
          <Input
            type="number"
            name="longitude"
            id="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Col className="text-center">
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
  );
};

export default EditLocationModal;
