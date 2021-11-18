import React, { useState } from "react";
import { Chip } from "../../../../components";
import { AiOutlineDown } from "react-icons/ai";

const FilterTag = ({ filters, genreList, onChange = null }) => {
  const [expanded, setExpanded] = useState(false);

  const handleFiltersChange = (genres) => {
    if (!onChange) return;

    const formValues = { genres };
    onChange(formValues);
  };

  const handleDropListGenre = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <div className="genres">
        <div className="genres__expanded">
          <span className="genres__current">
            {filters?.genres?.toUpperCase() || "GENRE"}
          </span>
          <span className="genres__icon-down" onClick={handleDropListGenre}>
            <AiOutlineDown
              style={{
                transition: "0.2s",
                transform: `rotate(${expanded ? "180deg" : "0deg"})`,
              }}
            />
          </span>
        </div>
        <div
          className={`genres__chips ${
            expanded ? "genres__chips-expanded" : ""
          }`}
        >
          {genreList?.map((genre) => (
            <span
              key={genre.id}
              onClick={() => handleFiltersChange(genre.slug)}
            >
              <Chip
                toggleDropList={handleDropListGenre}
                active={genre.slug === filters.genres}
                label={`${genre.name}`}
              />
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterTag;
