import React from "react";
import styles from "./InputBox.module.css";
const InputBox = (props) => {
  return (
    <>
      <h4 className={styles.label}>{props.labelFor}</h4>
      <input
        className={styles.inputBox}
        type={props.type}
        onChange={props.onchange}
      />
    </>
  );
};

export default InputBox;
