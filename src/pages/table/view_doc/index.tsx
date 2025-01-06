import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { MasterConsignemntTitle, ViewDocumentHeading } from "utils/Constant";
import ViewDoc from "@/components/Table/View-doc";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={ViewDocumentHeading}
        mainTitle={ViewDocumentHeading}
        parent={MasterConsignemntTitle}
      />
      <Container fluid={true}>
        <Row>
          <ViewDoc />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
