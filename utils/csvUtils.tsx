// src/utils/csvUtils.ts

interface CsvRow {
  [key: string]: any;
}

export const exportToCSV = (
  rows: CsvRow[],
  headers: string[],
  fileName: string = "data.csv"
): void => {
  const csvData = [
    headers,
    ...rows.map((row) => headers.map((header) => row[header] || "")), 
  ];

  const csv = csvData.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
