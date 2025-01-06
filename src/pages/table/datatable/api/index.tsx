// @ts-nocheck
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { CustomerList, CustomerHeading } from "utils/Constant";
import CustomerTable from "../../../../components/Table/DataTable/Api/AddRows";


const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={CustomerList}
        mainTitle={CustomerList}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <CustomerTable />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
