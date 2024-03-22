import React, { useContext, useState } from "react";
import { userContext } from "./App";
const Component5 = () => {
  const [text, setText] = useState("");
  const { user, age, address, setUser } = useContext(userContext);
  console.log("HI: ", user);
  const setNewUser = () => {
    text.length > 0 && setUser(text);
  };
  return (
    <div>
      <h1>{user}</h1>
      <h1>{age}</h1>
      <h1>{address}</h1>

      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={(e) => setNewUser()}>Submit</button>
    </div>
  );
};

export default Component5;
