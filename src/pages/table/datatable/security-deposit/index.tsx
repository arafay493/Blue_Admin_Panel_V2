import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { SecurityDeposit, CustomerHeading } from "utils/Constant";
import SecurityDepositTable from "@/components/Table/DataTable/Api/SecurityDeposit";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={SecurityDeposit}
        mainTitle={SecurityDeposit}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <SecurityDepositTable />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
