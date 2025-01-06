import BasicTypeAhead from "@/components/Forms/Widget/TypeAhead/BasicTypeAhead";
import BloodHound from "@/components/Forms/Widget/TypeAhead/BloodHound";
import CustomTemplates from "@/components/Forms/Widget/TypeAhead/CustomTemplates";
import MultipleSectionsWithHeaders from "@/components/Forms/Widget/TypeAhead/MultipleSectionsWithHeaders";
import PreFetch from "@/components/Forms/Widget/TypeAhead/PreFetch";
import RtlSupport from "@/components/Forms/Widget/TypeAhead/RTL/RtlSupport";
import RemoteTypeAhead from "@/components/Forms/Widget/TypeAhead/RemoteTypeAhead";
import ScrollableDropdownMenu from "@/components/Forms/Widget/TypeAhead/ScrollableDropdownMenu";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { Container, Row } from "reactstrap";
import { TypeAheadHeading, FormWidgetsHeading } from "utils/Constant";

const TypeAhead = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        mainTitle={TypeAheadHeading}
        parent={FormWidgetsHeading}
        title={TypeAheadHeading}
      />
      <Container fluid={true}>
        <div className="typeahead typeahead-wrapper">
          <Row>
            <BasicTypeAhead/>
            <PreFetch/>
            <BloodHound/>
            <RemoteTypeAhead/>
            <CustomTemplates/>
            <MultipleSectionsWithHeaders/>
            <ScrollableDropdownMenu/>
            <RtlSupport/>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default TypeAhead;
