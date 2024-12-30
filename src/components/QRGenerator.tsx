import React from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRGeneratorProps {
  link: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ link }) => {
  return <QRCodeCanvas value={link} size={200} />;
};

export default QRGenerator;
