import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import styles from "../../CSS/MainCssFile.module.css";
import { MDBIcon } from "mdb-react-ui-kit";
import { getCustomerDetails } from "../../Service/customer";

const CustomerLogin = () => {
  const authorisedCustomer =
    sessionStorage.getItem("authorisedCustomer") === "true";
  const [formValid, setformValid] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState({
    customerEmail: "",
    customerPassword: "",
  });

  //   //Check if User-Form is submitted or not after the reload
  useEffect(() => {
    if (sessionStorage.getItem("formSubmitted") === "true") {
      getCustomerDetails()
        .then((data) => {
          sessionStorage.setItem("authorisedCustomer", "true");
          setCustomerDetails(data.body);
        })
        .catch(() => {
          sessionStorage.removeItem("customerEmail");
          sessionStorage.removeItem("customerPassword");
          sessionStorage.removeItem("formSubmitted", "true");
          setError({ message: "Please provide valid credentials" });
        });
    }
  }, []);

  //Check all user input-field is present or not
  useEffect(() => {
    if (userInput.customerEmail && userInput.customerPassword) {
      setformValid(true);
    } else {
      setformValid(false);
    }
  }, [userInput.customerEmail, userInput.customerPassword]);

  //Refresh the content of input-fields
  const syncHandler = () => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        customerEmail: "",
        customerPassword: "",
      };
    });
  };

  //push user input to local storage
  const submitHandler = () => {
    sessionStorage.setItem("customerEmail", userInput.customerEmail);
    sessionStorage.setItem("customerPassword", userInput.customerPassword);
    sessionStorage.setItem("formSubmitted", "true");
    window.location.reload();
  };

  //Clear local storage items after logout
  const logoutHandler = () => {
    sessionStorage.removeItem("customerEmail");
    sessionStorage.removeItem("customerPassword");
    sessionStorage.removeItem("formSubmitted");
    sessionStorage.removeItem("authorisedCustomer");
    window.location.reload();
  };

  return (
    <React.Fragment>
      {authorisedCustomer ? (
        <div>
          <Card>
            <main>
              <h4 style={{ padding: " 0 100px 0 100px" }}>
                Welcome "{customerDetails.firstName}"
              </h4>
              <main>
                <p>{`Name : ${customerDetails.firstName} ${customerDetails.middleName} ${customerDetails.lastName}`}</p>
                <p>{`Email : ${customerDetails.email}`}</p>
                <p>{`Email-Id verified : ${
                  customerDetails.isEmailVerified ? "Yes" : "No"
                }`}</p>
              </main>
              <Button onClick={logoutHandler}>LOGOUT</Button>
            </main>
          </Card>
        </div>
      ) : (
        <div>
          <Card style={{ padding: "0 30px 0 30px" }}>
            <main>
              <h4>Welcome to CommerceTool App</h4>
              {error && <p style={{ color: "red" }}>{error.message}</p>}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className={`${styles.formLabel}`}>
                    Enter Your Email Id :
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={userInput.customerEmail}
                    placeholder="Enter email-id"
                    required
                    onChange={(event) => {
                      setUserInput((prevState) => {
                        return {
                          ...prevState,
                          customerEmail: event.target.value,
                        };
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className={`${styles.formLabel}`}>
                    Enter Your Password :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput.customerPassword}
                    placeholder="Enter password"
                    required
                    onChange={(event) => {
                      setUserInput((prevState) => {
                        return {
                          ...prevState,
                          customerPassword: event.target.value,
                        };
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={submitHandler}
                    disabled={!formValid}
                  >
                    LOGIN
                  </Button>
                  <Button onClick={syncHandler} style={{ marginLeft: "10px" }}>
                    <MDBIcon
                      icon="sync"
                      className={`${styles.icon} ${styles.sync}`}
                    />
                  </Button>
                </Form.Group>
              </Form>
            </main>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};
export default CustomerLogin;
