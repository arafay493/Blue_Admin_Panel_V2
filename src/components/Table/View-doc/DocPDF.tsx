// @ts-nocheck
import React, { useEffect } from "react";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchListAllLocations } from "@/redux/slices/masterConsignmentSlice";
import { Button, Col } from "reactstrap";
import moment from "moment";
import { fetchAllItemTypes } from "@/redux/slices/masterItemSlices";
import logo from "../../../../public/assets/images/logo/blue-logo.png";

interface DocData {
  contractorCode: string;
  driverID: number;
  fromLocId: number;
  id: number;
  itemStatusWill: string;
  locId: number;
  remarks: string;
  status: string;
  tranDate: string;
  transType: string;
  type: string;
  vehicleRegNo: string;
  lines: {
    amount: number;
    lineDetails: { id: number; barCode: string }[];
  }[];
}

interface formType {
  fromLocId: number;
  toLocId: number;
}

interface DocPDFProps {
  docData: DocData;
  formType: formType;
}

const DocPDF: React.FC<DocPDFProps> = ({ formType, docData }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchListAllLocations());
    dispatch(fetchAllItemTypes());
  }, []);

  const allLocation = useAppSelector(
    (state) => state.masterConsignmentReducer.allLocations
  );

  const { itemTypes } = useAppSelector((state) => state?.itemTypes?.itemTypes);

  const getLocationName = (id: number) => {
    const location = allLocation?.allLocation.find(
      (loc) => Number(loc.key) === id
    );
    return location ? location.value : "Location not found";
  };

  const getItemName = (id: number) => {
    const item = itemTypes?.find((itm) => Number(itm.id) === id);
    return item ? item.name : "Item not found";
  };

  const generateBarcodeImage = (code: string) => {
    if (!code) {
      return null;
    }
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, code);
    return canvas.toDataURL("image/png");
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageHeight = doc.internal.pageSize.height;

    // Add logo at the top of the page
    const logoUrl = "/assets/images/logo/blue-logo.png"; // path to your logo
    doc.addImage(logoUrl, "PNG", 20, 10, 40, 20); // x, y, width, height

    let yOffset = 40;

    const addText = (text, x, y) => {
      if (y >= pageHeight - 10) {
        doc.addPage();
        yOffset = 20; // Reset yOffset for new page
        y = yOffset;
      }
      doc.text(text, x, y);
      yOffset += 10;
    };

    // Document header
    doc.setFontSize(12);
    addText(`Document Number: ${docData?.id}`, 20, yOffset);
    addText(
      `Transfer Date: ${moment(docData?.tranDate).format("DD-MM-YYYY")}`,
      20,
      yOffset
    );
    addText(`Contractor Code: ${docData?.contractorCode}`, 20, yOffset);
    addText(`Driver ID: ${docData?.driverID}`, 20, yOffset);
    addText(
      `Vehicle Registration Number: ${docData?.vehicleRegNo}`,
      20,
      yOffset
    );
    addText(
      `From Location: ${getLocationName(docData?.fromLocId)}`,
      20,
      yOffset
    );
    addText(`To Location: ${getLocationName(docData?.locId)}`, 20, yOffset);
    addText(`Item Name: ${getItemName(docData?.lines[0].itemId)}`, 20, yOffset);
    addText(`Amount: ${docData?.lines[0]?.amount}`, 20, yOffset);

    // Barcodes
    addText("Barcodes:", 20, yOffset);

    docData.lines.forEach((line) => {
      line.lineDetails.forEach((lineDetail) => {
        addText(
          `Barcode ID: ${lineDetail?.id} - Code: ${lineDetail?.barCode}`,
          20,
          yOffset
        );

        if (lineDetail?.barCode) {
          const barcodeImage = generateBarcodeImage(lineDetail?.barCode);
          if (yOffset + 25 >= pageHeight) {
            doc.addPage();
            yOffset = 20;
          }
          doc.addImage(barcodeImage, "PNG", 20, yOffset, 50, 20);
          yOffset += 25;
        }

        yOffset += 5;
      });
    });

    doc.save("Master_Consignment_Document.pdf");
  };

  const logo = "../../../../public/assets/images/logo/blue-logo.png";

  return (
    <div
      style={{
        padding: 20,
        height: "auto",
      }}
    >
      {/* <img src={logo} style={{ width: "100px", marginBottom: "20px" }} /> */}

      <p>
        <strong>Document Number:</strong> {docData?.id}
      </p>
      <p>
        <strong>Transfer Date:</strong>{" "}
        {moment(docData?.tranDate).format("DD-MM-YYYY")}
      </p>
      <p>
        <strong>Contractor Code:</strong> {docData?.contractorCode}
      </p>
      <p>
        <strong>Driver ID:</strong> {docData?.driverID}
      </p>
      <p>
        <strong>Vehicle Registration Number:</strong> {docData?.vehicleRegNo}
      </p>
      <p>
        <strong>From Location:</strong> {getLocationName(docData?.fromLocId)}
      </p>
      <p>
        <strong>To Location:</strong> {getLocationName(docData?.locId)}
      </p>
      <p>
        <strong>Item Name:</strong> {getItemName(docData?.lines[0].itemId)}
      </p>
      <p>
        <strong>Amount:</strong> {docData?.lines[0]?.amount}
      </p>
      <p>
        <strong>Barcodes:</strong>
      </p>
      <ul style={{ padding: 0, margin: 0 }}>
        {docData?.lines.map((line) =>
          line?.lineDetails?.map((lineDetail) => (
            <li key={lineDetail?.id} style={{ listStyle: "none" }}>
              Barcode ID: {lineDetail?.id} - Code:{" "}
              {lineDetail?.barCode || "No Code"}
              <br />
              {lineDetail?.barCode ? (
                <img
                  src={generateBarcodeImage(lineDetail?.barCode)}
                  alt={`Barcode ${lineDetail?.barCode}`}
                  style={{ width: "180px", height: "auto", marginTop: 10 }}
                />
              ) : (
                "No Barcodes"
              )}
            </li>
          ))
        )}
      </ul>
      <Col xs={12} className="text-center mt-3">
        <Button onClick={generatePDF} style={{ marginTop: 20 }} color="primary">
          Download PDF
        </Button>
      </Col>
    </div>
  );
};

export default DocPDF;
