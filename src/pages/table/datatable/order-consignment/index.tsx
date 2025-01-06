import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { CustomerHeading, OrderConsignment } from "utils/Constant";
import OrderConsignmentTable from "@/components/Table/DataTable/Api/OrderConsignment";

const OrderConsignmentPage = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={OrderConsignment}
        mainTitle={OrderConsignment}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <OrderConsignmentTable />
        </Row>
      </Container>
    </div>
  );
};

export default OrderConsignmentPage;
