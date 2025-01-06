import DepositListComponent from "@/components/Table/DataTable/Deposit/deposit-list";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import React from "react";
import { Container, Row } from "reactstrap";
import { CashManagementHeading, DepositListHeading } from "utils/Constant";

const DepositList = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={DepositListHeading}
        mainTitle={DepositListHeading}
        parent={CashManagementHeading}
      />
      <Container fluid={true}>
        <Row>
          <DepositListComponent />
        </Row>
      </Container>
    </div>
  );
};

export default DepositList;
