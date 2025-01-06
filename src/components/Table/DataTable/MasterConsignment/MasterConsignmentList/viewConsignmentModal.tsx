import React, { useMemo } from "react";
import { Modal, ModalHeader, ModalBody, Button, Col } from "reactstrap";
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import {
  ListAllMasterConsinmentTypes,
  UpdateStockStatusPayload,
} from "../../../../../redux/models/masterConsignmentTypes";
import moment from "moment";
import { MaterialReactTable } from "material-react-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UpdateStockStatusService } from "@/redux/services/masterConsignmentService";
import { toast } from "react-toastify";
import {
  fetchAllMasterConsignment,
  fetchStockDetails,
} from "@/redux/slices/masterConsignmentSlice";
import { BiSolidFilePdf } from "react-icons/bi";

interface ConsignmentDetailModalProps {
  modal: boolean;
  toggle: () => void;
  selectedReceivable: ListAllMasterConsinmentTypes | null;
}

const ConsignmentDetailModal: React.FC<ConsignmentDetailModalProps> = ({
  modal,
  toggle,
  selectedReceivable,
}) => {
  const dispatch = useAppDispatch();
  const { allCities } = useAppSelector((state) => state.allCities.allCities);

  const isAllDropped = useMemo(() => {
    return selectedReceivable?.subStockDocs.every(
      (doc) => doc.status === "Droped"
    );
  }, [selectedReceivable?.subStockDocs]);

  const handleFinishConsignment = async () => {
    const payload: UpdateStockStatusPayload = {
      driverID: selectedReceivable.driverID,
      stockID: selectedReceivable.id,
      status: "Closed",
    };

    try {
      const response = await UpdateStockStatusService(payload);

      if (response?.statusCode === 200) {
        toast.success(
          response?.message || "Stock status updated successfully!"
        );
        dispatch(fetchAllMasterConsignment());
        toggle();
      } else {
        toast.error(response?.message || "Failed to update stock status.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while updating stock status."
      );
    }
  };

  const subStockDocsColumns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "contractorCode",
      header: "Contractor Code",
    },
    {
      accessorKey: "driverID",
      header: "Driver ID",
    },
    {
      accessorKey: "fromLocId",
      header: "From Location",
      Cell: ({ row }) => {
        const location = allCities?.find(
          (loc) => loc.id === row.original.fromLocId
        );
        return location ? location.name : "Location Not Found";
      },
    },
    {
      header: "Item Status Will",
      accessorKey: "itemStatusWill",
    },
    {
      header: "Quantity",
      accessorKey: "lines",
      Cell: ({ row }) => {
        const quantities = row.original.lines
          .map((line) => line.qty)
          .filter((qty) => qty !== undefined)
          .join(", ");

        return quantities || "No quantity found";
      },
    },
    {
      accessorKey: "locId",
      header: "To Location",
      Cell: ({ row }) => {
        const location = allCities?.find(
          (loc) => loc.id === row.original.locId
        );
        return location ? location.name : "Location Not Found";
      },
    },
    {
      accessorKey: "remarks",
      header: "Remarks",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "transType",
      header: "Transaction Type",
    },
    {
      accessorKey: "vehicleRegNo",
      header: "Vehicle Reg No",
    },
    {
      header: "Preview Document",
      accessorKey: "view",
      Cell: ({ row }) => {
        const docId = row.original.id;

        const handlePreviewClick = (event: React.MouseEvent) => {
          event.preventDefault();

          dispatch(fetchStockDetails(docId));

          window.open(`/table/view_doc?docId=${docId}`, "_blank");
        };

        return (
          <a
            href={`/table/view_doc?docId=${docId}`}
            onClick={handlePreviewClick}
            style={{ display: "inline-block", cursor: "pointer" }}
          >
            <BiSolidFilePdf style={{ fontSize: "30px" }} />
          </a>
        );
      },
    },
  ];

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Consignment Details</ModalHeader>
      <ModalBody>
        {selectedReceivable ? (
          <>
            <StaticInputs
              labels={[
                "Consignment ID",
                "Driver ID",
                "Vehicle Reg No",
                "Status",
                "Transfer Date",
              ]}
              values={[
                selectedReceivable.id,
                selectedReceivable.driverID,
                selectedReceivable.vehicleRegNo || "NA",
                selectedReceivable.status || "NA",
                moment(selectedReceivable.tranDate).format("DD/MM/YYYY"),
              ]}
            />

            <h6 className="modal-subheading">Sub Stock Documents</h6>
            <MaterialReactTable
              columns={subStockDocsColumns}
              data={selectedReceivable.subStockDocs || []}
              muiTableProps={{
                sx: {
                  "& th": {
                    background: "#0A80BF",
                    color: "white",
                    whiteSpace: "nowrap",
                    padding: "10px",
                  },
                },
              }}
            />

            {isAllDropped && (
              <Col xs={12} className="text-center mt-3">
                <Button
                  color="primary"
                  onClick={() => handleFinishConsignment()}
                >
                  Finish Consignment
                </Button>
              </Col>
            )}
          </>
        ) : (
          <p>No data available</p>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ConsignmentDetailModal;
