import React, { useState, useRef, useEffect } from "react";
import styles from "../CSS/MainCssFile.module.css";
import { MDBBtn, MDBIcon, MDBInputGroup } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const SPEECH_KEY = process.env.REACT_APP_SPEECH_KEY;
const SPEECH_REGION = process.env.REACT_APP_SPEECH_REGION;

const Microphone = (props) => {
  const [isListening, setIsListening] = useState(false);
  const speechConfig = useRef(null);
  const audioConfig = useRef(null);
  const recognizer = useRef(null);
  // const [recognizingTranscript, setRecTranscript] = useState("");
  const [micSelected, setMicSelected] = useState(false);

  useEffect(() => {
    speechConfig.current = sdk.SpeechConfig.fromSubscription(
      SPEECH_KEY,
      SPEECH_REGION
    );
    speechConfig.current.speechRecognitionLanguage = "en-US";
    audioConfig.current = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizer.current = new sdk.SpeechRecognizer(
      speechConfig.current,
      audioConfig.current
    );

    const processRecognizingTranscript = (event) => {
      const result = event.result;
      console.log("Recognition result:", result);
      if (result.reason === sdk.ResultReason.RecognizingSpeech) {
        const transcript = result.text;
        // Call a function to process the transcript as needed
        props.onStop({ message: transcript });

        // setRecTranscript(transcript);
      }
    };
    recognizer.current.recognizing = (s, e) => processRecognizingTranscript(e);
  }, []);

  const buttonSelecthandler = () => {
    setMicSelected(true);
    setIsListening(true);
    recognizer.current.startContinuousRecognitionAsync();
  };

  const pauseListening = () => {
    setIsListening(false);
    recognizer.current.stopContinuousRecognitionAsync();
  };

  const resumeListening = () => {
    if (!isListening) {
      setIsListening(true);
      recognizer.current.startContinuousRecognitionAsync();
    }
  };

  const stopListening = () => {
    setMicSelected(false);
    setIsListening(false);
    recognizer.current.stopContinuousRecognitionAsync();
  };

  return (
    <React.Fragment>
      {!micSelected && (
        <Button onClick={buttonSelecthandler}>
          <MDBIcon
            icon="microphone"
            className={`${styles.icon} ${styles.plus}`}
          />
        </Button>
      )}
      {micSelected && (
        <MDBInputGroup>
          {isListening && (
            <MDBBtn
              onClick={pauseListening}
              style={{ backgroundColor: "#14a44d", marginRight: "3px" }}
            >
              <MDBIcon
                icon="pause"
                className={`${styles.icon} ${styles.plus}`}
              />
            </MDBBtn>
          )}
          {!isListening && (
            <MDBBtn
              onClick={resumeListening}
              style={{ backgroundColor: "#14a44d", marginRight: "3px" }}
            >
              <MDBIcon
                icon="play"
                className={`${styles.icon} ${styles.plus}`}
              />
            </MDBBtn>
          )}
          <MDBBtn
            onClick={stopListening}
            style={{ backgroundColor: "#dc4c64" }}
          >
            <MDBIcon icon="stop" className={`${styles.icon} ${styles.plus}`} />
          </MDBBtn>
        </MDBInputGroup>
      )}
    </React.Fragment>
  );
};

export default Microphone;
