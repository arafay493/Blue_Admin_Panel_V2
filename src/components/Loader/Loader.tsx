import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RotatingLines
          strokeColor="#1284C1"
          strokeWidth={5}
          animationDuration={0.75}
          width={50}
          visible={true}
        />
        <h5 style={{ marginTop: 10, color: "#1284C1" }}>Loading...</h5>
      </div>
    </div>
  );
};

export default Loader;
