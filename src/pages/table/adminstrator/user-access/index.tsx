import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { UserAccessHeading, AdminstratorHeading } from "utils/Constant";
import UserAccess from "@/components/Table/DataTable/Administrator/UserAccess";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={UserAccessHeading}
        mainTitle={UserAccessHeading}
        parent={AdminstratorHeading}
      />
      <Container fluid={true}>
        <Row>
          <UserAccess />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
