// @ts-nocheck
import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchCustomers } from "../../../../../redux/slices/customerSlice";
import { fetchCustomerLogs } from "../../../../../redux/slices/customerSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addWalletAmount } from "@/redux/services/customerService";
import CustomerLogsModal from "./CustomerLogsModal";
import { CustomerListColumns } from "./columns";
import AddAmountModal from "./AddAmountModal";
import { exportToCSV } from "utils/csvUtils";
import { Box } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import moment from "moment";
import Loader from "@/components/Loader/Loader";

const CustomerTable = () => {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state.customerSlice);
  const [logModal, setLogModal] = useState(false);
  const [addAmountModal, setAddAmountModal] = useState(false);
  const [formData, setFormData] = useState({
    customerId: 0,
    amount: 0,
    merchantTransactionId: "DigiCash",
  });

  const loading: boolean = useAppSelector(
    (state) => state?.customer?.customers?.loading
  );

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedCityId
  );

  useEffect(() => {
    dispatch(fetchCustomers(selectedCityId));
  }, [dispatch, selectedCityId]);

  const handleFetchLogs = async (customerId: number) => {
    await dispatch(fetchCustomerLogs(customerId));

    setLogModal(true);
  };

  const handleAddAmount = (customerId: number) => {
    setFormData({
      ...formData,
      customerId: customerId,
    });
    setAddAmountModal(true);
  };
  const customerListCols = CustomerListColumns({
    handleFetchLogs,
    handleAddAmount,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const customerId = formData.customerId;
    const amount = Number(formData.amount);
    const merchantTransactionId = formData.merchantTransactionId;
    try {
      const result: any = await addWalletAmount(
        customerId,
        amount,
        merchantTransactionId
      );
      if (result.data && result.data.message) {
        toast.success(result);
      } else {
        toast.success("Wallet updated successfully!");
      }
      setAddAmountModal(!addAmountModal);
    } catch (error) {
      toast.error(error.message);
    }
    setAddAmountModal(false);
  };

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "Customer ID",
      "Email",
      "Name",
      "Phone",
      "CNIC",
      "CNIC Expiry Date",
      "CNIC Issue Date",
    ];

    const data = rows.map((row) => ({
      "Customer ID": row.original.customerId,
      Email: row.original.email,
      Name: row.original.name,
      Phone: row.original.phone,
      CNIC: row.original.cnic,
      "CNIC Expiry Date": row.original.cnicExpiryDate
        ? moment(row.original.cnicExpiryDate).format("DD-MM-YYYY")
        : "N/A",
      "CNIC Issue Date": row.original.cnicIssueDate
        ? moment(row.original.cnicIssueDate).format("DD-MM-YYYY")
        : "N/A",
    }));

    exportToCSV(data, headers, "CustomerList_Report.csv");
  };

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          <MaterialReactTable
            columns={customerListCols}
            data={customer.customers}
            muiTableProps={{
              sx: {
                "& th": {
                  background: "#0A80BF",
                  color: "white",
                  whiteSpace: "nowrap",
                  padding: "8px",
                  minWidth: "180px",
                },
                "& td": {
                  padding: "8px",
                  minWidth: "180px",
                },
              },
            }}
            renderTopToolbarCustomActions={({ table }) => (
              <Box>
                <Button
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  color="primary"
                  onClick={() =>
                    handleExportRowsToCSV(table.getPrePaginationRowModel().rows)
                  }
                  variant="text"
                >
                  <FiDownload
                    color="primary"
                    style={{
                      fontSize: "18px",
                      color: "inherit",
                      verticalAlign: "middle",
                      marginRight: "10px",
                    }}
                  />
                  Export to CSV
                </Button>
              </Box>
            )}
          />
        </div>
      </CardBody>

      {/* Logs Modal */}
      <CustomerLogsModal
        logModal={logModal}
        toggle={() => setLogModal(!logModal)}
        toggleClose={() => setLogModal(!logModal)}
      />

      {/* Add Amount Modal */}
      <AddAmountModal
        isOpen={addAmountModal}
        toggle={() => setAddAmountModal(!addAmountModal)}
        toggleClose={() => setAddAmountModal(!addAmountModal)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={(e) => handleSubmit(e)}
        handleChange={handleChange}
      />
    </Card>
  );
};

export default CustomerTable;
