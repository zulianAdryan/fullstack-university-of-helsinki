import { useEffect, useState } from "react";
import AddNewDiary from "./components/AddNewDiary";
import Diary from "./components/Diary";
import diary from "./services/diary";
import { DiaryEntries } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntries[]>([]);
  const [errorAll, setErrorAll] = useState<string>("");
  const [errorAdd, setErrorAdd] = useState<string>("");

  const getAllDiary = async () => {
    try {
      const allDiary = await diary.getAll();
      setDiaries(allDiary);
    } catch (error) {
      let errorMessage = "Something went wrong when trying get all diaries.";
      if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
      }
      setErrorAll(errorMessage);
      setTimeout(() => {
        setErrorAll("");
      }, 1000);
    }
  };

  useEffect(() => {
    getAllDiary();
  }, []);

  const handleAddNewDiary = async (newDiary: DiaryEntries) => {
    try {
      const addedDiary = await diary.addNewDiary(newDiary);
      setDiaries((current) => current.concat(addedDiary));
    } catch (error) {
      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
      }
      setErrorAdd(errorMessage);
      setTimeout(() => {
        setErrorAdd("");
      }, 1000);
    }
  };

  return (
    <div>
      <AddNewDiary onSubmit={handleAddNewDiary} error={errorAdd} />
      <Diary diaries={diaries} error={errorAll} />
    </div>
  );
};

export default App;
