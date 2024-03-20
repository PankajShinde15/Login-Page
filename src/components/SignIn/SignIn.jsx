import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import styles from "../SignUp/SignUp.module.css";

const SignIn = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const { usersData } = useContext(userContext);
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
    if (isUserAvailable && password === isUserAvailable.passWord) {
      setStatus("User loggedIn successfully");
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
      <Button
        name={"Login"}
        size="small"
        onclick={() => ValidateCredentials()}
      ></Button>
      <p>{status}</p>
    </div>
  );
};

export default SignIn;
