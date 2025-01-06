import ActiveDisable from "@/components/Bonus-Ui/Pagination/ActiveDisable";
import DefaultPagination from "@/components/Bonus-Ui/Pagination/Defaultpagination";
import IconPagination from "@/components/Bonus-Ui/Pagination/IconPagination";
import PaginationAlign from "@/components/Bonus-Ui/Pagination/PaginationAlign";
import PaginationSize from "@/components/Bonus-Ui/Pagination/PaginationSize";
import RoundedPagination from "@/components/Bonus-Ui/Pagination/RoundedPagination";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import React from "react";
import { Container, Row } from "reactstrap";

const Pagination = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title="Paginations"
        mainTitle="Paginations"
        parent="Bonus Ui"
      />
      <Container fluid={true}>
        <Row className="pagination-wrapper">
          <DefaultPagination />
          <ActiveDisable />
          <IconPagination />
          <RoundedPagination />
          <PaginationAlign />
          <PaginationSize />
        </Row>
      </Container>
    </div>
  );
};

export default Pagination;
