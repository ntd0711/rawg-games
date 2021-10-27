import { Container, createTheme, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { useGetGenresListQuery } from "../../../services/genresApi";
import FilterSearch from "./FilterSearch";
import FilterTag from "./FilterTag";

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
  },
  cpnSearch: {
    margin: theme.spacing(0, 0, 2, 1),
  },
  cpnTags: {},
});

const FiltersGame = ({ filters, onChange }) => {
  const classes = useStyles();

  const { data, error, isFetching } = useGetGenresListQuery();

  if (isFetching) return "loading...";

  const handleTagsChange = (formValues) => {
    if (onChange) onChange(formValues);
  };

  const handleSearch = (searchTerm) => {
    if (onChange) onChange(searchTerm);
  };

  const { results: genreList } = data;

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Paper className={classes.paper} elevation={0}>
          <Box className={classes.cpnSearch}>
            <FilterSearch filters={filters} onSubmit={handleSearch} />
          </Box>
          <Box className={classes.cpnTags}>
            <FilterTag
              filters={filters}
              onChange={handleTagsChange}
              genreList={genreList}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FiltersGame;
