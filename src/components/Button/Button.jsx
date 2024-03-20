import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  const buttonClasses = [
    props.size === "small" ? styles.smallButton : styles.button,
    props.active ? styles.isSelected : "",
  ].join(" ");
  return (
    <>
      <button className={buttonClasses} onClick={props.onclick}>
        {props.name}
      </button>
    </>
  );
};

export default Button;
