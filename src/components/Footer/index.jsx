import React from "react";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <span className="logo">
        <Link to="/">RAWG</Link>
      </span>
      <p className="footer__text">2021 © RAWG, Behind The Games</p>
      <p className="footer__icons">
        <a
          href="https://twitter.com/rawgtheworld"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineTwitter />
        </a>
        <a
          href="https://discord.com/invite/erNybDp"
          target="_blank"
          rel="noreferrer"
        >
          <FaDiscord />
        </a>
      </p>
    </div>
  );
};

export default Footer;
