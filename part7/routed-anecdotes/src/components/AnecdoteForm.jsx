import { useDispatch } from "react-redux";
import { createNew } from "../redux/reducers/anecdoteReducer";
import { setNotification } from "../redux/reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content.value === "" || author.value === "" || url.value === "") {
      dispatch(setNotification(`please fill out all of the form fields!`));
      return null;
    }

    dispatch(
      createNew({
        content: content.value,
        author: author.value,
        url: url.value,
        votes: 0,
      })
    );

    dispatch(setNotification(`a new anecdote ${content.value} created!`));
    navigate("/");
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetUrl();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...url} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit">create</button>
          <button type="button" onClick={handleReset}>
            reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnecdoteForm;
