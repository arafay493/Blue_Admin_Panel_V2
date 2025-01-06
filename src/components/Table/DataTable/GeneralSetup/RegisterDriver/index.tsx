// @ts-nocheck
import React, { useEffect, useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  fetchDriver,
  fetchContractor,
  fetchContractorById,
} from "@/redux/slices/generalSetupSlice";
import { toast } from "react-toastify";
import { addDriver } from "@/redux/services/generalSetupService";
import EditDriverModal from "./EditDriverModal";
import { Box, IconButton } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { exportToCSV } from "utils/csvUtils";
import { Edit } from "react-feather";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendEtagResponse } from "next/dist/server/send-payload";

interface Driver {
  contactPersonId: string;
  name: string;
  email: string;
  phone: string;
  contractorCode: string;
  driverType: string;
}

const RegisterDriver = () => {
  const dispatch = useAppDispatch();
  const { driver } = useAppSelector((state) => state.driver);
  const { contractor } = useAppSelector((state) => state.contractor);

  const { contractorById } = useAppSelector((state) => state.contractorById);

  const contactPersons = contractorById.contractorById.contactPersons;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [selectedContractor, setSelectedContractor] = useState<string>("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const initialFormState = {
    name: "",
    email: "",
    driverType: "",
    licenseNumber: "",
    licenseExpiry: "",
    address: "",
    userActive: true,
    phone: "",
    mobile2: "",
    mobile1: "",
    cnic: "",
    cnicExpiry: "",
    contractorCode: "",
    contactPersonId: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    driverType: false,
    licenseNumber: false,
    licenseExpiry: false,
    address: false,
    contactPersonId: false,
    cnic: false,
    mobile1: false,
    mobile2: false,
    phone: false,
    cnicExpiry: false,
    password: false,
  });

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedWarehouseId
  );

  useEffect(() => {
    dispatch(fetchContractor(selectedCityId));
  }, [dispatch, selectedCityId]);

  useEffect(() => {
    if (selectedContractor) {
      dispatch(fetchDriver(selectedContractor));
    }
  }, [dispatch, selectedContractor]);

  const handleContractorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedContractor(selectedValue);
    setFormData({
      ...formData,
      contractorCode: selectedValue,
    });

    dispatch(fetchContractorById(selectedValue));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox =
      e.target instanceof HTMLInputElement && type === "checkbox";

    if (name === "cnic") {
      const isValidCNIC = /^[0-9]{13}$/.test(value);
      setErrors({ ...errors, cnic: !isValidCNIC });
    } else if (name === "phone" || name === "mobile1" || name === "mobile2") {
      const isValidPhone = /^[0-9]{11}$/.test(value);
      setErrors({ ...errors, [name]: !isValidPhone });
    } else if (name === "licenseNumber") {
      const isValidLicenseNumber = /^[0-9]{11}$/.test(value);
      setErrors({ ...errors, licenseNumber: !isValidLicenseNumber });
    } else {
      setErrors({ ...errors, [name]: false });
    }

    setFormData({
      ...formData,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const responseMessage = await addDriver(
        formData.contractorCode,
        Number(formData.contactPersonId),
        formData.name,
        "0",
        formData.email,
        formData.password,
        formData.cnic,
        formData.driverType,
        formData.cnicExpiry,
        formData.licenseNumber,
        formData.licenseExpiry,
        formData.mobile1,
        formData.mobile2,
        formData.phone,
        formData.address,
        formData.userActive
      );

      if (responseMessage.statusCode === 200) {
        toast.success(responseMessage.message || "Driver added successfully!");
        setFormData(initialFormState);

        if (selectedContractor) {
          dispatch(fetchDriver(selectedContractor));
        }
      } else {
        toast.error(responseMessage.message || "Failed to add driver.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add driver.");
    }
  };

  const handleEdit = (driverData: Driver) => {
    setSelectedDriver(driverData);
    toggleModal();
  };

  const handleSave = (updatedDriver: Driver) => {
    toast.success("Driver updated successfully!");
    toggleModal();
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "contactPersonId",
        header: "Contact Person ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
      },
      {
        accessorKey: "contractorCode",
        header: "Contractor Code",
      },
      {
        accessorKey: "driverType",
        header: "Driver Type",
      },
      {
        id: "edit",
        header: "Edit",
        Cell: ({ row }) => (
          <IconButton color="primary" onClick={() => handleEdit(row.original)}>
            <Edit size={20} />
          </IconButton>
        ),
      },
    ],
    []
  );

  // Export to CSV function
  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "Contact_Person_ID",
      "Name",
      "Email",
      "Phone_Number",
      "Contractor_Code",
      "Driver_Type",
    ];

    const data = rows.map((row) => ({
      Contact_Person_ID: row.original.contactPersonId,
      Name: row.original.name,
      Email: row.original.email,
      Phone_Number: row.original.phone,
      Contractor_Code: row.original.contractorCode,
      Driver_Type: row.original.driverType,
    }));

    exportToCSV(data, headers, "driver-list.csv");
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="contractor">Select Contractor:</label>
                <select
                  id="contractor"
                  className="form-control"
                  value={formData.contractorCode}
                  onChange={handleContractorChange}
                  required
                >
                  <option value="" hidden disabled>
                    Select Contractor
                  </option>
                  {contractor?.contractors?.length > 0 ? (
                    contractor.contractors.map((contractor) => (
                      <option key={contractor.code} value={contractor.code}>
                        {contractor.name} - {contractor.code}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No contractors available
                    </option>
                  )}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="contactPersonId">Select Contact Person:</label>
                <select
                  id="contactPersonId"
                  name="contactPersonId"
                  className="form-control"
                  value={formData.contactPersonId}
                  onChange={handleChange}
                  required
                >
                  <option value="" hidden>
                    Select Contact Person
                  </option>
                  {contactPersons && contactPersons.length > 0 ? (
                    contactPersons.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No contact persons available
                    </option>
                  )}
                </select>
                {errors.contactPersonId && (
                  <div className="invalid-feedback">
                    Please select a contact person.
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="driverType">Driver Type:</label>
                <select
                  id="driverType"
                  name="driverType"
                  className="form-control"
                  value={formData.driverType}
                  onChange={handleChange}
                  required
                >
                  <option value="" hidden>
                    Select Driver Type
                  </option>
                  <option value="BU">BU</option>
                  <option value="WH">WH</option>
                </select>
                {errors.driverType && (
                  <div className="invalid-feedback">
                    Please select a driver type.
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="name">Name:</label>
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
                  <div className="invalid-feedback">
                    Please enter your name.
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="email">Email:</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className={errors.email ? "is-invalid" : ""}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    Please enter a valid email.
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="password">Password</label>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={errors.password ? "is-invalid" : ""}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                  <InputGroupText
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroupText>
                </InputGroup>
                {errors.password && (
                  <div className="invalid-feedback">Please enter Password.</div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="phone">Phone:</label>
                <Input
                  type="number"
                  id="phone"
                  name="phone"
                  className={errors.phone ? "is-invalid" : ""}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                />
                {errors.phone && (
                  <div className="invalid-feedback">
                    Phone number must be 10-11 digits.
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="mobile1">Mobile Number 1:</label>
                <Input
                  type="number"
                  id="mobile1"
                  name="mobile1"
                  className={errors.mobile1 ? "is-invalid" : ""}
                  value={formData.mobile1}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number 1"
                />
                {errors.mobile1 && (
                  <div className="invalid-feedback">
                    Mobile number must be 11 digits.
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="mobile2">Mobile Number 2:</label>
                <Input
                  type="number"
                  id="mobile2"
                  name="mobile2"
                  className={errors.mobile2 ? "is-invalid" : ""}
                  value={formData.mobile2}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number 2"
                />
                {errors.mobile2 && (
                  <div className="invalid-feedback">
                    Mobile number must be 11 digits.
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="cnic">CNIC:</label>
                <Input
                  type="text"
                  id="cnic"
                  name="cnic"
                  className={errors.cnic ? "is-invalid" : ""}
                  value={formData.cnic}
                  onChange={handleChange}
                  placeholder="Enter CNIC"
                />
                {errors.cnic && (
                  <div className="invalid-feedback">
                    CNIC must be 13 digits.
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="cnicExpiry">CNIC Expiry Date:</label>
                <Input
                  type="date"
                  id="cnicExpiry"
                  name="cnicExpiry"
                  className={errors.cnicExpiry ? "is-invalid" : ""}
                  value={formData.cnicExpiry}
                  onChange={handleChange}
                />
                {errors.cnicExpiry && (
                  <div className="invalid-feedback">
                    Please enter CNIC expiry date.
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="licenseNumber">License Number:</label>
                <Input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  className={errors.licenseNumber ? "is-invalid" : ""}
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Enter License Number"
                />
                {errors.licenseNumber && (
                  <div className="invalid-feedback">
                    License number must be 11 digits.
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="licenseExpiry">License Expiry Date:</label>
                <Input
                  type="date"
                  id="licenseExpiry"
                  name="licenseExpiry"
                  className={errors.licenseExpiry ? "is-invalid" : ""}
                  value={formData.licenseExpiry}
                  onChange={handleChange}
                />
                {errors.licenseExpiry && (
                  <div className="invalid-feedback">
                    Please enter a license expiry date.
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="address">Address:</label>
                <Input
                  type="textarea"
                  id="address"
                  name="address"
                  className={errors.address ? "is-invalid" : ""}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                />
                {errors.address && (
                  <div className="invalid-feedback">
                    Please enter an address.
                  </div>
                )}
              </div>
            </div>

            <div className="text-center my-3">
              <Button type="submit" color="primary">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={driver.drivers}
            muiTableProps={{
              sx: {
                "& th": {
                  background: "#0A80BF",
                  color: "white",
                  whiteSpace: "nowrap",
                  padding: "8px",
                  minWidth: "180px",
                },
                "& td": {
                  padding: "8px",
                  minWidth: "180px",
                },
              },
            }}
            renderTopToolbarCustomActions={({ table }) => (
              <Box>
                <Button
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  color="primary"
                  onClick={() =>
                    handleExportRowsToCSV(table.getPrePaginationRowModel().rows)
                  }
                  variant="text"
                >
                  <FiDownload
                    color="primary"
                    style={{
                      fontSize: "18px",
                      color: "inherit",
                      verticalAlign: "middle",
                      marginRight: "10px",
                    }}
                  />
                  Export All Rows to CSV
                </Button>
              </Box>
            )}
          />

          <EditDriverModal
            isOpen={isModalOpen}
            toggle={toggleModal}
            driverData={selectedDriver}
            onSave={handleSave}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default RegisterDriver;
