import React, { useState } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";

interface TipFormProps {
  selectedEmployee: string | null;
  onLinkGenerated: (link: string) => void;
}

const TipForm: React.FC<TipFormProps> = ({ selectedEmployee, onLinkGenerated }) => {
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handlePayment = async () => {
    if (!selectedEmployee || !amount || parseFloat(amount) <= 0) {
      alert("Por favor selecciona un empleado y un monto válido.");
      return;
    }

    try {
      // Simulamos la generación de un enlace de pago (en un backend real usarías la API de Mercado Pago)
      const paymentLink = `https://www.mercadopago.com.ar/checkout/start?cvu=${selectedEmployee}&amount=${amount}`;
      
      if (paymentLink) {
        onLinkGenerated(paymentLink); // Pasamos el enlace al componente padre (App.tsx)
      } else {
        alert("Hubo un problema al generar el enlace de pago.");
      }
    } catch (error) {
      console.error("Error al generar el pago:", error);
      alert("Error al generar el enlace de pago. Por favor, intenta nuevamente.");
    }
  };

  return (
    <Box mt={4}>
      <Stack spacing={2}>
        <TextField
          label="Monto"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
        <TextField
          label="Mensaje (opcional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          disabled={!selectedEmployee}
        >
          Enviar Propina
        </Button>
      </Stack>
    </Box>
  );
};

export default TipForm;
