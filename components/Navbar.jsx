import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            JSON Formatter
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/xml-formatter" className="navbar-link">
            XML Formatter
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/json-validator" className="navbar-link">
            JSON Validator
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/json-to-csv" className="navbar-link">
            JSON to CSV
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/csv-to-json" className="navbar-link">
            CSV to JSON
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
