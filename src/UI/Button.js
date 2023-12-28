import React from "react";

import styles from "./Button.module.css";

const UIButton = (props) => {
  const clickHandler = () => {
    props.onSave(props);
  };
  return (
    <button
      className={`${styles.button} ${props.className}`}
      type={props.type || "button"}
      onClick={clickHandler}
    >
      {props.children}
    </button>
  );
};

export default UIButton;
