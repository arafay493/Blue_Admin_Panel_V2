import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAllApprovedInfluencer,
  fetchAllPendingInfluencer,
  fetchAllRejectedInfluencer,
} from "@/redux/slices/influencerSlice";
import PendingInfluencerTable from "../PendingInfluencer";
import ApprovedInfluencerTable from "../ApprovedInfluencer";
import RejectedInfluencerTable from "../RejectedInfluencer";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

const InfluencerMainTable = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(0);
  const {
    pendingInfluencers,
    approvedInfluencers,
    rejectedInfluencers,
  } = useAppSelector((state) => state.influencerReducer);
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(fetchAllPendingInfluencer());
    dispatch(fetchAllApprovedInfluencer());
    dispatch(fetchAllRejectedInfluencer());
  }, []);
  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChangeTabs}
              aria-label="basic tabs example"
              variant="fullWidth"
            >
              <Tab label={"Pending Influencer"} {...a11yProps(0)} />
              <Tab label={"Approved Influencer"} {...a11yProps(1)} />
              <Tab label={"Rejected Influencer"} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <PendingInfluencerTable data={pendingInfluencers} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ApprovedInfluencerTable data={approvedInfluencers} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <RejectedInfluencerTable data={rejectedInfluencers} />
          </CustomTabPanel>
        </Box>
      </CardBody>
    </Card>
  );
};

export default InfluencerMainTable;
