import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { GeneralSetupHeading, PaymentMethodHeading } from "utils/Constant";
import PaymentMethodTable from "@/components/Table/DataTable/GeneralSetup/PaymentManagement";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={PaymentMethodHeading}
        mainTitle={PaymentMethodHeading}
        parent={GeneralSetupHeading}
      />
      <Container fluid={true}>
        <Row>
          <PaymentMethodTable />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
