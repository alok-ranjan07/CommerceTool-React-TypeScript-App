import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import { MDBIcon } from "mdb-react-ui-kit";
import UnAuthorizedUser from "../../Components/UnAuthorizedUser";
import {
  createOrderFromProductSKU,
  getProductDetails,
  getProductProjectionsDetails,
} from "../../Service/product";
import { Button, Table } from "react-bootstrap";
import SearchBar from "../../UI/SearchBar";
import styles from "../../CSS/MainCssFile.module.css";
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
  const authorisedUser = localStorage.getItem("authorisedUser") === "true";
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { key } = useParams();

  // useEffect(() => {
  //   getProductDetails().then((data) => {
  //     setProductList(data.body.results);
  //   });
  // }, []);
  // console.log(productList);

  const viewProductListHandler = () => {
    getProductProjectionsDetails({ key: key }).then((data) => {
      setProductList(data.body.results);
    });
  };

  const searchDataHandler = (event) => {
    getProductProjectionsDetails({ key: key })
      .then((data) => {
        console.log("list of product " + data.body.results.length)
        setProductList(data.body.results);
        setError(null);
      })
      .catch(
        setError({
          message: `Product with  key : "${event.input}" doesn't exist.`,
        })
      );
  };

  const errorHandler = () => {
    setError(null);
  };
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
           <main
            style={{ display: "flex", justifyContent: "center", width: "80%" }}
          >
              <SearchBar
              label={"Enter product key"}
              onSave={searchDataHandler}
              error={errorHandler}
            />
            <Button
              onClick={viewProductListHandler}
              style={{ marginLeft: "10px" }}
            >
              <MDBIcon
                icon="sync"
                className={`${styles.icon} ${styles.sync}`}
              />
            </Button>
            <Button
              onClick={() => {
                navigate("/store/storeList");
              }}
              style={{ marginLeft: "10px" }}
            >
              <MDBIcon
                icon="angle-double-left"
                className={`${styles.icon} ${styles.leftArrow}`}
              />
            </Button>
          </main>
          {error && <main>{error.message}</main>}
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Product SKU</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((list) => {
                return (
                  <tr key={list.id}>
                    <td>{list.name.en}</td>
                    <td>{list.metaDescription.en}</td>
                    <td>{list.masterVariant.sku}</td>
                    <td>
                      {`${list.masterVariant.prices[0].value.centAmount} 
                        ${list.masterVariant.prices[0].value.currencyCode}`}
                    </td>
                    <td>
                      <Button
                        style={{ marginRight: "20px" }}
                        variant="success"
                        onClick={() => {
                          placeOrderHandler({
                            arrayOfSKUs: [
                              list.masterVariant.sku,
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
