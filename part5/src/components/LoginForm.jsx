import PropTypes from "prop-types";

const LoginForm = ({ onChangeInput, onSubmit }) => {
  const onChange = ({ target }) => {
    const { id, value } = target;
    onChangeInput((current) => ({ ...current, [id]: value }));
  };
  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={onSubmit}>
        <p>
          username
          <input type="text" id="username" onChange={onChange} />
        </p>
        <p>
          password
          <input type="password" id="password" onChange={onChange} />
        </p>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
