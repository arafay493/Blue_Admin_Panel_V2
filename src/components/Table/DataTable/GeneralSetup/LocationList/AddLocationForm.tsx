// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addLocation,
  fetchAllLocationsByID,
} from "@/redux/services/generalSetupService";
import { fetchRegionManagement } from "@/redux/slices/administratorSlice";
import { fetchLocation } from "@/redux/slices/generalSetupSlice";

const AddLocationForm = () => {
  const dispatch = useAppDispatch();

  // Redux state selectors
  const { locationType } = useAppSelector((state) => state.locationType);
  const locationTypeArray = locationType?.locationTypes || [];
  const { location } = useAppSelector((state) => state.location);
  const { RegionManagement } = useAppSelector(
    (state) => state.regionManagement
  );

  // Initial form state
  const initialFormState = {
    locationType: "",
    name: "",
    address: "",
    city: "",
    cityId: "",
    province: "",
    latitude: "",
    longitude: "",
    objectType: "null",
    centralHub: false,
    distributor: false,
    selectedCentralHub: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({
    locationType: false,
    name: false,
    address: false,
    cityId: false,
    province: false,
  });

  // Fetch region management data on mount
  useEffect(() => {
    dispatch(fetchRegionManagement());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let updatedFormData = { ...formData };

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      updatedFormData[name] = target.checked;

      if (name === "distributor" && target.checked) {
        updatedFormData.centralHub = false;
      } else if (name === "centralHub" && target.checked) {
        updatedFormData.distributor = false;
      }
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
    setErrors({ ...errors, [name]: false });
  };

  const selectedCity = RegionManagement?.regionManagements?.find(
    (region: any) => region.id === Number(formData.cityId)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      locationType: !formData.locationType,
      name: !formData.name,
      address: !formData.address,
      cityId: !formData.cityId,
      province: !formData.province,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const parentID =
      (formData.locationType === "BU" || formData.locationType === "WH") &&
      formData.centralHub
        ? null
        : Number(formData.selectedCentralHub);

    addLocation(
      0,
      formData.name,
      formData.locationType,
      formData.address,
      formData.longitude || "",
      formData.latitude || "",
      Number(formData.cityId),
      selectedCity?.city || "",
      formData.province,
      formData.objectType,
      parentID
    )
      .then((response) => {
        if (response.statusCode === 200) {
          toast.success(response.message);
          setFormData(initialFormState);
          dispatch(fetchLocation());
        } else {
          toast.error(response.message || "Failed to add location.");
        }
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add location.");
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="needs-validation custom-input"
      noValidate
    >
      <Row className="mb-3">
        <Col md={12}>
          <Label for="locationType">Location Type</Label>
          <Input
            type="select"
            name="locationType"
            id="locationType"
            value={formData.locationType}
            onChange={handleChange}
            className={errors.locationType ? "is-invalid" : ""}
            required
          >
            <option value="">Select location type</option>
            {locationTypeArray.map((type: { key: string; value: string }) => (
              <option key={type.key} value={type.value}>
                {type.value}
              </option>
            ))}
          </Input>
          {errors.locationType && (
            <div className="invalid-feedback">
              Please select a Location Type.
            </div>
          )}
        </Col>
      </Row>

      <Row className="mb-3 mr-2 align-items-center">
        <Col md={4}>
          <Label check for="centralHub">
            <Input
              type="checkbox"
              name="centralHub"
              id="centralHub"
              checked={formData.centralHub}
              onChange={handleChange}
            />
            <span style={{ marginLeft: "8px" }}>Central Hub</span>
          </Label>
        </Col>

        {formData.locationType === "WH" && (
          <Col md={4}>
            <Label check for="distributor">
              <Input
                type="checkbox"
                name="distributor"
                id="distributor"
                checked={formData.distributor}
                onChange={handleChange}
              />
              <span style={{ marginLeft: "8px" }}>Distribution</span>
            </Label>
          </Col>
        )}

        {formData.distributor && (
          <Col md={4}>
            <Input
              type="select"
              name="selectedCentralHub"
              id="selectedCentralHub"
              value={formData.selectedCentralHub}
              onChange={handleChange}
              className="ml-3"
            >
              <option value="">Select Central Hub</option>
              {location?.locationLists
                .filter((loc) => loc.type === "WH" && loc.parentID === null)
                .map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
            </Input>
          </Col>
        )}
      </Row>

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
            <div className="invalid-feedback">Please Enter Address.</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="city">City</Label>
          <Input
            type="select"
            name="cityId"
            id="cityId"
            value={formData.cityId}
            onChange={(e) => {
              handleChange(e);
              const selectedCity = RegionManagement?.regionManagements?.find(
                (region: any) => region.id === Number(e.target.value)
              );
              setFormData((prev) => ({
                ...prev,
                city: selectedCity?.city || "",
              }));
            }}
            className={errors.cityId ? "is-invalid" : ""}
            required
          >
            <option value="">Select City</option>
            {RegionManagement?.regionManagements?.map((region: any) => (
              <option key={region.id} value={region.id}>
                {region.city}
              </option>
            ))}
          </Input>
          {errors.cityId && (
            <div className="invalid-feedback">Please select a City.</div>
          )}
        </Col>
        <Col md={6}>
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
            <div className="invalid-feedback">Please Enter Province.</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="latitude">Latitude</Label>
          <Input
            type="number"
            name="latitude"
            id="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
        </Col>
        <Col md={6}>
          <Label for="longitude">Longitude</Label>
          <Input
            type="number"
            name="longitude"
            id="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} className="text-center">
          <Button color="primary" type="submit">
            Add Location
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default AddLocationForm;
