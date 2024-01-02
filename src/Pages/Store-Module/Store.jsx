import React from "react";
import classes from "../../CSS/MainNavigation.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Card from "../../UI/Card";
import UnAuthorizedUser from "../../Components/UnAuthorizedUser";

const Store = () => {
  const authorisedUser = localStorage.getItem("authorisedUser") === "true";
  const navigate = useNavigate();
  const viewStoreListHandler = () => {
    navigate("/store/storeList");
  };
  return (
    <React.Fragment>
      {!authorisedUser ? (
        <UnAuthorizedUser />
      ) : (
        <Card>
          <main style={{ padding: "20px 50px 0 50px " }}>
            <h3>Select what you want to do </h3>
            <div className={classes.header}>
              <ul className={classes.list}>
                <li>
                  <Button onClick={viewStoreListHandler}>Store List</Button>
                </li>
              </ul>
            </div>
          </main>
        </Card>
      )}
    </React.Fragment>
  );
};
export default Store;
