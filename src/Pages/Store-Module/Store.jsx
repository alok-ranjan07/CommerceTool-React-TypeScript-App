import React from "react";
import classes from "../../CSS/MainNavigation.module.css";
import Card from "../../UI/Card";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Store = () => {
  const navigate = useNavigate();
  const viewStoreListHandler = () => {
    navigate("/store/storeList");
  };
  return (
    <React.Fragment>
      <Card>
        <h3>Select what you want to do </h3>
        <div className={classes.header}>
          <ul className={classes.list}>
            <li>
              <Button onClick={viewStoreListHandler}>Store List</Button>
            </li>
          </ul>
        </div>
      </Card>
    </React.Fragment>
  );
};
export default Store;