import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { GeneralSetupHeading, RegisterDriverHeading } from "utils/Constant";
import RegisterDriver from "@/components/Table/DataTable/GeneralSetup/RegisterDriver";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={RegisterDriverHeading}
        mainTitle={RegisterDriverHeading}
        parent={GeneralSetupHeading}
      />
      <Container fluid={true}>
        <Row>
          <RegisterDriver />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
