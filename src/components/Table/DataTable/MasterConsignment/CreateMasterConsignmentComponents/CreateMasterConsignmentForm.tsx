// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, Col, Row, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCitiesList,
  fetchContactedPersonList,
} from "@/redux/slices/customerSlice";
import { submitOrderDeliveryRequest } from "@/redux/services/customerService";
import { info } from "console";
import {
  fetchAllContractors,
  fetchAllDrivers,
  fetchAllMasterConsignment,
  fetchAllVehicles,
  fetchListAllLocations,
} from "@/redux/slices/masterConsignmentSlice";
import {
  CreateMasterConsignmentService,
  ListAllContractorsService,
} from "@/redux/services/masterConsignmentService";
import { fetchAllItemTypes } from "@/redux/slices/masterItemSlices";
import { Box, IconButton, Stack } from "@mui/material";
import { Plus, Trash } from "react-feather";

const CreateMasterConsignmentForm = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    ListAllContractorsService();
    dispatch(fetchListAllLocations());
    dispatch(fetchAllContractors());
    dispatch(fetchAllItemTypes());
    dispatch(fetchCitiesList());
  }, []);
  const {
    allLocations,
    allContractors,
    allDrivers,
    allVehicles,
  } = useAppSelector((state) => state.masterConsignmentReducer);

  const { itemTypes } = useAppSelector(
    (state) => state.masterItemTypes.itemTypes
  );

  const { allCities } = useAppSelector((state) => state.allCities.allCities);

  const [locationToListData, setLocationToListData] = useState([]);
  const [formData, setFormData] = useState({
    locationFrom: "",
    transferDate: "",
    remarks: "",
    contractor: "",
    driver: "",
    vehicle: "",
    subDocs: [],
  });
  const [errors, setErrors] = useState({
    locationFrom: false,
    transferDate: false,
    remarks: false,
    contractor: false,
    driver: false,
    vehicle: false,
    itemId: false,
    locationTo: false,
    filledQuantity: false,
    emptyQuantity: false,
  });
  const [rowAdd, setRowAdd] = useState([]);

  useEffect(() => {
    if (formData.contractor !== "") {
      dispatch(fetchAllDrivers(formData.contractor));
      dispatch(fetchAllVehicles(formData.contractor));
    }
  }, [formData]);

  const handleRowAdd = () => {
    const maxId =
      formData.subDocs?.reduce((max, doc) => Math.max(max, doc.id), 0) || 0;
    const newId = maxId + 1;
    const filledDoc = {
      id: newId,
      filledQuantity: 0,
      emptyQuantity: 0,
      locId: "",
      type: "In",
      itemStatusWill: "Filled",
      qty: 0,
      itemId: "",
      barcodesDetails: [],
    };
    const emptyDoc = {
      id: newId,
      locId: "",
      filledQuantity: 0,
      emptyQuantity: 0,
      type: "Out",
      itemStatusWill: "Empty",
      qty: 0,
      itemId: "",
      barcodesDetails: [],
    };
    setFormData({
      ...formData,
      subDocs: [...formData.subDocs, filledDoc, emptyDoc],
    });
  };

  const handleRowDelete = (id: number) => {
    setFormData({
      ...formData,
      subDocs: formData.subDocs.filter((doc) => doc.id !== id),
    });
  };

  const allCitiesList = allCities
    .filter((city) => city?.parentID == null)
    .map((city) => (
      <option key={city?.id} value={city?.id}>
        {city.name}
      </option>
    ));

  const allContractorsList = allContractors?.allContractors?.map(
    (contractor) => (
      <option key={contractor?.key} value={contractor?.key}>
        {contractor.value}
      </option>
    )
  );

  const transformFormDataToPayload = (formData) => {
    // Filter out subDocs with qty == 0
    const filteredSubDocs = formData.subDocs.filter((subDoc) => {
      const qty =
        subDoc.itemStatusWill === "Filled"
          ? subDoc.filledQuantity
          : subDoc.emptyQuantity;
      return qty > 0; // Include only subDocs with qty > 0
    });

    const allBarcodesFilled = filteredSubDocs.every(
      (row) => row?.barcodesDetails !== null
    );

    let statusCheck;
    if (allBarcodesFilled) {
      statusCheck = "Draft";
    } else {
      statusCheck =
        !formData.contractor || !formData.driver || !formData.vehicle
          ? "Unassigned"
          : "Draft";
    }

    const transformedSubDocs = filteredSubDocs.map((subDoc) => ({
      id: subDoc.id.toString(),
      locId: Number(subDoc.locationTo) || 0,
      type: subDoc.type,
      itemStatusWill: subDoc.itemStatusWill,
      qty:
        subDoc.itemStatusWill === "Filled"
          ? subDoc.filledQuantity
          : subDoc.emptyQuantity,
      itemId: Number(subDoc.itemId),
      barcodesDetails: subDoc.barcodesDetails || [],
    }));

    const payload = {
      transDate:
        formData.transferDate || new Date().toISOString().split("T")[0],
      remarks: formData.remarks || "",
      status: statusCheck,
      startLocId: formData.locationFrom || 0,
      contractorCode: formData.contractor || "",
      driverId: formData.driver || 0,
      vehicleRegNo: formData.vehicle || "",
      subDocs: transformedSubDocs, // Use filtered and transformed subDocs
    };

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out subDocs with qty == 0
    const filteredSubDocs = formData?.subDocs.filter((subDoc) => {
      const qty =
        subDoc.itemStatusWill === "Filled"
          ? subDoc.filledQuantity
          : subDoc.emptyQuantity;
      return qty > 0; // Only include subDocs with qty > 0
    });

    const subDocsError = filteredSubDocs.length === 0;

    const newErrors = {
      contractor: !formData.contractor,
      remarks: !formData.remarks,
      driver: !formData.driver,
      locationFrom: !formData.locationFrom,
      transferDate: !formData.transferDate,
      vehicle: !formData.vehicle,
      subDocs: filteredSubDocs.map((subDoc) => ({
        itemId: subDoc.itemId ? false : true,
        locationTo: subDoc.locationTo ? false : true,
        filledQuantity: subDoc.filledQuantity >= 0 ? false : true,
        emptyQuantity: subDoc.emptyQuantity >= 0 ? false : true,
      })),
      subDocsError,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) =>
        error === true ||
        (Array.isArray(error) &&
          error.some((subDocError) =>
            Object.values(subDocError).some((v) => v)
          ))
    );

    if (subDocsError) {
      return toast.error(
        "Please add at least one valid SubDoc to submit the form."
      );
    }

    if (!hasErrors) {
      const payload = transformFormDataToPayload({
        ...formData,
        subDocs: filteredSubDocs, // Use the filtered subDocs
      });

      const res = await CreateMasterConsignmentService(payload);

      if (res.data.statusCode !== 200) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setFormData({
          locationFrom: "",
          transferDate: "",
          remarks: "",
          contractor: "",
          driver: "",
          vehicle: "",
          subDocs: [],
        });
        dispatch(fetchAllMasterConsignment());
      }
    } else {
      if (subDocsError) {
        toast.error("Please add at least one valid item to submit the form.");
      } else {
        toast.error("Please fill in all required fields.");
      }
    }
  };

  const allItemsList = itemTypes?.map((itemType) => (
    <option key={itemType?.id} value={itemType?.id}>
      {itemType?.name}
    </option>
  ));

  let allDriversList =
    allDrivers?.allDrivers?.length > 0 ? (
      allDrivers?.allDrivers?.map((driver) => (
        <option key={driver?.key} value={driver?.key}>
          {driver.value}
        </option>
      ))
    ) : (
      <option value="" disabled>
        No Driver Found
      </option>
    );

  const allVehiclesList =
    allVehicles?.allVehicles?.length > 0 ? (
      allVehicles?.allVehicles?.map((vehicle) => (
        <option key={vehicle?.key} value={vehicle?.key}>
          {vehicle.value}
        </option>
      ))
    ) : (
      <option value="" disabled>
        No Vehicles Found
      </option>
    );

  const locationToAllCities = allCities
    .filter((city) => city?.parentID == null)
    .map((city) => ({
      id: city?.id,
      name: city.name,
      children:
        city.type === "BU"
          ? allCities.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))
          : allCities
              .filter((child) => child.parentID === city?.id)
              .map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              )),
    }));

  const handleChange = (e) => {
    const { name, value, dataset, type } = e.target;
    const docId = Number(dataset.id);
    if (name === "locationFrom") {
      const selectedFromLocationId = Number(value); // ID of the selected "From Location"

      // Find the corresponding locationTo object
      const locationTo = locationToAllCities.find(
        (location) => location.id === selectedFromLocationId
      );

      // Filter out the selected "From Location" from locationTo.children
      const filteredLocationToList =
        locationTo?.children?.filter(
          (childLocation) =>
            Number(childLocation.key) !== selectedFromLocationId // Exclude "From Location"
        ) || [];

      setLocationToListData(filteredLocationToList);
    }

    if (
      ["itemId", "locationTo", "filledQuantity", "emptyQuantity"].includes(name)
    ) {
      if (type === "number" && value < 0) {
        return toast.error("Quantity cannot be less than zero.");
      }
      // Check if the field being updated is emptyQuantity
      if (name === "emptyQuantity") {
        const filledQuantity = formData.subDocs.find((doc) => doc.id === docId)
          ?.filledQuantity;

        // if (filledQuantity !== undefined && value > filledQuantity) {
        //   return toast.error(
        //     "Empty quantity cannot be greater than filled quantity."
        //   );
        // }
      }
      const updatedSubDocs = formData?.subDocs?.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              [name]:
                name === "filledQuantity" || name === "emptyQuantity"
                  ? Number(value)
                  : value,
            }
          : doc
      );

      setFormData((prevData) => ({
        ...prevData,
        subDocs: updatedSubDocs,
      }));
    } else {
      setFormData({
        ...formData,
        [name]:
          name === "driver" ||
          name === "locationFrom" ||
          name === "warehouse" ||
          name === "transferQuantity"
            ? Number(value)
            : value,
      });
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
    // setErrors((prevErrors) => {
    //   const updatedSubDocErrors = prevErrors.subDocs.map(
    //     (subDocError, index) => {
    //       // Check if the current index matches the data-id of the changed input
    //       if (formData.subDocs[index].id === Number(dataset.id)) {
    //         return {
    //           ...subDocError,
    //           [name]: false, // Only update the specific field's error
    //         };
    //       }
    //       return subDocError; // Keep the other errors unchanged
    //     }
    //   );

    //   return {
    //     ...prevErrors,
    //     subDocs: updatedSubDocErrors,
    //   };
    // });

    setErrors((prevErrors) => {
      const updatedSubDocErrors = prevErrors?.subDocs?.map(
        (subDocError, index) => {
          if (index === dataset.rowIndex) {
            return {
              ...subDocError,
              [name]: false,
            };
          }
          return subDocError;
        }
      );

      return {
        ...prevErrors,
        subDocs: updatedSubDocErrors,
      };
    });
  };

  // const subDocList = formData.subDocs
  //   ?.filter(
  //     (doc, index, self) => index === self.findIndex((d) => d.id === doc.id)
  //   )
  //   .map((doc, index) => (
  //     <Row className="my-3" key={doc.id}>
  //       <Col md={3}>
  //         <Label for="itemId">Item</Label>
  //         <Input
  //           type="select"
  //           name="itemId"
  //           id="itemId"
  //           data-id={doc.id}
  //           value={doc.itemId || ""}
  //           onChange={handleChange}
  //           className={errors.itemId ? "is-invalid" : ""}
  //           required
  //         >
  //           <option value="" disabled hidden>
  //             Select Item
  //           </option>
  //           {allItemsList.length === 0 && (
  //             <option value="" disabled>
  //               No Items Found
  //             </option>
  //           )}
  //           {allItemsList}
  //         </Input>
  //         {errors.subDocs[index].locationTo && (
  //           <div className="invalid-feedback">Please select an item.</div>
  //         )}
  //       </Col>

  //       <Col md={3}>
  //         <Label for="locationTo">Location To</Label>
  //         <Input
  //           type="select"
  //           name="locationTo"
  //           id="locationTo"
  //           data-id={doc.id}
  //           value={doc.locationTo || ""}
  //           onChange={handleChange}
  //           className={errors.locationTo ? "is-invalid" : ""}
  //           required
  //         >
  //           <option value="" disabled hidden>
  //             Select Location To
  //           </option>
  //           {locationToListData.length === 0 && (
  //             <option value="" disabled>
  //               No Location Found
  //             </option>
  //           )}
  //           {locationToListData}
  //         </Input>
  //         {errors.locationTo && (
  //           <div className="invalid-feedback">Please select a location to.</div>
  //         )}
  //       </Col>

  //       <Col md={2}>
  //         <Label for="filledQuantity">Fill Quantity</Label>
  //         <Input
  //           type="number"
  //           name="filledQuantity"
  //           id="filledQuantity"
  //           data-id={doc.id}
  //           value={doc.itemStatusWill === "Filled" ? doc.filledQuantity : 0}
  //           onChange={handleChange}
  //           className={errors.filledQuantity ? "is-invalid" : ""}
  //           placeholder="Fill Quantity"
  //           required
  //         />
  //         {errors.filledQuantity && (
  //           <div className="invalid-feedback">
  //             Please select a fill quantity.
  //           </div>
  //         )}
  //       </Col>

  //       <Col md={3}>
  //         <Label for="emptyQuantity">Empty Quantity</Label>
  //         <Input
  //           type="number"
  //           name="emptyQuantity"
  //           id="emptyQuantity"
  //           data-id={doc.id}
  //           value={doc.emptyQuantity}
  //           onChange={handleChange}
  //           className={errors.emptyQuantity ? "is-invalid" : ""}
  //           placeholder="Empty Quantity"
  //           required
  //         />
  //         {errors.emptyQuantity && (
  //           <div className="invalid-feedback">
  //             Please select an empty quantity.
  //           </div>
  //         )}
  //       </Col>

  //       <Col md={1} className="pt-4">
  //         <IconButton color="error" onClick={() => handleRowDelete(doc.id)}>
  //           <Trash />
  //         </IconButton>
  //       </Col>
  //     </Row>
  //   ));

  const subDocList = formData.subDocs
    ?.filter(
      (doc, index, self) => index === self.findIndex((d) => d.id === doc.id)
    )
    .map((doc, index) => (
      <Row className="my-3" key={doc.id}>
        <Col md={3}>
          <Label for="itemId">Item</Label>
          <Input
            type="select"
            name="itemId"
            id="itemId"
            data-id={doc.id}
            data-rowindex={index}
            value={doc.itemId || ""}
            onChange={handleChange}
            className={errors.subDocs?.[index]?.itemId ? "is-invalid" : ""}
            required
          >
            <option value="" disabled hidden>
              Select Item
            </option>
            {allItemsList.length === 0 && (
              <option value="" disabled>
                No Items Found
              </option>
            )}
            {allItemsList}
          </Input>
          {errors.subDocs?.[index]?.itemId && (
            <div className="invalid-feedback">Please select an item.</div>
          )}
        </Col>

        <Col md={3}>
          <Label for="locationTo">Warehouse/Sub Warehouse</Label>
          <Input
            type="select"
            name="locationTo"
            id="locationTo"
            data-id={doc.id}
            data-rowindex={index}
            value={doc.locationTo || ""}
            onChange={handleChange}
            className={errors.subDocs?.[index]?.locationTo ? "is-invalid" : ""}
            required
          >
            <option value="" disabled hidden>
              Select Location To
            </option>
            {locationToListData.length === 0 && (
              <option value="" disabled>
                No Location Found
              </option>
            )}
            {locationToListData}
          </Input>
          {errors.subDocs?.[index]?.locationTo && (
            <div className="invalid-feedback">Please select a location to.</div>
          )}
        </Col>

        <Col md={2}>
          <Label for="filledQuantity">Fill Quantity</Label>
          <Input
            type="number"
            name="filledQuantity"
            id="filledQuantity"
            data-id={doc.id}
            data-rowindex={index}
            value={doc.itemStatusWill === "Filled" ? doc.filledQuantity : 0}
            onChange={handleChange}
            className={
              errors.subDocs?.[index]?.filledQuantity ? "is-invalid" : ""
            }
            placeholder="Fill Quantity"
            required
          />
          {errors.subDocs?.[index]?.filledQuantity && (
            <div className="invalid-feedback">
              Please enter a valid fill quantity (0 or more).
            </div>
          )}
        </Col>

        <Col md={3}>
          <Label for="emptyQuantity">Empty Quantity</Label>
          <Input
            type="number"
            name="emptyQuantity"
            id="emptyQuantity"
            data-id={doc.id}
            data-rowindex={index}
            value={doc.emptyQuantity}
            onChange={handleChange}
            className={
              errors.subDocs?.[index]?.emptyQuantity ? "is-invalid" : ""
            }
            placeholder="Empty Quantity"
            required
          />
          {errors.subDocs?.[index]?.emptyQuantity && (
            <div className="invalid-feedback">
              Please select an empty quantity.
            </div>
          )}
        </Col>

        <Col md={1} className="pt-4">
          <IconButton color="error" onClick={() => handleRowDelete(doc.id)}>
            <Trash />
          </IconButton>
        </Col>
      </Row>
    ));

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="needs-validation custom-input"
        noValidate
      >
        <Row className="mb-3">
          <Col md={6}>
            <Label for="locationFrom">Start Location/ DropOff</Label>
            <Input
              type="select"
              name="locationFrom"
              id="locationFrom"
              value={formData.locationFrom}
              onChange={handleChange}
              className={errors.locationFrom ? "is-invalid" : ""}
              required
            >
              <option value="" disabled hidden>
                Select Location
              </option>
              {allCitiesList}
            </Input>
            {errors.warehouse && (
              <div className="invalid-feedback">Please select a warehouse.</div>
            )}
          </Col>

          <Col md={6}>
            <Label for="transferDate">Transfer Date</Label>
            <Input
              type="date"
              name="transferDate"
              id="transferDate"
              value={formData.transferDate}
              onChange={handleChange}
              className={errors.transferDate ? "is-invalid" : ""}
              required
            />
            {errors.transferDate && (
              <div className="invalid-feedback">
                Please select a transfer date.
              </div>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Label for="contractor">Contractor</Label>
            <Input
              type="select"
              name="contractor"
              id="contractor"
              value={formData.contractor}
              onChange={handleChange}
              className={errors.contractor ? "is-invalid" : ""}
              required
            >
              <option value="" disabled hidden>
                Select Contractor
              </option>
              {allContractorsList}
            </Input>
            {errors.contractor && (
              <div className="invalid-feedback">
                Please select a contractor.
              </div>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Label for="driver">Driver</Label>
            <Input
              type="select"
              name="driver"
              id="driver"
              value={formData.driver}
              onChange={handleChange}
              className={errors.driver ? "is-invalid" : ""}
              required
            >
              <option value="" disabled hidden>
                Select Driver
              </option>
              {allDriversList}
            </Input>
            {errors.driver && (
              <div className="invalid-feedback">Please select a driver.</div>
            )}
          </Col>
          <Col md={6}>
            <Label for="vehicle">Vehicle</Label>
            <Input
              type="select"
              name="vehicle"
              id="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              className={errors.vehicle ? "is-invalid" : ""}
              required
            >
              <option value="" disabled hidden>
                Choose Vehicle
              </option>
              {allVehiclesList}
            </Input>
            {errors.vehicle && (
              <div className="invalid-feedback">Please select a vehicle.</div>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Label for="securityDeposit">Remarks</Label>
            <Input
              type="textarea"
              name="remarks"
              id="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className={errors.remarks ? "is-invalid" : ""}
              required
            />
            {errors.remarks && (
              <div className="invalid-feedback">Please enter Remarks.</div>
            )}
          </Col>
        </Row>

        <Box
          style={{
            width: "50%",
            height: "2px",
            margin: " 60px auto",
            backgroundColor: "black",
            opacity: 0.2,
          }}
        >
          <hr />
        </Box>
        <Row className="my-3">
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <h5 style={{ color: "#362E3C", fontWeight: "normal" }}>
                Details
              </h5>
            </Box>
            <Box>
              <Button
                color="primary"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
                onClick={handleRowAdd}
              >
                <Plus size={20} />
                Add Consignment Details
              </Button>
            </Box>
          </Stack>
        </Row>
        {subDocList}

        <Row className="mb-3">
          <Col xs={12} className="text-center">
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default CreateMasterConsignmentForm;
