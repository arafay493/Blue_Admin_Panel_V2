import React from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { MasterItems, MasterBatchHeading } from "utils/Constant";
import MasterBatchTable from "@/components/Table/DataTable/MasterItems/MasterBatchComponents";

const MasterBatch = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={MasterBatchHeading}
        mainTitle={MasterBatchHeading}
        parent={MasterItems}
      />
      <Container fluid={true}>
        <Row>
          <MasterBatchTable />
        </Row>
      </Container>
    </div>
  )
}

export default MasterBatch