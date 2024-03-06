import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#050505",
      }}
    >
      <p style={{ color: "white" }}>
        Developed and maintained by{" "}
        <span>
          <a
            style={{ color: "#8C96DE" }}
            target="_blank"
            href="https://www.linkedin.com/in/anurag-daliya/"
          >
            Anurag Daliya.
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
