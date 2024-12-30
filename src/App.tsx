// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainApp from "./MainApp"; // Tu página principal
import PrintedQRPage from "./pages/PrintedQRPage"; // Página con el QR impreso

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pagos" element={<MainApp />} />
        <Route path="/" element={<PrintedQRPage />} />
      </Routes>
    </Router>
  );
};

export default App;
