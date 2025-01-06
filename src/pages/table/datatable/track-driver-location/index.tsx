import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { CustomerHeading, TrackDriverLocationHeading } from "utils/Constant";
import TrackDriverLocation from "@/components/Table/DataTable/Api/TrackDriverLocation";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={TrackDriverLocationHeading}
        mainTitle={TrackDriverLocationHeading}
        parent={CustomerHeading}
      />
      <Container fluid={true}>
        <Row>
          <TrackDriverLocation />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
    