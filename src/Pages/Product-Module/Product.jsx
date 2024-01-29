import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import UnAuthorizedUser from "../../Components/UnAuthorizedUser";
import {
  createOrderFromProductSKU,
  getProductDetails,
} from "../../Service/product";
import { Button, Table } from "react-bootstrap";

const Product = () => {
  const authorisedUser = localStorage.getItem("authorisedUser") === "true";
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductDetails().then((data) => {
      setProductList(data.body.results);
    });
  }, []);
  console.log(productList);

  const placeOrderHandler = (event) => {
    createOrderFromProductSKU(event).then((order) => {
      setError({
        message: ` Order created successfully with orderId : "${order.body.id}" `,
      });
    });
  };

  return (
    <React.Fragment>
      {!authorisedUser ? (
        <UnAuthorizedUser />
      ) : (
        <Card>
          {error && <main>{error.message}</main>}
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product SKU</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((list) => {
                return (
                  <tr key={list.id}>
                    <td>{list.masterData.current.name.en}</td>
                    <td>{list.masterData.current.masterVariant.sku}</td>
                    <td>
                      {`${list.masterData.current.masterVariant.prices[0].value.centAmount} 
                        ${list.masterData.current.masterVariant.prices[0].value.currencyCode}`}
                    </td>
                    <td>
                      <Button
                        style={{ marginRight: "20px" }}
                        variant="success"
                        onClick={() => {
                          placeOrderHandler({
                            arrayOfSKUs: [
                              list.masterData.current.masterVariant.sku,
                            ],
                          });
                        }}
                      >
                        Place ORDER
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      )}
    </React.Fragment>
  );
};
export default Product;
