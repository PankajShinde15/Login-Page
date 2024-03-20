import { createContext, useEffect, useState } from "react";
import Button from "./components/Button/Button";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import styles from "./App.module.css";
export const userContext = createContext();

function App() {
  const [IsLogIn, setIsLogin] = useState(false);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/getusersdata");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const users = await response.json();
        setUsersData(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [IsLogIn]);

  return (
    <div className={styles.container}>
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
      <userContext.Provider value={{ usersData, setUsersData }}>
        {IsLogIn ? <SignIn /> : <SignUp setIsLogin={setIsLogin} />}
      </userContext.Provider>
    </div>
  );
}

export default App;
