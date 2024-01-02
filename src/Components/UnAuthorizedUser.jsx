import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const UnAuthorizedUser = () => {
  return (
    <React.Fragment>
      <Card style={{ padding: "0 100px 50px 100px" }}>
        <main>
          <h1>UnAuthorized Access!</h1>
          <p>Please check your credentials</p>
          <Link to="..">Home</Link>
        </main>
      </Card>
    </React.Fragment>
  );
};
export default UnAuthorizedUser;
