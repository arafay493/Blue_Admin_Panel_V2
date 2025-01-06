import React from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { MasterItems, AddItemLocationHeading } from "utils/Constant";
import AddItemLocationTable from "@/components/Table/DataTable/MasterItems/AddItemLocationComponents";

const AddItemLocation = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={AddItemLocationHeading}
        mainTitle={AddItemLocationHeading}
        parent={MasterItems}
      />
      <Container fluid={true}>
        <Row>
          <AddItemLocationTable />
        </Row>
      </Container>
    </div>
  );
};

export default AddItemLocation;
