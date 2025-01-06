import moment from "moment";

export const regionalPricingColumns = [
  {
    accessorKey: "currentPriceId",
    header: "Current Price ID",
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: "Price",
    enableSorting: true,
  },
  {
    accessorKey: "city",
    header: "City",
    enableSorting: true,
  },
  {
    accessorKey: "province",
    header: "Province",
    enableSorting: true,
  },
  {
    accessorKey: "gstTax",
    header: "GST Tax",
    enableSorting: true,
  },
  {
    accessorKey: "discount",
    header: "Discount",
    enableSorting: true,
  },
  {
    accessorKey: "securityDeposit",
    header: "Security Deposit",
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "urgentDeliveryCharges",
    header: "Urgent Delivery Charges",
    Cell: ({ cell }) => cell.getValue() || "-",
  },
  {
    accessorKey: "deliveryCharges",
    header: "Delivery Charges",
    enableSorting: true,
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    enableSorting: true,
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    enableSorting: true,
    Cell: ({ cell }) =>
      cell.getValue() ? moment(cell.getValue()).format("DD-MM-YYYY") : "N/A",
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
    Cell: ({ cell }) =>
      cell.getValue() ? moment(cell.getValue()).format("DD-MM-YYYY") : "N/A",
  },
  {
    accessorKey: "pricingId",
    header: "Pricing ID",
    enableSorting: true,
  },
];
