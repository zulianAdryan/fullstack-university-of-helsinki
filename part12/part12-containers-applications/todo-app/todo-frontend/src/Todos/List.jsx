import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  // console.log("todos", todos);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {todos?.map((todo, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            margin: "5px 0px",
          }}
        >
          {index === 0 ? (
            <div style={{ paddingBottom: "10px" }}>
              <hr />
            </div>
          ) : null}
          <Todo
            todo={todo}
            onClickComplete={onClickComplete}
            onClickDelete={onClickDelete}
          />
          <div style={{ paddingTop: "10px" }}>
            <hr />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
