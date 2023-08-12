import React from "react";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";

import Home from "./presentor/Home";
import Commissioner from "./presentor/Commissioner";
import Navbar from "./navigator/Navbar";
import Layout from "./navigator/Layout";

const App = () => {
  return (
    <Router>
      <Layout>
      {/* <Navbar/> */}
      <Routes>
        <Route exact path="/" element={<Home name="larry"/>} />
        <Route path="/commissioner" element={<Commissioner/>} />
      </Routes>
      </Layout>
    </Router>
  );
};
export default App;
