// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addContractor } from "@/redux/services/generalSetupService";
import { Box } from "@mui/material";
import {
  fetchListAllStockTypes,
  fetchListAllLocations,
  fetchAllContractors,
  fetchAllVehicles,
  fetchAllDrivers,
} from "@/redux/slices/masterConsignmentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCitiesList } from "@/redux/slices/customerSlice";
import { fetchAllItemTypes } from "@/redux/slices/masterItemSlices";
import { AddStockInOutService } from "@/redux/services/masterConsignmentService";

interface FormData {
  type: string;
  transType: string;
  contractor: string;
  driver: string;
  vehicle: string;
  bottUnit: string;
  warehouse: string;
  reqDate: string;
  quantity: string;
  amount: string;
  remarks: string;
  item: string;
}

interface FormErrors {
  type: boolean;
  transType: boolean;
  contractor: boolean;
  driver: boolean;
  vehicle: boolean;
  bottUnit: boolean;
  warehouse: boolean;
  reqDate: boolean;
  quantity: boolean;
  amount: boolean;
  remarks: boolean;
  item: boolean;
}

interface RowData {
  itemCode: string;
  barCode: string;
  mnfSerial: string;
  lotNumber: string;
  expiryDate: string;
  mfgDate: string;
  inDate: string;
  warranty: string;
}

