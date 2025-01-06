import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { EmptyMovementHeading, InOutEmptyHeading } from "utils/Constant";
import EmptyMovementForm from "@/components/Table/DataTable/EmptyMovement/empty_movement_form";


const OrderDeliveryPage = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={InOutEmptyHeading}
        mainTitle={InOutEmptyHeading}
        parent={EmptyMovementHeading}
      />
      <Container fluid={true}>
        <Row>
          <EmptyMovementForm />
        </Row>
      </Container>
    </div>
  );
};

export default OrderDeliveryPage;
