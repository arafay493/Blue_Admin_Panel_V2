import DepositFormComponent from "@/components/Table/DataTable/Deposit/deposit-form";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import React from "react";
import { Container, Row } from "reactstrap";
import { CashManagementHeading, DepositFormHeading } from "utils/Constant";

const DepositList = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={DepositFormHeading}
        mainTitle={DepositFormHeading}
        parent={CashManagementHeading}
      />
      <Container fluid={true}>
        <Row>
          <DepositFormComponent />
        </Row>
      </Container>
    </div>
  );
};

export default DepositList;
