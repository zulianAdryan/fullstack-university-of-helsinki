import { useDispatch } from "react-redux";
import { createNew } from "../redux/reducers/anecdoteReducer";
import { setNotification } from "../redux/reducers/notificationReducer";
import { useNavigate } from "react-router-dom";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { content, author, url } = event.target;

    if (content.value === "" || author.value === "" || url.value === "")
      return null;

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

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" />
        </div>
        <div>
          author
          <input name="author" />
        </div>
        <div>
          url for more info
          <input name="url" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
