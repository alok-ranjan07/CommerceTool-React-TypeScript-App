import React, { useEffect, useState } from "react";
import {
  getStoreDetails,getStoreByKey,getCustomersInStore
} from "../../Service/store";
import Table from "react-bootstrap/esm/Table";
import { Button } from "react-bootstrap";
import SearchBar from "../../UI/SearchBar";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../CSS/MainCssFile.module.css";

const StoreCustomerList = () => {
  const navigate = useNavigate();
  const key=useParams();

  const [storeCustomerList, setStoreCustomerList] = useState([]);
  const [error, setError] = useState(null);
  const [state, setState] = useState(false);

  const errorHandler = () => {
    setError(null);
  };

  const backHandler = () => {
    navigate("/store");
  };

const viewCustomerListHandler = () => {
    console.log("event prop " + key)
    getCustomersInStore(key).then((data) => {
        storeCustomerList(data.body.results);
    });
    setError(null);
  };



  const searchDataHandler =  (event) => {
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
    getCustomersInStore(key).then((data) => {
      setStoreCustomerList(data.body.results);
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
        <Button onClick={viewCustomerListHandler} style={{ marginLeft: "10px" }}>
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
            <th>Name</th>
            <th>Key</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {storeCustomerList.map((list) => {
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
    </React.Fragment>
  );
};
export default StoreCustomerList;
