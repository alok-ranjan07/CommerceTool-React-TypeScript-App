import React, { useEffect, useState } from "react";
import UnAuthorizedUser from "../../Components/UnAuthorizedUser";
import { MDBIcon } from "mdb-react-ui-kit";
import { Button, Table } from "react-bootstrap";
import styles from "../../CSS/MainCssFile.module.css";
import SearchBar from "../../UI/SearchBar";
import { useNavigate } from "react-router-dom";
import { getCartDiscountByID, getDiscountCode } from "../../Service/cart";

const DiscountCodeList = () => {
  const authorisedUser = localStorage.getItem("authorisedUser") === "true";
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState([]);

  useEffect(() => {
    getDiscountCode().then((data) => {
      setDiscountCode(data.body.results);
    });
  }, []);

  const viewListHandler = () => {
    getDiscountCode().then((data) => {
      setDiscountCode(data.body.results);
    });
    // setError(null);
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
            {/* <SearchBar
              label={"Enter Promo Key"}
              onSave={searchDataHandler}
              error={errorHandler}
            /> */}
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
            {/* <Button
              onClick={() => {
                navigate("/discount/discountCode/add");
              }}
              style={{ marginLeft: "10px" }}
            >
              <MDBIcon
                icon="plus"
                className={`${styles.icon} ${styles.plus}`}
              />
            </Button> */}
          </main>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Discount Name</th>
                <th>Discount Code</th>

                <th>Active</th>
                <th>Cart discounts</th>
                <th>Valid From</th>
                <th>Valid Until</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {discountCode.map((list) => {
                return (
                  <tr key={list.id}>
                    <td>{list.name.en}</td>
                    <td>{list.code}</td>

                    <td>{list.isActive ? "Yes" : "No"}</td>
                    <td>
                      {list.cartDiscounts.map((data) => {
                        return data.id;
                      })}
                      {/* getting error while trying to get the cart name from the id */}
                      {/* {list.cartDiscounts.map(async (data) => {
                        return await getCartDiscountByID({ id: data.id }).then(
                          (cart) => {
                            return cart.body.name.en;
                          }
                        );
                      })} */}
                    </td>
                    <td>{String(list.validFrom).substring(0, 10)}</td>
                    <td>{String(list.validUntil).substring(0, 10)}</td>
                    <td>
                      <Button
                        style={{ marginRight: "20px" }}
                        variant="success"
                        // onClick={() => {
                        //  navigate(`/discount/cartDiscount/add/${list.id}`);
                        //  }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        // onClick={() => {
                        //   setDeleteModal({
                        //     title: "Warning!",
                        //     message: `Are you sure, you want to delete Promo : ${list.name.en} ?`,
                        //     data: { id: list.id, version: list.version },
                        //   });
                        // }}
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

export default DiscountCodeList;
