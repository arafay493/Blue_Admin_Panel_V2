import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ListSingleItemTypesService,
  UpdateSingleItemTypesService,
} from "@/redux/services/masterItemServices";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAllMasterItemTypes,
  fetchSingleItemTypes,
} from "@/redux/slices/masterItemSlices";

interface Details {
  id: number;
  name: string;
  uom: string;
  picture: string;
  instructions: string;
  itemType: number;
  price: number;
  addId: string;
  objectType: string;
}

interface EditModalProps {
  isOpen: boolean;
  toggle: () => void;
  details: Details;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, toggle, details }) => {
  const dispatch = useAppDispatch();
  const itemType: any = useAppSelector(
    (state) => state?.singleItemTypes?.itemTypes?.itemTypes[0]
  );
  const { masterItemTypes } = useAppSelector(
    (state) => state.masterItemTypes.masterItemTypes
  );
  useEffect(() => {
    dispatch(fetchSingleItemTypes(details.id));
    dispatch(fetchAllMasterItemTypes());
  }, []);
  const [formData, setFormData] = useState({
    id: itemType?.id,
    name: itemType?.name,
    uom: itemType?.uom,
    picture: itemType?.picture,
    instructions: itemType?.instructions,
    itemType: itemType?.itemType,
    price: Number(itemType?.price),
    addId: itemType?.addId,
    objectType: "string",
  });

  const [errors, setErrors] = useState({
    id: false,
    name: false,
    uom: false,
    // picture: false,
    instructions: false,
    itemType: false,
    price: false,
    addId: false,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      id: !formData.id,
      name: !formData.name,
      uom: !formData.uom,
      // picture: !formData.picture,
      instructions: !formData.instructions,
      itemType: !formData.itemType,
      price: !formData.price,
      addId: !formData.addId,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      const res: any = await UpdateSingleItemTypesService(formData);

      if (res.status != 200) {
        toast.error(res?.message);
      } else {
        toast.success(res.message);
        toggle();
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const itemTypesList =
    masterItemTypes.length > 0 ? (
      masterItemTypes.map((itemType: any, index) => (
        <option key={index} value={itemType.id}>
          {itemType.name}
        </option>
      ))
    ) : (
      <option value="" disabled>
        No Item Types Found
      </option>
    );
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Update Master Item</ModalHeader>
      <ModalBody>
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
              {errors.id && (
                <div className="invalid-feedback">Please enter ID</div>
              )}
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

            {/* <Col md={6} className="mb-3">
              <Label for="picture">Picture URL</Label>
              <Input
                type="text"
                name="picture"
                id="picture"
                value={formData.picture}
                onChange={handleChange}
                className={errors.picture ? "is-invalid" : ""}
                required
                placeholder="Picture URL"
              />
              {errors.picture && (
                <div className="invalid-feedback">Please enter picture URL</div>
              )}
            </Col> */}

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
                <div className="invalid-feedback">
                  Please enter instructions
                </div>
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
                <div className="invalid-feedback">
                  Please select an item type.
                </div>
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
                <div className="invalid-feedback">
                  Please enter additional ID
                </div>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} className="text-center">
              <Button color="primary" type="submit">
                Update
              </Button>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default EditModal;
