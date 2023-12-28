import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation";
import React from "react";
import { Card } from "react-bootstrap";

const Layout = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <Card>
        <main>
          <Outlet />
        </main>
      </Card>
    </React.Fragment>
  );
};
export default Layout;
