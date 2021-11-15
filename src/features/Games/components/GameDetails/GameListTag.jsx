import React from "react";
import { Link } from "react-router-dom";

const GameListTag = ({ tags = [] }) => {
  return (
    <h3 sx={{ fontWeight: "700" }} className="gameSub__tags">
      Tags
      <div className="gameSub__tags-container">
        {tags.map((tag) => (
          <p className="gameSub__tags-item" key={tag.id}>
            <Link className="gameSub__link" to={`/games?tags=${tag.slug}`}>
              {tag.name}
            </Link>
          </p>
        ))}
      </div>
    </h3>
  );
};

export default GameListTag;
