import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const screen = screenSize();
  return (
    <div style={{ display: "flex" }}>
      {screen === "phone" && (
        <>
          <Sidebar />
        </>
      )}
      {screen === "tablet" && (
        <>
          <Sidebar />
        </>
      )}
      {screen === "desktop" && (
        <>
          <Navbar />
        </>
      )}
      <div style={{ flexGrow: 0, padding: "10px", marginTop:"50px" }}>
        {children}
      </div>
    </div>
  );
};

const screenSize = () => {
  const aspectRatio = window.screen.width/window.screen.height;
  const screenArea = window.screen.width*window.screen.height;


  // Smart Phone
  if(aspectRatio < 0.68){
    return "phone"
  }
  // Tablet
  else if(aspectRatio >= 0.68 && aspectRatio < 0.7){
    return "tablet"
  }
  // Desktop
  else{
    return "desktop"
  }
}

export default Layout;
