import React from "react";
import MainNavigation from "../Components/MainNavigation";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <Card>
        <main>
          <h1>An error occurred!</h1>
          <p>Could not find this page!</p>
          <Link to="..">Go Back</Link>
        </main>
      </Card>
    </React.Fragment>
  );
};
export default ErrorPage;
