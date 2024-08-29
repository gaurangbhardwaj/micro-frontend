import React from "react";

const Input = ({
  value,
  onChange,
  name,
  id,
  placeholder = "",
  type = "text",
  className = "form-control",
  disabled = false,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
    />
  );
};

export default Input;
