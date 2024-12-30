import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import EmployeeList from "../components/EmployeeList";
import TipForm from "../components/TipForm";

const HomePage: React.FC = () => {
  const employees = [
    { name: "Alejandra", alias: "alejandra.niz" },
    { name: "Martín", alias: "martin_tip" },
    { name: "Camila", alias: "camila_tip" },
  ];

  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [paymentLink, setPaymentLink] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);

  const handlePaymentLink = (link: string) => {
    setPaymentLink(link);
  };

  // Genera el enlace de Mercado Pago para redirigir a la transferencia con alias
  const generateTransferLink = (alias: string) => {
    return `https://www.mercadopago.com.ar/transfer?alias=${alias}`;
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Generador de Propinas
      </Typography>

      {/* Selección de empleado */}
      {!selectedEmployee ? (
        <EmployeeList
          employees={employees}
          onSelect={(employeeName: string) => setSelectedEmployee(employeeName)}
        />
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Enviar propina a {selectedEmployee}
          </Typography>

          {/* Formulario para ingresar monto y mensaje */}
          <TipForm
            selectedEmployee={selectedEmployee || ""}
            onLinkGenerated={handlePaymentLink}
            onAmountChange={setAmount}
          />
        </>
      )}

      {/* Generar y mostrar el QR solo si hay un enlace generado */}
      {paymentLink && amount && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Escaneá este QR para realizar el pago:
          </Typography>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              generateTransferLink(employees.find((e) => e.name === selectedEmployee)?.alias || "")
            )}&size=200x200`}
            alt="QR Code"
          />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
