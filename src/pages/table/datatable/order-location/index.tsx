import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { CustomerHeading, OrdersLocation } from "utils/Constant";
import OrderLocation from "@/components/Table/DataTable/Api/OrderLocation";

const OrderDeliveryPage = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={OrdersLocation}
        mainTitle={OrdersLocation}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <OrderLocation />
        </Row>
      </Container>
    </div>
  );
};

export default OrderDeliveryPage;
