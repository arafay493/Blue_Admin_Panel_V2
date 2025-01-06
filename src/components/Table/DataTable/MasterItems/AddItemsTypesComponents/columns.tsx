import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { IconButton } from "@mui/material";
import { Trash } from "react-feather";

type MasterItemType = {
  id: number;
  name: string;
};

type ItemTypeColumnsProps = {
  handleOpenDeleteModal: (item: MasterItemType) => void;
};

export const ItemTypeColumns = ({
  handleOpenDeleteModal,
}: ItemTypeColumnsProps) => {
  const col: MRT_ColumnDef<MasterItemType>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },
      {
        accessorKey: "delete",
        header: "Delete",
        enableSorting: false,
        Cell: ({ row }) => (
          <IconButton
            color="error"
            onClick={() => handleOpenDeleteModal(row.original)}
          >
            <Trash size={20} />
          </IconButton>
        ),
      },
    ],
    [handleOpenDeleteModal]
  );

  return col;
};
