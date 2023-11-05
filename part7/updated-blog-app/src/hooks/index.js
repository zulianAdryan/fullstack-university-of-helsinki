import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useMessageDispatch } from "../context/BlogsContext";
import blogService from "../services/blogs";
import authorService from "../services/authors";
import commentService from "../services/comments";

export const useVisible = () => {
  const [visible, setVisible] = useState(false);
  const toggle = () => {
    setVisible((current) => !current);
  };

  return { visible, toggle };
};

export const useField = (type, id) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return { type, value, onChange, reset, id };
};

export const useSetMessage = () => {
  const dispatch = useMessageDispatch();

  const setMessage = ({ message, isError, interval }) => {
    dispatch({ type: "SET_MESSAGE", payload: { message, isError } });
    setTimeout(() => {
      dispatch({ type: "RESET_MESSAGE" });
    }, interval);
  };

  return {
    set: ({ message, isError = false, interval = 5000 }) =>
      setMessage({ message, isError, interval }),
  };
};

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      const userDataLocalStorage = window.localStorage.getItem(
        import.meta.env.VITE_STORAGE_USER
      );
      if (userDataLocalStorage) {
        setUser(JSON.parse(userDataLocalStorage));
      }
    }
  }, []);

  const set = (data) => {
    window.localStorage.setItem(
      import.meta.env.VITE_STORAGE_USER,
      JSON.stringify(data)
    );
  };

  const clear = () => {
    window.localStorage.removeItem(import.meta.env.VITE_STORAGE_USER);
  };

  return { data: user, set, clear };
};

export const useBlogs = () => {
  const QUERY_NAME = ["blogs"];
  const messageDispatch = useSetMessage();
  const queryClient = useQueryClient();
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_NAME,
    queryFn: () => blogService.getAll(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const createMutation = useMutation({
    mutationFn: blogService.create,
  });

  const likeMutation = useMutation({
    mutationFn: blogService.like,
  });

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
  });

  const create = async (blog) => {
    const promise = new Promise((resolve, reject) => {
      createMutation.mutate(blog, {
        onSuccess: (newBlog) => {
          const blogs = queryClient.getQueryData(QUERY_NAME);
          queryClient.setQueryData(QUERY_NAME, blogs.concat(newBlog));
          messageDispatch.set({
            message: `Blog ${newBlog?.title ?? ""} has been added`,
          });
        },
        onError: (error) => {
          messageDispatch.set({
            message: error?.response?.data?.error ?? "Something went wrong",
            isError: true,
          });
        },
        onSettled: (data, error) => {
          // console.log({ error, data });
          resolve({ data: data, isError: !error ? false : true });
        },
      });
    });

    return await promise;
  };

  const likeOf = (blog, revalidate = false) => {
    likeMutation.mutate(blog, {
      onSuccess: (votedBlog) => {
        const blogs = queryClient.getQueryData(QUERY_NAME);
        queryClient.setQueryData(
          QUERY_NAME,
          blogs.map((_blog) => (_blog.id === votedBlog.id ? votedBlog : _blog))
        );
        messageDispatch.set({
          message: `Blog ${votedBlog?.title ?? ""} has been voted`,
        });
      },
      onError: (error) =>
        messageDispatch.set({
          message: error?.response?.data?.error ?? "Something went wrong",
          isError: true,
        }),
    });
  };

  const deleteOf = async (blog) => {
    const promise = new Promise((resolve, reject) => {
      deleteMutation.mutate(blog, {
        onSuccess: () => {
          const blogs = queryClient.getQueryData(QUERY_NAME);
          queryClient.setQueryData(
            QUERY_NAME,
            blogs.filter((_blog) => _blog.id !== blog.id)
          );
          messageDispatch.set({
            message: `Blog ${blog?.title ?? ""} has been deleted`,
          });
        },
        onError: (error) =>
          messageDispatch.set({
            message: error?.response?.data?.error ?? "Something went wrong",
            isError: true,
          }),
        onSettled: (data, error) => {
          // console.log({ error, data });
          resolve({ isError: !error ? false : true });
        },
      });
    });

    return await promise;
  };

  return { data, isLoading, isError, create, likeOf, deleteOf };
};

export const useAuthors = () => {
  const QUERY_NAME = ["authors"];
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_NAME,
    queryFn: () => authorService.getAll(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const getAuthorOf = async (id) => {
    const response = await authorService.getAuthorOf(id);
    return response;
  };

  return { data, isLoading, isError, getAuthorOf };
};

export const useComments = (blogId) => {
  const QUERY_NAME = ["comments"];
  const messageDispatch = useSetMessage();
  const queryClient = useQueryClient();
  const [data, setData] = useState([]);
  const createMutation = useMutation({
    mutationFn: commentService.create,
  });

  const getAll = async () => {
    const comments = await commentService.getAll(blogId);
    // console.log("comments response", comments);
    queryClient.setQueryData(QUERY_NAME, comments);
    setData(comments);
  };

  useEffect(() => {
    if (blogId) {
      // console.log("blogId", blogId);
      getAll();
    }
  }, [blogId]);

  const create = async (comment) => {
    const promise = new Promise((resolve, reject) => {
      createMutation.mutate(comment, {
        onSuccess: (newComment) => {
          const comments = queryClient.getQueryData(QUERY_NAME);
          const updatedComments = comments.concat(newComment);
          queryClient.setQueryData(QUERY_NAME, updatedComments);
          setData(updatedComments);
          messageDispatch.set({
            message: `Comment ${newComment?.content ?? ""} has been added`,
          });
        },
        onError: (error) => {
          messageDispatch.set({
            message: error?.response?.data?.error ?? "Something went wrong",
            isError: true,
          });
        },
        onSettled: (data, error) => {
          console.log({ error, data });
          resolve({ data: data, isError: !error ? false : true });
        },
      });
    });

    return await promise;
  };

  return { data, create, getAll };
};
