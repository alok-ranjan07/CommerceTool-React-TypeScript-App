import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation";
import React from "react";

const Layout = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
};
export default Layout;
