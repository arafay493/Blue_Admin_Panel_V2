import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { GeneralSetupHeading, RegisterContractorHeading } from "utils/Constant";
import RegisterContractor from "@/components/Table/DataTable/GeneralSetup/RegisterContractor";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={RegisterContractorHeading}
        mainTitle={RegisterContractorHeading}
        parent={GeneralSetupHeading}
      />
      <Container fluid={true}>
        <Row>
          <RegisterContractor />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
