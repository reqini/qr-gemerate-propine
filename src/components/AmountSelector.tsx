import React, { useState } from "react";
import { TextField } from "@mui/material";

interface AmountSelectorProps {
  onAmountChange: (amount: number) => void;
}

const AmountSelector: React.FC<AmountSelectorProps> = ({ onAmountChange }) => {
  const [amount, setAmount] = useState<number | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setAmount("");
      onAmountChange(0);
    } else {
      setAmount(Number(value));
      onAmountChange(Number(value));
    }
  };

  return (
    <TextField
      label="Monto"
      type="number"
      value={amount}
      onChange={handleChange}
      fullWidth
    />
  );
};

export default AmountSelector;
