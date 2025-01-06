import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import {
  Notifications,
  NotificationSenderTitle,
} from "utils/Constant";
import NotificationSenderTable from "@/components/Table/DataTable/Notifications/notification-sender";

const NotificationSender = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={NotificationSenderTitle}
        mainTitle={NotificationSenderTitle}
        parent={Notifications}
      />
      <Container fluid={true}>
        <Row>
          <NotificationSenderTable />
        </Row>
      </Container>
    </div>
  );
};

export default NotificationSender;
