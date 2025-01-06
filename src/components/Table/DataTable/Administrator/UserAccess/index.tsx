import React from "react";

import { Card, CardBody } from "reactstrap";
import UserAccessForm from "./UserAccessForm";

const UserAccess = () => {
  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <UserAccessForm />
        <div className="table-responsive"></div>
      </CardBody>
    </Card>
  );
};

export default UserAccess;
