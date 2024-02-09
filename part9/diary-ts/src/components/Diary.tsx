import { IDiary } from "../types";

const Diary: React.FC<IDiary> = ({ diaries, error }) => {
  if (error !== "") {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>Diary entries</h1>
      {diaries.map(({ date, visibility, weather }, index: number) => (
        <div key={index} style={{ margin: "10px 0px" }}>
          <p style={{ fontWeight: "bold", margin: "10px 0px" }}>{date}</p>
          <p>{`visibility: ${visibility}`}</p>
          <p>{`weather: ${weather}`}</p>
          {/* <p
            style={{
              display: !comment || comment === "" ? "hidden" : "block",
            }}
          >{`comment: ${comment}`}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Diary;
