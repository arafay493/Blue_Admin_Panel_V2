import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { GeneralSetupHeading, RegisterLocationHeading } from "utils/Constant";
import LocationListTable from "@/components/Table/DataTable/GeneralSetup/LocationList";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={RegisterLocationHeading}
        mainTitle={RegisterLocationHeading}
        parent={GeneralSetupHeading}
      />
      <Container fluid={true}>
        <Row>
          <LocationListTable />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
