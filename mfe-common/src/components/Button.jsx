import React from "react";

const Button = ({
  id,
  text,
  onClick,
  className = "btn btn-primary",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      id={id}
    >
      {text}
    </button>
  );
};

export default Button;
