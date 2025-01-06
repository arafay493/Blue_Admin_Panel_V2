// @ts-nocheck
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import Transactions from "../../../../components/Table/DataTable/Api/Transactions";
import { AllTransactionList, CustomerHeading } from "utils/Constant";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={AllTransactionList}
        mainTitle={AllTransactionList}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <Transactions />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
