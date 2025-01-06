import { useMemo } from "react";
import moment from "moment";

const usePaymentMethodColumns = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "paymentMethod",
        header: "Payment Method",
        enableSorting: true,
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        enableSorting: true,
      },
      {
        accessorKey: "updatedOn",
        header: "Updated On",
        enableSorting: true,
        Cell: ({ cell }) => moment(cell.getValue()).format("DD-MM-YYYY"),
      },
    ],
    []
  );

  return columns;
};

export default usePaymentMethodColumns;
