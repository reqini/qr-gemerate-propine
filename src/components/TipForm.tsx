import React, { useState } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";

interface TipFormProps {
  selectedEmployee: string;
  onLinkGenerated: (link: string) => void;
  onAmountChange: (amount: number | null) => void;
}

const TipForm: React.FC<TipFormProps> = ({ selectedEmployee, onLinkGenerated, onAmountChange }) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  
  const handlePayment = () => {
    if (amount && selectedEmployee) {
      // Construir el enlace de pago para Mercado Pago con el alias del empleado
      const paymentLink = `https://www.mercadopago.com.ar/transfer?alias=${selectedEmployee}&amount=${amount}&message=${message}`;
      onLinkGenerated(paymentLink); // Pasar el enlace generado
    }
  };

  return (
    <Box mt={4}>
      <Stack spacing={2}>
        <TextField
          label="Monto"
          type="number"
          value={amount || ""}
          onChange={(e) => {
            const value = e.target.value ? parseFloat(e.target.value) : null;
            setAmount(value);
            onAmountChange(value);
          }}
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
          disabled={!amount || !selectedEmployee}
        >
          Generar QR de Pago
        </Button>
      </Stack>
    </Box>
  );
};

export default TipForm;
