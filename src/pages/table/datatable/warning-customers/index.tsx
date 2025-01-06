import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { WarningCustomersList, CustomerHeading } from "utils/Constant";
import WarningCustomersTable from "@/components/Table/DataTable/Api/WarningCustomers";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={WarningCustomersList}
        mainTitle={WarningCustomersList}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <WarningCustomersTable />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
