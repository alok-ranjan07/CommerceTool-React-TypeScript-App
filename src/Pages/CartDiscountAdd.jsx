import React, { useRef, useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import styles from "../CSS/MainCssFile.module.css";
import { addCartDiscount } from "../Service/cart";
import { getStoreDetails } from "../Service/store";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const CartDiscountAdd = () => {
  const UseRegexPattern = ({ string }) => {
    let regex = /^[-a-zA-Z0-9 ]{2,20}$/;
    return regex.test(string);
  };

  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);
  const [discountType, setDiscountType] = useState("fixed");
  const [currencyBtnDisabled, setCurrencyBtnDisabled] = useState(false);
  const [storeDetails, setStoreDetails] = useState([]);
  const [error, setError] = useState({
    nameError: null,
    keyError: null,
    sortOrderError: null,
    pageError: [],
  });
  const [promo, setPromo] = useState({
    promoName: null,
    promoKey: null,
    value: null,
    validFrom: null,
    validUntil: null,
    target: null,
    sortOrder: null,
    storeKey: null,
    discountCodeRequirement: false,
    active: false,
  });
  const currencyHandler = useRef();
  const discountAmountHandler = useRef();
  const validFromHandler = useRef();
  const validUntilHandler = useRef();
  const targetHandler = useRef();
  const storeKeyHandler = useRef();

  useEffect(() => {
    getStoreDetails().then((data) => {
      setStoreDetails(data.body.results);
    });
  }, []);

  useEffect(() => {
    const timeDelay = setTimeout(() => {
      let validName = UseRegexPattern({ string: promo.promoName });
      if (!validName) {
        setError((prevState) => {
          return { ...prevState, nameError: "Invalid Promo name" };
        });
      } else {
        setError((prevState) => {
          return { ...prevState, nameError: null };
        });
      }
    }, 500);
    return () => {
      clearTimeout(timeDelay);
    };
  }, [promo.promoName]);

  useEffect(() => {
    const timeDelay = setTimeout(() => {
      let validKey = UseRegexPattern({ string: promo.promoKey });
      if (!validKey) {
        setError((prevState) => {
          return { ...prevState, keyError: "Invalid Promo Key" };
        });
      } else {
        setError((prevState) => {
          return { ...prevState, keyError: null };
        });
      }
    }, 500);
    return () => {
      clearTimeout(timeDelay);
    };
  }, [promo.promoKey]);

  useEffect(() => {
    const timeDelay = setTimeout(() => {
      if (parseFloat(promo.sortOrder) > 1 || parseFloat(promo.sortOrder) < 0) {
        setError((prevState) => {
          return { ...prevState, sortOrderError: "Invalid Sort Order Key" };
        });
      } else {
        setError((prevState) => {
          return { ...prevState, sortOrderError: null };
        });
      }
    }, 500);
    return () => {
      clearTimeout(timeDelay);
    };
  }, [promo.sortOrder]);

  const discountTypeHandler = (event) => {
    setDiscountType(event.target.value);
    if (String(event.target.value) === "relative") {
      setCurrencyBtnDisabled(true);
    } else {
      setCurrencyBtnDisabled(false);
    }
  };

  const backHandler = () => {
    navigate("/discount/cartDiscount");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    addCartDiscount(promo)
      .then((data) => {
        navigate("/discount/cartDiscount", {
          state: { name: data.body.name, key: data.body.key },
        });
      })
      .catch((log) => {
        setFormValid(false);
        setError((prevState) => {
          return { ...prevState, pageError: log.body.errors };
        });
      });
  };

  const formValidHandler = () => {
    if (formValid) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
    let valueObj = null;
    let targetObj = null;

    if (String(discountType) === "relative") {
      valueObj = {
        type: "relative",
        permyriad: parseInt(discountAmountHandler.current.value),
      };
    } else if (String(discountType) === "absolute") {
      valueObj = {
        type: "absolute",
        money: [
          {
            centAmount: parseInt(discountAmountHandler.current.value),
            currencyCode: currencyHandler.current.value,
          },
        ],
      };
    } else if (String(discountType) === "fixed") {
      valueObj = {
        type: "fixed",
        money: [
          {
            type: "centPrecision",
            centAmount: parseInt(discountAmountHandler.current.value),
            currencyCode: currencyHandler.current.value,
            fractionDigits: parseInt(2),
          },
        ],
      };
    }

    if (String(targetHandler.current.value) === "lineItems") {
      targetObj = { type: "lineItems", predicate: "1=1" };
    } else if (String(targetHandler.current.value) === "customLineItems") {
      targetObj = { type: "customLineItems", predicate: "1=1" };
    } else if (String(targetHandler.current.value) === "shipping") {
      targetObj = { type: "shipping" };
    } else if (String(targetHandler.current.value) === "totalPrice") {
      targetObj = { type: "totalPrice" };
    }

    setPromo((prevState) => {
      return {
        ...prevState,
        value: valueObj,
        validFrom: validFromHandler.current.value,
        validUntil: validUntilHandler.current.value,
        target: targetObj,
        storeKey: storeKeyHandler.current.value,
      };
    });
  };

  return (
    <React.Fragment>
      <Card style={{ padding: "0 30px 0 30px" }}>
        <main>
          <Form onSubmit={submitHandler}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>
                  <MDBIcon icon="star" style={{ scale: "0.5", color: "red" }} />
                  Promo name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Promo name"
                  onChange={(event) => {
                    setPromo((prevState) => {
                      return { ...prevState, promoName: event.target.value };
                    });
                  }}
                  required
                />
                {error.nameError && <error>{error.nameError}</error>}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>
                  <MDBIcon icon="star" style={{ scale: "0.5", color: "red" }} />
                  Promo key
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Promo key"
                  onChange={(event) => {
                    setPromo((prevState) => {
                      return { ...prevState, promoKey: event.target.value };
                    });
                  }}
                  required
                />
                {error.keyError && <error>{error.keyError}</error>}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>
                  Discount type
                </Form.Label>
                <Form.Select
                  defaultValue="fixed"
                  onChange={discountTypeHandler}
                >
                  <option value={"fixed"}>Choose...</option>
                  <option value={"relative"}>Percentage Off</option>
                  <option value={"absolute"}>Amount Off</option>
                  <option value={"fixed"}>Fixed Price</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>
                  Currency
                </Form.Label>
                <Form.Select
                  defaultValue="USD"
                  ref={currencyHandler}
                  disabled={currencyBtnDisabled}
                >
                  <option>Choose...</option>
                  <option value={"EUR"}>EUR</option>
                  <option value={"USD"}>USD</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>
                  <MDBIcon icon="star" style={{ scale: "0.5", color: "red" }} />
                  Discount amount
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  ref={discountAmountHandler}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>
                  Valid from
                </Form.Label>
                <Form.Control type="date" ref={validFromHandler} required />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>
                  Valid until
                </Form.Label>
                <Form.Control type="date" ref={validUntilHandler} required />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>
                  Apply to
                </Form.Label>
                <Form.Select defaultValue="totalPrice" ref={targetHandler}>
                  <option>Choose...</option>
                  <option value={"totalPrice"}>Total Price</option>
                  <option value={"shipping"}>Shipping</option>
                  <option value={"lineItems"}>Item</option>
                  <option value={"customLineItems"}>Multibuy</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>
                  <MDBIcon icon="star" style={{ scale: "0.5", color: "red" }} />
                  Sort Order
                </Form.Label>
                <Form.Control
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  placeholder="0.1"
                  onChange={(event) => {
                    setPromo((prevState) => {
                      return { ...prevState, sortOrder: event.target.value };
                    });
                  }}
                  required
                />
                {error.sortOrderError && <error>{error.sortOrderError}</error>}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>Store</Form.Label>
                <Form.Select defaultValue="default" ref={storeKeyHandler}>
                  <option value="default">Choose...</option>
                  {storeDetails.map((store) => (
                    <option value={store.key} key={store.id}>
                      {store.key}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>
                  Discount Code :
                </Form.Label>
                <Form.Check
                  type="switch"
                  label="Requied"
                  className={`${styles.formLabel}`}
                  onClick={(event) => {
                    setPromo((prevState) => {
                      return {
                        ...prevState,
                        discountCodeRequirement: event.target.checked,
                      };
                    });
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className={`${styles.formLabel}`}>
                  Activate :
                </Form.Label>
                <Form.Check
                  type="switch"
                  label="Yes"
                  className={`${styles.formLabel}`}
                  onClick={(event) => {
                    setPromo((prevState) => {
                      return { ...prevState, active: event.target.checked };
                    });
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Check
                  type="checkbox"
                  label="I agree"
                  className={`${styles.formLabel}`}
                  onClick={formValidHandler}
                  checked={formValid}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Button variant="primary" type="submit" disabled={!formValid}>
                Submit
              </Button>
              <Button onClick={backHandler} style={{ float: "left" }}>
                <MDBIcon
                  icon="angle-double-left"
                  className={`${styles.icon} ${styles.leftArrow}`}
                />
              </Button>
            </Form.Group>
          </Form>
          {error.pageError &&
            error.pageError.map((log) => (
              <p style={{ color: "red" }}>{log.message}</p>
            ))}
        </main>
      </Card>
    </React.Fragment>
  );
};
export default CartDiscountAdd;

/* <BootstrapSwitchButton
checked={false}
label="Required"
onstyle="primary"
offstyle="secondary"
size="xs"
onChange={(checked) => {
  this.setState({ isUserAdmin: checked });
}}
/> */
