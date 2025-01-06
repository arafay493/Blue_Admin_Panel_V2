// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Card, CardBody, Col, Row, Input, Label } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  fetchAdminWarningCustomer,
  fetchWarningCustomer,
} from "../../../../../redux/slices/customerSlice";
import { toast } from "react-toastify";
import {
  WarningCustomerCreateOrderAPI,
  WarningCustomerOrderAPI,
} from "@/redux/services/customerService";
import { number } from "card-validator";
import moment from "moment";
import { FiDownload, FiPlusCircle } from "react-icons/fi";
import { Box, IconButton } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";
import Loader from "@/components/Loader/Loader";

const WarningCustomersTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    number: 21,
  });
  const dispatch = useAppDispatch();

  const { adminWarningCustomer } = useAppSelector(
    (state) => state.adminWarningCustomer
  );
  const { warningCustomer } = useAppSelector((state) => state.warningCustomer);

  useEffect(() => {
    dispatch(fetchAdminWarningCustomer());
    dispatch(fetchWarningCustomer(formData.number));
  }, [dispatch]);

  const filteredWarningCustomers = useMemo(() => {
    return (warningCustomer.warningCustomers ?? []).filter(
      (customer) => customer.thresholdOrders <= customer.vacantCylinders
    );
  }, [warningCustomer.warningCustomers]);

  const loading: boolean = useAppSelector(
    (state) => state?.warningCustomer?.warningCustomer?.loading
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "number" && value < 1) {
      setFormData({
        ...formData,
        number: 1,
      });
      return toast.error("Number must be greater than or equal to 1.");
    }
    setFormData({
      ...formData,
      [name]: name === "number" ? Number(value) : value,
    });
  };

  const handleSubmitNumberOfDays = () => {
    dispatch(fetchWarningCustomer(formData.number));
  };

  const handleCreateOrder = async (row) => {
    let formData = {
      customerId: row?.customerId,
      itemId: 1,
      appType: "Web",
      invoiceType: "EmptyPickupOnly",
      customerDetailAddressId: row?.unusedCylinders[0].cylinderCustomerDetailId,
      qty: row?.totalCylinders - row?.thresholdOrders,
      requiredDate: moment().format("MM-DD-YYYY"),
      securityDeposit: 0,
    };
    const res = await WarningCustomerCreateOrderAPI(formData);
    if (res.statusCode !== 200) {
      if (res.message) {
        return toast.error(res.message);
      }
      if (res.data.message) {
        return toast.error(res.data.message);
      } else if (res.data.QTY[0]) {
        return toast.error(res.data.QTY[0]);
      } else {
        return toast.error(res.data.Message);
      }
    }
    return toast.success(res.message);
  };

  const transformData = (data) => {
    return {
      userType: "string",
      targetNamespace: "string",
      description: "string",
      tags: "string",
      title: formData.title,
      messageToCustomer: formData.message,
      userInfos: data.map((user) => ({
        userId: user.userId,
        phoneNumber: user.phone,
        fcmToken: user.fcmtoken || "string",
      })),
    };
  };

  const handleFinish = async () => {
    if (formData.title.trim() == "" && formData.message.trim() == "") {
      return toast.error("Title and message required");
    }
    if (selectedRows.length > 0) {
      const result = transformData(selectedRows);
      const res = await WarningCustomerOrderAPI(result);
      if (res.statusCode !== 200) {
        toast.error(res.data["UserInfos[0].FCMToken"]);
      } else {
        toast.success(res.message);
      }
    } else {
      toast.error("Please select atleast one order.");
    }
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    if (checked) {
      const selectedRowsData = filteredWarningCustomers?.map((row) => {
        return row;
      });
      setSelectedRows(selectedRowsData);
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (row) => {
    const customerId = row?.customerId;
    if (selectedRows.some((item) => item.customerId === customerId)) {
      setSelectedRows(
        selectedRows.filter((item) => item.customerId !== customerId)
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const commonColumns = [
    {
      accessorKey: "customerId",
      header: "ID",
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
      enableSorting: true,
    },

    {
      accessorKey: "totalCylinders",
      header: "Total Cylinders",
      enableSorting: true,
    },
  ];

  const warningCustomerColumns = [
    {
      accessorKey: "checkbox",
      header: (
        <>
          <input type="checkbox" onChange={handleSelectAll} />
          &nbsp; Select All
        </>
      ),
      Cell: ({ row }) => (
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(row?.original)}
          checked={selectedRows.some(
            (item) => item.customerId === row?.original?.customerId
          )}
        />
      ),
    },
    ...commonColumns,
    {
      accessorKey: "vacantCylinders",
      header: "Vacant Cylinders",
      enableSorting: true,
    },
    {
      accessorKey: "createOrder",
      header: "Create Orders",
      enableSorting: true,
      Cell: ({ row }) => (
        <IconButton
          color="primary"
          onClick={() => handleCreateOrder(row.original)}
        >
          <FiPlusCircle size={20} />{" "}
        </IconButton>
      ),
    },
  ];

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone Number",
      "Total Cylinders",
      "Vacant Cylinders",
    ];

    const data = rows.map((row) => ({
      ID: row.original.customerId,
      Name: row.original.name,
      Email: row.original.email,
      "Phone Number": row.original.phone,
      "Total Cylinders": row.original.totalCylinders,
      "Vacant Cylinders": row.original.vacantCylinders,
    }));

    exportToCSV(data, headers, "Warning_Customers_Report.csv");
  };

  const handleExportRowsToCSVAdmin = (rows) => {
    const headers = ["ID", "Name", "Email", "Phone Number", "Total Cylinders"];

    const data = rows.map((row) => ({
      ID: row.original.customerId,
      Name: row.original.name,
      Email: row.original.email,
      "Phone Number": row.original.phone,
      "Total Cylinders": row.original.totalCylinders,
    }));

    exportToCSV(data, headers, "Admin Initiated Orders.csv");
  };

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <Row className="mb-3 align-items-center">
          <Col xs={6}>
            <Label for="title">Title</Label>
            <Input
              name="title"
              placeholder="Title"
              id="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={6}>
            <Label for="message">Message</Label>
            <Input
              name="message"
              placeholder="Message"
              id="message"
              type="text"
              value={formData.message}
              onChange={handleInputChange}
            />
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col xs={3}>
            <Input
              placeholder="Number Of Days"
              type="number"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs="auto">
            <Button color="primary" onClick={handleSubmitNumberOfDays}>
              Submit
            </Button>
          </Col>
        </Row>

        <div className="table-responsive">
          <MaterialReactTable
            columns={warningCustomerColumns}
            data={filteredWarningCustomers}
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
                  Export to CSV
                </Button>
              </Box>
            )}
          />
        </div>

        <Col xs={12} className="mt-3 text-center" onClick={handleFinish}>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
      </CardBody>

      <CardBody>
        <h5>Admin Initiated Orders</h5>
        <div className="table-responsive">
          <MaterialReactTable
            columns={commonColumns}
            data={adminWarningCustomer.adminWarningCustomers}
            muiTableProps={{
              sx: {
                "& th": {
                  background: "#0A80BF",
                  color: "white",
                  whiteSpace: "nowrap",
                  padding: "10px",
                  minWidth: "230px",
                },
              },
            }}
            renderTopToolbarCustomActions={({ table }) => (
              <Box>
                <Button
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  color="primary"
                  onClick={() =>
                    handleExportRowsToCSVAdmin(
                      table.getPrePaginationRowModel().rows
                    )
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
                  Export to CSV
                </Button>
              </Box>
            )}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default WarningCustomersTable;
