import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import EmployeeList from "../components/EmployeeList";
import TipForm from "../components/TipForm";

const HomePage: React.FC = () => {
  const employees = [
    {
      name: "Alejandra",
      icon: "/icons/star.png",
      photo: "/photos/Alejandra.jpg",
      alias: "alejandra.niz", // Alias único para Sofía
    },
    {
      name: "Martín",
      icon: "/icons/heart.png",
      photo: "/photos/martin.jpg",
      alias: "martin_tip", // Alias único para Martín
    },
    {
      name: "Camila",
      icon: "/icons/smile.png",
      photo: "/photos/camila.jpg",
      alias: "camila_tip", // Alias único para Camila
    },
  ];

  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [paymentLink, setPaymentLink] = useState<string>("");

  const handlePaymentLink = async () => {
    if (!selectedEmployee || !amount) {
      alert("Por favor selecciona un empleado y un monto válido.");
      return;
    }

    try {
      // Crear la preferencia de pago en Mercado Pago
      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Asegúrate de reemplazarlo con tu token
        },
        body: JSON.stringify({
          items: [
            {
              title: `Propina a ${selectedEmployee}`,
              quantity: 1,
              currency_id: "ARS",
              unit_price: parseFloat(amount),
            },
          ],
          payer_email: "payer_email@example.com", // Aquí pones el email del pagador si es necesario
          back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
          },
          notification_url: "http://www.your-site.com/notifications", // Reemplaza con tu URL de notificación
        }),
      });

      const data = await response.json();
      if (data.init_point) {
        setPaymentLink(data.init_point); // Establece el enlace de pago
      } else {
        alert("Hubo un problema al generar el enlace de pago.");
      }
    } catch (error) {
      console.error("Error al generar el enlace de pago:", error);
      alert("Error al generar el enlace de pago. Por favor, intenta nuevamente.");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Generador de Propinas
      </Typography>

      {/* Seleccionar empleado */}
      {!selectedEmployee ? (
        <EmployeeList
          employees={employees}
          onSelect={(employeeName: string) => setSelectedEmployee(employeeName)} // Solo nombre del empleado
        />
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Enviar propina a {selectedEmployee}
          </Typography>

          {/* Selector de monto */}
          <TextField
            label="Monto"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
          />

          {/* Botón para generar el enlace */}
          <Button variant="contained" color="primary" onClick={handlePaymentLink}>
  Generar QR de Pago
</Button>
        </>
      )}

      {/* Mostrar QR solo si hay un enlace generado */}
      {paymentLink && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Escanea este QR para realizar el pago:
          </Typography>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(paymentLink)}&size=200x200`}
            alt="QR Code"
          />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
