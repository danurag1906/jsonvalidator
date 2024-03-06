import React, { useState } from "react";
import Papa from "papaparse";
import { Helmet } from "react-helmet";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/mode-csv";
import "ace-builds/src-noconflict/theme-monokai";
// import "../css/JSONFormatter.css"; // Import CSS file for additional styling
import "../css/JSONToCSV.css";

const CSVToJSON = () => {
  const [csvData, setCsvData] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCsvChange = (newCsvData) => {
    setCsvData(newCsvData);
    setErrorMessage("");
  };

  const convertCSVToJSON = () => {
    try {
      const parsedData = Papa.parse(csvData, { header: true });
      const json = JSON.stringify(parsedData.data, null, 2);
      setJsonData(json);
      setErrorMessage("");
    } catch (error) {
      setJsonData("");
      setErrorMessage(error.message);
    }
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.json";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(jsonData)
      .then(() => alert("Copied to clipboard"))
      .catch((error) => console.error("Failed to copy:", error));
  };

  const handleClear = () => {
    setCsvData("");
    setJsonData("");
    setErrorMessage("");
  };

  return (
    <main className="json-formatter-container">
      <Helmet>
        <title>JSON and XML Formatter : Format JSON and XML online</title>
        <meta
          name="description"
          content="Convert CSV to JSON for easy data manipulation. Download the converted JSON file or copy the JSON data instantly."
        />
        <meta
          name="keywords"
          content="CSV to JSON, convert CSV to JSON, CSV to JSON converter, JSON converter, CSV converter, online CSV to JSON converter"
        />
      </Helmet>

      <h1 className="json-formatter-title">CSV to JSON Converter</h1>
      <div>
        <h2>How to Use:</h2>
        <p>
          Enter your CSV data in the left editor. Click the "Convert to JSON"
          button to convert CSV to JSON format. The converted JSON data will
          appear in the right editor. You can download the JSON file by clicking
          the "Download JSON" button or copy the JSON data to your clipboard by
          clicking the "Copy to Clipboard" button.
        </p>
      </div>
      <div className="json-formatter-actions">
        <button onClick={convertCSVToJSON} className="format-button">
          Convert to JSON
        </button>
        <button onClick={handleClear} className="clear-button">
          Clear
        </button>
        {jsonData && (
          <>
            <button onClick={handleDownloadJSON} className="download-button">
              Download JSON
            </button>
            <button onClick={handleCopyToClipboard} className="copy-button">
              Copy to Clipboard
            </button>
          </>
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="json-formatter-content">
        <div className="csv-input">
          <h3>CSV Input</h3>
          <AceEditor
            mode="csv"
            theme="monokai"
            value={csvData}
            onChange={handleCsvChange}
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
                style={{ color: "#1E1BDA" }}
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
        <div className="json-output">
          <h3>JSON Output</h3>
          <AceEditor
            mode="json"
            theme="monokai"
            value={jsonData}
            readOnly={true}
            height="500px"
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
                style={{ color: "#1E1BDA" }}
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
            CSV Data:
            <pre>
              {`name,age,city
John Doe,30,New York
Jane Smith,25,Los Angeles
Michael Johnson,35,Chicago`}
            </pre>
          </p>
          <p>
            Equivalent JSON:
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
        </div>
      </div>
    </main>
  );
};

export default CSVToJSON;
