export interface DiaryEntries {
  date: string;
  visibility: string;
  weather: string;
  comment?: string | undefined;
}

export interface IAddNewDiary {
  onSubmit: (newDiary: DiaryEntries) => void;
  error: string;
}

export interface IDiary {
  diaries: DiaryEntries[];
  error: string;
}
