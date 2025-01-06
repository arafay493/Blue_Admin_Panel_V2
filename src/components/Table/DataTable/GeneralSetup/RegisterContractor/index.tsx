import React from "react";
import { Card, CardBody } from "reactstrap";
import RegisterContractorForm from "./RegisterContractorForm";

const RegisterContractor = () => {
  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <RegisterContractorForm />
      </CardBody>
    </Card>
  );
};

export default RegisterContractor;
