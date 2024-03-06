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
        <meta
          name="keywords"
          content="JSON Validator, validate JSON, JSON syntax validation, JSON integrity check, JSON validation tool, online JSON validator"
        />
      </Helmet>

      <h1 className="json-formatter-title">JSON Validator</h1>
      <div>
        <h2>How to Use:</h2>
        <p>
          Enter your JSON data in the editor below. Click the "Validate JSON"
          button to check if the JSON syntax is valid. Any syntax errors will be
          displayed above the editor. You can clear the editor by clicking the
          "Clear" button.
        </p>
      </div>
      <div className="json-formatter-actions">
        <button onClick={validateJson} className="format-button">
          Validate JSON
        </button>
        <button onClick={clearJson} className="clear-button">
          Clear
        </button>
      </div>
      {errorMessage && isValidationClicked && (
        <p className="error-message">{errorMessage}</p>
      )}
      {!errorMessage && isValidationClicked && jsonData && (
        <p className="valid-json-message">Valid JSON</p>
      )}
      <div>
        <AceEditor
          mode="json"
          theme="monokai"
          value={jsonData}
          onChange={handleJsonChange}
          height="500px"
          placeholder="Enter JSON data"
          fontSize={16}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{ useWorker: false, wrap: true }}
        />
        <div className="editor-description">
          <h4>About JSON:</h4>
          <p>
            JSON (JavaScript Object Notation) is a lightweight data interchange
            format. It is easy for humans to read and write. JSON is often used
            for transmitting data between a server and a web application.
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
          <h4>Examples of Invalid JSON:</h4>
          <ul>
            <li>
              Missing quotes around keys:
              <pre>{`{name: "John", age: 30}`}</pre>
            </li>
            <li>
              Unquoted strings:
              <pre>{`{name: John, "age": 30}`}</pre>
            </li>
            <li>
              Trailing commas:
              <pre>{`{name: "John", "age": 30,}`}</pre>
            </li>
            <li>
              Single quotes instead of double quotes:
              <pre>{`{'name': 'John', 'age': 30}`}</pre>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ValidateJSON;
