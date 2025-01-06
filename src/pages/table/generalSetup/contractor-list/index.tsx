import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { GeneralSetupHeading, ContractorListHeading } from "utils/Constant";
import ContractorListTable from "@/components/Table/DataTable/GeneralSetup/ContractorList";

const Api = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={ContractorListHeading}
        mainTitle={ContractorListHeading}
        parent={GeneralSetupHeading}
      />
      <Container fluid={true}>
        <Row>
          <ContractorListTable />
        </Row>
      </Container>
    </div>
  );
};

export default Api;
