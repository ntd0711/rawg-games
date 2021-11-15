import React from "react";

const GameImages = ({ screenShots = {} }) => {
  const { results: images } = screenShots;

  return (
    <div className="gameSub__images">
      {images?.map((image) => (
        <div key={image.id}>
          <img style={{ width: "100%" }} src={image.image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default GameImages;
