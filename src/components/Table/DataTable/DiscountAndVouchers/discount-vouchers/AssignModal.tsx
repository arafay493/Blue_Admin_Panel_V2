// @ts-nocheck
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MaterialReactTable } from "material-react-table";
import moment from "moment";
import React, { useState } from "react";
import {
  Button,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import { CustomerColumns } from "./columns";
import { TextField } from "@mui/material";
import { AssignVoucherToCustomerService } from "@/redux/services/discountAndVouchersService";
import { fetchDiscountedVouchers } from "@/redux/slices/discountAndVouchersSlice";
const AssignModal = ({ isOpen, toggle, voucher }) => {
  const dispatch = useAppDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const [availCount, setAvailCount] = useState(1);
  const [dataReady, setDataReady] = useState(false);
  const { customers, loading } = useAppSelector(
    (state) => state?.customerSlice?.customer
  );

  const handleChange = (e) => {
    const avail = Number(e.target.value);
    if (avail > 0) {
      setAvailCount(avail);
    } else {
      toast.error("Avail count cannot be less than 1");
    }
  };

  const transformData = (voucherData, customersData) => {
    return {
      voucherId: voucherData.id,
      assignVoucherToCustomers: customersData.map((customer) => ({
        customerId: customer.customerId,
        availCountCap: availCount,
      })),
    };
  };

  const handleFinish = async () => {
    if (selectedRows.length > 0) {
      const result = transformData(voucher, selectedRows);

      const res = await AssignVoucherToCustomerService(result);

      if (res.succeeded == false) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        dispatch(fetchDiscountedVouchers());
        toggle();
      }
    } else {
      toast.error("Please select atleast one customer.");
    }
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    if (checked) {
      const selectedRowsData = customers?.map((row) => row);
      setSelectedRows(selectedRowsData);
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (row) => {
    const id = row?.id;
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.some((item) => item.id === id)) {
        return prevSelectedRows.filter((item) => item.id !== id);
      } else {
        return [...prevSelectedRows, row];
      }
    });
  };

  const customerCols = CustomerColumns({
    handleSelectAll,
    handleCheckboxChange,
    selectedRows,
    customers,
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Assign Discount Voucher</ModalHeader>
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
            voucher.id || "NA",
            voucher.name || "NA",
            moment(voucher.applicableFrom).format("DD-MM-YYYY") || "NA",
            moment(voucher.applicableTo).format("DD-MM-YYYY") || "NA",
            voucher.discountType || "NA",
            voucher.discountValue || "NA",
            voucher.discountCapAmount || "NA",
            voucher.minimumOrderAmount || "NA",
          ]}
        />
        <hr />
        <Row className="mb-3">
          <Col xs={12}>
            <Label for="availCount">Avail Count</Label>
            <TextField
              id="availCount"
              name="availCount"
              variant="outlined"
              size="small"
              fullWidth={true}
              type="number"
              onChange={handleChange}
              placeholder="Avail Count"
              value={availCount}
            />
          </Col>
        </Row>

        {customers?.length > 0 && (
          <div className="table-responsive">
            <MaterialReactTable
              columns={customerCols}
              data={customers}
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
        <Row className="mb-3">
          <Col xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={handleFinish}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default AssignModal;
