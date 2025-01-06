import React, { useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Card, CardBody, Col } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchOTPType } from "@/redux/slices/administratorSlice";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassword = () => {
  const dispatch = useAppDispatch();

  const { otp } = useAppSelector((state) => state.otp);

  useEffect(() => {
    dispatch(fetchOTPType());
  }, [dispatch]);

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <ChangePasswordForm />
      </CardBody>
    </Card>
  );
};

export default ChangePassword;
