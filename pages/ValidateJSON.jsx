import React, { useState } from "react";
import AceEditor from "react-ace";
import { Helmet } from "react-helmet";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "../css/JSONFormatter.css"; // Import CSS file for additional styling

const ValidateJSON = () => {
  const [jsonData, setJsonData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidationClicked, setIsValidationClicked] = useState(false);

  const handleJsonChange = (newJsonData) => {
    setJsonData(newJsonData);
    setErrorMessage("");
  };

  const validateJson = () => {
    try {
      JSON.parse(jsonData);
      setErrorMessage(""); // Clear any previous error message
      setIsValidationClicked(true); // Set validation button clicked
    } catch (error) {
      setErrorMessage(error.message); // Set error message if parsing fails
      setIsValidationClicked(true); // Set validation button clicked
    }
  };

  const clearJson = () => {
    setJsonData(""); // Clear JSON data
    setErrorMessage(""); // Clear error message
    setIsValidationClicked(false); // Reset validation button clicked
  };

  return (
    <main className="json-formatter-container">
      <Helmet>
        <title>JSON Validator</title>
        <meta
          name="description"
          content="Validate JSON data for syntax errors and integrity. Copy the validated JSON or download the validated JSON file."
        />
      </Helmet>
      <h2 className="json-formatter-title">
        JSON Validator
        <button onClick={validateJson} className="format-button">
          Validate JSON
        </button>
        <button onClick={clearJson} className="clear-button">
          Clear
        </button>
      </h2>
      {errorMessage && isValidationClicked && (
        <p className="error-message">{errorMessage}</p>
      )}
      {!errorMessage && isValidationClicked && jsonData && (
        <p className="valid-json-message">Valid JSON</p>
      )}
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
      </div>
    </main>
  );
};

export default ValidateJSON;
