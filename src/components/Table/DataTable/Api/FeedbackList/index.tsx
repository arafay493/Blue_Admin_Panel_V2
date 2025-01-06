import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Card, CardBody, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchFeedbacks } from "../../../../../redux/slices/customerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import FeedbackModal from "./FeedbackModal";
import { FiDownload } from "react-icons/fi";
import { Box, IconButton } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";
import { BiDetail } from "react-icons/bi";
import Loader from "@/components/Loader/Loader";

const FeedbackTable = () => {
  const dispatch = useAppDispatch();
  const { feedback } = useAppSelector((state) => state.feedbackSlice);

  const loading: boolean = useAppSelector(
    (state) => state?.feedbackSlice?.feedback?.loading
  );

  const [modal, setModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const toggle = () => setModal(!modal);

  const handleDetailClick = (feedbackDetail) => {
    setSelectedFeedback(feedbackDetail);
    toggle();
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        color={i < rating ? "#ffc107" : "#e4e5e9"}
      />
    ));
  };

  const columns = [
    {
      header: "S.No",
      accessorKey: "serialNumber",
      enableSorting: false,
      Cell: ({ row }) => (
        <span>{row.index + 1}</span> 
      ),
    },
    {
      accessorKey: "driverName",
      header: "Driver Name",
      enableSorting: true,
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      enableSorting: true,
    },
    {
      accessorKey: "rate",
      header: "Rate",
      enableSorting: true,
      Cell: ({ row }) => <div>{renderStars(row.original.rate)}</div>,
    },
    {
      accessorKey: "review",
      header: "Review",
      enableSorting: true,
    },
    {
      header: "Detail",
      id: "detail",
      Cell: ({ row }) => (
        <IconButton
          color="primary"
          onClick={() => handleDetailClick(row.original)}
        >
          <BiDetail size={20} />
        </IconButton>
      ),
    },
  ];

  const handleExportRowsToCSV = (rows) => {
    const headers = ["Driver Name", "Customer Name", "Rate", "Review"];

    const data = rows.map((row) => ({
      "Driver Name": row.original.driverName,
      "Customer Name": row.original.customerName,
      Rate: row.original.rate,
      Review: row.original.review,
    }));

    exportToCSV(data, headers, "Feedback.csv");
  };

  if (loading) return <Loader />;

  return (
    <>
      <Card className="main-stock-wrapper">
        <CardBody>
          <div className="table-responsive">
            <MaterialReactTable
              columns={columns}
              data={feedback.feedbacks}
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
                    disabled={
                      table.getPrePaginationRowModel().rows.length === 0
                    }
                    color="primary"
                    onClick={() =>
                      handleExportRowsToCSV(
                        table.getPrePaginationRowModel().rows
                      )
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
      </Card>

      <FeedbackModal
        modal={modal}
        toggle={toggle}
        selectedFeedback={selectedFeedback}
        renderStars={renderStars}
      />
    </>
  );
};

export default FeedbackTable;
