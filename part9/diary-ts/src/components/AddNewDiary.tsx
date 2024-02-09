import { useState } from "react";
import { DiaryEntries, IAddNewDiary } from "../types";

const AddNewDiary: React.FC<IAddNewDiary> = ({ onSubmit, error }) => {
  const [formData, setFormData] = useState<DiaryEntries>({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("form data", formData);
    onSubmit(formData);
  };

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>Add New Diary</h1>
      <p
        style={{
          color: "red",
          display: error === "" ? "hidden" : "block",
        }}
      >
        {error}
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          date
          <input
            name="date"
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>

        <div>
          <label>visibility</label>
          <div>
            <input
              name="visibility"
              type="radio"
              id="great"
              value="great"
              onChange={handleChange}
              checked={formData.visibility === "great"}
            />
            <label htmlFor="great">great</label>
          </div>
          <div>
            <input
              name="visibility"
              type="radio"
              id="good"
              value="good"
              onChange={handleChange}
              checked={formData.visibility === "good"}
            />
            <label htmlFor="good">good</label>
          </div>
          <div>
            <input
              name="visibility"
              type="radio"
              id="ok"
              value="ok"
              onChange={handleChange}
              checked={formData.visibility === "ok"}
            />
            <label htmlFor="ok">ok</label>
          </div>
          <div>
            <input
              name="visibility"
              type="radio"
              id="poor"
              value="poor"
              onChange={handleChange}
              checked={formData.visibility === "poor"}
            />
            <label htmlFor="poor">poor</label>
          </div>
        </div>

        <div>
          <label>weather</label>
          <div>
            <input
              name="weather"
              type="radio"
              id="sunny"
              value="sunny"
              onChange={handleChange}
              checked={formData.weather === "sunny"}
            />
            <label htmlFor="sunny">sunny</label>
          </div>
          <div>
            <input
              name="weather"
              type="radio"
              id="rainy"
              value="rainy"
              onChange={handleChange}
              checked={formData.weather === "rainy"}
            />
            <label htmlFor="rainy">rainy</label>
          </div>
          <div>
            <input
              name="weather"
              type="radio"
              id="cloudy"
              value="cloudy"
              onChange={handleChange}
              checked={formData.weather === "cloudy"}
            />
            <label htmlFor="cloudy">cloudy</label>
          </div>
          <div>
            <input
              name="weather"
              type="radio"
              id="stormy"
              value="stormy"
              onChange={handleChange}
              checked={formData.weather === "stormy"}
            />
            <label htmlFor="stormy">stormy</label>
          </div>
          <div>
            <input
              name="weather"
              type="radio"
              id="windy"
              value="windy"
              onChange={handleChange}
              checked={formData.weather === "windy"}
            />
            <label htmlFor="windy">windy</label>
          </div>
        </div>

        <div>
          <label>comment</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddNewDiary;
