import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import EmployeeList from "./components/EmployeeList";
import AmountSelector from "./components/AmountSelector";
import MessageForm from "./components//MessageForm";
import QRGenerator from "./components/QRGenerator";

// Lista de empleados con alias (CBU/ID de Mercado Pago)
const employees = [
  { name: "Alejandra", alias: "alejandra.niz", photo: "/photos/sofia.jpg" },
  { name: "Martín", alias: "alias2", photo: "/photos/martin.jpg" },
  { name: "Camila", alias: "alias3", photo: "/photos/camila.jpg" },
];

const MainApp: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [qrLink, setQrLink] = useState<string>("");

  const handleEmployeeSelect = (employee: string) => {
    setSelectedEmployee(employee);
  };

  const handleAmountChange = (amount: number) => {
    setAmount(amount);
  };

  const handleMessageChange = (message: string) => {
    setMessage(message);
  };

  const handleAnonymousToggle = () => {
    setIsAnonymous((prev) => !prev);
  };

  const handleGenerateQR = () => {
    if (!selectedEmployee || !amount) {
      alert("Por favor, selecciona un empleado y un monto válido.");
      return;
    }

    // Generar el enlace de pago de Mercado Pago con el alias y el monto
    const paymentLink = `https://www.mercadopago.com.ar/checkout/v1/redirect?payment_method=mp&amount=${amount}&employee=${selectedEmployee}&message=${message}&alias=${employees.find((emp) => emp.name === selectedEmployee)?.alias}`;

    setQrLink(paymentLink);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Generador de Propinas
      </Typography>

      {/* Selección del empleado */}
      <EmployeeList employees={employees} onSelect={handleEmployeeSelect} />

      {/* Selección del monto */}
      <AmountSelector onAmountChange={handleAmountChange} />

      {/* Formulario de mensaje opcional */}
      <MessageForm
        message={message}
        onMessageChange={handleMessageChange}
        isAnonymous={isAnonymous}
        onAnonymousToggle={handleAnonymousToggle}
      />

      {/* Botón para generar el QR */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateQR}
        disabled={!selectedEmployee || !amount}
      >
        Generar QR
      </Button>

      {/* Mostrar el QR generado */}
      {qrLink && <QRGenerator link={qrLink} />}
    </Box>
  );
};

export default MainApp;
