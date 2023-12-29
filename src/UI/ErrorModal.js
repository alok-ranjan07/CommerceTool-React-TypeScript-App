import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import styles from "./ErrorModal.module.css";
import { Button } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCancle} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>
          <MDBIcon icon="exclamation-triangle" className={styles.warningIcon} />
          {props.title}
        </h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}>
        <Button
          className={styles.cancleButton}
          onClick={props.onCancle}
          variant="outline-success"
        >
          CANCLE
        </Button>
        <Button
          className={styles.confirmButton}
          onClick={props.onConfirm}
          variant="outline-danger"
        >
          DELETE
        </Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCancle={props.onCancle} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
          onCancle={props.onCancle}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
