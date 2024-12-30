import React from "react";
import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

interface EmployeeListProps {
  employees: { name: string; alias: string; photo: string }[];
  onSelect: (employee: string) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onSelect }) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Selecciona un empleado</InputLabel>
        <Select
          label="Selecciona un empleado"
          onChange={(e) => onSelect(e.target.value as string)}
        >
          {employees.map((employee) => (
            <MenuItem key={employee.name} value={employee.name}>
              {employee.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default EmployeeList;
