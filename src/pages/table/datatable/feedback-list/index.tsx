import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { FeedbackList, CustomerHeading } from "utils/Constant";
import FeedbackTable from "@/components/Table/DataTable/Api/FeedbackList";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={FeedbackList}
        mainTitle={FeedbackList}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <FeedbackTable />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
