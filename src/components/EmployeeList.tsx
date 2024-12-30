import React from "react";
import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

interface EmployeeListProps {
  employees: { name: string; alias: string; photo: string }[];
  onSelect: (employeeAlias: string) => void; // Se pasa el alias para seleccionar al empleado
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onSelect }) => {
  return (
    <Box>
      <FormControl fullWidth margin="normal">
        <InputLabel>Selecciona un empleado</InputLabel>
        <Select
          label="Selecciona un empleado"
          onChange={(e) => onSelect(e.target.value as string)} // Pasa el alias del empleado seleccionado
        >
          {employees.map((employee) => (
            <MenuItem key={employee.alias} value={employee.alias}> 
              {employee.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default EmployeeList;
