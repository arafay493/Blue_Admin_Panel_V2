import React from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { CreateMasterConsignmentHeading, MasterConsignemntTitle } from "utils/Constant";
import CreateMasterConsignmentTable from "@/components/Table/DataTable/MasterConsignment/CreateMasterConsignmentComponents";

const CreateMasterConsignment = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={CreateMasterConsignmentHeading}
        mainTitle={CreateMasterConsignmentHeading}
        parent={MasterConsignemntTitle}
      />
      <Container fluid={true}>
        <Row>
          <CreateMasterConsignmentTable />
        </Row>
      </Container>
    </div>
  );
};

export default CreateMasterConsignment;
