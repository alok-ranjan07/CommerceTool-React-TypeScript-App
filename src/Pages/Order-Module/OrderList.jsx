import React, { useEffect, useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import UnAuthorizedUser from "../../Components/UnAuthorizedUser";
import {
  getMyOrders,
} from "../../Service/order";
import { Button, Table } from "react-bootstrap";
import SearchBar from "../../UI/SearchBar";
import styles from "../../CSS/MainCssFile.module.css";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const authorisedUser = localStorage.getItem("authorisedUser") === "true";
  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMyOrders({ input: "" }).then((data) => {
      setOrderList(data.body.results);
    });
  }, []);
 

  

  const errorHandler = () => {
    setError(null);
  };



  return (
    <React.Fragment>
      {!authorisedUser ? (
        <UnAuthorizedUser />
      ) : (
        <div>
          {error && <main>{error.message}</main>}
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Product SKU</th>
                <th>Product Price</th>
                <th>Billing Address</th>
                <th>Order CreatedAt</th>
                <th>Order State</th>
              </tr>
            </thead>
            <tbody>
              {orderList && orderList.map((list) => {
                return (
                  <tr key={list.id}>
                    <td>{list.id}</td>
                    <td>{list.lineItems[0].name.en}</td>
                    <td>{list.totalPrice.centAmount} {" "} 
                    {list.totalPrice.currencyCode}</td>
                    <td>{list.billingAddress.firstName}{" "}
                    {list.billingAddress.lastName}<br/>
                    {list.billingAddress.streetName} {" "}
                    {list.billingAddress.city}{" "}
                    {list.billingAddress.postalCode}<br/>
                    {list.billingAddress.country}
                    </td>
                    <td>
                      {list.createdAt}
                    </td>
                    <td>{list.orderState}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </React.Fragment>
  );
};
export default OrderList;
