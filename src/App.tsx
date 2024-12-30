// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainApp from "./MainApp"; // Tu página principal

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        {/* <Route path="/" element={<PrintedQRPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
