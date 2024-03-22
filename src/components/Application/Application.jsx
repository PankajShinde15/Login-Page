import React, { useContext } from "react";
import Button from "../Button/Button";
import { userContext } from "../../App";
import styles from "./Application.module.css";
const Application = () => {
  const { setUserLoggedIn, loggedInUser } = useContext(userContext);
  return (
    <div className={styles.container}>
      <h1>Welcome {loggedInUser.firstName}</h1>
      <div>
        <img
          className={styles.image}
          src="https://pngimg.com/uploads/welcome/welcome_PNG46.png"
          alt="unable to load"
        />
        <h2>You are logged in to</h2>
        <h1>User Login System using React and Spring-boot</h1>
        <h2>Data is stored in SQL Database</h2>
      </div>
      <Button
        name={"Log out"}
        size="small"
        onclick={() => setUserLoggedIn(false)}
      />
    </div>
  );
};

export default Application;
