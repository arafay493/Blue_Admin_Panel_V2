import React from "react";
import { Card, CardBody } from "reactstrap";
import CreateMasterConsignmentForm from "./CreateMasterConsignmentForm";

const CreateMasterConsignmentTable = () => {
  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <CreateMasterConsignmentForm />
      </CardBody>
    </Card>
  );
};

export default CreateMasterConsignmentTable;
