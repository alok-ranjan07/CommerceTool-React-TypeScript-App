import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import classes from "../CSS/MainNavigation.module.css";
import { Button, Card, Form } from "react-bootstrap";
import styles from "../CSS/MainCssFile.module.css";
import { MDBIcon } from "mdb-react-ui-kit";
import apiRoot from "../Service/client";

const Home = () => {
  const authorisedUser = localStorage.getItem("authorisedUser") === "true";
  const [formValid, setformValid] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState({
    clientId: "",
    clientSecret: "",
    projectKey: "",
    scopes: "",
  });

  //Check if User-Form is submitted or not after the reload
  useEffect(() => {
    if (localStorage.getItem("submitted") === "true") {
      apiRoot
        .get()
        .execute()
        .then((data) => {
          localStorage.setItem("authorisedUser", "true");
          setProjectDetails(data.body);
        })
        .catch(() => {
          localStorage.removeItem("clientId");
          localStorage.removeItem("clientSecret");
          localStorage.removeItem("projectKey");
          localStorage.removeItem("scopes");
          localStorage.removeItem("skip");
          localStorage.removeItem("submitted");
          setError({ message: "Please provide valid credentials" });
        });
    }
  }, []);

  //Check all user input-field is present or not
  useEffect(() => {
    if (
      userInput.clientId &&
      userInput.clientSecret &&
      userInput.projectKey &&
      userInput.scopes
    ) {
      setformValid(true);
    } else {
      setformValid(false);
    }
  }, [
    userInput.clientId,
    userInput.clientSecret,
    userInput.projectKey,
    userInput.scopes,
  ]);

  //Refresh the content of input-fields
  const syncHandler = () => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        clientId: "",
        clientSecret: "",
        projectKey: "",
        scopes: "",
      };
    });
  };

  //for development purpose only
  const skipHandler = () => {
    localStorage.setItem("skip", "true");
    localStorage.setItem("submitted", "true");
    window.location.reload();
  };

  //push user input to local storage
  const submitHandler = () => {
    localStorage.setItem("clientId", userInput.clientId);
    localStorage.setItem("clientSecret", userInput.clientSecret);
    localStorage.setItem("projectKey", userInput.projectKey);
    localStorage.setItem("scopes", userInput.scopes);
    localStorage.setItem("submitted", "true");
    window.location.reload();
  };

  //Clear local storage items after logout
  const logoutHandler = () => {
    localStorage.removeItem("clientId");
    localStorage.removeItem("clientSecret");
    localStorage.removeItem("projectKey");
    localStorage.removeItem("scopes");
    localStorage.removeItem("skip");
    localStorage.removeItem("submitted");
    localStorage.removeItem("authorisedUser");
    window.location.reload();
  };

  return (
    <React.Fragment>
      {authorisedUser ? (
        <div>
          <Card>
            <main>
              <h4 style={{ padding: " 0 100px 50px 100px" }}>
                Welcome to "{projectDetails.name}" project
              </h4>
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
                    Enter Your Client ID :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput.clientId}
                    placeholder="Enter client id"
                    required
                    onChange={(event) => {
                      setUserInput((prevState) => {
                        return { ...prevState, clientId: event.target.value };
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className={`${styles.formLabel}`}>
                    Enter Your Client Secret :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput.clientSecret}
                    placeholder="Enter client secret"
                    required
                    onChange={(event) => {
                      setUserInput((prevState) => {
                        return {
                          ...prevState,
                          clientSecret: event.target.value,
                        };
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className={`${styles.formLabel}`}>
                    Enter Your Project Key :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput.projectKey}
                    placeholder="Enter project key"
                    required
                    onChange={(event) => {
                      setUserInput((prevState) => {
                        return { ...prevState, projectKey: event.target.value };
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className={`${styles.formLabel}`}>
                    Enter Scopes :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={userInput.scopes}
                    placeholder="Enter scopes"
                    required
                    onChange={(event) => {
                      setUserInput((prevState) => {
                        return { ...prevState, scopes: event.target.value };
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
                  <Button
                    variant="success"
                    type="button"
                    onClick={skipHandler}
                    style={{ marginLeft: "10px" }}
                  >
                    Skip
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
export default Home;

// const navigate = useNavigate();
// const customerHandler = () => {
//   navigate("/customer");
// };
// const productHandler = () => {
//   navigate("/product");
// };
// const orderHandler = () => {
//   navigate("/order");
// };
// const cartHandler = () => {
//   navigate("/cart");
// };
// const discountHandler = () => {
//   navigate("/discount");
// };
// const storeListHandler = () => {
//   navigate("/store");
// };
// return (
//   <React.Fragment>
//     <Card>
//       <h2>Welcome to CommerceTool App</h2>
//       <h4>Please select where you want to visit!</h4>
//       <div className={classes.header}>
//         <ul className={classes.list}>
//           <li>
//             <Button onClick={customerHandler}>Customer</Button>
//           </li>
//           <li>
//             <Button onClick={productHandler}>Product</Button>
//           </li>
//           <li>
//             <Button onClick={orderHandler}>Order</Button>
//           </li>
//           <li>
//             <Button onClick={cartHandler}>Cart</Button>
//           </li>
//           <li>
//             <Button onClick={discountHandler}>Discount</Button>
//           </li>
//           <li>
//             <Button onClick={storeListHandler}>Store</Button>
//           </li>
//         </ul>
//       </div>
//     </Card>
//   </React.Fragment>
// );
