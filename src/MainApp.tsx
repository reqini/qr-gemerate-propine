import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TipForm from "./components/TipForm";
import { QRCodeCanvas } from "qrcode.react";

const MainApp: React.FC = () => {
  const [paymentLink, setPaymentLink] = useState<string>("");

  const handlePaymentLink = (link: string) => {
    setPaymentLink(link);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Propinas con QR
      </Typography>
      <TipForm
        selectedEmployee="Empleado 1" // Aquí puedes pasar el empleado seleccionado
        onLinkGenerated={handlePaymentLink}
      />
      {paymentLink && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Escaneá este QR para realizar el pago:
          </Typography>
          <QRCodeCanvas value={paymentLink} size={200} />
        </Box>
      )}
    </Box>
  );
};

export default MainApp;
