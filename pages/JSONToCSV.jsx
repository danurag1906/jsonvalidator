// import React, { useState } from "react";
// import Papa from "papaparse";
// import { Helmet } from "react-helmet";
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-json";
// // import "ace-builds/src-noconflict/mode-csv";
// import "ace-builds/src-noconflict/theme-monokai";
// // import "../css/JSONFormatter.css"; // Import CSS file for additional styling
// import "../css/JSONToCSV.css";

// const JSONToCSV = () => {
//   const [jsonData, setJsonData] = useState("");
//   const [csvData, setCsvData] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleJsonChange = (newJsonData) => {
//     setJsonData(newJsonData);
//     setErrorMessage("");
//   };

//   const convertJSONToCSV = () => {
//     try {
//       const parsedData = JSON.parse(jsonData);
//       const csv = Papa.unparse(parsedData);
//       setCsvData(csv);
//       setErrorMessage("");
//     } catch (error) {
//       setCsvData("");
//       setErrorMessage(error.message);
//     }
//   };

//   const handleDownloadCSV = () => {
//     const blob = new Blob([csvData], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "output.csv";
//     document.body.appendChild(a);
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleCopyToClipboard = () => {
//     navigator.clipboard
//       .writeText(csvData)
//       .then(() => alert("Copied to clipboard"))
//       .catch((error) => console.error("Failed to copy:", error));
//   };

//   const handleClear = () => {
//     setJsonData("");
//     setCsvData("");
//     setErrorMessage("");
//   };

//   return (
//     <main className="json-formatter-container">
//       <Helmet>
//         <title>JSON and XML Formatter : Format JSON and XML online</title>
//         <meta
//           name="description"
//           content="Convert JSON to CSV for easy data analysis. Download the converted CSV file or copy the CSV data instantly."
//         />
//         <meta
//           name="keywords"
//           content="JSON to CSV, convert JSON to CSV, JSON to CSV converter, CSV converter, JSON converter, online JSON to CSV converter"
//         />
//       </Helmet>

//       <h1 className="json-formatter-title">JSON to CSV Converter</h1>
//       <div>
//         <h2>How to Use:</h2>
//         <p>
//           Enter your JSON data in the left editor. Click the "Convert to CSV"
//           button to convert JSON to CSV format. The converted CSV data will
//           appear in the right editor. You can download the CSV file by clicking
//           the "Download CSV" button or copy the CSV data to your clipboard by
//           clicking the "Copy to Clipboard" button.
//         </p>
//         <p>Enter data in [] brackets</p>
//       </div>
//       <div className="json-formatter-actions">
//         <button onClick={convertJSONToCSV} className="format-button">
//           Convert to CSV
//         </button>
//         <button onClick={handleClear} className="clear-button">
//           Clear
//         </button>
//         {csvData && (
//           <>
//             <button onClick={handleDownloadCSV} className="download-button">
//               Download CSV
//             </button>
//             <button onClick={handleCopyToClipboard} className="copy-button">
//               Copy to Clipboard
//             </button>
//           </>
//         )}
//       </div>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       <div className="json-formatter-content">
//         <div className="json-input">
//           <h3>JSON Input </h3>
//           {/* <p>Enter data in [] brackets</p> */}
//           <AceEditor
//             mode="json"
//             theme="monokai"
//             value={jsonData}
//             onChange={handleJsonChange}
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
//         <div className="csv-output">
//           <h3>CSV Output</h3>
//           <AceEditor
//             mode="csv"
//             theme="monokai"
//             value={csvData}
//             readOnly={true}
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
//             JSON Data:
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
//           <p>
//             Equivalent CSV:
//             <pre>
//               {`name,age,city
// John Doe,30,New York
// Jane Smith,25,Los Angeles
// Michael Johnson,35,Chicago`}
//             </pre>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default JSONToCSV;

import React, { useState } from "react";
import Papa from "papaparse";
import { Helmet } from "react-helmet";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/mode-csv";
import "ace-builds/src-noconflict/theme-monokai";
// import "../css/JSONFormatter.css"; // Import CSS file for additional styling
import "../css/JSONToCSV.css";

const JSONToCSV = () => {
  const [jsonData, setJsonData] = useState("");
  const [csvData, setCsvData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleJsonChange = (newJsonData) => {
    setJsonData(newJsonData);
    setErrorMessage("");
  };

  function convertJsonToCsv(jsonArray) {
    if (!jsonArray || !Array.isArray(jsonArray) || jsonArray.length === 0) {
      return ""; // return empty string if the input is invalid
    }

    let csv = "";

    // Extract column headings from the keys of the first object
    const firstObject = jsonArray[0];
    const headings = [];

    const flattenObject = (obj, prefix = "") => {
      for (const key in obj) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          flattenObject(value, newKey); // Recursively flatten nested objects
        } else if (Array.isArray(value)) {
          value.forEach((element, index) => {
            if (typeof element === "object" && element !== null) {
              flattenObject(element, `${newKey}.${index}`); // Recursively flatten nested array elements
            } else {
              headings.push(`${newKey}.${index}`); // Add index to heading for non-object array elements
            }
          });
        } else {
          headings.push(newKey);
        }
      }
    };

    flattenObject(firstObject);

    csv += headings.join(",") + "\n";

    // Function to extract values recursively
    const extractValues = (obj) => {
      const values = [];

      headings.forEach((heading) => {
        const keys = heading.split(".");
        let value = obj;

        keys.forEach((key) => {
          if (value && typeof value === "object" && value.hasOwnProperty(key)) {
            value = value[key];
          } else {
            value = ""; // Set value to empty string if key doesn't exist
          }
        });

        values.push(value);
      });

      return values;
    };

    // Iterate through each object in the array
    jsonArray.forEach((obj) => {
      // Add values to the CSV string
      csv += extractValues(obj).join(",") + "\n";
    });

    return csv;
  }

  // // Example JSON array
  // const jsonArray = [
  //   /* Your JSON array here */
  // ];

  // const csvResult = convertJsonToCsv(jsonArray);
  // console.log(csvResult);

  const convertJSONToCSV = () => {
    try {
      const parsedData = JSON.parse(jsonData);
      const csv = convertJsonToCsv(parsedData);
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
        <title>JSON and XML Formatter : Format JSON and XML online</title>
        <meta
          name="description"
          content="Convert JSON to CSV for easy data analysis. Download the converted CSV file or copy the CSV data instantly."
        />
        <meta
          name="keywords"
          content="JSON to CSV, convert JSON to CSV, JSON to CSV converter, CSV converter, JSON converter, online JSON to CSV converter"
        />
      </Helmet>

      <h1 className="json-formatter-title">JSON to CSV Converter</h1>
      <div>
        <h2>How to Use:</h2>
        <p>
          Enter your JSON data in the left editor. Click the "Convert to CSV"
          button to convert JSON to CSV format. The converted CSV data will
          appear in the right editor. You can download the CSV file by clicking
          the "Download CSV" button or copy the CSV data to your clipboard by
          clicking the "Copy to Clipboard" button.
        </p>
        <p>Enter data in [] brackets</p>
      </div>
      <div className="json-formatter-actions">
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
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="json-formatter-content">
        <div className="json-input">
          <h3>JSON Input </h3>
          {/* <p>Enter data in [] brackets</p> */}
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
            JSON Data:
            <pre
              style={{ width: "30rem", height: "20rem", overflow: "scroll" }}
            >
              {`[
  {
    "name": "John",
    "age": 30,
    "address": {
      "city": "New York",
      "country": "USA"
    },
    "hobbies": ["Reading", "Gaming"],
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
    "hobbies": ["Traveling", "Photography"],
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
          </p>
          <p>
            Equivalent CSV:
            <pre
              style={{ width: "30rem", height: "20rem", overflow: "scroll" }}
            >
              {/* Modified CSV representation */}
              {`name,age,address.city,address.country,hobbies.0,hobbies.1,family.spouse.name,family.spouse.age,family.spouse.occupation,family.children.0.name,family.children.0.age,family.children.1.name,family.children.1.age
John,30,New York,USA,Reading,Gaming,Jane,28,Engineer,Alice,5,Bob,7
Alice,25,Los Angeles,USA,Traveling,Photography,Mike,30,Artist,Eve,3,,`}
            </pre>
          </p>
        </div>
      </div>
      <div className="description">
        {/* Description in HTML tag... */}
        <h3>How we are converting the data.</h3>
        <p>
          When converting nested objects from JSON to CSV, we traverse each
          object recursively. For each key-value pair in the JSON object, if the
          value is itself an object (and not an array), we continue to traverse
          that object. For arrays, we handle them slightly differently: if an
          array contains objects, we flatten each object inside the array,
          ensuring that each key-value pair is correctly represented in the CSV
          output. Array indices are also included in the column headers to
          differentiate between elements in the array.
        </p>
        <p>
          For naming conventions in the CSV output, we use dot notation to
          represent nested objects. For example, if we have an object{" "}
          <code>address</code> with subfields <code>city</code> and{" "}
          <code>country</code>, these would be represented in the CSV headers as{" "}
          <code>address.city</code> and <code>address.country</code>,
          respectively. Similarly, for arrays, we include indices in the column
          headers to represent array elements. For instance, if we have an array{" "}
          <code>hobbies</code> with elements at indices 0 and 1, these would be
          represented as <code>hobbies.0</code> and <code>hobbies.1</code> in
          the CSV headers. This ensures that the CSV headers accurately reflect
          the structure of the original JSON data.
        </p>
      </div>
    </main>
  );
};

export default JSONToCSV;
