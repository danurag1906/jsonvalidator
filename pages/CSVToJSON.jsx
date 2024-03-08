// import React, { useState } from "react";
// import Papa from "papaparse";
// import { Helmet } from "react-helmet";
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-json";
// // import "ace-builds/src-noconflict/mode-csv";
// import "ace-builds/src-noconflict/theme-monokai";
// // import "../css/JSONFormatter.css"; // Import CSS file for additional styling
// import "../css/JSONToCSV.css";

// const CSVToJSON = () => {
//   const [csvData, setCsvData] = useState("");
//   const [jsonData, setJsonData] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleCsvChange = (newCsvData) => {
//     setCsvData(newCsvData);
//     setErrorMessage("");
//   };

//   const convertCSVToJSON = () => {
//     try {
//       const parsedData = Papa.parse(csvData, { header: true });
//       const json = JSON.stringify(parsedData.data, null, 2);
//       setJsonData(json);
//       setErrorMessage("");
//     } catch (error) {
//       setJsonData("");
//       setErrorMessage(error.message);
//     }
//   };

//   const handleDownloadJSON = () => {
//     const blob = new Blob([jsonData], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "output.json";
//     document.body.appendChild(a);
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleCopyToClipboard = () => {
//     navigator.clipboard
//       .writeText(jsonData)
//       .then(() => alert("Copied to clipboard"))
//       .catch((error) => console.error("Failed to copy:", error));
//   };

//   const handleClear = () => {
//     setCsvData("");
//     setJsonData("");
//     setErrorMessage("");
//   };

//   return (
//     <main className="json-formatter-container">
//       <Helmet>
//         <title>JSON and XML Formatter : Format JSON and XML online</title>
//         <meta
//           name="description"
//           content="Convert CSV to JSON for easy data manipulation. Download the converted JSON file or copy the JSON data instantly."
//         />
//         <meta
//           name="keywords"
//           content="CSV to JSON, convert CSV to JSON, CSV to JSON converter, JSON converter, CSV converter, online CSV to JSON converter"
//         />
//       </Helmet>

//       <h1 className="json-formatter-title">CSV to JSON Converter</h1>
//       <div>
//         <h2>How to Use:</h2>
//         <p>
//           Enter your CSV data in the left editor. Click the "Convert to JSON"
//           button to convert CSV to JSON format. The converted JSON data will
//           appear in the right editor. You can download the JSON file by clicking
//           the "Download JSON" button or copy the JSON data to your clipboard by
//           clicking the "Copy to Clipboard" button.
//         </p>
//       </div>
//       <div className="json-formatter-actions">
//         <button onClick={convertCSVToJSON} className="format-button">
//           Convert to JSON
//         </button>
//         <button onClick={handleClear} className="clear-button">
//           Clear
//         </button>
//         {jsonData && (
//           <>
//             <button onClick={handleDownloadJSON} className="download-button">
//               Download JSON
//             </button>
//             <button onClick={handleCopyToClipboard} className="copy-button">
//               Copy to Clipboard
//             </button>
//           </>
//         )}
//       </div>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       <div className="json-formatter-content">
//         <div className="csv-input">
//           <h3>CSV Input</h3>
//           <AceEditor
//             mode="csv"
//             theme="monokai"
//             value={csvData}
//             onChange={handleCsvChange}
//             height="500px"
//             fontSize={16}
//             showGutter={true}
//             highlightActiveLine={true}
//             setOptions={{ useWorker: false, wrap: true }}
//             className="json-editor"
//           />
//           <div className="editor-description">
//             <h4>About CSV:</h4>
//             <p>
//               CSV (Comma-Separated Values) is a plain text format used for
//               representing tabular data. Each line in a CSV file corresponds to
//               a row in the table, and the values in each row are separated by
//               commas.
//             </p>
//             <p>
//               Learn more about CSV{" "}
//               <a
//                 style={{ color: "#1E1BDA" }}
//                 href="https://en.wikipedia.org/wiki/Comma-separated_values"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 here
//               </a>
//               .
//             </p>
//           </div>
//         </div>
//         <div className="json-output">
//           <h3>JSON Output</h3>
//           <AceEditor
//             mode="json"
//             theme="monokai"
//             value={jsonData}
//             readOnly={true}
//             height="500px"
//             fontSize={16}
//             showGutter={true}
//             highlightActiveLine={true}
//             setOptions={{ useWorker: false, wrap: true }}
//             className="json-editor"
//           />
//           <div className="editor-description">
//             <h4>About JSON:</h4>
//             <p>
//               JSON (JavaScript Object Notation) is a lightweight data
//               interchange format. It is easy for humans to read and write. JSON
//               is often used for transmitting data between a server and a web
//               application.
//             </p>
//             <p>
//               Learn more about JSON{" "}
//               <a
//                 style={{ color: "#1E1BDA" }}
//                 href="https://www.json.org/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 here
//               </a>
//               .
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="example-data">
//         <h2 style={{ textAlign: "center" }}>Example Data:</h2>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-evenly",
//             alignContent: "center",
//           }}
//         >
//           <p>
//             CSV Data:
//             <pre>
//               {`name,age,city
// John Doe,30,New York
// Jane Smith,25,Los Angeles
// Michael Johnson,35,Chicago`}
//             </pre>
//           </p>
//           <p>
//             Equivalent JSON:
//             <pre>
//               {`[
//   {
//     "name": "John Doe",
//     "age": 30,
//     "city": "New York"
//   },
//   {
//     "name": "Jane Smith",
//     "age": 25,
//     "city": "Los Angeles"
//   },
//   {
//     "name": "Michael Johnson",
//     "age": 35,
//     "city": "Chicago"
//   }
// ]`}
//             </pre>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default CSVToJSON;

import React, { useState } from "react";
import Papa from "papaparse";
import { Helmet } from "react-helmet";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "../css/JSONToCSV.css";

const CSVToJSON = () => {
  const [csvData, setCsvData] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCsvChange = (newCsvData) => {
    setCsvData(newCsvData);
    setErrorMessage("");
  };

  // Remove empty child from nested object
  const removeEmptyChild = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        if (Array.isArray(obj[key])) {
          obj[key] = obj[key].filter((child) =>
            Object.values(child).some((value) => value !== "")
          );
        } else {
          obj[key] = removeEmptyChild(obj[key]);
          if (Object.keys(obj[key]).length === 0) {
            delete obj[key];
          }
        }
      }
    }
    return obj;
  };

  // const convertCSVToJSON = () => {
  //   try {
  //     const lines = csvData.trim().split("\n");
  //     if (lines.length < 2) {
  //       return []; // Return empty array if there are no rows or only header row
  //     }

  //     const headers = lines[0].split(",");
  //     const jsonData = [];

  //     for (let i = 1; i < lines.length; i++) {
  //       const values = lines[i].split(",");
  //       const obj = {};

  //       for (let j = 0; j < headers.length; j++) {
  //         const keys = headers[j].split(".");
  //         let tempObj = obj;

  //         for (let k = 0; k < keys.length - 1; k++) {
  //           const key = keys[k];
  //           if (!tempObj[key]) {
  //             tempObj[key] = !isNaN(parseInt(keys[k + 1])) ? [] : {};
  //           }
  //           tempObj = tempObj[key];
  //         }

  //         const lastKey = keys[keys.length - 1];
  //         if (!tempObj[lastKey]) {
  //           tempObj[lastKey] = values[j];
  //         } else {
  //           if (!Array.isArray(tempObj[lastKey])) {
  //             tempObj[lastKey] = [tempObj[lastKey]];
  //           }
  //           tempObj[lastKey].push(values[j]);
  //         }
  //       }

  //       jsonData.push(obj);
  //     }

  //     const json = JSON.stringify(jsonData, null, 2);
  //     setJsonData(json);
  //     setErrorMessage("");
  //   } catch (error) {
  //     setJsonData("");
  //     setErrorMessage(error.message);
  //   }
  // };

  const convertCSVToJSON = () => {
    try {
      const lines = csvData.trim().split("\n");
      if (lines.length < 2) {
        return []; // Return empty array if there are no rows or only header row
      }

      const headers = lines[0].split(",");
      const jsonData = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i]
          .split(",")
          .map((value) => value.trim().replace(/\r/g, "")); // Ensure removal of '\r' characters
        const obj = {};

        for (let j = 0; j < headers.length; j++) {
          const keys = headers[j].split(".");
          let tempObj = obj;

          for (let k = 0; k < keys.length - 1; k++) {
            const key = keys[k];
            if (!tempObj[key]) {
              tempObj[key] = !isNaN(parseInt(keys[k + 1])) ? [] : {};
            }
            tempObj = tempObj[key];
          }

          const lastKey = keys[keys.length - 1].replace(/\r/g, ""); // Ensure removal of '\r' characters from keys
          if (!tempObj[lastKey]) {
            tempObj[lastKey] = values[j];
          } else {
            if (!Array.isArray(tempObj[lastKey])) {
              tempObj[lastKey] = [tempObj[lastKey]];
            }
            tempObj[lastKey].push(values[j]);
          }
        }

        jsonData.push(obj);
      }

      const json = JSON.stringify(jsonData, null, 2);
      setJsonData(json);
      setErrorMessage("");
    } catch (error) {
      setJsonData("");
      setErrorMessage(error.message);
    }
  };

  const handleClear = () => {
    setCsvData("");
    setJsonData("");
    setErrorMessage("");
  };

  return (
    <main className="json-formatter-container">
      <Helmet>
        <title>CSV to JSON Converter</title>
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
          appear in the right editor.
        </p>
      </div>
      <div className="json-formatter-actions">
        <button onClick={convertCSVToJSON} className="format-button">
          Convert to JSON
        </button>
        <button onClick={handleClear} className="clear-button">
          Clear
        </button>
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
            <pre
              style={{ width: "30rem", height: "20rem", overflow: "scroll" }}
            >
              {`name,age,address.city,address.country,hobbies.0,hobbies.1,hobbies.2,family.spouse.name,family.spouse.age,family.spouse.occupation,family.children.0.name,family.children.0.age,family.children.1.name,family.children.1.age,family.children.2.name,family.children.2.age
Michael,40,Chicago,USA,Cooking,Hiking,Fishing,Sarah,38,Teacher,Emily,12,Jacob,10,Liam,8
Sophia,35,London,UK,Painting,Singing,Dancing,David,38,Architect,Olivia,6,Noah,4,Ava,2`}
            </pre>
          </p>
          <p>
            Equivalent JSON:
            <pre
              style={{ width: "30rem", height: "20rem", overflow: "scroll" }}
            >
              {`[
  {
    "name": "Michael",
    "age": "40",
    "address": {
      "city": "Chicago",
      "country": "USA"
    },
    "hobbies": [
      "Cooking",
      "Hiking",
      "Fishing"
    ],
    "family": {
      "spouse": {
        "name": "Sarah",
        "age": "38",
        "occupation": "Teacher"
      },
      "children": [
        {
          "name": "Emily",
          "age": "12"
        },
        {
          "name": "Jacob",
          "age": "10"
        },
        {
          "name": "Liam",
          "age": "8"
        }
      ]
    }
  },
  {
    "name": "Sophia",
    "age": "35",
    "address": {
      "city": "London",
      "country": "UK"
    },
    "hobbies": [
      "Painting",
      "Singing",
      "Dancing"
    ],
    "family": {
      "spouse": {
        "name": "David",
        "age": "38",
        "occupation": "Architect"
      },
      "children": [
        {
          "name": "Olivia",
          "age": "6"
        },
        {
          "name": "Noah",
          "age": "4"
        },
        {
          "name": "Ava",
          "age": "2"
        }
      ]
    }
  }
]`}
            </pre>
          </p>
        </div>
      </div>
      <div className="description">
        <h3>How we are converting the data.</h3>
        <p>
          When converting CSV to JSON, we iterate through each row of the CSV
          data and parse it into a JSON object. For each row, we split the
          values by the comma delimiter and map them to their corresponding keys
          in the JSON structure. We handle nested objects and arrays by parsing
          the keys with dot notation, ensuring that the resulting JSON structure
          reflects the hierarchical relationship between the data fields.
        </p>
        <p>
          In the resulting JSON output, arrays are represented as JSON arrays,
          with elements indexed by numerical values (e.g., <code>0</code>,{" "}
          <code>1</code>) corresponding to the array indices in the CSV headers.
          This means that if an array contains multiple values, each value is
          placed in its respective position within the JSON array, preserving
          the order of elements as specified in the CSV data.
        </p>
        <p>
          Each hobby listed under <code>hobbies</code> and each child listed
          under <code>family.children</code> corresponds to an array index, such
          as <code>hobbies.0</code>, <code>hobbies.1</code>,{" "}
          <code>hobbies.2</code>, and similarly for <code>family.children</code>
          . This array indexing ensures that the JSON output accurately reflects
          the sequential order of items in the CSV data. Nested objects, such as{" "}
          <code>address</code> and <code>family</code>, are represented in the
          JSON output as JSON objects. Each subfield within a nested object is
          indicated by dot notation, with each dot representing a level of
          nesting. For example, <code>address.city</code> and{" "}
          <code>address.country</code> represent subfields within the{" "}
          <code>address</code> object. Similarly,{" "}
          <code>family.spouse.name</code>, <code>family.spouse.age</code>, and{" "}
          <code>family.spouse.occupation</code> represent subfields within the{" "}
          <code>family.spouse</code> object. This hierarchical structure in the
          JSON output accurately captures the nested relationships present in
          the original CSV data.
        </p>
      </div>
    </main>
  );
};

export default CSVToJSON;
