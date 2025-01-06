import React from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { MasterItems, BatchStatusReportHeading } from "utils/Constant";
import BatchStatusReportTable from "@/components/Table/DataTable/MasterItems/BatchStatusReportComponents";

const BatchStatusReport = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={BatchStatusReportHeading}
        mainTitle={BatchStatusReportHeading}
        parent={MasterItems}
      />
      <Container fluid={true}>
        <Row>
          <BatchStatusReportTable />
        </Row>
      </Container>
    </div>
  );
};

export default BatchStatusReport;
