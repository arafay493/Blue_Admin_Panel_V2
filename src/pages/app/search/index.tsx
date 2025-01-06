import SearchInput from "@/components/app/SearchWebsite/SearchInput";
import SearchTabContent from "@/components/app/SearchWebsite/SearchTabContent";
import SearchTabs from "@/components/app/SearchWebsite/SearchTabs";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { useCallback, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { SearchPages, SearchWebsite } from "utils/Constant";

const SearchResult = () => {
  const [activeTab, setActiveTab] = useState(1);
  const callback = useCallback((tab: number) => {
    setActiveTab(tab);
  }, []);
  return (
    <div className="page-body">
      <Breadcrumbs title={SearchWebsite} mainTitle={SearchWebsite} parent={SearchPages}/>
      <Container fluid className="search-page">
        <Row>
          <Col sm={12}>
            <Card>
              <SearchInput />
              <CardBody>
                <SearchTabs callbackActive={callback} activeTabValue={1} />
                <SearchTabContent activeTab={activeTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchResult;
