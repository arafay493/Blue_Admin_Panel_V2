import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { RegionPricing, CustomerHeading } from "utils/Constant";
import RegionPricingTable from "@/components/Table/DataTable/Api/RegionPricing";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={RegionPricing}
        mainTitle={RegionPricing}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <RegionPricingTable />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
