import {
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";

const platforms = new Map([
  ["pc", FaWindows],
  ["playstation", FaPlaystation],
  ["xbox", FaXbox],
  ["ios", FaApple],
  ["android", FaAndroid],
  ["linux", FaLinux],
]);

export const renderIcon = (name) => {
  return platforms.get(name);
};
