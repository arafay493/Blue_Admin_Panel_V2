// @ts-nocheck
import { useAppSelector } from "@/redux/hooks";
import { MaterialReactTable } from "material-react-table";
import moment from "moment";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import { AssignedVoucherListColumns } from "./columns";
import Loader from "@/components/Loader/Loader";

const ViewModal = ({ isOpen, toggle, voucher }) => {
  const { singleVoucher, loading } = useAppSelector(
    (state) => state?.singleVoucher.singleVoucher
  );

  const columns = AssignedVoucherListColumns({ singleVoucher });

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>View Discount Voucher</ModalHeader>
      <ModalBody>
        <StaticInputs
          labels={[
            "ID",
            "Name",
            "Applicable From",
            "Applicable To",
            "Discount Type",
            "Discount Value",
            "Discount Cap Amount",
            "Minimum Order Amount",
          ]}
          values={[
            voucher?.id || "NA",
            voucher?.name || "NA",
            moment(voucher?.applicableFrom).format("DD-MM-YYYY") || "NA",
            moment(voucher?.applicableTo).format("DD-MM-YYYY") || "NA",
            voucher?.discountType || "NA",
            voucher?.discountValue || "NA",
            voucher?.discountCapAmount || "NA",
            voucher?.minimumOrderAmount || "NA",
          ]}
        />
        <hr />
        {loading ? (
          <Loader />
        ) : (
          <div className="table-responsive">
            <MaterialReactTable
              columns={columns}
              data={singleVoucher || []}
              muiTableProps={{
                sx: {
                  "& th": {
                    background: "#0A80BF",
                    color: "white",
                    whiteSpace: "nowrap",
                    padding: "10px",
                    minWidth: "230px",
                  },
                },
              }}
              initialState={{
                pagination: { pageSize: 5, pageIndex: 0 },
              }}
            />
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ViewModal;
