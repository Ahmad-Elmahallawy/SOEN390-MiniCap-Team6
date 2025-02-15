// KeyGeneration.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Style/RequestsStyle/KeyGenerationStyle.css";
import { useLocation } from "react-router-dom";
import { ErrorMessage } from "formik";

// KeyGeneration Component:
// This component renders a form to generate registration keys for users.
// The component displays the user's name, two buttons to specify whether the user is a condo owner or a rental user,
// and a button to send the registration key to the user.
const KeyGeneration = () => {
  const location = useLocation();
  const [registrationData, setRegistrationData] = useState({
    condoId: location.state ? Number(location.state.condoId) : "",
    registrationKey: "No Key To Show Right Now",
    userType: "condoOwner",
  });
  const { condoId, registrationKey, userType } = registrationData;
  const [responseMessage, setResponseMessage] = useState("");
  const token = JSON.parse(
    localStorage.getItem("userData") || "{}"
  ).accessToken; // Retrieve token from localStorage

  // fetch registration key if it exists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/registrationKeys`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              where: {
                condoUnit: {
                  id: condoId,
                },
              },
            },
          }
        );
        // Update registration data if response contains registration key

        if (response.data && response.data[0].value) {
          setRegistrationData({
            ...registrationData,
            registrationKey: response.data[0].value,
          });
        }
      } catch (error) {
        console.error("Error fetching registration key:", error);
      }
    };

    fetchData();
  }, [condoId, token]);
  // function to randomly generate a key of size 8
  const generateKeyValue = () => {
    let result = "",
      length = 8;

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    setRegistrationData({ ...registrationData, registrationKey: result }); // assign registration key to the use state and keep the rest of the results the same
    return result;
  };

  const handleGenerateKey = async () => {
    const newKey = generateKeyValue(); // call the function to generate a random key that is unique
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/registrationKeys`,
        {
          condoUnit: {
            id: condoId,
          },
          value: newKey,
          role: [userType],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header with token
          },
        }
      );
      setResponseMessage("Key was added successfully");
    } catch (error) {
      setResponseMessage("Something went wrong, please try again later");
    }
  };

  // function to set the user type when user clicks on either condo owner or rental user button
  const handleUserTypeSelect = (type: "condoOwner" | "rentalUser") => {
    setRegistrationData({
      ...registrationData,
      userType: type,
    });
  };
  return (
    <div className="key-generation-container">
      <div className="key-generation-header">
        {responseMessage && <p>{responseMessage}</p>}

        <h1>Generate Key for Condo with ID {condoId}</h1>
      </div>
      <div className="key-generation-content">
        <div className="key-generation-user-result">
          <p>Generated Key:</p>
          <p>{registrationKey}</p>
        </div>
        <div className="key-generation-two-buttons">
          <button
            onClick={() => handleUserTypeSelect("condoOwner")}
            className={userType === "condoOwner" ? "selected" : ""}
          >
            Condo Owner
          </button>
          <button
            onClick={() => handleUserTypeSelect("rentalUser")}
            className={userType === "rentalUser" ? "selected" : ""}
          >
            Rental User
          </button>
        </div>
        <div className="key-generation-submission">
          <button onClick={handleGenerateKey}>Generate Registration Key</button>
        </div>
      </div>
    </div>
  );
};

export default KeyGeneration;
