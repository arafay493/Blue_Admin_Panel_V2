//@ts-nocheck
import StaticInputs from "@/components/StaticInputs/StaticInputs";
import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchConsignmentRouteDetailsThunk } from "@/redux/slices/customerSlice";

const MapComponent = ({ consignmentId }: { consignmentId: number | null }) => {
  const [viewState, setViewState] = useState({
    longitude: 73.0479,
    latitude: 33.6844,
    zoom: 12,
  });

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (consignmentId) {
      dispatch(fetchConsignmentRouteDetailsThunk(consignmentId));
    }
  }, [consignmentId]);

  const { details, loading, error } = useAppSelector(
    (state) => state.customerSlice.consignmentRoute
  );

  console.log(details);

  const parsePath = (path) =>
    path
      ? path.split(";").map((entry) => {
          const [lat, lng, time] = entry.split(",");
          return { lat: parseFloat(lat), lng: parseFloat(lng), orderId: time };
        })
      : [];

  const optimalPathData = parsePath(details?.data?.optimalPath || "");
  const actualPathData = parsePath(details?.data?.actualPath || "");

  const NewcalculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const calculateTotalDistance = (pathData) => {
    let totalDistance = 0;
    for (let i = 0; i < pathData.length - 1; i++) {
      const { lat: lat1, lng: lng1 } = pathData[i];
      const { lat: lat2, lng: lng2 } = pathData[i + 1];
      totalDistance += NewcalculateDistance(lat1, lng1, lat2, lng2);
    }
    return totalDistance * 1000;
  };

  const optimalPathDistance = calculateTotalDistance(optimalPathData);
  const actualPathDistance = calculateTotalDistance(actualPathData);

  console.log("optimalPathDistance in kilometers", optimalPathDistance / 1000);
  console.log("actualPathDistance in kilometers", actualPathDistance / 1000);

  return (
    <div>
      <StaticInputs
        labels={[
          "Optimal Minute",
          "Actual Minute",
          "Minute Difference",
          "Optimal Path (km)",
          "Actual Path (km)",
          "Difference (km)",
        ]}
        values={[
          details?.data?.optimalTime || "-",
          details?.data?.actualTime || "-",
          details?.data?.optimalTime && details?.data?.actualTime
            ? details.data.optimalTime - details.data.actualTime
            : "-",
          optimalPathDistance ? (optimalPathDistance / 1000).toFixed(2) : "-",
          actualPathDistance ? (actualPathDistance / 1000).toFixed(2) : "-",
          optimalPathDistance && actualPathDistance
            ? ((optimalPathDistance - actualPathDistance) / 1000).toFixed(2)
            : "-",
        ]}
      />

      <div style={{ height: "500px", marginTop: "20px" }}>
        <Map
          {...viewState}
          mapboxAccessToken={mapboxToken}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onMove={(evt) => setViewState(evt.viewState)}
        >
          <Marker longitude={73.0479} latitude={33.6844} color="red" />
        </Map>
      </div>
    </div>
  );
};

export default MapComponent;
