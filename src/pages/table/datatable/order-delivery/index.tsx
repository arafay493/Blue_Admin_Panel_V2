import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { CustomerHeading, OrderDelivery } from "utils/Constant";
import OrderDeliveryTable from "@/components/Table/DataTable/Api/OrderDelivery";

const OrderDeliveryPage = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={OrderDelivery}
        mainTitle={OrderDelivery}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <OrderDeliveryTable />
        </Row>
      </Container>
    </div>
  );
};

export default OrderDeliveryPage;
