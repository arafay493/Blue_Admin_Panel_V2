import { MRT_TableInstance } from "material-react-table";
import { Box } from "@mui/material";
import React from "react";
import { FiDownload } from "react-icons/fi";
import { Button } from "reactstrap";
import { exportToCSV } from "utils/csvUtils";

interface CsvRow {
  [key: string]: any;
}

interface DownloadCSVBtnProps {
  table: MRT_TableInstance<any>;
  headers: string[];
  fileName: string;
}

const Download_CSV_Btn: React.FC<DownloadCSVBtnProps> = ({
  table,
  headers,
  fileName,
}) => {
  const handleExportRowsToCSV = (rows: CsvRow[]) => {
    const data = rows.map((row, index) => ({
      serialNumber: index + 1,
      ...headers.reduce((acc, header) => {
        acc[header] = row.original[header];
        return acc;
      }, {} as CsvRow),
    }));

    exportToCSV(data, headers, fileName);
  };

  return (
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
          style={{
            fontSize: "18px",
            color: "inherit",
            verticalAlign: "middle",
            marginRight: "10px",
          }}
        />
        Export All Rows to CSV
      </Button>
    </Box>
  );
};

export default Download_CSV_Btn;
