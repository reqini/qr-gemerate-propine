import React from "react";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";

interface MessageFormProps {
  message: string;
  onMessageChange: (message: string) => void;
  isAnonymous: boolean;
  onAnonymousToggle: () => void;
}

const MessageForm: React.FC<MessageFormProps> = ({
  message,
  onMessageChange,
  isAnonymous,
  onAnonymousToggle,
}) => {
  return (
    <div>
      <TextField
        label="Mensaje (opcional)"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        fullWidth
      />
      <FormControlLabel
        control={<Checkbox checked={isAnonymous} onChange={onAnonymousToggle} />}
        label="Enviar anónimamente"
      />
    </div>
  );
};

export default MessageForm;
