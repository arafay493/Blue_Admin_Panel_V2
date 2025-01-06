import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { UserListHeading, AdminstratorHeading } from "utils/Constant";
import UserList from "@/components/Table/DataTable/Administrator/UserList";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={UserListHeading}
        mainTitle={UserListHeading}
        parent={AdminstratorHeading}
      />
      <Container fluid={true}>
        <Row>
          <UserList />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
