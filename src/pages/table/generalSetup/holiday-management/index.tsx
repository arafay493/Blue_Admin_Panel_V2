import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { GeneralSetupHeading, HolidayHeading } from "utils/Constant";
import HolidayManagement from "@/components/Table/DataTable/GeneralSetup/HolidayManagement";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={HolidayHeading}
        mainTitle={HolidayHeading}
        parent={GeneralSetupHeading}
      />
      <Container fluid={true}>
        <Row>
          <HolidayManagement />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
