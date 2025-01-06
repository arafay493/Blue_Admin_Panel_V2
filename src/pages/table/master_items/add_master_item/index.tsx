import React from 'react'
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import {
  MasterItems,
  AddMasterItemHeading,
} from "utils/Constant";
import AddMasterItemsTable from '@/components/Table/DataTable/MasterItems/AddMasterItemsComponents';

const AddMasterItems = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={AddMasterItemHeading}
        mainTitle={AddMasterItemHeading}
        parent={MasterItems}
      />
      <Container fluid={true}>
        <Row>
          <AddMasterItemsTable />
        </Row>
      </Container>
    </div>
  );
}

export default AddMasterItems