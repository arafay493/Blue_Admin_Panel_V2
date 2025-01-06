import Loader from "@/components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCitiesList } from "@/redux/slices/customerSlice";
import { fetchAllMasterConsignment } from "@/redux/slices/masterConsignmentSlice";
import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useState, useMemo } from "react";
import MasterConsignmentColumns from "./masterConsignmentColumns";
import ConsignmentDetailModal from "./viewConsignmentModal";
import { Card, CardBody } from "reactstrap";
import ConsignmentUpdateModal from "./updateConsignmentModal";

const MasterConsignmentListTable = () => {
  const dispatch = useAppDispatch();
  const { allCities } = useAppSelector((state) => state.allCities.allCities);
  const { allMasterConsignment, loading } = useAppSelector(
    (state) => state.masterConsignmentReducer.allMasterConsignment
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConsignment, setSelectedConsignment] = useState(null);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    dispatch(fetchCitiesList());
    dispatch(fetchAllMasterConsignment());
  }, [dispatch]);

  const handleViewClick = (rowData) => {
    setSelectedConsignment(rowData);
    setModalOpen(true);
  };

  const handleUpdateClick = (rowData) => {
    setSelectedRow(rowData);
    setUpdateModalOpen(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setSelectedConsignment(null);
  };

  const toggleUpdateModal = () => {
    setUpdateModalOpen(!updateModalOpen);
    setSelectedRow(null);
  };

  const columns = useMemo(
    () =>
      MasterConsignmentColumns({
        allCities,
        onViewClick: handleViewClick,
        onUpdateClick: handleUpdateClick,
      }),
    [allCities, handleViewClick]
  );

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={allMasterConsignment || []}
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
          />
        </div>
      </CardBody>

      <ConsignmentDetailModal
        modal={modalOpen}
        toggle={toggleModal}
        selectedReceivable={selectedConsignment}
      />

      <ConsignmentUpdateModal
        modal={updateModalOpen}
        toggle={toggleUpdateModal}
        selectedReceivable={selectedRow}
      />
    </Card>
  );
};

export default MasterConsignmentListTable;
