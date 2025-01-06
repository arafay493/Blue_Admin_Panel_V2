// @ts-nocheck
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { CashReceivablesHeading, PaymentsHeading } from "utils/Constant";
import CashReceivables from "@/components/Table/DataTable/Payments/CashReceivables";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={CashReceivablesHeading}
        mainTitle={CashReceivablesHeading}
        parent={PaymentsHeading}
      />
      <Container fluid={true}>
        <Row>
          <CashReceivables />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
