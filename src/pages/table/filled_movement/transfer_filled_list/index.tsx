import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { FilledMovementHeading, TransferFilledHeading } from "utils/Constant";
import TransferFilledList from "@/components/Table/DataTable/FilledMovement/transfer_filled_list";

const TransferFilledPage = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={TransferFilledHeading}
        mainTitle={TransferFilledHeading}
        parent={FilledMovementHeading}
      />
      <Container fluid={true}>
        <Row>
          <TransferFilledList />
        </Row>
      </Container>
    </div>
  );
};

export default TransferFilledPage;
