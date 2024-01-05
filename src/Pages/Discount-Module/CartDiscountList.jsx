import React, { useEffect, useState } from "react";
import {
  getCartDiscountByKey,
  getCartDiscountList,
  deleteCartDiscountById,
} from "../../Service/cart";
import Table from "react-bootstrap/esm/Table";
import { Button } from "react-bootstrap";
import SearchBar from "../../UI/SearchBar";
import { MDBIcon } from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../CSS/MainCssFile.module.css";
import ErrorModal from "../../UI/ErrorModal";
import UnAuthorizedUser from "../../Components/UnAuthorizedUser";

const CartDiscountList = () => {
  const authorisedUser = localStorage.getItem("authorisedUser") === "true";
  const navigate = useNavigate();
  const location = useLocation();
  const [locationState, setLocationState] = useState({ name: null, key: null });
  const [discountList, setDiscountList] = useState([]);
  const [error, setError] = useState(null);
  const [state, setState] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    //getting error here
    if (location.state) {
      setLocationState({ name: location.state.name, key: location.state.key });
    }

    window.history.replaceState({}, location.state);
    getCartDiscountList().then((data) => {
      setDiscountList(data.body.results);
    });
  }, [state]);

  const errorHandler = () => {
    setError(null);
    setDeleteModal(null);
  };

  const viewListHandler = () => {
    getCartDiscountList().then((data) => {
      setDiscountList(data.body.results);
    });
    setError(null);
    // setLocationState({ name: null, key: null });
  };

  const deleteDiscountHandler = ({ id, version }) => {
    deleteCartDiscountById({ id, version }).then((data) => {
      setError({
        message: `Cart Discount with Promo name : "${data.body.name.en}" deleted successfully!!!`,
      });
      if (state) {
        setState(false);
      } else {
        setState(true);
      }
    });
  };

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

  return (
    <React.Fragment>
      {!authorisedUser ? (
        <UnAuthorizedUser />
      ) : (
        <div>
          <main
            style={{ display: "flex", justifyContent: "center", width: "60%" }}
          >
            <SearchBar
              label={"Enter Promo Key"}
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
                navigate("/discount");
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
                navigate("/discount/cartDiscount/add");
              }}
              style={{ marginLeft: "10px" }}
            >
              <MDBIcon
                icon="plus"
                className={`${styles.icon} ${styles.plus}`}
              />
            </Button>
          </main>
          {locationState.name && (
            <main>{`"${locationState.name}" has been created with promo key : "${locationState.key}"`}</main>
          )}
          {error && <main>{error.message}</main>}
          {deleteModal && (
            <ErrorModal
              title={deleteModal.title}
              message={deleteModal.message}
              onCancle={errorHandler}
              onConfirm={() => {
                deleteDiscountHandler({
                  id: deleteModal.data.id,
                  version: deleteModal.data.version,
                });
                errorHandler();
              }}
            />
          )}
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
                      <Button
                        style={{ marginRight: "20px" }}
                        variant="success"
                        onClick={() => {
                          navigate(`/discount/cartDiscount/add/${list.id}`);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setDeleteModal({
                            title: "Warning!",
                            message: `Are you sure, you want to delete Promo : ${list.name.en} ?`,
                            data: { id: list.id, version: list.version },
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
        </div>
      )}
    </React.Fragment>
  );
};
export default CartDiscountList;
