import React, { useState } from "react";
import AceEditor from "react-ace";
import { Helmet } from "react-helmet";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "../css/JSONFormatter.css"; // Import CSS file for additional styling

const JsonFormatter = () => {
  const [jsonData, setJsonData] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleJsonChange = (newJsonData) => {
    setJsonData(newJsonData);
    setErrorMessage("");
  };

  const formatJson = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(jsonData), null, 2);
      setFormattedJson(formatted);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const clearJson = () => {
    setJsonData("");
    setFormattedJson("");
    setErrorMessage("");
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(formattedJson)
      .then(() => alert("Formatted JSON copied to clipboard"))
      .catch((error) => console.error("Failed to copy: ", error));
  };

  return (
    <main className="json-formatter-container">
      <Helmet>
        <title>JSON Formatter</title>
        <meta
          name="description"
          content="Instantly format and beautify JSON data for improved readability. Copy the formatted JSON to your clipboard with ease."
        />
      </Helmet>
      <h2 className="json-formatter-title">
        JSON Formatter
        <button onClick={formatJson} className="format-button">
          Format JSON
        </button>
        <button onClick={clearJson} className="clear-button">
          Clear
        </button>
        {formattedJson && (
          <button onClick={copyToClipboard} className="copy-button">
            Copy to Clipboard
          </button>
        )}
      </h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="json-formatter-content">
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
        <AceEditor
          mode="json"
          theme="monokai"
          value={formattedJson}
          readOnly={true}
          height="500px"
          fontSize={16}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{ useWorker: false }}
          className="json-editor"
        />
      </div>
    </main>
  );
};

export default JsonFormatter;
