import React from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { MasterItems, CylinderStatusHeading } from "utils/Constant";
import CylinderStatusTable from "@/components/Table/DataTable/MasterItems/CylinderStatusComponents";

const CylinderStatus = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={CylinderStatusHeading}
        mainTitle={CylinderStatusHeading}
        parent={MasterItems}
      />
      <Container fluid={true}>
        <Row>
          <CylinderStatusTable />
        </Row>
      </Container>
    </div>
  );
};

export default CylinderStatus;
