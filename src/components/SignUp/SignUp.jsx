import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import Button from "../Button/Button";
import styles from "./SignUp.module.css";
import InputBox from "../InputBox/InputBox";

const SignUp = (props) => {
  const [userName, setUsername] = useState("");
  const [passWord, setPassWord] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [status, setStatus] = useState("");
  const { setUsersData } = useContext(userContext);

  const onSignUp = async () => {
    try {
      const bodyData = JSON.stringify({
        userName,
        passWord,
        firstName,
        lastName,
        mobileNumber,
      });

      const response = await fetch("http://localhost:8080/addnewuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });
      const userData = await response.json();
      setUsersData((prevUsersData) => [...prevUsersData, userData]);
      setUsername("");
      setPassWord("");
      setFirstName("");
      setLastName("");
      setMobileNumber("");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
    props.setIsLogin(true);
    setStatus("");
  };

  const validateFields = () => {
    if (userName.length <= 0 || passWord.length <= 0) {
      setStatus("Please enter username and password");
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (validateFields()) {
      onSignUp();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <h1>Set Up Your Account</h1>
      <InputBox
        labelFor="Username/E-Mail"
        type="text"
        onchange={(e) => setUsername(e.target.value)}
      />
      <InputBox
        labelFor="Password"
        type="password"
        onchange={(e) => setPassWord(e.target.value)}
      />
      <InputBox
        labelFor="First Name"
        type="text"
        onchange={(e) => setFirstName(e.target.value)}
      />
      <InputBox
        labelFor="Last Name"
        type="text"
        onchange={(e) => setLastName(e.target.value)}
      />
      <InputBox
        labelFor="Mobile Number"
        type="number"
        onchange={(e) => setMobileNumber(e.target.value)}
      />
      <Button
        name={"Sign Up"}
        size="small"
        onclick={() => handleSignUp()}
      ></Button>
      <p>{status}</p>
    </div>
  );
};

export default SignUp;
