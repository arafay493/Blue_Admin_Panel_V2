import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { otp, AdminstratorHeading } from "utils/Constant";
import OTP from "@/components/Table/DataTable/Administrator/OTP";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs title={otp} mainTitle={otp} parent={AdminstratorHeading} />
      <Container fluid={true}>
        <Row>
          <OTP />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
