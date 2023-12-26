import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import classes from "../CSS/MainNavigation.module.css";

const Home = () => {
  const navigate = useNavigate();
  const customerHandler = () => {
    navigate("/customer");
  };
  const productHandler = () => {
    navigate("/product");
  };
  const orderHandler = () => {
    navigate("/order");
  };
  const cartHandler = () => {
    navigate("/cart");
  };
  const discountHandler = () => {
    navigate("/discount");
  };
  return (
    <React.Fragment>
      <Card>
        <h2>Welcome to CommerceTool App</h2>
        <h4>Please select where you want to visit!</h4>
        <div className={classes.header}>
          <ul className={classes.list}>
            <li>
              <Button onClick={customerHandler}>Customer</Button>
            </li>
            <li>
              <Button onClick={productHandler}>Product</Button>
            </li>
            <li>
              <Button onClick={orderHandler}>Order</Button>
            </li>
            <li>
              <Button onClick={cartHandler}>Cart</Button>
            </li>
            <li>
              <Button onClick={discountHandler}>Discount</Button>
            </li>
          </ul>
        </div>
      </Card>
    </React.Fragment>
  );
};
export default Home;
