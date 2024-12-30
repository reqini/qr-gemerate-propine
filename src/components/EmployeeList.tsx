import React from "react";
import { Box, Typography, List, ListItemText, ListItemAvatar, Avatar } from "@mui/material";

interface Employee {
  name: string;
  icon: string;
  photo: string;
}

interface EmployeeListProps {
  employees: Employee[];
  onSelect: (employeeName: string) => void; // Espera solo el nombre del empleado
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onSelect }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Selecciona un empleado para enviar la propina:
      </Typography>
      <List>
        {employees.map((employee) => (
          <div key={employee.name} onClick={() => onSelect(employee.name)}>
            <ListItemAvatar>
              <Avatar alt={employee.name} src={employee.photo} />
            </ListItemAvatar>
            <ListItemText
              primary={employee.name}
              secondary={<img src={employee.icon} alt="icon" style={{ width: 24, height: 24 }} />}
            />
          </div>
        ))}
      </List>
    </Box>
  );
};

export default EmployeeList;
