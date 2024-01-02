import React, { useEffect, useState } from "react";
import { getProductsInStore } from "../../Service/store";
import Table from "react-bootstrap/esm/Table";
import { Button } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../CSS/MainCssFile.module.css";
import UnAuthorizedUser from "../../Components/UnAuthorizedUser";

const StoreProductList = () => {
  const authorisedUser = localStorage.getItem("authorisedUser") === "true";
  const navigate = useNavigate();
  const { key } = useParams();
  const [storeProductList, setStoreProductList] = useState([]);

  useEffect(() => {
    getProductsInStore({ key: key }).then((data) => {
      setStoreProductList(data.body.results);
      console.log(data.body.results);
    });
  }, [key]);

  const viewProductListHandler = () => {
    getProductsInStore({ key: key }).then((data) => {
      setStoreProductList(data.body.results);
    });
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
        </div>
      )}
    </React.Fragment>
  );
};
export default StoreProductList;
