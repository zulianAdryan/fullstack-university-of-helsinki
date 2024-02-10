import { render, screen } from "@testing-library/react";
import Todo from "../Todos/Todo";
import "@testing-library/jest-dom";

test("Single todo component rendered", () => {
  const onClickComplete = jest.fn();
  const onClickDelete = jest.fn();
  render(
    <Todo
      todo={{ text: "this is test", done: false }}
      onClickDelete={onClickDelete}
      onClickComplete={onClickComplete}
    />
  );
  const element = screen.getByText("this is test");

  expect(element).toBeDefined();
});
