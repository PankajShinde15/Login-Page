import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import styles from "../SignUp/SignUp.module.css";
import styles1 from "./SignIn.module.css";
import { MD5 } from "crypto-js";

const SignIn = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const { usersData, setUserLoggedIn, setIsLogin, setLoggedInUser } =
    useContext(userContext);
  const ValidateCredentials = () => {
    if (userName.length === 0 && password.length === 0) {
      setStatus("Please Enter userName and password");
      return;
    } else if (userName.length === 0) {
      setStatus("Please Enter userName");
      return;
    } else if (password.length === 0) {
      setStatus("Please Enter password");
      return;
    }
    const isUserAvailable = usersData.find(
      (user) => user.userName === userName
    );
    if (
      isUserAvailable &&
      MD5(password).toString() === isUserAvailable.passWord
    ) {
      setStatus("User loggedIn successfully");
      setLoggedInUser(isUserAvailable);
      setUserLoggedIn(true);
      return;
    } else {
      setStatus("Please check Credentials!!");
    }
  };
  return (
    <div className={styles.inputContainer}>
      <h1>Please Enter Your Credentials</h1>
      <InputBox
        labelFor="Username/E-Mail"
        type="text"
        onchange={(e) => setUsername(e.target.value)}
      />
      <InputBox
        labelFor="Password"
        type="password"
        onchange={(e) => setPassword(e.target.value)}
      />
      <p>
        New User?? Please{" "}
        <a href="localhost:3000" onClick={() => setIsLogin(false)}>
          Sign Up
        </a>
      </p>
      <Button
        name={"Login"}
        size="small"
        onclick={() => ValidateCredentials()}
      ></Button>
      <p className={styles1.errorMessage}>{status}</p>
    </div>
  );
};

export default SignIn;
