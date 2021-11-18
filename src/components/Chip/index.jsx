import React from "react";

const Chip = ({ label, active, toggleDropList, expanded }) => {
  const handleToggleDrop = () => {
    if (toggleDropList) toggleDropList();
  };

  return (
    <span
      className={`chip ${expanded}`}
      style={{
        color: active ? "#082032" : "#d2d2d2",
        backgroundColor: active ? "#fff" : "#2c394c",
      }}
      onClick={handleToggleDrop}
    >
      {label}
    </span>
  );
};

export default Chip;
