import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { RegionalPricing, CustomerHeading } from "utils/Constant";
import RegionalPricingTable from "@/components/Table/DataTable/Api/RegionalPricing";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={RegionalPricing}
        mainTitle={RegionalPricing}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <RegionalPricingTable />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
