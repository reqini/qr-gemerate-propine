import React, { useState } from "react";
import TipForm from "../components/TipForm";
import EmployeeList from "../components/EmployeeList";
import { Box, Typography } from "@mui/material";

const HomePage: React.FC = () => {
  const employees = [
    {
      name: "Alejandra",
      icon: "/icons/star.png",
      photo: "/photos/Alejandra.jpg",
      alias: "alejandra.niz" // Alias único para Sofía
    },
    {
      name: "Martín",
      icon: "/icons/heart.png",
      photo: "/photos/martin.jpg",
      alias: "martin_tip" // Alias único para Martín
    },
    {
      name: "Camila",
      icon: "/icons/smile.png",
      photo: "/photos/camila.jpg",
      alias: "camila_tip" // Alias único para Camila
    },
  ];
  

  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [paymentLink, setPaymentLink] = useState<string>("");

  const handlePaymentLink = (link: string) => {
    setPaymentLink(link);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Generador de Propinas
      </Typography>

      {/* Mostrar listado de empleados o formulario */}
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
          <TipForm
            selectedEmployee={selectedEmployee || ""} // Pasar valor vacío si es null
            onLinkGenerated={handlePaymentLink}
          />
        </>
      )}

      {/* Mostrar QR solo si hay un enlace generado */}
      {paymentLink && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Escaneá este QR para realizar el pago:
          </Typography>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              paymentLink
            )}&size=200x200`}
            alt="QR Code"
          />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
