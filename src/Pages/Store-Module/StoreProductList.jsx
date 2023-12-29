import React, { useEffect, useState } from "react";
import {
  getStoreByKey, getCustomersInStore, getProductsInStore
} from "../../Service/store";
import Table from "react-bootstrap/esm/Table";
import { Button } from "react-bootstrap";
import SearchBar from "../../UI/SearchBar";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../CSS/MainCssFile.module.css";

const StoreProductList = () => {
  const navigate = useNavigate();
  const key = useParams()

  const [storeProductList, setStoreProductList] = useState([]);
  const [error, setError] = useState(null);
  const [state, setState] = useState(false);

  const errorHandler = () => {
    setError(null);
  };

  const backHandler = () => {
    navigate("/store");
  };

  const viewProductListHandler = () => {
    console.log("event prop " + key);
    getProductsInStore({key:key}).then((data) => {
      storeProductList(data.body.results);
    });
    setError(null);
  };

  const searchDataHandler = (event) => {
    getStoreByKey(event)
      .then((data) => {
        setStoreList([data.body]);
        setError(null);
      })
      .catch(
        setError({
          message: `Store with  key : "${event.input}" doesn't exist.`,
        })
      );
  };
  useEffect(() => {
    console.log("event prop " + key)
    getProductsInStore(key).then((data) => {
      setStoreProductList(data.body.results);
    });
  }, [state]);

  return (
    <React.Fragment>
      <main style={{ display: "flex", justifyContent: "center", width: "50%" }}>
        <SearchBar
          label={"Enter store Key"}
          onSave={searchDataHandler}
          error={errorHandler}
        />
        <Button onClick={viewProductListHandler} style={{ marginLeft: "10px" }}>
          <MDBIcon icon="sync" className={`${styles.icon} ${styles.sync}`} />
        </Button>
        <Button onClick={backHandler} style={{ marginLeft: "10px" }}>
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
          {storeProductList.map((list) => {
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
    </React.Fragment>
  );
};
export default StoreProductList;
