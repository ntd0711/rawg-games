import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { createTheme } from "@mui/material";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

const theme = createTheme();
const useStyles = makeStyles({
  root: {},
  infoBox: {},
  title: { fontWeight: "700" },
  content: {},
  link: { color: "#000" },
  gameShowMore: {
    cursor: "pointer",
    fontStyle: "italic",
    color: "hsl(0 0% 40%)",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const GameInfo = ({ gameInfo = {} }) => {
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(true);

  const {
    id,
    backgroundImage,
    name,
    released,
    metacritic,
    genres,
    website,
    descriptionRaw,
    alternative_names,
    description_raw,
    clip,
    tags,
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
    <Box>
      <Box mb={2}>
        <Typography variant="h4">{name}</Typography>
        <Box mt={-1}>
          <Typography fontStyle="italic" component="span" variant="subtitle1">
            {alternative_names?.join(", ")}
          </Typography>
        </Box>
      </Box>

      <Box mb={2}>
        <Typography sx={{ fontWeight: "700" }} variant="subtitle2">
          Released Date
        </Typography>
        <Typography sx={{ mt: "-8px" }} variant="subtitle1">
          {releasedDate}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography sx={{ fontWeight: "700" }} variant="subtitle2">
          Genres
        </Typography>
        <Box mt={-1}>
          {genres?.map((genre, index) => (
            <Typography component="span" variant="subtitle1" key={genre.id}>
              {genres.length === index + 1 ? (
                <Link
                  className={classes.link}
                  to={`/games?genres=${genre.slug}`}
                >
                  {genre.name}
                </Link>
              ) : (
                <Link
                  className={classes.link}
                  to={`/games?genres=${genre.slug}`}
                >
                  {genre.name},{" "}
                </Link>
              )}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box mb={2}>
        <Typography sx={{ fontWeight: "700" }} variant="subtitle2">
          Home Page
        </Typography>
        <Typography sx={{ mt: "-8px" }} variant="subtitle1">
          <a
            className={classes.link}
            target="_blank"
            rel="noreferrer"
            href={`${website}`}
          >
            {website}
          </a>
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography sx={{ fontWeight: "700" }} variant="subtitle2">
          Description
        </Typography>
        <Typography sx={{ lineHeight: "25.8px" }} variant="subtitle1">
          {collapsedDescription}
          <span
            onClick={() => setCollapsed((prev) => !prev)}
            className={classes.gameShowMore}
          >
            {showMoreText}
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default GameInfo;
