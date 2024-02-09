import axios from "axios";
import { DiaryEntries } from "../types";

const baseURL = "http://localhost:3001/api";

const getAll = async () => {
  const response = await axios.get(`${baseURL}/diaries`);
  return response.data as DiaryEntries[];
};

const addNewDiary = async (newDiary: DiaryEntries) => {
  const response = await axios.post(`${baseURL}/diaries`, newDiary);
  return response.data as DiaryEntries;
};

export default { getAll, addNewDiary };
