import { Container, Row } from "reactstrap";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { DiscountAndVouchers, DiscountVouchers } from "utils/Constant";
import OrderDeliveryTable from "@/components/Table/DataTable/Api/OrderDelivery";
import DiscountVouchersTable from "@/components/Table/DataTable/DiscountAndVouchers/discount-vouchers";

const OrderDeliveryPage = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={DiscountVouchers}
        mainTitle={DiscountVouchers}
        parent={DiscountAndVouchers}
      />
      <Container fluid={true}>
        <Row>
          <DiscountVouchersTable />
        </Row>
      </Container>
    </div>
  );
};

export default OrderDeliveryPage;
