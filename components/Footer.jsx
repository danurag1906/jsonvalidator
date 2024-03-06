import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
      }}
    >
      <p style={{ color: "white" }}>
        Developed and maintained by{" "}
        <span>
          <a target="_blank" href="https://www.linkedin.com/in/anurag-daliya/">
            Anurag Daliya.
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
