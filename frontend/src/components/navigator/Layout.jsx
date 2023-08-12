import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
