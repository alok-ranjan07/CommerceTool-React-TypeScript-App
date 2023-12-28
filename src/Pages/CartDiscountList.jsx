import React, { useEffect, useState } from "react";
import {
  getCartDiscountByKey,
  getCartDiscountList,
  deleteCartDiscountById,
} from "../Service/cart";
import Table from "react-bootstrap/esm/Table";
import { Button } from "react-bootstrap";
import SearchBar from "../UI/SearchBar";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/MainCssFile.module.css";

const CartDiscountList = () => {
  const navigate = useNavigate();

  const [discountList, setDiscountList] = useState([]);
  const [error, setError] = useState(null);
  const [state, setState] = useState(false);

  const errorHandler = () => {
    setError(null);
  };

  const backHandler = () => {
    navigate("/discount");
  };

  const addDiscountHandler = () => {
    navigate("/discount/cartDiscount/add");
  };
  const viewListHandler = () => {
    getCartDiscountList().then((data) => {
      setDiscountList(data.body.results);
    });
    setError(null);
  };

  function deleteDiscountHandler({ id, version }) {
    deleteCartDiscountById({ id, version }).then((data) => {
      setError({
        message: `Cart Discount with Promo name : "${data.body.name.en}" deleted successfully!!!`,
      });
    });
    if (state) {
      setState(false);
    } else {
      setState(true);
    }
  }

  const searchDataHandler = (event) => {
    getCartDiscountByKey(event)
      .then((data) => {
        setDiscountList([data.body]);
        setError(null);
      })
      .catch(
        setError({
          message: `Cart Discount with promo key : "${event.input}" doesn't exist. Please try again!!!`,
        })
      );
  };
  useEffect(() => {
    getCartDiscountList().then((data) => {
      setDiscountList(data.body.results);
    });
  }, [state]);

  return (
    <React.Fragment>
      <main style={{ display: "flex", justifyContent: "center", width: "50%" }}>
        <SearchBar
          label={"Enter Promo Key"}
          onSave={searchDataHandler}
          error={errorHandler}
        />
        <Button onClick={viewListHandler} style={{ marginLeft: "10px" }}>
          <MDBIcon icon="sync" className={`${styles.icon} ${styles.sync}`} />
        </Button>
        <Button onClick={backHandler} style={{ marginLeft: "10px" }}>
          <MDBIcon
            icon="angle-double-left"
            className={`${styles.icon} ${styles.leftArrow}`}
          />
        </Button>
        <Button onClick={addDiscountHandler} style={{ marginLeft: "10px" }}>
          <MDBIcon icon="plus" className={`${styles.icon} ${styles.plus}`} />
        </Button>
      </main>

      {error && <main>{error.message}</main>}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Promo Name</th>
            <th>Promo Key</th>
            <th>Store</th>
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
                <td>
                  {list.stores.map((event) => {
                    return event.key;
                  })}
                </td>
                <td>{list.target.type}</td>
                <td>{list.isActive ? "Yes" : "No"}</td>
                <td>{String(list.validFrom).substring(0, 10)}</td>
                <td>{String(list.validUntil).substring(0, 10)}</td>
                <td>
                  <Button style={{ marginRight: "20px" }} variant="success">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteDiscountHandler({
                        id: list.id,
                        version: list.version,
                      });
                    }}
                  >
                    Delete
                  </Button>
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
