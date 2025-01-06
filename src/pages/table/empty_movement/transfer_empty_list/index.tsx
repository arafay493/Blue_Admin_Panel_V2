import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { EmptyMovementHeading, TransferEmptyHeading } from "utils/Constant";
import TransferEmptyList from "@/components/Table/DataTable/EmptyMovement/transfer_empty_list";

const EmptyMovement = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={TransferEmptyHeading}
        mainTitle={TransferEmptyHeading}
        parent={EmptyMovementHeading}
      />
      <Container fluid={true}>
        <Row>
          <TransferEmptyList />
        </Row>
      </Container>
    </div>
  );
};

export default EmptyMovement;
