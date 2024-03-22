import { createContext, useEffect, useState } from "react";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import styles from "./App.module.css";
import Application from "./components/Application/Application";
import ButtonOptions from "./components/ButtonOptions/ButtonOptions";
export const userContext = createContext();

function App() {
  const [IsLogIn, setIsLogin] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");

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
      <userContext.Provider
        value={{
          usersData,
          setUsersData,
          userLoggedIn,
          setUserLoggedIn,
          setIsLogin,
          IsLogIn,
          loggedInUser,
          setLoggedInUser,
        }}
      >
        {userLoggedIn ? (
          <Application loggedInUser={loggedInUser} />
        ) : (
          <>
            <ButtonOptions />
            {IsLogIn ? <SignIn /> : <SignUp setIsLogin={setIsLogin} />}
          </>
        )}
      </userContext.Provider>
    </div>
  );
}

export default App;
