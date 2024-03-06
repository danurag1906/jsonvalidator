import React, { useState } from "react";
import Papa from "papaparse";
import { Helmet } from "react-helmet";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "../css/JSONFormatter.css"; // Import CSS file for additional styling

const CSVToJSON = () => {
  const [csvData, setCsvData] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCsvChange = (newValue) => {
    setCsvData(newValue);
  };

  const convertCSVToJSON = () => {
    try {
      const parsedData = Papa.parse(csvData, { header: true });
      const jsonString = JSON.stringify(parsedData.data, null, 2);
      setJsonData(jsonString);
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
        <title>CSV To JSON Converter</title>
        <meta
          name="description"
          content="Effortlessly convert CSV files to JSON format. Download the converted JSON file or copy JSON data quickly."
        />
      </Helmet>
      <h2 className="json-formatter-title">
        CSV to JSON Converter
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
      </h2>
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
        </div>
      </div>
    </main>
  );
};

export default CSVToJSON;
