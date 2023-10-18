import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("<Blog/>", () => {
  test("renders content", () => {
    const blog = {
      title: "Component testing is done with react-testing-library",
      author: "Test User",
      url: "testing",
      likes: 99,
    };

    render(
      <Blog blog={blog} onDelete={() => {}} onLike={() => {}} user={{}} />
    );

    const element = screen.getByText(
      "Component testing is done with react-testing-library Test User"
    );
    expect(element).toBeDefined();
  });

  test("displaying title and author, not URL or likes by default", () => {
    const blog = {
      title: "this is title",
      author: "this is author",
      url: "test.com",
      likes: 10,
    };

    render(
      <Blog blog={blog} onDelete={() => {}} onLike={() => {}} user={{}} />
    );

    const element = screen.getByText(`${blog.title} ${blog.author}`);

    expect(element).toBeDefined();
  });

  test("URL and likes are shown when the button show has been clicked", async () => {
    const blog = {
      title: "this is title",
      author: "this is author",
      url: "test.com",
      likes: 10,
      user: {
        id: 9999,
      },
    };
    render(
      <Blog
        blog={blog}
        onDelete={() => {}}
        onLike={() => {}}
        user={{ id: 9999 }}
      />
    );
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const url = screen.getByText(blog.url);
    const likes = screen.getByText(`likes ${blog.likes}`);

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  test("ensures that if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
    const blog = {
      title: "this is title",
      author: "this is author",
      url: "test.com",
      likes: 10,
      user: {
        id: 9999,
      },
    };
    const mockHandler = jest.fn();
    render(
      <Blog
        blog={blog}
        onDelete={() => {}}
        onLike={mockHandler}
        user={{ id: 9999 }}
      />
    );

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
