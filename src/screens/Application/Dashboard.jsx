import React from "react";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <Navbar />
      <section className="flex flex-col w-full">
        <Header />
        <Outlet/>
      </section>
    </div>
  );
};

export default Dashboard;
