import React from "react";
import { Box, Typography } from "@mui/material";
import QRGenerator from "../components/QRGenerator";

const PrintedQRPage: React.FC = () => {
  const appUrl = "http://localhost:3000"; // Cambiar al dominio de tu app en producción

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Escaneá este QR para comenzar
      </Typography>
      <QRGenerator link={appUrl} />
    </Box>
  );
};

export default PrintedQRPage;
