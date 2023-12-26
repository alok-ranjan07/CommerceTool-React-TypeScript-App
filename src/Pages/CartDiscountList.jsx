import React, { useEffect, useState } from "react";
import { viewAllCartDiscount } from "../Service/cart";
import Table from "react-bootstrap/esm/Table";
import { Button } from "react-bootstrap";
import SearchBar from "../UI/SearchBar";

const CartDiscountList = () => {
  const [discountList, setDiscountList] = useState([]);
  useEffect(() => {
    viewAllCartDiscount().then((data) => {
      setDiscountList(data.body.results);
    });
  }, []);

  return (
    <React.Fragment>
      <main style={{ display: "flex", justifyContent: "center", width: "50%" }}>
        <SearchBar label={"Enter Promo Key"} />
      </main>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Promo Name</th>
            <th>Promo Key</th>
            <th>Target</th>
            <th>Active</th>
            <th>Valid From</th>
            <th>Valid Until</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {discountList.map((list) => {
            return (
              <tr key={list.id}>
                <td>{list.name.en}</td>
                <td>{list.key}</td>
                <td>{list.target.type}</td>
                <td>{list.isActive ? "Yes" : "No"}</td>
                <td>{list.validFrom}</td>
                <td>{list.validUntil}</td>
                <td>
                  <Button style={{ marginRight: "10px" }} variant="success">
                    Edit
                  </Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};
export default CartDiscountList;

/* <>
{discountList.map((d) => {
  return d.name.en;
})}
</> */
