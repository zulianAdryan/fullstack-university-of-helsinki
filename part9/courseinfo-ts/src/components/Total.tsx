import { ITotal } from "../types";

const Total = ({ total }: ITotal) => {
  return <p style={{ marginTop: "30px" }}>Number of exercises {total}</p>;
};

export default Total;
