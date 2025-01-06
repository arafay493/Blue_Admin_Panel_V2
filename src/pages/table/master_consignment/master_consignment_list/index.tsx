import React from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import {
  MasterConsignemntTitle,
  MasterConsignmentListHeading,
} from "utils/Constant";

import MasterConsignmentListTable from "@/components/Table/DataTable/MasterConsignment/MasterConsignmentList";

const MasterConsignmentList = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={MasterConsignmentListHeading}
        mainTitle={MasterConsignmentListHeading}
        parent={MasterConsignemntTitle}
      />
      <Container fluid={true}>
        <Row>
          <MasterConsignmentListTable />
        </Row>
      </Container>
    </div>
  );
};

export default MasterConsignmentList;
