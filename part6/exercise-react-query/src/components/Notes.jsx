import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotes, updateNote } from "../services/notes";

const Notes = () => {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["notes"],
    queryFn: () => getNotes(),
    refetchOnWindowFocus: false,
  });
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
  });
  // console.log(JSON.parse(JSON.stringify(result)));
  const notes = result.data;

  const toggleImportance = (updateNote) => {
    // console.log("toggle importance of", note.id);
    const updatedNote = {
      ...updateNote,
      important: !updateNote.important,
    };
    updateNoteMutation.mutate(updatedNote, {
      onSuccess: () => {
        const notes = queryClient.getQueryData(["notes"]);
        queryClient.setQueryData(
          ["notes"],
          notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        );
      },
    });
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "10px",
      }}
    >
      {notes?.map((note) => (
        <li
          key={note.id}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => toggleImportance(note)}
        >
          {note.content}
          <strong> {note.important ? "important" : ""}</strong>
        </li>
      ))}
    </div>
  );
};

export default Notes;
