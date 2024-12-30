import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import EmployeeList from "../components/EmployeeList"; // Componente para la lista de empleados
import QRGenerator from "../components/QRGenerator"; // Componente para generar QR

const HomePage: React.FC = () => {
  const employees = [
    { name: "Alejandra", alias: "alejandra.niz", photo: "/icons/alejandra.jpg" },
    { name: "Martín", alias: "martin_tip", photo: "/icons/martin.jpg" },
    { name: "Camila", alias: "camila_tip", photo: "/icons/camila.jpg" },
  ];

  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null); // Empleado seleccionado
  const [amount, setAmount] = useState<number | string>(""); // Monto de la propina
  const [paymentLink, setPaymentLink] = useState<string>(""); // Enlace generado para Mercado Pago
  const [message, setMessage] = useState<string>(""); // Mensaje opcional

  // Función para generar el enlace de Mercado Pago
  const generatePaymentLink = (employeeAlias: string, amount: number) => {
    // Aquí generas el enlace de Mercado Pago
    const paymentUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${employeeAlias}&amount=${amount}`;
    return paymentUrl;
  };

  // Función para manejar la generación del enlace
  const handleGeneratePayment = () => {
    if (!selectedEmployee || !amount) {
      alert("Por favor selecciona un empleado y un monto válido.");
      return;
    }

    const link = generatePaymentLink(selectedEmployee, Number(amount));
    setPaymentLink(link); // Actualiza el enlace generado
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Generador de Propinas
      </Typography>

      {/* Selección de empleado */}
      <EmployeeList
        employees={employees}
        onSelect={setSelectedEmployee} // Se pasa el alias del empleado seleccionado
      />

      {/* Campo para monto */}
      <TextField
        label="Monto"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Mensaje opcional */}
      <TextField
        label="Mensaje (opcional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Botón para generar el enlace */}
      <Button variant="contained" color="primary" onClick={handleGeneratePayment} fullWidth>
        Generar QR de Pago
      </Button>

      {/* Mostrar el QR */}
      {paymentLink && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Escanea este QR para realizar el pago:
          </Typography>
          <QRGenerator link={paymentLink} />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
