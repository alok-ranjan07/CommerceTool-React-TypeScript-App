import React, { useEffect, useState } from "react";
import {
  getStoreByKey,
  getCustomersInStore,
  getCustomersInStoreByKey,
} from "../../Service/store";
import Table from "react-bootstrap/esm/Table";
import { Button } from "react-bootstrap";
import SearchBar from "../../UI/SearchBar";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../CSS/MainCssFile.module.css";

const StoreCustomerList = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  const [storeCustomerList, setStoreCustomerList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCustomersInStore({ key: key }).then((data) => {
      setStoreCustomerList(data.body.results);
      console.log(data.body.results);
    });
  }, [key]);

  const errorHandler = () => {
    setError(null);
  };

  const viewCustomerListHandler = () => {
    console.log("event prop " + key);
    getCustomersInStore(key).then((data) => {
      setStoreCustomerList(data.body.results);
    });
    setError(null);
  };

  const searchDataHandler = (event) => {
    getCustomersInStoreByKey(Object.assign(event, { storeKey: key }))
      .then((data) => {
        setStoreCustomerList([data.body]);
        setError(null);
      })
      .catch(
        setError({
          message: `Customer with store key : "${event.input}" doesn't exist.`,
        })
      );
  };

  return (
    <React.Fragment>
      <main style={{ display: "flex", justifyContent: "center", width: "80%" }}>
        <SearchBar
          label={"Enter store Key"}
          onSave={searchDataHandler}
          error={errorHandler}
        />
        <Button
          onClick={viewCustomerListHandler}
          style={{ marginLeft: "10px" }}
        >
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
            <th>Name</th>
            <th>Key</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {storeCustomerList.length !== 0 &&
            storeCustomerList.map((list) => {
              return (
                <tr key={list.id}>
                  <td>{list.firstName}</td>
                  <td>{list.key}</td>
                  <td>{list.email}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {storeCustomerList.length === 0 && (
        <p style={{ color: "red" }}>No Product Available</p>
      )}
    </React.Fragment>
  );
};
export default StoreCustomerList;
