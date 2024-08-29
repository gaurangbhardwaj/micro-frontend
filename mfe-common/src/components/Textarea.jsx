import React from "react";

const Textarea = ({
  value,
  onChange,
  name,
  id,
  placeholder,
  rows,
  className = "form-control",
  disabled = false,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      placeholder={placeholder}
      className={className}
      rows={rows}
      disabled={disabled}
    />
  );
};

export default Textarea;
