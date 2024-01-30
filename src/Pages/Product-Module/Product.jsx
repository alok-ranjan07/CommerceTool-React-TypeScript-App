import React, { useEffect, useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import UnAuthorizedUser from "../../Components/UnAuthorizedUser";
import {
  createOrderFromProductSKU,
  getProductProjectionsDetails,
} from "../../Service/product";
import { Button, Table } from "react-bootstrap";
import SearchBar from "../../UI/SearchBar";
import styles from "../../CSS/MainCssFile.module.css";
import { useNavigate } from "react-router-dom";
import Microphone from "../../UI/Microphone";

const Product = () => {
  const authorisedUser = localStorage.getItem("authorisedUser") === "true";
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);
  const [searchBarInputValue, setSearchBarInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProductProjectionsDetails({ input: "" }).then((data) => {
      setProductList(data.body.results);
    });
  }, []);
  console.log(productList);

  const viewProductListHandler = () => {
    getProductProjectionsDetails({ input: "" }).then((data) => {
      setProductList(data.body.results);
    });
    setError(null);
  };

  const searchDataHandler = (event) => {
    getProductProjectionsDetails(event)
      .then((data) => {
        if (data.body.results.length > 0) {
          setProductList(data.body.results);
          setError(null);
        } else {
          setError({
            message: `Product with text : "${event.input}" doesn't exist.`,
          });
        }
      })
      .catch(
        setError({
          message: `Product with text : "${event.input}" doesn't exist.`,
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

  const speechToTextHandler = (event) => {
    setSearchBarInputValue(event.message);
    searchDataHandler({ input: event.message });
  };

  return (
    <React.Fragment>
      {!authorisedUser ? (
        <UnAuthorizedUser />
      ) : (
        <div>
          <main
            style={{ display: "flex", justifyContent: "center", width: "80%" }}
          >
            <SearchBar
              inputValue={searchBarInputValue}
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
                navigate("/");
              }}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <MDBIcon
                icon="angle-double-left"
                className={`${styles.icon} ${styles.leftArrow}`}
              />
            </Button>
            <Microphone onStop={speechToTextHandler} />
          </main>
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
                    <td>{list.name.en}</td>
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
                            arrayOfSKUs: [list.masterVariant.sku],
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
        </div>
      )}
    </React.Fragment>
  );
};
export default Product;
