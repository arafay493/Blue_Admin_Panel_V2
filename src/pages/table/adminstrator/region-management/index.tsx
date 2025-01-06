import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { RegionManagementHeading, AdminstratorHeading } from "utils/Constant";
import RegionManagement from "@/components/Table/DataTable/Administrator/RegionManagement";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={RegionManagementHeading}
        mainTitle={RegionManagementHeading}
        parent={AdminstratorHeading}
      />
      <Container fluid={true}>
        <Row>
          <RegionManagement />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
