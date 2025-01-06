import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import {
  MasterItems,
  AddItemTypeHeading,
} from "utils/Constant";
import AddItemTypesTable from "@/components/Table/DataTable/MasterItems/AddItemsTypesComponents";

const AddItemType = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={AddItemTypeHeading}
        mainTitle={AddItemTypeHeading}
        parent={MasterItems}
      />
      <Container fluid={true}>
        <Row>
          <AddItemTypesTable />
        </Row>
      </Container>
    </div>
  );
};

export default AddItemType;
