import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const GameInfo = ({ gameInfo = {} }) => {
  const [collapsed, setCollapsed] = useState(true);

  const {
    name,
    released,
    genres,
    website,
    alternative_names,
    description_raw,
  } = gameInfo;

  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);
  const releasedDate = `${dayjs(released).format("ll")} (${dayjs(
    released
  ).fromNow()})`;

  const showCollapsed = description_raw?.length > 220 && collapsed;
  const showMoreText = showCollapsed ? "read more" : "read less";
  const collapsedDescription = showCollapsed
    ? `${description_raw?.substring(0, 220)}... `
    : `${description_raw}`;

  return (
    <div className="gameDetails__info">
      <h2 className="gameDetails__title">
        {name}
        <p className="gameDetails__subtitle">
          {" "}
          {alternative_names?.join(", ")}
        </p>
      </h2>

      <h3 className="gameDetails__released">
        Released Date
        <p>{releasedDate}</p>
      </h3>

      <h3 className="gameDetails__genres">
        Genres
        <div>
          {genres?.map((genre, index) => (
            <span key={genre.id}>
              {index !== 0 && ", "}
              <Link
                className="gameDetails__Link"
                to={`/games?genres=${genre.slug}`}
              >
                {genre.name}
              </Link>
            </span>
          ))}
        </div>
      </h3>

      <h3 className="gameDetails__homepage">
        Home Page
        <p>
          <a
            className="gameDetails__Link"
            target="_blank"
            rel="noreferrer"
            href={`${website}`}
          >
            {website}
          </a>
        </p>
      </h3>

      <h3 className="gameDetails__description">
        Description
        <p>
          {collapsedDescription}
          <span
            onClick={() => setCollapsed((prev) => !prev)}
            className="readMore"
          >
            {showMoreText}
          </span>
        </p>
      </h3>
    </div>
  );
};

export default GameInfo;
