import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchContractor } from "../../../../../redux/slices/generalSetupSlice";
import EditContractorModal from "./EditContractorModal";
import AddContactModal from "./AddContactModal";
import ContractorListColumns from "./ContractorListColumns";
import { FiDownload } from "react-icons/fi";
import { Box } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";
import Loader from "@/components/Loader/Loader";

const ContractorListTable = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { contractor } = useAppSelector((state) => state.contractor);

  const loading: boolean = useAppSelector(
    (state) => state.contractor?.contractor?.loading
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleEdit = (contractorData) => {
    setSelectedContractor(contractorData);
    toggleModal();
  };

  const handleAddContact = (contractor) => {
    setSelectedContractor(contractor);
    setModalOpen(true);
  };

  const columns = ContractorListColumns(handleEdit, handleAddContact);

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse.selectedWarehouseId
  );

  useEffect(() => {
    dispatch(fetchContractor(selectedCityId));
  }, [dispatch, selectedCityId]);

  const handleExportRowsToCSV = (rows) => {
    const headers = [
      "ID",
      "Contractor_Code",
      "Email",
      "Name",
      "Phone_Number",
      "Status",
    ];

    const data = rows.map((row) => ({
      ID: row.original.id,
      Contractor_Code: row.original.code,
      Email: row.original.email,
      Name: row.original.name,
      Phone_Number: row.original.phone,
      Status: row.original.isActive ? "Active" : "Inactive",
    }));

    exportToCSV(data, headers, "contractor-list.csv");
  };

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={contractor.contractors}
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

        {selectedContractor && (
          <EditContractorModal
            isOpen={isModalOpen}
            toggle={toggleModal}
            contractor={selectedContractor}
          />
        )}

        <AddContactModal
          isOpen={modalOpen}
          toggle={() => setModalOpen(false)}
          contractorCode={selectedContractor?.code || ""} // Pass contractorCode prop
        />
      </CardBody>
    </Card>
  );
};

export default ContractorListTable;
