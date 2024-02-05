const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <div
      style={{
        color: "red",
        width: "100%",
        height: "30px",
        border: "1px solid lightgray",
      }}
    >
      {errorMessage}
    </div>
  );
};

export default Notify;
