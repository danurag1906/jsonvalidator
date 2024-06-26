// App.js
import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ValidateJSON from "../pages/ValidateJSON";
import JSONToCSV from "../pages/JSONToCSV";
import CSVToJSON from "../pages/CSVToJSON";
import Navbar from "../components/Navbar";
import JSONFormatter from "../pages/JSONFormatter";
import XMLFormatter from "../pages/XMLFormatter";
import Footer from "../components/Footer";
import PageNotFound from "../pages/PageNotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<JSONFormatter />} />
          <Route exact path="/json-to-csv" element={<JSONToCSV />} />
          <Route exact path="/csv-to-json" element={<CSVToJSON />} />
          <Route exact path="/json-validator" element={<ValidateJSON />} />
          <Route exact path="/xml-formatter" element={<XMLFormatter />} />
          {/* Route for 404 Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
