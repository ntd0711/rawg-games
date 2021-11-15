import React from "react";

const Avatar = ({ width, height, photoURL }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundImage: `url(${photoURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default Avatar;
