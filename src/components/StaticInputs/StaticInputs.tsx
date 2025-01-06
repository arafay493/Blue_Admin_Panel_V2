import { TextField } from "@mui/material";
import React from "react";
import { Col, Row } from "reactstrap";

interface StaticInputsProps {
  labels: string[];
  values: (string | number | boolean)[];
}

const StaticInputs: React.FC<StaticInputsProps> = ({ labels, values }) => {
  return (
    <Row className="mb-3 gap-3 d-flex flex-wrap">
      {labels.map((label, index) => {
        // Determine the value to display
        const displayValue =
          typeof values[index] === "boolean"
            ? values[index]
              ? "Yes"
              : "No" // Convert boolean to Yes/No
            : values[index]?.toString() || ""; 

        return (
          <Col key={`col-${index}`} style={{ minWidth: "250px" }}>
            <TextField
              required
              id={`outlined-required-${index}`}
              label={label}
              value={displayValue} // Use the displayValue
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              sx={{
                "& .MuiInputBase-input": {
                  WebkitTextFillColor: "rgba(0 , 0 , 0 , 0.7)",
                  color: "black",
                  cursor: "auto",
                  width: "100%",
                  height: "15px",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0A74B9",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0A74B9",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0A74B9",
                  borderWidth: 2,
                  width: "100%",
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(0, 0, 0, 0.8)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#0A74B9",
                },
              }}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default StaticInputs;
