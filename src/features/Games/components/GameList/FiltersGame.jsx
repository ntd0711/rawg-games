import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenreList } from "../../gamesThunks";
import FilterTag from "./FilterTag";

const FiltersGame = ({ filters, onChange }) => {
  const dispatch = useDispatch();

  const genreList = useSelector((state) => state.games.genres["genreList"]);
  // const loading = useSelector((state) => state.games.genres.loading);

  useEffect(() => {
    if (genreList) return;
    (async () => {
      try {
        const action = getGenreList();
        await dispatch(action);
      } catch (error) {
        console.log("failed to fetch genre list: ", error);
      }
    })();
  }, [dispatch, genreList]);

  const handleTagsChange = (formValues) => {
    if (onChange) onChange(formValues);
  };

  return (
    <FilterTag
      filters={filters}
      onChange={handleTagsChange}
      genreList={genreList}
    />
  );
};

export default FiltersGame;
