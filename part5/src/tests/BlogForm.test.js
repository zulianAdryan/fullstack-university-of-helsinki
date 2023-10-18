import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

describe("<BlogForm/>", () => {
  test("form calls the event handler it received as props with the right details when a new blog is created", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm onSubmit={createBlog} />);

    const inputTitle = screen.getByPlaceholderText("title");
    const inputUrl = screen.getByPlaceholderText("url");
    const createButton = screen.getByText("create");

    await user.type(inputTitle, "testing a form title");
    await user.type(inputUrl, "testing a form url");
    await user.click(createButton);

    // screen.debug(inputTitle);
    // screen.debug(inputUrl);

    expect(createBlog.mock.calls).toHaveLength(1);

    // console.log("calls", createBlog.mock.calls);

    expect(createBlog.mock.calls[0][0].title).toBe("testing a form title");
    expect(createBlog.mock.calls[0][0].url).toBe("testing a form url");
  });
});
