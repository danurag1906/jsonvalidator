import React, { useState } from "react";
import AceEditor from "react-ace";
import { Helmet } from "react-helmet";
import xmlFormat from "xml-formatter";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import "../css/JSONFormatter.css"; // Reusing CSS file for styling

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
        <title>JSON and XML Formatter : Format JSON and XML online</title>
        <meta
          name="description"
          content="Format your XML code effortlessly. Format, fix indentation, and copy the formatted XML for sharing."
        />
        <meta
          name="keywords"
          content="XML Formatter, format XML, online XML formatter,xml formatter online, XML code formatting"
        />
      </Helmet>

      <h1 className="json-formatter-title">XML Formatter</h1>
      <div>
        <h2>How to Use:</h2>
        <p>
          Enter your XML data in the editor below. Click the "Format XML" button
          to format the XML code with proper indentation. The formatted XML will
          appear in the right side editor. You can copy the formatted XML to
          your clipboard by clicking the "Copy to Clipboard" button.
        </p>
      </div>
      <div className="json-formatter-actions">
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
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="json-formatter-content">
        <AceEditor
          mode="xml"
          theme="monokai"
          value={xmlData}
          onChange={handleXMLChange}
          placeholder="Enter XML data"
          height="500px"
          fontSize={16}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{ useWorker: false, wrap: true }}
          className="json-editor"
        />
        <div className="space-between"></div>
        <AceEditor
          mode="xml"
          theme="monokai"
          value={formattedXML}
          readOnly={true}
          height="500px"
          fontSize={16}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{ useWorker: false, wrap: true }}
          className="json-editor"
        />
      </div>
      <div className="json-formatter-description">
        <div>
          <h2>What is XML?</h2>
          <p>
            XML (eXtensible Markup Language) is a markup language that defines a
            set of rules for encoding documents in a format that is both
            human-readable and machine-readable. It is widely used for
            representing structured data in web development and other
            applications.
          </p>
        </div>
        <div>
          <h2>Functionality:</h2>
          <p>XML is commonly used for tasks such as:</p>
          <ul>
            <li>Storing and exchanging data</li>
            <li>Configuring applications</li>
            <li>Defining document structure</li>
            <li>Interoperability between different systems</li>
            <li>And more...</li>
          </ul>
        </div>

        <div>
          <h2>Example:</h2>
          <p>Unformatted XML:</p>
          <pre>
            {`<note>
  <to>Tove</to><from>Jani</from>
  <heading>Reminder
  </heading><body>Don't forget me this weekend!</body>
</note>`}
          </pre>
          <p>Formatted XML:</p>
          <pre>
            {`<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`}
          </pre>
          <p>
            You can find more examples of XML data{" "}
            <a
              target="_blank"
              href="https://www.w3schools.com/xml/xml_examples.asp"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
};

export default XMLFormatter;
