import React from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { InfluencerListHeading, InfluencerTitle } from "utils/Constant";
import InfluencerMainTable from "@/components/Table/DataTable/Influencer/InfluencerMainComponent";

const Influencer = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={InfluencerListHeading}
        mainTitle={InfluencerListHeading}
        parent={InfluencerTitle}
      />
      <Container fluid={true}>
        <Row>
          <InfluencerMainTable />
        </Row>
      </Container>
    </div>
  );
};

export default Influencer;
