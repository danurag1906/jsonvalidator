import React, { useState } from "react";
import Papa from "papaparse";
import { Helmet } from "react-helmet";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
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
        <title>JSON To CSV Converter</title>
        <meta
          name="description"
          content="Convert JSON to CSV for easy data analysis. Download the converted CSV file or copy the CSV data instantly."
        />
      </Helmet>
      <h2 className="json-formatter-title">
        JSON to CSV Converter
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
      </h2>
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
            fontSize={16}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{ useWorker: false }}
            className="json-editor"
          />
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
            setOptions={{ useWorker: false }}
            className="json-editor"
          />
        </div>
      </div>
    </main>
  );
};

export default JSONToCSV;
