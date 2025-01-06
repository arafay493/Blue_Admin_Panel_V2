import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import { Edit, Eye } from "react-feather";
import { IconButton } from "@mui/material";

import { useAppDispatch } from "@/redux/hooks";
import { fetchAllDrivers } from "@/redux/slices/masterConsignmentSlice";

const MasterConsignmentColumns = ({
  allCities,
  onViewClick,
  onUpdateClick,
  rows = [],
}) => {
  // const dispatch = useAppDispatch();
  // const [driverNames, setDriverNames] = useState<Record<number, string>>({});
  // const [loadingDrivers, setLoadingDrivers] = useState<Set<number>>(new Set()); // Tracks currently loading driver IDs

  // const fetchDriverName = useCallback(
  //   async (driverID, contractorCode) => {
  //     if (loadingDrivers.has(driverID) || driverNames[driverID]) return;

  //     setLoadingDrivers((prev) => new Set(prev).add(driverID)); // Add to loading state
  //     try {
  //       const result: any = await dispatch(
  //         fetchAllDrivers(contractorCode)
  //       ).unwrap();
  //       const fetchedDrivers = result || [];
  //       const driver = fetchedDrivers.find((d: any) => d.id === driverID);

  //       setDriverNames((prev) => ({
  //         ...prev,
  //         [driverID]: driver ? driver.name : "Not Found",
  //       }));
  //     } catch (error) {
  //       console.error(`Error fetching driver ${driverID}:`, error);
  //       setDriverNames((prev) => ({
  //         ...prev,
  //         [driverID]: "Error Loading",
  //       }));
  //     } finally {
  //       setLoadingDrivers((prev) => {
  //         const updated = new Set(prev);
  //         updated.delete(driverID); // Remove from loading state
  //         return updated;
  //       });
  //     }
  //   },
  //   [dispatch, driverNames, loadingDrivers]
  // );

  // useEffect(() => {
  //   const fetchDriverNames = async () => {
  //     const uniqueDriverIds = Array.from(
  //       new Set(rows.map((row) => row.original.driverID))
  //     );

  //     for (const driverID of uniqueDriverIds) {
  //       const contractorCode = rows.find(
  //         (row) => row.original.driverID === driverID
  //       )?.original.contractorCode;

  //       if (contractorCode) {
  //         await fetchDriverName(driverID, contractorCode);
  //       } else {
  //         setDriverNames((prev) => ({
  //           ...prev,
  //           [driverID]: "Contractor Code Missing",
  //         }));
  //       }
  //     }
  //   };

  //   fetchDriverNames();
  // }, [rows, fetchDriverName]);

  return [
    {
      accessorKey: "id",
      header: "ID",
      Cell: ({ row }) => (
        <p
          style={{
            cursor: "pointer",
            color: "#1284C1",
            fontWeight: "bolder",
          }}
        >
          {row.original?.id}
        </p>
      ),
    },
    {
      accessorKey: "driverID",
      header: "Driver ID",
    },
    {
      accessorKey: "vehicleRegNo",
      header: "Vehicle Reg No",
    },
    {
      accessorKey: "mainLocId",
      header: "From Location",
      Cell: ({ row }) => {
        const location = allCities.find(
          (loc) => loc.id === row.original.mainLocId
        );

        return location ? location.name : "Location Not Found";
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ cell }) => {
        const statusValue = cell.getValue();
        if (statusValue === "Droped") {
          return <span>Dropped</span>;
        }
        return (
          <span
            style={{
              color: statusValue === "Closed" ? "green" : "black",
            }}
          >
            {statusValue}
          </span>
        );
      },
    },
    {
      accessorKey: "transDate",
      header: "Transfer Date",
      Cell: ({ cell }) => moment(cell.getValue()).format("DD/MM/YYYY"),
    },
    {
      accessorKey: "view",
      header: "View",
      Cell: ({ row }) => (
        <IconButton color="primary" onClick={() => onViewClick(row.original)}>
          <Eye />
        </IconButton>
      ),
    },
    {
      accessorKey: "update",
      header: "Update",
      Cell: ({ row }) => (
        <IconButton color="primary" onClick={() => onUpdateClick(row.original)}>
          <Edit />
        </IconButton>
      ),
    },
  ];
};

export default MasterConsignmentColumns;
