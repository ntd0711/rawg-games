import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenreList } from "../../gamesSlice";
import FilterTag from "./FilterTag";

const FiltersGame = ({ filters, onChange }) => {
  const dispatch = useDispatch();

  // const { data, error, isFetching } = useGetGenresListQuery();

  // if (isFetching) return "loading...";

  const genreList = useSelector((state) => state.games.genreList["genreList"]);

  useEffect(() => {
    (async () => {
      try {
        const action = getGenreList();
        dispatch(action);
      } catch (error) {
        console.log("failed to fetch genre list: ", error);
      }
    })();
  }, [dispatch]);

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
