import React, { useMemo, useState } from "react";
import { Button, Col, Row, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/redux/hooks";
import { MaterialReactTable } from "material-react-table";
import { addHoliday } from "@/redux/services/generalSetupService";
import moment from "moment";
import { Box } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { exportToCSV } from "utils/csvUtils";

const AddHolidayForm = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { RegionManagement } = useAppSelector(
    (state) => state.regionManagement
  );

  const initialFormState = {
    day: "",
    date: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({
    day: false,
    date: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const handleCheckboxChange = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (checked) {
      const allIds = RegionManagement.regionManagements.map((row) => row.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "provinceDetail.province", header: "Province" },
      {
        accessorKey: "checkbox",
        header: "Select All",

        Header: () => (
          <>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={
                selectedRows.length ===
                RegionManagement.regionManagements.length
              }
            />
            &nbsp; Select All
          </>
        ),
        Cell: ({ row }) => (
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(row.original.id)}
            checked={selectedRows.includes(row.original.id)}
          />
        ),
      },
    ],
    [selectedRows, RegionManagement.regionManagements]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      day: !formData.day,
      date: !formData.date,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (selectedRows.length === 0) {
      toast.error("Please select at least one city.");
      return;
    }

    const formattedDate = moment(formData.date).format("MM-DD-YYYY");

    addHoliday(formattedDate, formData.day, selectedRows)
      .then((response) => {
        if (response) {
          toast.success(`Holiday added: ${formData.day} on ${formattedDate}`);
          setFormData(initialFormState);
          setSelectedRows([]);
        } else {
          toast.error("Failed to add holiday.");
        }
      })
      .catch((error) => {
        console.error("Error adding holiday:", error);
        toast.error(error.message);
      });
  };

  const handleExportRowsToCSV = (rows) => {
    const headers = ["ID", "City", "Province"];

    const data = rows.map((row) => ({
      ID: row.original.id,
      City: row.original.city,
      Province: row.original.provinceDetail.province,
    }));

    exportToCSV(data, headers, "Holiday-management-list.csv");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="needs-validation custom-input"
      noValidate
    >
      <Row className="mb-3">
        <Col md={6}>
          <Label for="day">Select Day</Label>
          <Input
            type="select"
            name="day"
            id="day"
            value={formData.day}
            onChange={handleChange}
            className={errors.day ? "is-invalid" : ""}
            required
          >
            <option value="" disabled>
              Select a day
            </option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </Input>
          {errors.day && (
            <div className="invalid-feedback">Please select a day.</div>
          )}
        </Col>

        <Col md={6}>
          <Label for="date">Holiday Date</Label>
          <Input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? "is-invalid" : ""}
            required
          />
          {errors.date && (
            <div className="invalid-feedback">Please enter a valid date.</div>
          )}
        </Col>
      </Row>

      <MaterialReactTable
        columns={columns}
        data={RegionManagement.regionManagements}
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

      <Row className="mb-3 mt-4">
        <Col xs={12} className="text-center">
          <Button color="primary" type="submit">
            Add Holiday
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default AddHolidayForm;
