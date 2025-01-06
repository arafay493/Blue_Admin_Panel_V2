// @ts-nocheck
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { CashManagementHeading, ReceivablesConsHeading } from "utils/Constant";
import CashReceivables from "@/components/Table/DataTable/Payments/CashReceivables";
import ReceivablesConsginment from "@/components/Table/DataTable/Payments/ReceivableConsignment";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={ReceivablesConsHeading}
        mainTitle={ReceivablesConsHeading}
        parent={CashManagementHeading}
      />
      <Container fluid={true}>
        <Row>
          <ReceivablesConsginment />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
