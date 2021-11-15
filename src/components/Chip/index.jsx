import React from "react";

const Chip = ({ label, active, expanded }) => {
  return (
    <span
      className="chip"
      style={{
        display: expanded ? "block" : "inline-block",
        color: active ? "#082032" : "#d2d2d2",
        backgroundColor: active ? "#fff" : "#2c394c",
      }}
    >
      {label}
    </span>
  );
};

export default Chip;
