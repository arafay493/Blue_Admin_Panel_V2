import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { ChangePasswordHeading, AdminstratorHeading } from "utils/Constant";
import ChangePassword from "@/components/Table/DataTable/Administrator/ChangePassword";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={ChangePasswordHeading}
        mainTitle={ChangePasswordHeading}
        parent={AdminstratorHeading}
      />
      <Container fluid={true}>
        <Row>
          <ChangePassword />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
