import React, { useEffect } from "react";
// import { createDirectLine } from "botframework-directlinejs";
import { createDirectLine } from "botframework-webchat";

const Chatbot = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure code runs only in client-side environment
        if (typeof window !== "undefined") {
          // Fetch token from your backend
          const tokenResponse = await fetch(
            "https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken",
            {
              method: "POST",
              headers: {
                "Ocp-Apim-Subscription-Key": "70c342bb80344b78b0ef5c9722103271",
              },
            }
          );
          if (!tokenResponse.ok) {
            throw new Error("Failed to fetch token");
          }
          const token = await tokenResponse.text();

          // Create Web Speech Ponyfill Factory
          const webSpeechPonyfillFactory =
            await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory(
              {
                credentials: {
                  authorizationToken: token,
                  region: "westus",
                },
              }
            );

          // Render Web Chat
          window.WebChat.renderWebChat(
            {
              directLine: createDirectLine({
                secret:
                  "v_86z0sEpUk.CHtp8FuCPlWAgKm0pt52IjvfQFn7pSNaYPFkdzY0VZY",
              }),
              webSpeechPonyfillFactory: webSpeechPonyfillFactory,
            },
            document.getElementById("webchat")
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once

  return <div id="webchat" role="main"></div>;
};

export default Chatbot;
