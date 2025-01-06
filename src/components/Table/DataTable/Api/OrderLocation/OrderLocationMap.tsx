// @ts-nocheck
import React, { useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { fetchMapLocation } from "../../../../../redux/slices/customerSlice";
import { useAppSelector } from "@/redux/hooks";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

interface OrderLocationMapProps {
  startDate: string;
  endDate: string;
  orderStatus: string;
}

const OrderLocationMap: React.FC<OrderLocationMapProps> = ({
  startDate,
  endDate,
  orderStatus,
}) => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate && endDate && orderStatus) {
      dispatch(fetchMapLocation({ startDate, endDate, status: orderStatus }));
    }
  }, [dispatch, startDate, endDate, orderStatus]);

  const { mapOrders } = useAppSelector((state) => state.mapOrders);
  const orders = mapOrders?.maporders || [];

  const mapCenter =
    orders.length > 0
      ? {
          lat: parseFloat(orders[0].orderAtLat),
          lng: parseFloat(orders[0].orderAtLong),
        }
      : defaultCenter;

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={10}
      >
        {orders.map((location) => (
          <Marker
            key={location.orderId}
            position={{
              lat: parseFloat(location.orderAtLat),
              lng: parseFloat(location.orderAtLong),
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default OrderLocationMap;
