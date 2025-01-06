import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  fetchLocation,
  fetchLocationType,
  fetchHolidays,
} from "@/redux/slices/generalSetupSlice";

import AddHolidayForm from "./AddHolidayForm";
import { fetchRegionManagement } from "@/redux/slices/administratorSlice";

const HolidayManagement = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLocation());
    dispatch(fetchLocationType());
    dispatch(fetchHolidays());
    dispatch(fetchRegionManagement());
  }, [dispatch]);

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <AddHolidayForm />
      </CardBody>
    </Card>
  );
};

export default HolidayManagement;
