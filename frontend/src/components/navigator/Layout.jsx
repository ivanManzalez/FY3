import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px", marginTop:"64px" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
