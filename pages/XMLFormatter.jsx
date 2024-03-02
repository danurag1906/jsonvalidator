import React, { useState } from "react";
import AceEditor from "react-ace";
import { Helmet } from "react-helmet";
import xmlFormat from "xml-formatter"; // Import xmlFormat function
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import "../css/JSONFormatter.css"; // Reuse CSS file for styling

const XMLFormatter = () => {
  const [xmlData, setXMLData] = useState("");
  const [formattedXML, setFormattedXML] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleXMLChange = (newXMLData) => {
    setXMLData(newXMLData);
    setErrorMessage("");
  };

  const formatXML = () => {
    try {
      const formatted = xmlFormat(xmlData, {
        indentation: "  ",
        filter: (node) => node.type !== "Comment",
        collapseContent: true,
        lineSeparator: "\n",
      });
      setFormattedXML(formatted);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const clearXML = () => {
    setXMLData("");
    setFormattedXML("");
    setErrorMessage("");
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(formattedXML)
      .then(() => alert("Copied to clipboard"))
      .catch((error) => console.error("Failed to copy:", error));
  };

  return (
    <main className="json-formatter-container">
      <Helmet>
        <title>XML Formatter</title>
        <meta
          name="description"
          content="Format your XML code effortlessly. Format, fix indentation, and copy the formatted XML for sharing."
        />
      </Helmet>
      <h2 className="json-formatter-title">
        XML Formatter
        <button onClick={formatXML} className="format-button">
          Format XML
        </button>
        <button onClick={clearXML} className="clear-button">
          Clear
        </button>
        {formattedXML && (
          <button onClick={copyToClipboard} className="copy-button">
            Copy to Clipboard
          </button>
        )}
      </h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="json-formatter-content">
        <AceEditor
          mode="xml" // Set mode to XML
          theme="monokai"
          value={xmlData}
          onChange={handleXMLChange}
          height="500px"
          fontSize={16}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{ useWorker: false }}
          className="json-editor" // Reuse editor class
        />
        <AceEditor
          mode="xml" // Set mode to XML
          theme="monokai"
          value={formattedXML}
          readOnly={true} // Make AceEditor read-only
          height="500px"
          fontSize={16}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{ useWorker: false }}
          className="json-editor" // Reuse editor class
        />
      </div>
    </main>
  );
};

export default XMLFormatter;
