import React from "react";

interface QRGeneratorProps {
  link: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ link }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}&size=200x200`}
        alt="QR Code"
      />
    </div>
  );
};

export default QRGenerator;
