import { IHeader } from "../types";

const Header = ({ name }: IHeader) => {
  return <h1>{name}</h1>;
};

export default Header;
