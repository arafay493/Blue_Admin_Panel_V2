import ActiveList from "@/components/Ui-kits/Lists/ActiveList";
import BadgeList from "@/components/Ui-kits/Lists/BadgeList";
import ContextualClass from "@/components/Ui-kits/Lists/ContextualClass";
import CustomList from "@/components/Ui-kits/Lists/CustomList";
import DefaultList from "@/components/Ui-kits/Lists/DefaultList";
import DisableList from "@/components/Ui-kits/Lists/DisableList";
import FlushList from "@/components/Ui-kits/Lists/FlushList";
import HorizontalList from "@/components/Ui-kits/Lists/HorizontalList";
import JsBehavior from "@/components/Ui-kits/Lists/JsBehaviorList";
import ListWithCheckbox from "@/components/Ui-kits/Lists/ListWithCheckbox";
import ListNumber from "@/components/Ui-kits/Lists/Listnumber";
import RadioList from "@/components/Ui-kits/Lists/RadioList";
import ScrollableList from "@/components/Ui-kits/Lists/ScrollableList";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import React from "react";
import { Container, Row } from "reactstrap";

const List = () => {
  return (
    <div className="page-body">
      <Breadcrumbs title="Lists" mainTitle="Lists" parent="Ui Kits" />
      <Container fluid={true}>
        <Row>
          <DefaultList />
          <ActiveList />
          <FlushList />
          <ContextualClass />
          <HorizontalList />
          <CustomList />
          <ListWithCheckbox />
          <RadioList />
          <ListNumber />
          <JsBehavior />
          <BadgeList />
          <DisableList />
          <ScrollableList />
        </Row>
      </Container>
    </div>
  );
};

export default List;
