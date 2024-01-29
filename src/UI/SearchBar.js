import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [userInput, setUserInput] = useState({ input: props.inputValue });
  useEffect(() => {
    setUserInput({ input: props.inputValue });
  }, [props]);

  const inputChangeHandler = (event) => {
    props.error();
    setUserInput((prevState) => {
      return { ...prevState, input: event.target.value };
    });
  };
  const submitHandler = () => {
    const userdata = { input: userInput.input };
    setUserInput({ input: "" });
    props.onSave(userdata);
  };
  return (
    <MDBInputGroup>
      <MDBInput
        value={userInput.input}
        onChange={inputChangeHandler}
        label={props.label || "Search"}
      />
      <MDBBtn onClick={submitHandler} rippleColor="dark">
        <MDBIcon icon="search" className={styles.searchButton} />
      </MDBBtn>
    </MDBInputGroup>
  );
};
export default SearchBar;
