import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AddItemTypesService } from "@/redux/services/masterItemServices";
import { fetchAllMasterItemTypes } from "@/redux/slices/masterItemSlices";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Input, Label, Row } from "reactstrap";

const AddMasterItemForm = () => {
  const dispatch = useAppDispatch();
  const { masterItemTypes } = useAppSelector(
    (state) => state.masterItemTypes.masterItemTypes
  );
  useEffect(() => {
    dispatch(fetchAllMasterItemTypes());
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    uom: "",
    picture: "", // Added picture field
    instructions: "",
    itemType: "",
    price: "",
    addId: "",
    objectType: "string",
  });

  const [errors, setErrors] = useState({
    id: false,
    name: false,
    uom: false,
    picture: false, // Added error state for picture
    instructions: false,
    itemType: false,
    addId: false,
    price: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Convert value to number if type is number
    const newValue =
      type === "number" || name === "itemType" ? Number(value) : value;

    if (type === "number" && typeof newValue === "number" && newValue <= 0) {
      return toast.error("Field value cannot be zero or negative");
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       picture: file,
  //     }));
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       picture: false,
  //     }));
  //   }
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          picture: reader.result as string, // Store base64 string in formData
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          picture: false,
        }));
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      id: !formData.id,
      name: !formData.name,
      uom: !formData.uom,
      picture: !formData.picture, // Check for picture field
      instructions: !formData.instructions,
      itemType: !formData.itemType,
      addId: !formData.addId,
      price: !formData.price,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      const res: any = await AddItemTypesService(formData);

      if (res.data.statusCode != 200) {
        toast.error(res?.data?.message);
      } else {
        toast.success(res.data.message);
        // dispatch(fetchDiscountedVouchers());
        // toggle();
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const itemTypesList =
    masterItemTypes.length > 0 ? (
      masterItemTypes.map((itemType) => (
        <option key={itemType.id} value={itemType.id}>
          {itemType.name}
        </option>
      ))
    ) : (
      <option value="" disabled>
        No Item Types Found
      </option>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="needs-validation custom-input"
      noValidate
    >
      <Row className="mb-3">
        <Col md={6} className="mb-3">
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "is-invalid" : ""}
            required
            placeholder="Name"
          />
          {errors.name && (
            <div className="invalid-feedback">Please enter name</div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <Label for="id">ID</Label>
          <Input
            type="number"
            name="id"
            id="id"
            value={formData.id}
            onChange={handleChange}
            className={errors.id ? "is-invalid" : ""}
            required
            placeholder="ID"
          />
          {errors.id && <div className="invalid-feedback">Please enter ID</div>}
        </Col>

        <Col md={6} className="mb-3">
          <Label for="uom">Unit of Measure</Label>
          <Input
            type="text"
            name="uom"
            id="uom"
            value={formData.uom}
            onChange={handleChange}
            className={errors.uom ? "is-invalid" : ""}
            required
            placeholder="Unit of Measure"
          />
          {errors.uom && (
            <div className="invalid-feedback">Please enter UOM</div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <Label for="picture">Picture</Label>
          <Input
            type="file"
            name="picture"
            id="picture"
            onChange={handleFileChange}
            // className={errors.picture ? "is-invalid" : ""}
          />
          {/* {errors.picture && (
            <div className="invalid-feedback">Please upload a picture</div>
          )} */}
        </Col>

        <Col md={6} className="mb-3">
          <Label for="instructions">Instructions</Label>
          <Input
            type="text"
            name="instructions"
            id="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className={errors.instructions ? "is-invalid" : ""}
            required
            placeholder="Instructions"
          />
          {errors.instructions && (
            <div className="invalid-feedback">Please enter instructions</div>
          )}
        </Col>

        {/* <Col md={6} className="mb-3">
          <Label for="itemType">Item Type</Label>
          <Input
            type="text"
            name="itemType"
            id="itemType"
            value={formData.itemType}
            onChange={handleChange}
            className={errors.itemType ? "is-invalid" : ""}
            required
            placeholder="Item Type"
          />
          {errors.itemType && (
            <div className="invalid-feedback">Please enter item type</div>
          )}
        </Col> */}

        <Col md={6}>
          <Label for="itemType">Item Type</Label>
          <Input
            type="select"
            name="itemType"
            id="itemType"
            value={formData.itemType}
            onChange={handleChange}
            className={errors.itemType ? "is-invalid" : ""}
            required
            placeholder="Choose Item Type"
          >
            <option value="" disabled hidden>
              Choose Item Type
            </option>
            {itemTypesList}
          </Input>
          {errors.itemType && (
            <div className="invalid-feedback">Please select an item type.</div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <Label for="addId">Additional ID</Label>
          <Input
            type="text"
            name="addId"
            id="addId"
            value={formData.addId}
            onChange={handleChange}
            className={errors.addId ? "is-invalid" : ""}
            required
            placeholder="Additional ID"
          />
          {errors.addId && (
            <div className="invalid-feedback">Please enter additional ID</div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <Label for="price">Price</Label>
          <Input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? "is-invalid" : ""}
            required
            placeholder="Price"
          />
          {errors.price && (
            <div className="invalid-feedback">Please enter price</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} className="text-center">
          <Button color="primary" type="submit">
            Add Master Item
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default AddMasterItemForm;
