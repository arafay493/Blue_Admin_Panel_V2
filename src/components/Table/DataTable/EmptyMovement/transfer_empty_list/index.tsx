import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchListAllStockInOut,
  fetchStockDetails,
} from "@/redux/slices/masterConsignmentSlice";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Card, CardBody } from "reactstrap";
import { BiSolidFilePdf } from "react-icons/bi";

const TransferEmptyList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { stockInOut } = useAppSelector(
    (state) => state.masterConsignmentReducer
  );

  useEffect(() => {
    dispatch(fetchListAllStockInOut());
  }, [dispatch]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "contractorCode",
        header: "Contractor Code",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "locId",
        header: "Location",
      },
      {
        accessorKey: "vehicleRegNo",
        header: "Vehicle Reg No",
      },
      {
        accessorKey: "tranDate",
        header: "Transaction Date",
        Cell: ({ cell }) =>
          new Date(cell.getValue<string>()).toLocaleDateString(),
      },
      {
        accessorKey: "type",
        header: "Type",
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
    ],
    []
  );

  const data = useMemo(
    () =>
      (stockInOut.stockInOutTypes || []).filter((item) => item.type === "Out"),
    [stockInOut]
  );

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={data}
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
        </div>
      </CardBody>
    </Card>
  );
};

export default TransferEmptyList;
