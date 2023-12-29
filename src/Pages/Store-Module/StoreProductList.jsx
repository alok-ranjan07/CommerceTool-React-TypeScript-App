import React, { useEffect, useState } from "react";
import { getStoreByKey, getProductsInStore } from "../../Service/store";
import Table from "react-bootstrap/esm/Table";
import { Button } from "react-bootstrap";
import SearchBar from "../../UI/SearchBar";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../CSS/MainCssFile.module.css";

const StoreProductList = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  const [storeProductList, setStoreProductList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductsInStore({ key: key }).then((data) => {
      setStoreProductList(data.body.results);
      console.log(data.body.results);
    });
  }, [key]);

  const errorHandler = () => {
    setError(null);
  };

  const viewProductListHandler = () => {
    getProductsInStore({ key: key }).then((data) => {
      setStoreProductList(data.body.results);
    });
    setError(null);
  };

  const searchDataHandler = (event) => {
    getStoreByKey(event)
      .then((data) => {
        setStoreProductList([data.body]);
        setError(null);
      })
      .catch(
        setError({
          message: `Store with  key : "${event.input}" doesn't exist.`,
        })
      );
  };

  return (
    <React.Fragment>
      <main style={{ display: "flex", justifyContent: "center", width: "80%" }}>
        <Button onClick={viewProductListHandler} style={{ marginLeft: "10px" }}>
          <MDBIcon icon="sync" className={`${styles.icon} ${styles.sync}`} />
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
            <th>Product Id</th>
            <th>Product Selection Id</th>
            <th>SKU</th>
          </tr>
        </thead>
        <tbody>
          {storeProductList.length !== 0 &&
            storeProductList.map((list) => {
              return (
                <tr key={list.product.id}>
                  <td>{list.product.id}</td>
                  <td>{list.productSelection.id}</td>
                  <td>{list.variantSelection.skus[0]}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {storeProductList.length === 0 && (
        <p style={{ color: "red" }}>No Product Available</p>
      )}
    </React.Fragment>
  );
};
export default StoreProductList;
