import React from "react";

const Overlay = () => {
  return (
    <div className="deep">
      <div
        className="game__back-art"
        style={{
          backgroundImage: `linear-gradient(rgba(8, 32, 50, 0.7),
            rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8),
            rgba(21, 21, 21, 0.5))`,
          zIndex: "1",
        }}
      ></div>
    </div>
  );
};

export default Overlay;
