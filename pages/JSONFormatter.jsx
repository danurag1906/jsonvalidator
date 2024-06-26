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
      const parsedJson = JSON.parse(jsonData); // Attempt to parse JSON
      const formatted = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(formatted);
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.log(error);
      setFormattedJson(""); // Clear formatted JSON
      setErrorMessage("Invalid JSON: " + error.message); // Set error message
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
        <title>JSON and XML Formatter : Format JSON and XML online</title>
        <meta
          name="description"
          content="Easily format JSON & XML data with our online JSON Formatter tool. Improve readability and organization of your JSON & XML data for better understanding."
        />
        <meta
          name="keywords"
          content="json formatter, json beautifier, format json, beautify json, json formatting tool, json online tool ,json online formatter,online json formatter "
        />
      </Helmet>

      <h1 className="json-formatter-title">JSON Formatter</h1>
      <div>
        <h2>How to Use:</h2>
        <p>
          Enter your JSON data in the left editor. Click the "Format JSON"
          button to beautify the JSON data. The formatted JSON will appear in
          the right editor. You can copy the formatted JSON to your clipboard by
          clicking the "Copy to Clipboard" button which will appear after
          formatting the JSON.
        </p>
      </div>
      <div className="json-formatter-actions">
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
      </div>
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
          setOptions={{ useWorker: false, wrap: true }}
          className="json-editor"
        />
        <div className="space-between"></div>
        <AceEditor
          mode="json"
          theme="monokai"
          value={formattedJson}
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
          <h2>What is JSON?</h2>
          <p>
            JSON (JavaScript Object Notation) is a lightweight data interchange
            format that is easy for humans to read and write and easy for
            machines to parse and generate. It is based on a subset of the
            JavaScript Programming Language, Standard ECMA-262 3rd Edition -
            December 1999.
          </p>
        </div>
        <div>
          <h2>Functionality:</h2>
          <p>
            JSON is commonly used for transmitting data between a server and a
            web application, serving as an alternative to XML. It is widely used
            in web development for tasks such as:
          </p>
          <ul>
            <li>Configuration files</li>
            <li>API responses</li>
            <li>Storing and exchanging data</li>
            <li>Serializing and deserializing objects</li>
            <li>And more...</li>
          </ul>
        </div>

        <div>
          <h2>Example:</h2>
          <div style={{ display: "flex" }}>
            <div>
              <p>Unformatted JSON:</p>
              <pre>
                {`[
  {"name": "John","age": 30,"address": {"city": "New York",
      "country": "USA"
    },
    "hobbies": ["Reading", "Gaming"],
    "family": {
      "spouse": {
        "name": "Jane","age": 28,
        "occupation": "Engineer"
      },
      "children": [
        {
          "name": "Alice",
          "age": 5
        },{
          "name": "Bob","age": 7
        }
      ]
    }
  },{
    "name": "Alice","age": 25,
    "address": {
      "city": "Los Angeles","country": "USA"
    },
    "hobbies": ["Traveling", "Photography"],
    "family": {
      "spouse": {
        "name": "Mike","age": 30,
        "occupation": "Artist"
      },
      "children": [
        {
          "name": "Eve",
          "age": 3
        }
      ]
    }
  }
]`}
              </pre>
            </div>
            <div style={{ padding: "5rem" }}></div>
            <div>
              <p>Formatted JSON:</p>
              <pre>
                {`[
  {
    "name": "John",
    "age": 30,
    "address": {
      "city": "New York",
      "country": "USA"
    },
    "hobbies": [
      "Reading",
      "Gaming"
    ],
    "family": {
      "spouse": {
        "name": "Jane",
        "age": 28,
        "occupation": "Engineer"
      },
      "children": [
        {
          "name": "Alice",
          "age": 5
        },
        {
          "name": "Bob",
          "age": 7
        }
      ]
    }
  },
  {
    "name": "Alice",
    "age": 25,
    "address": {
      "city": "Los Angeles",
      "country": "USA"
    },
    "hobbies": [
      "Traveling",
      "Photography"
    ],
    "family": {
      "spouse": {
        "name": "Mike",
        "age": 30,
        "occupation": "Artist"
      },
      "children": [
        {
          "name": "Eve",
          "age": 3
        }
      ]
    }
  }
]`}
              </pre>
            </div>
          </div>
          <p>
            You can find more examples of JSON data{" "}
            <a
              style={{ color: "#1E1BDA" }}
              target="_blank"
              href="https://www.json.org/example.html"
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

export default JsonFormatter;
