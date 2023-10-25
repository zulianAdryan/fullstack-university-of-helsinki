import axios from "axios";
import user from "../utils/user";
const baseUrl = `http://localhost:3001/api/notes`;

const getConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${user.getToken()}`,
    },
  };
};

export const getNotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNote = async (newNote) => {
  const response = await axios.post(baseUrl, newNote, getConfig());
  return response.data;
};

export const updateNote = async (updatedNote) => {
  const response = await axios.put(
    `${baseUrl}/${updatedNote.id}`,
    updatedNote,
    getConfig()
  );
  return response.data;
};
