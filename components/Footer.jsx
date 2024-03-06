import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
      }}
    >
      <p style={{ color: "white" }}>
        Developed and maintained by{" "}
        <span>
          <a target="_blank" href="https://anuragdaliya.vercel.app/">
            Anurag Daliya.
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
