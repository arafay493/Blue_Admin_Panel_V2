import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { CreateUserHeading, AdminstratorHeading } from "utils/Constant";
import CreateUser from "@/components/Table/DataTable/Administrator/CreateUser";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={CreateUserHeading}
        mainTitle={CreateUserHeading}
        parent={AdminstratorHeading}
      />
      <Container fluid={true}>
        <Row>
          <CreateUser />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
