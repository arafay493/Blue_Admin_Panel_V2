import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { AllOrderReports, CustomerHeading } from "utils/Constant";
import OrderReportTable from "@/components/Table/DataTable/Api/OrderReport";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={AllOrderReports}
        mainTitle={AllOrderReports}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <OrderReportTable />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
