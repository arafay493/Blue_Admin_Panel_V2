import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Input } from "reactstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  BottlingUnitColumns,
  CustomerColumns,
  GeneralReportColumns,
  VehiclesColumns,
  WarehouseColumns,
} from "./columns";
import { MaterialReactTable } from "material-react-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAllCylinderStatusReports,
  fetchCylinderHistoryReports,
} from "@/redux/slices/masterItemSlices";
import { fetchCylinderHistory } from "@/redux/services/masterItemServices";
import CylinderHistoryModal from "./CylinderHistoryModal";
import Loader from "@/components/Loader/Loader";
import Bottling_Unit from "./Bottling_Unit";
import Warehouse from "./Warehouse";
import { FiDownload } from "react-icons/fi";
import moment from "moment";
import { exportToCSV } from "utils/csvUtils";
import { useMediaQuery, useTheme } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabLabelWithBadge = ({ label, count }) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    {label}
    <span
      style={{
        marginLeft: "8px",
        padding: "2px 8px",
        backgroundColor: "#1976d2",
        borderRadius: "5px",
        color: "#fff",
        fontSize: "0.75rem",
        fontWeight: "bold",
        minWidth: "20px",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {count}
    </span>
  </Box>
);

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CylinderStatusTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = React.useState(0);
  const [rowData, setRowData] = React.useState(null);
  const [isCylinderHistoryModalOpen, setIsCylinderHistoryModalOpen] = useState(
    false
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const cylinderStatus: any = useAppSelector(
    (state) => state?.cylinderStatus?.cylinderStatus?.cylinderStatus
  );
  const loading: boolean = useAppSelector(
    (state) => state?.cylinderStatus?.cylinderStatus?.loading
  );
  const { cylinderHistory } = useAppSelector(
    (state) => state?.cylinderHistory?.cylinderHistory
  );

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedCityId
  );

  const fetchBarcodeData = (row) => {
    setRowData(row);
    dispatch(fetchCylinderHistoryReports(row.barcode));
    setIsCylinderHistoryModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsCylinderHistoryModalOpen(false);
  };
  const generalReportColumns = GeneralReportColumns();
  const bottlingUnitColumns = BottlingUnitColumns(fetchBarcodeData);
  const warehouseColumns = WarehouseColumns(fetchBarcodeData);
  const vehiclesColumns = VehiclesColumns(fetchBarcodeData);
  const customerColumns = CustomerColumns(fetchBarcodeData);

  useEffect(() => {
    dispatch(fetchAllCylinderStatusReports(selectedCityId));
  }, [selectedCityId]);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm) {
      const allData = [
        ...(cylinderStatus?.generalReport || []),
        ...(cylinderStatus?.allBUs || []),
        ...(cylinderStatus?.wHs || []),
        ...(cylinderStatus?.vehicles || []),
        ...(cylinderStatus?.customers || []),
      ];

      const foundItem = allData.find((item) =>
        item?.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (foundItem) {
        if (
          cylinderStatus?.generalReport?.some(
            (item) => item.barcode === foundItem.barcode
          )
        ) {
          setValue(0);
        } else if (
          cylinderStatus?.allBUs?.some(
            (item) => item.barcode === foundItem.barcode
          )
        ) {
          setValue(1);
        } else if (
          cylinderStatus?.wHs?.some(
            (item) => item.barcode === foundItem.barcode
          )
        ) {
          setValue(2);
        } else if (
          cylinderStatus?.vehicles?.some(
            (item) => item.barcode === foundItem.barcode
          )
        ) {
          setValue(3);
        } else if (
          cylinderStatus?.customers?.some(
            (item) => item.barcode === foundItem.barcode
          )
        ) {
          setValue(4);
        }
      }
    }
  };

  const filterData = (data) => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      item?.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredGeneralReport = filterData(cylinderStatus?.generalReport || []);
  const filteredBottlingUnit = filterData(
    selectedCityId ? (cylinderStatus?.allBUs || []) : (cylinderStatus?.bUs || [])
  );
  const filteredWarehouse = filterData(cylinderStatus?.wHs || []);
  const filteredVehicles = filterData(cylinderStatus?.vehicles || []);
  const filteredCustomers = filterData(cylinderStatus?.customers || []);

  if (loading) return <Loader />;

  const handleExportRowsToCSVGenralReport = (rows) => {
    const headers = ["Item Name", "Quantity", "Location", "Is Filled"];

    const data = rows.map((row) => ({
      "Item Name": row.original.itemName,
      Quantity: row.original.qty,
      Location: row.original.locateAt,
      "Is Filled": row.original.isFilled ? "Yes" : "No",
    }));

    exportToCSV(data, headers, "General_Report.csv");
  };

  const handleExportRowsToCSVBottlingUnit = (rows) => {
    const headers = [
      "ID",
      "Cylinder ID",
      "Is Filled",
      "Date/Time",
      "Status",
      "Barcode",
      "Location",
      "Status Description",
    ];

    const data = rows.map((row) => ({
      ID: row.original.id,
      "Cylinder ID": row.original.cylinderId,
      "Is Filled": row.original.isFilled ? "Yes" : "No",
      "Date/Time": moment(row.original.at).format("DD-MM-YYYY hh:mm A"),
      Status: row.original.status,
      Barcode: row.original.barcode,
      Location: row.original.locateAt,
      "Status Description": row.original.statusDescription,
    }));

    exportToCSV(data, headers, "Bottling_Unit.csv");
  };

  const handleExportRowsToCSVWareHouse = (rows) => {
    const headers = [
      "ID",
      "Cylinder ID",
      "Is Filled",
      "Date/Time",
      "Status",
      "Barcode",
      "Location",
      "Status Description",
    ];

    const data = rows.map((row) => ({
      ID: row.original.id,
      "Cylinder ID": row.original.cylinderId,
      "Is Filled": row.original.isFilled ? "Yes" : "No",
      "Date/Time": moment(row.original.at).format("DD-MM-YYYY hh:mm A"),
      Status: row.original.status,
      Barcode: row.original.barcode,
      Location: row.original.locateAt,
      "Status Description": row.original.statusDescription,
    }));

    exportToCSV(data, headers, "Warehouse.csv");
  };

  const handleExportRowsToCSVVehicle = (rows) => {
    const headers = [
      "ID",
      "Cylinder ID",
      "Is Filled",
      "Date/Time",
      "Status",
      "Barcode",
      "Location",
      "Status Description",
    ];

    const data = rows.map((row) => ({
      ID: row.original.id,
      "Cylinder ID": row.original.cylinderId,
      "Is Filled": row.original.isFilled ? "Yes" : "No",
      "Date/Time": moment(row.original.at).format("DD-MM-YYYY hh:mm A"),
      Status: row.original.status,
      Barcode: row.original.barcode,
      Location: row.original.locateAt,
      "Status Description": row.original.statusDescription,
    }));

    exportToCSV(data, headers, "Warehouse.csv");
  };

  const handleExportRowsToCSVCustomer = (rows) => {
    const headers = [
      "Customer Name",
      "Order ID",
      "Address",
      "Location ID",
      "Customer ID",
      "Date/Time",
      "ID",
      "Cylinder ID",
      "Is Filled",
      "Status",
      "Barcode",
      "Location",
      "Status Description",
    ];

    const data = rows.map((row) => ({
      "Customer Name": row.original.name,
      "Order ID": row.original.orderId,
      Address: row.original.address,
      "Location ID": row.original.locationId,
      "Customer ID": row.original.customerId,
      "Date/Time": moment(row.original.at).format("DD-MM-YYYY hh:mm A"),
      ID: row.original.id,
      "Cylinder ID": row.original.cylinderId,
      "Is Filled": row.original.isFilled ? "Yes" : "No",
      Status: row.original.status,
      Barcode: row.original.barcode,
      Location: row.original.locateAt,
      "Status Description": row.original.statusDescription,
    }));

    exportToCSV(data, headers, "Customer.csv");
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChangeTabs}
              aria-label="basic tabs example"
              variant="scrollable"
            >
              <Tab
                label={
                  <TabLabelWithBadge
                    label="General Report"
                    count={filteredGeneralReport.length}
                  />
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <TabLabelWithBadge
                    label="Bottling Unit"
                    count={filteredBottlingUnit.length}
                  />
                }
                {...a11yProps(1)}
              />
              <Tab
                label={
                  <TabLabelWithBadge
                    label="Warehouse"
                    count={filteredWarehouse.length}
                  />
                }
                {...a11yProps(2)}
              />
              <Tab
                label={
                  <TabLabelWithBadge
                    label="Vehicles"
                    count={filteredVehicles.length}
                  />
                }
                {...a11yProps(3)}
              />
              <Tab
                label={
                  <TabLabelWithBadge
                    label="Customer"
                    count={filteredCustomers.length}
                  />
                }
                {...a11yProps(4)}
              />
            </Tabs>
            <Input
              type="text"
              placeholder="Search by Barcode"
              value={searchTerm}
              onChange={handleSearch}
              style={{ maxWidth: "300px", marginLeft: "auto" }}
            />
          </Box>
          <CustomTabPanel value={value} index={0}>
            {filteredGeneralReport.length > 0 && (
              <div className="table-responsive">
                <MaterialReactTable
                  columns={generalReportColumns}
                  data={filteredGeneralReport}
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
                        disabled={
                          table.getPrePaginationRowModel().rows.length === 0
                        }
                        color="primary"
                        onClick={() =>
                          handleExportRowsToCSVGenralReport(
                            table.getPrePaginationRowModel().rows
                          )
                        }
                        variant="text"
                        style={{
                          fontSize: isSmallScreen ? "12px" : "16px",
                        }}
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
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {filteredBottlingUnit.length > 0 && (
              <Bottling_Unit table_data={filteredBottlingUnit} />
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {filteredWarehouse.length > 0 && (
              <Warehouse table_data={filteredWarehouse} />
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            {filteredVehicles.length > 0 && (
              <div className="table-responsive">
                <MaterialReactTable
                  columns={vehiclesColumns}
                  data={filteredVehicles}
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
                        disabled={
                          table.getPrePaginationRowModel().rows.length === 0
                        }
                        color="primary"
                        onClick={() =>
                          handleExportRowsToCSVVehicle(
                            table.getPrePaginationRowModel().rows
                          )
                        }
                        variant="text"
                        style={{
                          fontSize: isSmallScreen ? "12px" : "16px",
                        }}
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
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            {filteredCustomers.length > 0 && (
              <div className="table-responsive">
                <MaterialReactTable
                  columns={customerColumns}
                  data={filteredCustomers}
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
                        disabled={
                          table.getPrePaginationRowModel().rows.length === 0
                        }
                        color="primary"
                        onClick={() =>
                          handleExportRowsToCSVCustomer(
                            table.getPrePaginationRowModel().rows
                          )
                        }
                        variant="text"
                        style={{
                          fontSize: isSmallScreen ? "12px" : "16px",
                        }}
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
            )}
          </CustomTabPanel>
        </Box>
        {isCylinderHistoryModalOpen && (
          <CylinderHistoryModal
            isOpen={isCylinderHistoryModalOpen}
            toggle={handleCloseModal}
            cylinderHistory={cylinderHistory}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default CylinderStatusTable;
