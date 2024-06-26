import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#050505",
        padding: "20px 0px 20px 0px",
        textAlign: "center",
      }}
    >
      <p style={{ color: "white", margin: 0 }}>
        Developed and maintained by{" "}
        <span>
          <a
            style={{ color: "#8C96DE", textDecoration: "none" }}
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
