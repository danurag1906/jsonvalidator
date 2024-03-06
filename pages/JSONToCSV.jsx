import React, { useState } from "react";
import Papa from "papaparse";
import { Helmet } from "react-helmet";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/mode-csv";
import "ace-builds/src-noconflict/theme-monokai";
import "../css/JSONFormatter.css"; // Import CSS file for additional styling

const JSONToCSV = () => {
  const [jsonData, setJsonData] = useState("");
  const [csvData, setCsvData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleJsonChange = (newJsonData) => {
    setJsonData(newJsonData);
    setErrorMessage("");
  };

  const convertJSONToCSV = () => {
    try {
      const parsedData = JSON.parse(jsonData);
      const csv = Papa.unparse(parsedData);
      setCsvData(csv);
      setErrorMessage("");
    } catch (error) {
      setCsvData("");
      setErrorMessage(error.message);
    }
  };

  const handleDownloadCSV = () => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.csv";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(csvData)
      .then(() => alert("Copied to clipboard"))
      .catch((error) => console.error("Failed to copy:", error));
  };

  const handleClear = () => {
    setJsonData("");
    setCsvData("");
    setErrorMessage("");
  };

  return (
    <main className="json-formatter-container">
      <Helmet>
        <title>JSON and XML Formatter</title>
        <meta
          name="description"
          content="Convert JSON to CSV for easy data analysis. Download the converted CSV file or copy the CSV data instantly."
        />
        <meta
          name="keywords"
          content="JSON to CSV, convert JSON to CSV, JSON to CSV converter, CSV converter, JSON converter, online JSON to CSV converter"
        />
      </Helmet>

      <h1 className="json-formatter-title">JSON to CSV Converter</h1>
      <div>
        <h2>How to Use:</h2>
        <p>
          Enter your JSON data in the left editor. Click the "Convert to CSV"
          button to convert JSON to CSV format. The converted CSV data will
          appear in the right editor. You can download the CSV file by clicking
          the "Download CSV" button or copy the CSV data to your clipboard by
          clicking the "Copy to Clipboard" button.
        </p>
      </div>
      <div className="json-formatter-actions">
        <button onClick={convertJSONToCSV} className="format-button">
          Convert to CSV
        </button>
        <button onClick={handleClear} className="clear-button">
          Clear
        </button>
        {csvData && (
          <>
            <button onClick={handleDownloadCSV} className="download-button">
              Download CSV
            </button>
            <button onClick={handleCopyToClipboard} className="copy-button">
              Copy to Clipboard
            </button>
          </>
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="json-formatter-content">
        <div className="json-input">
          <h3>JSON Input</h3>
          <AceEditor
            mode="json"
            theme="monokai"
            value={jsonData}
            onChange={handleJsonChange}
            height="500px"
            placeholder="Enter the json inside a [] bracket"
            fontSize={16}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{ useWorker: false, wrap: true }}
            className="json-editor"
          />
          <div className="editor-description">
            <h4>About JSON:</h4>
            <p>
              JSON (JavaScript Object Notation) is a lightweight data
              interchange format. It is easy for humans to read and write. JSON
              is often used for transmitting data between a server and a web
              application.
            </p>
            <p>
              Learn more about JSON{" "}
              <a
                href="https://www.json.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
        <div className="csv-output">
          <h3>CSV Output</h3>
          <AceEditor
            mode="csv"
            theme="monokai"
            value={csvData}
            readOnly={true}
            height="500px"
            fontSize={16}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{ useWorker: false, wrap: true }}
            className="json-editor"
          />
          <div className="editor-description">
            <h4>About CSV:</h4>
            <p>
              CSV (Comma-Separated Values) is a plain text format used for
              representing tabular data. Each line in a CSV file corresponds to
              a row in the table, and the values in each row are separated by
              commas.
            </p>
            <p>
              Learn more about CSV{" "}
              <a
                href="https://en.wikipedia.org/wiki/Comma-separated_values"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="example-data">
        <h2 style={{ textAlign: "center" }}>Example Data:</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "center",
          }}
        >
          <p>
            JSON Data:
            <pre>
              {`[
  {
    "name": "John Doe",
    "age": 30,
    "city": "New York"
  },
  {
    "name": "Jane Smith",
    "age": 25,
    "city": "Los Angeles"
  },
  {
    "name": "Michael Johnson",
    "age": 35,
    "city": "Chicago"
  }
]`}
            </pre>
          </p>
          <p>
            Equivalent CSV:
            <pre>
              {`name,age,city
John Doe,30,New York
Jane Smith,25,Los Angeles
Michael Johnson,35,Chicago`}
            </pre>
          </p>
        </div>
      </div>
    </main>
  );
};

export default JSONToCSV;
