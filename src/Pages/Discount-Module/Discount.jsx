import React from "react";
import classes from "../../CSS/MainNavigation.module.css";
import Card from "../../UI/Card";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Discount = () => {
  const navigate = useNavigate();
  const viewCartDiscountHandler = () => {
    navigate("/discount/cartDiscount ");
  };
  return (
    <React.Fragment>
      <Card>
        <main style={{ padding: "20px 50px 0 50px " }}>
          <h3>Select what you want to do </h3>
          <div className={classes.header}>
            <ul className={classes.list}>
              <li>
                <Button onClick={viewCartDiscountHandler}>
                  Cart-Discounts
                </Button>
              </li>
              <li>
                <Button>Discount-codes</Button>
              </li>
            </ul>
          </div>
        </main>
      </Card>
    </React.Fragment>
  );
};
export default Discount;