const FilledMovementForm = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchListAllStockTypes());
    dispatch(fetchListAllLocations());
    dispatch(fetchAllContractors());
    dispatch(fetchCitiesList());
    dispatch(fetchAllItemTypes());
  }, []);

  const { stockTypes } = useAppSelector(
    (state) => state.masterConsignmentReducer.stockTypes
  );
  const { itemTypes } = useAppSelector(
    (state) => state.masterItemTypes.itemTypes
  );

  const { allCities } = useAppSelector((state) => state.customerSlice);

  const initialFormState: FormData = {
    type: "",
    transType: "",
    contractor: "",
    driver: "",
    vehicle: "",
    bottUnit: "",
    warehouse: "",
    reqDate: "",
    quantity: "",
    amount: "",
    remarks: "",
    item: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [lines, setLines] = useState<RowData[]>([]);
  const [errors, setErrors] = useState<FormErrors>({
    type: false,
    transType: false,
    contractor: false,
    driver: false,
    vehicle: false,
    bottUnit: false,
    warehouse: false,
    reqDate: false,
    quantity: false,
    amount: false,
    remarks: false,
    item: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "quantity") {
      const quantityValue = parseInt(value, 10);
      if (!isNaN(quantityValue) && quantityValue > 0) {
        const newRows = Array.from({ length: quantityValue }, (_, index) => ({
          itemCode: formData?.item,
          id: index + 1,
          barCode: "",
          mnfSerial: "",
          lotNumber: "",
          expDate: null,
          mfgDate: null,
          inDate: null,
          warranty: "",
          status: "",
          location: "",
        }));
        setLines(newRows);
      } else {
        setLines([]);
      }
    }
  };

  const handleRowChange = (
    index: number,
    field: keyof RowData,
    value: string
  ) => {
    const updatedRows = [...lines];
    updatedRows[index][field] = value;
    setLines(updatedRows);
  };

  let transactionType;
  if (formData.type === "In") {
    transactionType = formData.type === "N" ? "INN" : "INA";
  } else if (formData.type === "Out") {
    transactionType = formData.type === "N" ? "OUTN" : "OUTA";
  } else {
    transactionType = "";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      type: !formData.type,
      transType: !formData.transType,
      contractor: !formData.contractor,
      driver: !formData.driver,
      vehicle: !formData.vehicle,
      bottUnit: !formData.bottUnit,
      warehouse: !formData.warehouse,
      reqDate: !formData.reqDate,
      quantity: !formData.quantity,
      amount: !formData.amount,
      remarks: !formData.remarks,
      item: !formData.item,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const updatedRows = lines?.map((row) => ({
      ...row,
      itemCode: formData?.item,
      quantity: Number(row?.quantity),
      locId: Number(formData.warehouse),
    }));

    const payload = {
      tranDate: formData.reqDate,
      locId: Number(formData.warehouse),
      fromLocId: Number(formData.bottUnit),
      remarks: formData?.remarks,
      contractorCode: formData.contractor,
      driverID: Number(formData.driver),
      vehicleRegNo: formData.vehicle,
      itemStatusWill: "Filled",
      transType: transactionType,
      type: formData.type,
      status:
        !formData.contractor || formData.driver || formData.vehicle
          ? "Unassigned"
          : "Draft",

      lines: [
        {
          id: 1,
          stockId: 1,
          itemId: Number(formData?.item),
          qty: Number(formData?.quantity),
          amount: Number(formData?.amount),
          locID: Number(formData?.warehouse),
          lineDetails: lines,
        },
      ],
    };
    try {
      const response = await AddStockInOutService(payload);

      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(
          `${response?.data?.message || "An unexpected error occurred."}`
        );
      }
    } catch (error) {
      toast.error("Failed to submit data. Please try again.");
    }
  };

  const { allContractors, allDrivers, allVehicles } = useAppSelector(
    (state) => state.masterConsignmentReducer
  );

  useEffect(() => {
    if (formData.contractor !== "") {
      dispatch(fetchAllDrivers(formData.contractor));
      dispatch(fetchAllVehicles(formData.contractor));
    }
  }, [formData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="needs-validation custom-input"
      noValidate
    >
      <Row className="mb-3">
        <Col md={6}>
          <Label for="type">Type</Label>
          <Input
            type="select"
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className={errors.type ? "is-invalid" : ""}
          >
            <option hidden>Select an option</option>
            {stockTypes.map((type) => (
              <option key={type.key} value={type.value}>
                {type.value}
              </option>
            ))}
          </Input>
          {errors.type && (
            <div className="invalid-feedback">Please select type</div>
          )}
        </Col>

        <Col md={6}>
          <Label for="type">Transaction Type</Label>
          <Input
            type="select"
            name="transType"
            id="transType"
            value={formData.transType}
            onChange={handleChange}
            className={errors.transType ? "is-invalid" : ""}
          >
            <option hidden>Select an option</option>
            <option value="Normal">Normal</option>
            <option value="Adjustment">Adjustment</option>
          </Input>
          {errors.transType && (
            <div className="invalid-feedback">
              Please select Transaction Type
            </div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="bottUnit">Bottling Unit</Label>
          <Input
            type="select"
            name="bottUnit"
            id="bottUnit"
            value={formData.bottUnit}
            onChange={handleChange}
            className={errors.bottUnit ? "is-invalid" : ""}
          >
            <option hidden>Select an option</option>
            {allCities.allCities
              .filter((city) => city.type === "BU")
              .map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
          </Input>
          {errors.bottUnit && (
            <div className="invalid-feedback">Please select Bottling Unit </div>
          )}
        </Col>

        <Col md={6}>
          <Label for="warehouse">Warehouse</Label>
          <Input
            type="select"
            name="warehouse"
            id="warehouse"
            value={formData.warehouse}
            onChange={handleChange}
            className={errors.warehouse ? "is-invalid" : ""}
          >
            <option hidden>Select an option</option>
            {allCities.allCities
              .filter((city) => city.type === "WH")
              .map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
          </Input>
          {errors.warehouse && (
            <div className="invalid-feedback">Please select Warehouse </div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="contractor">Contractor</Label>
          <Input
            type="select"
            name="contractor"
            id="contractor"
            value={formData.contractor}
            onChange={handleChange}
            className={errors.contractor ? "is-invalid" : ""}
          >
            <option hidden>Select an option</option>
            {allContractors.allContractors.length > 0 ? (
              allContractors.allContractors.map((type) => (
                <option key={type.key} value={type.key}>
                  {type.value}
                </option>
              ))
            ) : (
              <option disabled>No driver found</option>
            )}
          </Input>
          {errors.contractor && (
            <div className="invalid-feedback">Please select Contractor</div>
          )}
        </Col>

        <Col md={6}>
          <Label for="driver">Driver</Label>
          <Input
            type="select"
            name="driver"
            id="driver"
            value={formData.driver}
            onChange={handleChange}
            className={errors.driver ? "is-invalid" : ""}
          >
            <option hidden>Select an option</option>
            {allDrivers.allDrivers.length > 0 ? (
              allDrivers.allDrivers.map((type) => (
                <option key={type.key} value={type.key}>
                  {type.value}
                </option>
              ))
            ) : (
              <option disabled>No driver found</option>
            )}
          </Input>
          {errors.driver && (
            <div className="invalid-feedback">Please select Driver</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Label for="vehicle">Vehicle</Label>
          <Input
            type="select"
            name="vehicle"
            id="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className={errors.vehicle ? "is-invalid" : ""}
          >
            <option hidden>Select an option</option>
            {allVehicles.allVehicles.length > 0 ? (
              allVehicles.allVehicles.map((type) => (
                <option key={type.key} value={type.key}>
                  {type.value}
                </option>
              ))
            ) : (
              <option disabled>No vehicle found</option>
            )}
          </Input>
          {errors.vehicle && (
            <div className="invalid-feedback">Please select Vehicle</div>
          )}
        </Col>

        <Col md={6}>
          <Label for="reqDate">Required Date</Label>
          <Input
            type="date"
            name="reqDate"
            id="reqDate"
            value={formData.reqDate}
            onChange={handleChange}
            className={errors.reqDate ? "is-invalid" : ""}
          ></Input>
          {errors.reqDate && (
            <div className="invalid-feedback">Please select Required Date</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Label for="remarks">Remarks</Label>
          <Input
            type="textarea"
            name="remarks"
            id="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className={errors.remarks ? "is-invalid" : ""}
          ></Input>
          {errors.remarks && (
            <div className="invalid-feedback">Please enter remarks</div>
          )}
        </Col>
      </Row>

      <Box
        style={{
          width: "50%",
          height: "2px",
          margin: " 40px auto",
          backgroundColor: "black",
          opacity: 0.2,
        }}
      >
        <hr />
      </Box>

      <h6>Details</h6>

      <Row className="mb-3 mt-3">
        <Col md={4}>
          <Label for="item">Item</Label>
          <Input
            type="select"
            name="item"
            id="item"
            value={formData.item}
            onChange={handleChange}
            className={errors.item ? "is-invalid" : ""}
          >
            <option hidden>Select an option</option>
            {itemTypes.length > 0 ? (
              itemTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))
            ) : (
              <option disabled>No item found</option>
            )}
          </Input>
          {errors.item && (
            <div className="invalid-feedback">Please select Item</div>
          )}
        </Col>

        <Col md={4}>
          <Label for="quantity">Quantity</Label>
          <Input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={errors.quantity ? "is-invalid" : ""}
            required
          />
          {errors.quantity && (
            <div className="invalid-feedback">Enter Quantity </div>
          )}
        </Col>

        <Col md={4}>
          <Label for="code">Amount</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className={errors.amount ? "is-invalid" : ""}
            required
          />
          {errors.amount && (
            <div className="invalid-feedback">Enter Amount </div>
          )}
        </Col>
      </Row>

      {/* Dynamic Rows */}
      <div
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {lines.length > 0 && (
          <>
            {lines.map((row, index) => (
              <Row
                className="d-flex align-items-center mb-3 mt-5"
                key={index}
                style={{ flexWrap: "nowrap" }}
              >
                <Col md={2}>
                  <Label for="code">Item Code</Label>
                  <Input
                    type="text"
                    value={row.itemCode}
                    onChange={(e) =>
                      handleRowChange(index, "itemCode", e.target.value)
                    }
                  />
                </Col>
                <Col md={2}>
                  <Label for="code">BarCode</Label>
                  <Input
                    type="text"
                    value={row.barCode}
                    onChange={(e) =>
                      handleRowChange(index, "barCode", e.target.value)
                    }
                  />
                </Col>
                <Col md={2}>
                  <Label for="code">Mnf Serial</Label>
                  <Input
                    type="text"
                    value={row.mnfSerial}
                    onChange={(e) =>
                      handleRowChange(index, "mnfSerial", e.target.value)
                    }
                  />
                </Col>
                <Col md={2}>
                  <Label for="code">Lot Number</Label>
                  <Input
                    type="text"
                    value={row.lotNumber}
                    onChange={(e) =>
                      handleRowChange(index, "lotNumber", e.target.value)
                    }
                  />
                </Col>
                <Col md={2}>
                  <Label for="code">Expiry Date</Label>
                  <Input
                    type="date"
                    value={row.expDate}
                    onChange={(e) =>
                      handleRowChange(index, "expiryDate", e.target.value)
                    }
                  />
                </Col>
                <Col md={2}>
                  <Label for="code">Mfg Date</Label>
                  <Input
                    type="date"
                    value={row.mfgDate}
                    onChange={(e) =>
                      handleRowChange(index, "mfgDate", e.target.value)
                    }
                  />
                </Col>
                <Col md={2}>
                  <Label for="code">In Date</Label>
                  <Input
                    type="date"
                    value={row.inDate}
                    onChange={(e) =>
                      handleRowChange(index, "inDate", e.target.value)
                    }
                  />
                </Col>
                <Col md={2}>
                  <Label for="code">Warranty</Label>
                  <Input
                    type="text"
                    value={row.warranty}
                    onChange={(e) =>
                      handleRowChange(index, "warranty", e.target.value)
                    }
                  />
                </Col>
              </Row>
            ))}
          </>
        )}
      </div>

      <Row className="mb-3">
        <Col xs={12} className="text-center mt-3">
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default FilledMovementForm;
