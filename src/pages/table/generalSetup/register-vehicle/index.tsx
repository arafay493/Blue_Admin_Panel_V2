import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { GeneralSetupHeading, RegisterVehicleHeading } from "utils/Constant";
import RegisterVehicle from "@/components/Table/DataTable/GeneralSetup/RegisterVehicle";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={RegisterVehicleHeading}
        mainTitle={RegisterVehicleHeading}
        parent={GeneralSetupHeading}
      />
      <Container fluid={true}>
        <Row>
          <RegisterVehicle />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
