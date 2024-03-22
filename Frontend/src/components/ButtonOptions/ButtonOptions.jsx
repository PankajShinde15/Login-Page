import React, { useContext } from "react";
import Button from "../Button/Button";
import { userContext } from "../../App";

const ButtonOptions = () => {
  const { IsLogIn, setIsLogin } = useContext(userContext);
  return (
    <div>
      <Button
        name={"Sign In"}
        onclick={() => setIsLogin(true)}
        active={IsLogIn}
      ></Button>
      <Button
        name="Sign Up"
        onclick={() => setIsLogin(false)}
        active={!IsLogIn}
      ></Button>
    </div>
  );
};

export default ButtonOptions;
