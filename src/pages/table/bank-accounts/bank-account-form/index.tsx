import BankAccountFormComponent from "@/components/Table/DataTable/BankAccount/Bank-account-form";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import React from "react";
import { Container, Row } from "reactstrap";
import { BankAccountFormHeading, CashManagementHeading } from "utils/Constant";

const BankAccountForm = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={BankAccountFormHeading}
        mainTitle={BankAccountFormHeading}
        parent={CashManagementHeading}
      />
      <Container fluid={true}>
        <Row>
          <BankAccountFormComponent />
        </Row>
      </Container>
    </div>
  );
};

export default BankAccountForm;
