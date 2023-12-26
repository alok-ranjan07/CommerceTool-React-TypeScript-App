import React from "react";
import Button from "../UI/Button";
import classes from "../CSS/MainNavigation.module.css";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";

const Discount = () => {
  const navigate = useNavigate();
  const viewCartDiscountHandler = () => {
    navigate("/discount/cartDiscount ");
  };
  return (
    <React.Fragment>
      <Card>
        <h3>Select what you want to do </h3>
        <div className={classes.header}>
          <ul className={classes.list}>
            <li>
              <Button onClick={viewCartDiscountHandler}>
                View Cart-Discounts
              </Button>
            </li>
            <li>
              <Button>View Discount-codes</Button>
            </li>
            <li>
              <Button>Add Cart-Discount</Button>
            </li>
            <li>
              <Button>Add Discount-code</Button>
            </li>
          </ul>
        </div>
      </Card>
    </React.Fragment>
  );
};
export default Discount;
