import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import Button from "../Button/Button";
import styles from "./SignUp.module.css";
import InputBox from "../InputBox/InputBox";
import Status from "../Status/Status";
import { MD5 } from "crypto-js";

const SignUp = (props) => {
  const [mailID, setMailID] = useState("");
  const [userName, setUsername] = useState("");
  const [passWord, setPassWord] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mailIDStatus, setMailIDStatus] = useState("");
  const [userNameStatus, setUserNameStatus] = useState("");
  const [passWordStatus, setPassWordStatus] = useState("");
  const [firstNameStatus, setFirstNameStatus] = useState("");
  const [lastNameStatus, setLastNameStatus] = useState("");
  const [mobileNoStatus, setMobileNoStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { usersData, setUsersData } = useContext(userContext);

  const onSignUp = async () => {
    try {
      const bodyData = JSON.stringify({
        mailID,
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
      setMailID("");
      setUsername("");
      setPassWord("");
      setFirstName("");
      setLastName("");
      setMobileNumber("");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
    props.setIsLogin(true);
    setErrorMessage("");
  };

  const validateFields = () => {
    if (
      mailID.length > 0 &&
      userName.length > 0 &&
      passWord.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      mobileNumber.length > 0
    ) {
      return true;
    }
    setErrorMessage("Please fill all the fields");
    return false;
  };
  const validateEMail = (mail) => {
    if (mail.length === 0) {
      setMailIDStatus("");
      return;
    }
    if (usersData.find((user) => user.mailID === mail)) {
      setMailIDStatus("Mail already exists");
      return;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(mail)) {
      setMailIDStatus("Please enter valid EMail-ID");
      return;
    }
    setMailIDStatus("");
    setMailID(mail);
  };

  const validateUsername = (userName) => {
    if (userName.length === 0) {
      setUserNameStatus("");
      return;
    }
    const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!regex.test(userName)) {
      setUserNameStatus("Pattern Not Matched");
      return;
    }
    if (usersData.find((user) => user.userName === userName)) {
      setUserNameStatus("Username already exists");
      return;
    }
    setUserNameStatus("");
    setUsername(userName);
  };

  const validatePassword = (passWord) => {
    if (passWord.length === 0) {
      setPassWordStatus("");
      return;
    }
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!regex.test(passWord)) {
      setPassWordStatus(
        "Password should be at least 8 characters long and should contain at least one digit, lowercase character, uppercase character and special character each"
      );
      return;
    }
    setPassWordStatus("");
    const md5Hash = MD5(passWord).toString();
    setPassWord(md5Hash);
  };

  const validateFirstName = (firstName) => {
    if (firstName.length === 0) {
      setFirstNameStatus("");
      return;
    }
    const regex = /^[A-Za-z ]+$/;
    if (!regex.test(firstName)) {
      setFirstNameStatus(
        "First Name should not contain special characters or numbers"
      );
      return;
    }
    setFirstNameStatus("");
    setFirstName(firstName);
  };

  const validateLastName = (lastName) => {
    if (lastName.length === 0) {
      setLastNameStatus("");
      return;
    }
    const regex = /^[A-Za-z ]+$/;
    if (!regex.test(lastName)) {
      setLastNameStatus(
        "Last Name should not contain special characters or numbers"
      );
      return;
    }
    setLastNameStatus("");
    setLastName(lastName);
  };

  const validateMobileNumber = (mobileNo) => {
    if (mobileNo.length === 0) {
      setMobileNoStatus("");
      return;
    }
    const regex = /^[0-9]{10}$/;
    if (!regex.test(mobileNo)) {
      setMobileNoStatus("Write a valid mobile number");
      return;
    }
    setMobileNoStatus("");
    setMobileNumber(mobileNo);
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
        labelFor="E-Mail"
        type="email"
        onchange={(e) => validateEMail(e.target.value)}
      />
      {mailIDStatus.length > 0 && <Status message={mailIDStatus} />}
      <InputBox
        labelFor="Username"
        type="text"
        onchange={(e) => validateUsername(e.target.value)}
      />
      {userNameStatus.length > 0 && <Status message={userNameStatus} />}
      <InputBox
        labelFor="Password"
        type="password"
        onchange={(e) => validatePassword(e.target.value)}
      />
      {passWordStatus.length > 0 && <Status message={passWordStatus} />}
      <InputBox
        labelFor="First Name"
        type="text"
        onchange={(e) => validateFirstName(e.target.value)}
      />
      {firstNameStatus.length > 0 && <Status message={firstNameStatus} />}
      <InputBox
        labelFor="Last Name"
        type="text"
        onchange={(e) => validateLastName(e.target.value)}
      />
      {lastNameStatus.length > 0 && <Status message={lastNameStatus} />}
      <InputBox
        labelFor="Mobile Number"
        type="text"
        onchange={(e) => validateMobileNumber(e.target.value)}
      />
      {mobileNoStatus.length > 0 && <Status message={mobileNoStatus} />}
      <Button
        name={"Sign Up"}
        size="small"
        onclick={() => handleSignUp()}
      ></Button>
      <p className={styles.errorMessage}>{errorMessage}</p>
    </div>
  );
};

export default SignUp;
