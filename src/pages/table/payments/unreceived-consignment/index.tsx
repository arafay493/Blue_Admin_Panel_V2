// @ts-nocheck
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import {
  CashManagementHeading,
  UnreceivablesConsHeading,
} from "utils/Constant";
import CashReceivables from "@/components/Table/DataTable/Payments/CashReceivables";
import UnreceivedConsignment from "@/components/Table/DataTable/Payments/UnreceivedConsignment";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={UnreceivablesConsHeading}
        mainTitle={UnreceivablesConsHeading}
        parent={CashManagementHeading}
      />
      <Container fluid={true}>
        <Row>
          <UnreceivedConsignment />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
