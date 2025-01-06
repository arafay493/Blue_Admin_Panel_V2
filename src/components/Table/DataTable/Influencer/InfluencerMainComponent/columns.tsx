import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table"; // Import type for MaterialReactTable columns
import { IconButton } from "@mui/material";
import { CheckCircle, Eye, Trash, XCircle } from "react-feather";

type PendingInfluencers = {
  //   id: number;
  //   name: string;
};

type ApprovedInfluencers = {
  //   id: number;
  //   name: string;
};

type RejectedInfluencers = {
  //   id: number;
  //   name: string;
};

// type ItemTypeColumnsProps = {
//   handleOpenDeleteModal: (item: PendingInfluencers) => void;
// };

// export const ItemTypeColumns = ({ handleOpenDeleteModal }: ItemTypeColumnsProps) => {
export const PendingInfluencersColumns = ({
  handleApprove,
  handleReject,
  handleRemove,
}) => {
  const col: MRT_ColumnDef<PendingInfluencers>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Influencers ID",
        enableSorting: true,
      },
      {
        accessorKey: "customerName",
        header: "Customer Name",
        enableSorting: true,
      },
      {
        accessorKey: "customerPhone",
        header: "Customer Phone",
        enableSorting: true,
      },
      {
        accessorKey: "age",
        header: "Age",
        enableSorting: true,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        enableSorting: true,
      },
      {
        accessorKey: "category",
        header: "Category",
        enableSorting: true,
      },
      {
        accessorKey: "description",
        header: "Description",
        enableSorting: true,
      },
      // {
      //   accessorKey: "followersCount",
      //   header: "Followers Count",
      //   enableSorting: true,
      // },
      {
        accessorKey: "approved",
        header: "Approved",
        enableSorting: false,
        Cell: ({ row }) => (
          <IconButton
            color="success"
            onClick={() => handleApprove(row.original)}
          >
            <CheckCircle />
          </IconButton>
        ),
      },
      {
        accessorKey: "rejected",
        header: "Rejected",
        enableSorting: false,
        Cell: ({ row }) => (
          <IconButton color="error" onClick={() => handleReject(row.original)}>
            <XCircle />
          </IconButton>
        ),
      },
      {
        accessorKey: "remove",
        header: "Remove",
        enableSorting: false,
        Cell: ({ row }) => (
          <IconButton color="error" onClick={() => handleRemove(row.original)}>
            <Trash />
          </IconButton>
        ),
      },
    ],
    [handleReject, handleRemove, handleApprove]
  );

  return col;
};

export const ApprovedInfluencersColumns = () => {
  const col: MRT_ColumnDef<ApprovedInfluencers>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Influencers ID",
        enableSorting: true,
      },
      {
        accessorKey: "customerId",
        header: "Customer ID",
        enableSorting: true,
      },
      {
        accessorKey: "customerName",
        header: "Customer Name",
        enableSorting: true,
      },
      {
        accessorKey: "customerPhone",
        header: "Customer Phone",
        enableSorting: true,
      },
      {
        accessorKey: "age",
        header: "Age",
        enableSorting: true,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        enableSorting: true,
      },
      {
        accessorKey: "category",
        header: "Category",
        enableSorting: true,
      },
      {
        accessorKey: "description",
        header: "Description",
        enableSorting: true,
      },
      {
        accessorKey: "view",
        header: "View",
        Cell: ({ row }) => (
          <IconButton
            color="primary"
            // onClick={() => handleDetailClick(row.original)}
          >
            <Eye size={20} />
          </IconButton>
        ),
      },
      // {
      //   accessorKey: "followersCount",
      //   header: "Followers Count",
      //   enableSorting: true,
      // },
    ],
    []
  );

  return col;
};

export const RejectedInfluencersColumns = () => {
  const col: MRT_ColumnDef<RejectedInfluencers>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Influencers ID",
        enableSorting: true,
      },
      {
        accessorKey: "customerName",
        header: "Customer Name",
        enableSorting: true,
      },
      {
        accessorKey: "customerPhone",
        header: "Customer Phone",
        enableSorting: true,
      },
      {
        accessorKey: "description",
        header: "Description",
        enableSorting: true,
      },
      // {
      //   accessorKey: "followersCount",
      //   header: "Followers Count",
      //   enableSorting: true,
      // },
      {
        accessorKey: "age",
        header: "Age",
        enableSorting: true,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        enableSorting: true,
      },
      {
        accessorKey: "category",
        header: "Category",
        enableSorting: true,
      },
    ],
    []
  );

  return col;
};
