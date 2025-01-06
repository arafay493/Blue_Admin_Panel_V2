import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { FilledMovementHeading, InOutHeading } from "utils/Constant";
import FilledMovement from "@/components/Table/DataTable/FilledMovement";

const OrderDeliveryPage = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={InOutHeading}
        mainTitle={InOutHeading}
        parent={FilledMovementHeading}
      />
      <Container fluid={true}>
        <Row>
          <FilledMovement />
        </Row>
      </Container>
    </div>
  );
};

export default OrderDeliveryPage;
