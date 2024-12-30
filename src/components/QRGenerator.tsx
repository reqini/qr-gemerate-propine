import React from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRGeneratorProps {
  link: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ link }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <QRCodeCanvas value={link} size={200} />
    </div>
  );
};

export default QRGenerator;
