import React from "react";
import { Card, CardBody } from "reactstrap";
import FilledMovementForm from "./filled_movement_form";

const FilledMovement = () => {
  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <FilledMovementForm />
      </CardBody>
    </Card>
  );
};

export default FilledMovement;
