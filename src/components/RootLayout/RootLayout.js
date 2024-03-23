import React from "react";
import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function RootLayout() {
  return (
    <div>
      <Nav />
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
