import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { CreateUserFormHeading, AdminstratorHeading } from "utils/Constant";
import CreateUserForm from "@/components/Table/DataTable/Administrator/CreateUserForm";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={CreateUserFormHeading}
        mainTitle={CreateUserFormHeading}
        parent={AdminstratorHeading}
      />
      <Container fluid={true}>
        <Row>
          <CreateUserForm />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
