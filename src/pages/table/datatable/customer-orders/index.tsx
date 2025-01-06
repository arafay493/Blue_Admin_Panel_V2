import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { CustomerOrders, CustomerHeading } from "utils/Constant";
import CustomerOrderTable from "@/components/Table/DataTable/Api/CustomerOrders";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={CustomerOrders}
        mainTitle={CustomerOrders}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <CustomerOrderTable />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
