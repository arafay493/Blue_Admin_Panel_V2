import React from "react";
import { Card, CardBody } from "reactstrap";
import EmptyMovementFormComponent from "./empty_movement_form";

const EmptyMovementForm = () => {
  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <EmptyMovementFormComponent />
      </CardBody>
    </Card>
  );
};

export default EmptyMovementForm;
