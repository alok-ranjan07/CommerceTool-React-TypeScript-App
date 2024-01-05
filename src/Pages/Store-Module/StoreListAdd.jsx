import React, { useRef, useState } from "react";
import UnAuthorizedUser from "../../Components/UnAuthorizedUser";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";
import styles from "../../CSS/MainCssFile.module.css";
import { useNavigate } from "react-router-dom";
import { addStore } from "../../Service/store";

const StoreListAdd = () => {
  const authorisedUser = localStorage.getItem("authorisedUser") === "true";
  const navigate = useNavigate();
  const storeNameRef = useRef();
  const inventoryRef = useRef();
  const productDistributionRef = useRef();
  const productSelectionRef = useRef();
  const countryRef = useRef();
  const languageRef = useRef();
  const [storeDetails, setStoreDetails] = useState({
    storeName: null,
    storeKey: null,
    inventory: null,
    productDistribution: null,
    productSelection: null,
    country: null,
    language: null,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    addStore(storeDetails).then();
  };

  return (
    <React.Fragment>
      {!authorisedUser ? (
        <UnAuthorizedUser />
      ) : (
        <Card style={{ padding: "0 30px 0 30px" }}>
          <main>
            <Form onSubmit={submitHandler}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label className={`${styles.formLabel}`}>
                    <MDBIcon
                      icon="star"
                      style={{ scale: "0.5", color: "red" }}
                    />
                    Store key
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store key"
                    onChange={(event) => {
                      setStoreDetails((prevState) => {
                        return { ...prevState, storeKey: event.target.value };
                      });
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label className={`${styles.formLabel}`}>
                    Store name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store name"
                    ref={storeNameRef}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label className={`${styles.formLabel}`}>
                    Inventory supply channels
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="search select"
                    ref={inventoryRef}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label className={`${styles.formLabel}`}>
                    Product distribution channels
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="search select"
                    ref={productDistributionRef}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className={`${styles.formLabel}`}>
                  Product Selections
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="select"
                  ref={productSelectionRef}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label className={`${styles.formLabel}`}>
                    Country(ies)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="select"
                    ref={countryRef}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label className={`${styles.formLabel}`}>
                    Languages
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="select"
                    ref={languageRef}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="I agree"
                  className={`${styles.formLabel}`}
                />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button
                  style={{ float: "right" }}
                  onClick={() => {
                    navigate("/store/storeList");
                  }}
                >
                  <MDBIcon
                    icon="angle-double-left"
                    className={`${styles.icon} ${styles.leftArrow}`}
                  />
                </Button>
              </Form.Group>
            </Form>
          </main>
        </Card>
      )}
    </React.Fragment>
  );
};
export default StoreListAdd;

//not completed
