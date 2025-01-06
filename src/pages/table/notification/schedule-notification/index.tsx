import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { Notifications, ScheduleNotificationTitle } from "utils/Constant";
import ScheduleNotifications from "@/components/Table/DataTable/Notifications/schedule-notification";

const ScheduleNotification = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={ScheduleNotificationTitle}
        mainTitle={ScheduleNotificationTitle}
        parent={Notifications}
      />
      <Container fluid={true}>
        <Row>
          <ScheduleNotifications />
        </Row>
      </Container>
    </div>
  );
};

export default ScheduleNotification;
