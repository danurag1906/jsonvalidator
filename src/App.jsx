// App.js
import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ValidateJSON from "../pages/ValidateJSON";
import JSONToCSV from "../pages/JSONToCSV";
import CSVToJSON from "../pages/CSVToJSON";
import Navbar from "../components/Navbar";
import JSONFormatter from "../pages/JSONFormatter";
import XMLFormatter from "../pages/XMLFormatter";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<JSONFormatter />} />
          <Route path="/json-to-csv" element={<JSONToCSV />} />
          <Route path="/csv-to-json" element={<CSVToJSON />} />
          <Route path="/json-validator" element={<ValidateJSON />} />
          <Route path="/xml-formatter" element={<XMLFormatter />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
