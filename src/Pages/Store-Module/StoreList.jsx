import React, { useEffect, useState } from "react";
import { getStoreDetails, getStoreByKey } from "../../Service/store";
import Table from "react-bootstrap/esm/Table";
import { Button } from "react-bootstrap";
import SearchBar from "../../UI/SearchBar";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import styles from "../../CSS/MainCssFile.module.css";
import UnAuthorizedUser from "../../Components/UnAuthorizedUser";

const StoreList = () => {
  const authorisedUser = localStorage.getItem("authorisedUser") === "true";
  const navigate = useNavigate();
  const [storeList, setStoreList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStoreDetails().then((data) => {
      setStoreList(data.body.results);
    });
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  const viewListHandler = () => {
    getStoreDetails().then((data) => {
      setStoreList(data.body.results);
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

  return (
    <React.Fragment>
      {!authorisedUser ? (
        <UnAuthorizedUser />
      ) : (
        <div>
          <main
            style={{ display: "flex", justifyContent: "center", width: "70%" }}
          >
            <SearchBar
              label={"Enter store Key"}
              onSave={searchDataHandler}
              error={errorHandler}
            />
            <Button onClick={viewListHandler} style={{ marginLeft: "10px" }}>
              <MDBIcon
                icon="sync"
                className={`${styles.icon} ${styles.sync}`}
              />
            </Button>
            <Button
              onClick={() => {
                navigate("/store");
              }}
              style={{ marginLeft: "10px" }}
            >
              <MDBIcon
                icon="angle-double-left"
                className={`${styles.icon} ${styles.leftArrow}`}
              />
            </Button>
            <Button
              onClick={() => {
                navigate("/store/storeList/add");
              }}
              style={{ marginLeft: "10px" }}
            >
              <MDBIcon
                icon="plus"
                className={`${styles.icon} ${styles.plus}`}
              />
            </Button>
          </main>

          {error && <main>{error.message}</main>}
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Store Key</th>
                <th>Customer</th>
                <th>Product</th>
              </tr>
            </thead>
            <tbody>
              {storeList.map((list) => {
                return (
                  <tr key={list.id}>
                    <td>{list.name.en}</td>
                    <td>{list.key}</td>

                    <td>
                      <Button
                        style={{ marginRight: "20px" }}
                        variant="success"
                        onClick={() => {
                          navigate(`/store/customer/${list.key}`);
                        }}
                      >
                        View Customers
                      </Button>
                    </td>
                    <td>
                      <Button
                        style={{ marginRight: "20px" }}
                        variant="success"
                        onClick={() => {
                          navigate(`/store/product/${list.key}`);
                        }}
                      >
                        View Products
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
export default StoreList;
