import React from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { InfluencerTitle, ReferrersHeading } from "utils/Constant";
import ReferrerComponent from "@/components/Table/DataTable/Referrer";

const Influencer = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={ReferrersHeading}
        mainTitle={ReferrersHeading}
        parent={InfluencerTitle}
      />
      <Container fluid={true}>
        <Row>
          <ReferrerComponent />
        </Row>
      </Container>
    </div>
  );
};

export default Influencer;
