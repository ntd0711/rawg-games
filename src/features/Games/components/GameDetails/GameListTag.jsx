import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const GameListTag = ({ tags = [] }) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: "700" }} variant="subtitle2">
        Tags
      </Typography>
      {tags.map((tag) => (
        <Typography key={tag.id} variant="body2">
          <Link
            style={{ color: "#000", textDecoration: "none" }}
            to={`/games?tags=${tag.slug}`}
          >
            {tag.name}
          </Link>
        </Typography>
      ))}
    </Box>
  );
};

export default GameListTag;
