import { MaterialReactTable } from "material-react-table";
import React, { useState } from "react";
import { WarehouseColumns } from "./columns";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCylinderHistoryReports } from "@/redux/slices/masterItemSlices";
import CylinderHistoryModal from "./CylinderHistoryModal";
import { Box, Tab, Tabs } from "@mui/material";

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

const Warehouse = ({ table_data }) => {
  const [value, setValue] = React.useState(0);
  const [rowData, setRowData] = useState(null);
  const [isCylinderHistoryModalOpen, setIsCylinderHistoryModalOpen] = useState(
    false
  );
  const dispatch = useAppDispatch();
  const { cylinderHistory } = useAppSelector(
    (state) => state?.cylinderHistory?.cylinderHistory
  );
  const fetchBarcodeData = (row) => {
    setRowData(row);
    dispatch(fetchCylinderHistoryReports(row.barcode));
    setIsCylinderHistoryModalOpen(true);
  };
  const warehouseColumns = WarehouseColumns(fetchBarcodeData);
  const handleCloseModal = () => {
    setIsCylinderHistoryModalOpen(false);
  };
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const uniqueLocateAtValues = table_data.reduce((acc, item) => {
    const location = item.locateAt.trim();
    if (!acc.includes(location)) {
      acc.push(location);
    }
    return acc;
  }, []);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChangeTabs}
            aria-label="dynamic tabs example"
            variant="scrollable"
          >
            {uniqueLocateAtValues.map((tab, index) => {
              const filteredCityData = table_data.filter(
                (item) => item.locateAt.trim() === tab
              );
              return (
                <Tab
                  key={index}
                  label={
                    <TabLabelWithBadge
                      label={tab}
                      count={filteredCityData?.length || 0}
                    />
                  }
                />
              );
            })}
          </Tabs>
        </Box>
        {uniqueLocateAtValues.map((tab, index) => {
          const filteredCityData = table_data.filter(
            (item) => item.locateAt.trim() === tab
          );
          return (
            <CustomTabPanel key={index} value={value} index={index}>
              <div className="table-responsive">
                <MaterialReactTable
                  columns={warehouseColumns}
                  data={filteredCityData || []}
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
                />
              </div>
            </CustomTabPanel>
          );
        })}
      </Box>

      {isCylinderHistoryModalOpen && (
        <CylinderHistoryModal
          isOpen={isCylinderHistoryModalOpen}
          toggle={handleCloseModal}
          cylinderHistory={cylinderHistory}
        />
      )}
    </>
  );
};

export default Warehouse;
